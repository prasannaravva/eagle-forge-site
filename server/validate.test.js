import test from 'node:test'
import assert from 'node:assert/strict'
import { buildMail, normaliseMobile, parseEnquiry } from './validate.js'

test('normalises Indian mobiles', () => {
  for (const v of ['9876543210', '+91 98765 43210', '098765-43210', '91 9876543210']) assert.equal(normaliseMobile(v), '+919876543210')
  for (const v of ['12345', '5876543210', 'abc', '']) assert.equal(normaliseMobile(v), null)
})
test('requires name and valid mobile, validates optional email', () => {
  const r = parseEnquiry({ name: '', mobile: '123', email: 'nope' })
  assert.deepEqual(Object.keys(r.errors).sort(), ['email', 'mobile', 'name'])
  assert.equal(parseEnquiry({ name: 'A', mobile: '9876543210' }).ok, true)
})
test('honeypot is silently dropped', () => {
  const r = parseEnquiry({ name: 'A', mobile: '9876543210', website: 'spam.com' })
  assert.equal(r.ok, false)
  assert.equal(r.silent, true)
})
test('strips header injection and sets replyTo from email', () => {
  const r = parseEnquiry({ name: 'Bob\r\nBcc: x@y.com', mobile: '9876543210', email: 'bob@shop.in', message: 'hi' })
  const m = buildMail(r.value, { from: 'f@x.com', to: 't@x.com' })
  assert.ok(!/[\r\n]/.test(m.subject))
  assert.equal(m.replyTo, 'bob@shop.in')
  assert.match(m.text, /Mobile: \+919876543210/)
})
