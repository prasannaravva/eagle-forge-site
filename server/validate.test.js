import test from 'node:test'
import assert from 'node:assert/strict'
import { buildMail, parseEnquiry } from './validate.js'

test('requires name and contact', () => {
  assert.equal(parseEnquiry({ name: '', reach: 'x' }).ok, false)
  assert.equal(parseEnquiry({ name: 'A', reach: '' }).ok, false)
})
test('honeypot is silently dropped', () => {
  const r = parseEnquiry({ name: 'A', reach: '9', website: 'spam.com' })
  assert.equal(r.ok, false)
  assert.equal(r.silent, true)
})
test('strips header injection and sets replyTo only for emails', () => {
  const r = parseEnquiry({ name: 'Bob\r\nBcc: x@y.com', reach: 'bob@shop.in', tools: ['Tally'], flows: [] })
  assert.equal(r.ok, true)
  const m = buildMail(r.value, { from: 'f@x.com', to: 't@x.com' })
  assert.ok(!/[\r\n]/.test(m.subject))
  assert.equal(m.replyTo, 'bob@shop.in')
  assert.equal(parseEnquiry({ name: 'A', reach: '+91 98765 43210' }).value.replyTo, null)
})
