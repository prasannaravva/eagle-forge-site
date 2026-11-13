import http from 'node:http'
import nodemailer from 'nodemailer'
import { buildMail, parseEnquiry } from './validate.js'

const env = process.env
const pick = (a, b) => env[a] || env[b]
const PORT = Number(env.PORT || 3000)
const TO = env.ENQUIRY_TO || 'hello@eaglenexa.ai'
const FROM = env.ENQUIRY_FROM || 'Eagle Nexa website <hello@eaglenexa.ai>'

const SMTP_PORT = Number(pick('SMTP_PORT', 'GROUNDMAIL_SMTP_PORT') || 587)
const transport = nodemailer.createTransport({
  host: pick('SMTP_HOST', 'GROUNDMAIL_SMTP_HOST'),
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  requireTLS: SMTP_PORT !== 465,
  auth: { user: pick('SMTP_USERNAME', 'GROUNDMAIL_SMTP_USERNAME'), pass: pick('SMTP_PASSWORD', 'GROUNDMAIL_SMTP_PASSWORD') },
})

// Simple in-memory limit: 5 enquiries per IP per 10 minutes.
const hits = new Map()
function limited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < 600_000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 5
}
setInterval(() => hits.clear(), 3_600_000).unref()

const send = (res, status, obj) => {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' })
  res.end(JSON.stringify(obj))
}

http
  .createServer((req, res) => {
    if (req.url === '/healthz') return send(res, 200, { ok: true })
    if (req.url !== '/api/enquiry') return send(res, 404, { error: 'Not found.' })
    console.log('enquiry request', req.method)
    if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed.' })

    const ip = req.headers['x-real-ip'] || req.socket.remoteAddress
    let raw = ''
    req.on('data', (c) => {
      raw += c
      if (raw.length > 10_000) req.destroy()
    })
    req.on('end', async () => {
      let body
      try {
        body = JSON.parse(raw)
      } catch {
        return send(res, 400, { error: 'Invalid request.' })
      }
      if (limited(ip)) return send(res, 429, { error: 'Too many enquiries. Please try again in a few minutes.' })
      const parsed = parseEnquiry(body)
      if (!parsed.ok) return parsed.silent ? send(res, 200, { ok: true }) : send(res, 400, { errors: parsed.errors })
      try {
        const info = await transport.sendMail(buildMail(parsed.value, { from: FROM, to: TO }))
        console.log('enquiry mail', JSON.stringify({ id: info.messageId, accepted: info.accepted, rejected: info.rejected, response: info.response }))
        if (!info.accepted?.length) throw new Error('recipient rejected by SMTP server')
        send(res, 200, { ok: true })
      } catch (err) {
        console.error('sendMail failed:', err.message)
        send(res, 502, { error: 'We could not send your enquiry right now.' })
      }
    })
  })
  .listen(PORT, () => {
    console.log(`enquiry api on :${PORT}, smtp ${transport.options.host}:${transport.options.port}, from ${FROM}, to ${TO}`)
    transport.verify().then(() => console.log('smtp login ok'), (e) => console.error('smtp verify failed:', e.message))
  })
