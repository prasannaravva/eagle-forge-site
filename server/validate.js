const clean = (v, max) => (typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, max) : '')
const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/

/** Indian mobile: 10 digits starting 6-9, optional +91 / 91 / 0 prefix, spaces and dashes allowed. Returns "+91XXXXXXXXXX" or null. */
export function normaliseMobile(v) {
  const digits = clean(v, 30).replace(/[\s\-().]/g, '')
  const m = digits.match(/^(?:\+?91|0)?([6-9]\d{9})$/)
  return m ? `+91${m[1]}` : null
}

/** Returns { ok: true, value } or { ok: false, errors } (errors keyed by field). Control characters are stripped so nothing can inject mail headers. */
export function parseEnquiry(body) {
  if (!body || typeof body !== 'object') return { ok: false, errors: { form: 'Invalid request.' } }
  if (body.website) return { ok: false, silent: true } // honeypot field, hidden from people
  const errors = {}
  const name = clean(body.name, 100)
  const email = clean(body.email, 120)
  const mobile = normaliseMobile(body.mobile)
  if (!name) errors.name = 'Please enter your name.'
  if (!mobile) errors.mobile = 'Enter a 10-digit mobile number, e.g. 98765 43210.'
  if (email && !EMAIL.test(email)) errors.email = 'This email address does not look right.'
  if (Object.keys(errors).length) return { ok: false, errors }
  const list = (a, n, max) => (Array.isArray(a) ? a.slice(0, n).map((t) => clean(t, max)).filter(Boolean) : [])
  return {
    ok: true,
    value: { name, mobile, email, message: clean(body.message, 1000), tools: list(body.tools, 20, 60), flows: list(body.flows, 20, 200) },
  }
}

export function buildMail({ name, mobile, email, message, tools, flows }, { from, to }) {
  const text = [
    `Name: ${name}`,
    `Mobile: ${mobile}`,
    `Email: ${email || '(not given)'}`,
    '',
    `Tools they use: ${tools.length ? tools.join(', ') : '(none ticked)'}`,
    '',
    'Connections they are interested in:',
    ...(flows.length ? flows.map((f) => `- ${f}`) : ['(none)']),
    ...(message ? ['', 'Message:', message] : []),
    '',
    'Sent from the eaglenexa.ai enquiry form.',
  ].join('\n')
  return { from, to, subject: `Enquiry from ${name} (${mobile})`, text, ...(email ? { replyTo: email } : {}) }
}
