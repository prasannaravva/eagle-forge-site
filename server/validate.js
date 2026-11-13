const clean = (v, max) => (typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, max) : '')
const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/

/** Returns { ok: true, value } or { ok: false, error }. Control characters are stripped so nothing can inject mail headers. */
export function parseEnquiry(body) {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Invalid request.' }
  if (body.website) return { ok: false, error: 'spam', silent: true } // honeypot field, hidden from people
  const name = clean(body.name, 100)
  const reach = clean(body.reach, 120)
  if (!name) return { ok: false, error: 'Please enter your name.' }
  if (!reach) return { ok: false, error: 'Please enter a phone number or email.' }
  const tools = Array.isArray(body.tools) ? body.tools.slice(0, 20).map((t) => clean(t, 60)).filter(Boolean) : []
  const flows = Array.isArray(body.flows) ? body.flows.slice(0, 20).map((t) => clean(t, 200)).filter(Boolean) : []
  return { ok: true, value: { name, reach, tools, flows, replyTo: EMAIL.test(reach) ? reach : null } }
}

export function buildMail({ name, reach, tools, flows, replyTo }, { from, to }) {
  const text = [
    `Name: ${name}`,
    `Phone or email: ${reach}`,
    '',
    `Tools they use: ${tools.length ? tools.join(', ') : '(none ticked)'}`,
    '',
    'Connections they are interested in:',
    ...(flows.length ? flows.map((f) => `- ${f}`) : ['(none)']),
    '',
    'Sent from the eaglenexa.ai enquiry form.',
  ].join('\n')
  return { from, to, subject: `Enquiry from ${name}`, text, ...(replyTo ? { replyTo } : {}) }
}
