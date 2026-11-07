/**
 * Eagle Nexa site content. Everything a visitor reads lives here.
 * Items marked TODO need a real value before launch.
 */
export const site = {
  name: 'Eagle Nexa',
  // TODO: the brief gives no email or phone. Set the address enquiries should go to.
  email: 'hello@eaglenexa.example',
  address: ['Shop No 4, Mahatma Gandhi Commercial Complex', 'Mahendra Nagar, Gollapudi', 'Vijayawada, Andhra Pradesh 520012'],
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=Mahatma+Gandhi+Commercial+Complex+Mahendra+Nagar+Gollapudi+Vijayawada+520012',

  nav: [
    { label: 'Solutions', href: '#solutions' },
    { label: 'Products', href: '#products' },
    { label: 'How we work', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Questions', href: '#faq' },
  ],

  hero: {
    badge: 'AI integration studio · Vijayawada',
    title: ['Your business,', 'connected.'],
    sub: 'Eagle Nexa joins your Tally, online store, WhatsApp and devices into one working system, with AI on top. One view of the business, instead of five tools that never talk.',
  },

  worksWith: ['Tally', 'Shopify', 'WooCommerce', 'WhatsApp Business', 'IoT sensors', 'Your website'],

  solutions: {
    heading: ['One system.', 'Every tool you use.'],
    sub: 'What we build and advise on, joined so the data moves between them on its own.',
    rows: [
      {
        id: 'tally',
        badge: 'Tally + AI',
        tone: 'crimson',
        title: 'Your Tally, finally talking.',
        body: 'Sales and payments flow from Tally into live dashboards, weekly target-versus-actual reports and district-wise views. Ask a question in plain words and get the answer from your own figures.',
        chips: ['Live dashboards', 'Weekly reports', 'Ask in plain words'],
      },
      {
        id: 'whatsapp',
        badge: 'WhatsApp',
        tone: 'green',
        title: 'Reminders that send themselves.',
        body: 'Payment reminders, order updates and campaigns reach customers and dealers on WhatsApp, on the schedule you set. Replies come back to you, and payments are marked in Tally.',
        chips: ['Payment reminders', 'Dealer updates', 'Campaigns'],
      },
      {
        id: 'store',
        badge: 'Shopify · WooCommerce',
        tone: 'amber',
        title: 'Your store, joined to your books.',
        body: 'Online orders raise the invoice in Tally, update stock and tell the customer, in seconds and without anyone copying between screens. We build the website too, with enquiries landing in the same place.',
        chips: ['Order sync', 'Stock updates', 'Websites'],
      },
      {
        id: 'devices',
        badge: 'IoT',
        tone: 'crimson',
        title: 'Devices that report in.',
        body: 'Sensors and connected machines send their readings to one dashboard. When something drifts, such as a cold room warming up, you hear about it on WhatsApp right away.',
        chips: ['Live readings', 'Limits you set', 'WhatsApp alerts'],
      },
      {
        id: 'consult',
        badge: 'IT consultation',
        tone: 'sky',
        title: 'Advice before you spend.',
        body: 'An honest look at the systems you run, what they cost and what is missing. You get a plan in plain words: what to keep, what to connect, what to replace, and in which order.',
        chips: ['Systems review', 'Roadmap', 'Software and vendor choice'],
      },
    ],
  },

  products: {
    heading: ['Our products.', 'Made for how you work.'],
    sub: 'Software we make ourselves, for the businesses we serve.',
    items: [
      {
        id: 'keryo',
        name: 'Keryo',
        status: 'Early access',
        tagline: 'WhatsApp messaging for small businesses',
        body: 'Campaigns, replies and reminders on WhatsApp for businesses across Andhra Pradesh and Telangana, with results you can act on.',
        points: [
          'Campaigns to customers who have agreed to hear from you',
          'One shared inbox for replies, with keyword auto-replies',
          'Reminders on each person’s own date',
          'See who received, read and replied',
          'STOP handled in English, Hindi and Telugu',
        ],
      },
      {
        id: 'insights',
        name: 'Keryo Insights',
        status: 'Pilot',
        tagline: 'Sales intelligence for TallyPrime distributors',
        body: 'A small agent reads your Tally, and the app turns it into targets, district performance, receivables and stock, on your phone. As you connect a CRM, ERP or store, their figures join the same view.',
        points: [
          'Target versus actual, by week, district and product',
          'Receivables and overdue dealers at a glance',
          'Stock and slow movers',
          'Dashboards and reports that work on a phone',
          'One overall view across your Tally, CRM, ERP and store',
          'WhatsApp alerts through Keryo, coming next',
        ],
      },
    ],
    pipeline: {
      heading: 'In the pipeline',
      sub: 'Standalone products that also connect to what you already run, and Keryo Insights brings all of them into one view.',
      items: [
        { name: 'HRMS', body: 'People rules that run across your systems: biometric attendance, approvals on WhatsApp, payroll posted to Tally and payslips sent automatically, so every policy is applied the same way.' },
        { name: 'CRM', body: 'Leads, follow-ups and customer history. Use it on its own, or connect it to the software you already run.' },
        { name: 'ERP', body: 'Purchase, inventory and production. Works standalone, or alongside your existing systems and books.' },
        { name: 'Smart Society', body: 'Gate approvals, visitor passes, maintenance dues and amenity bookings in one app. Gate devices and meters report in by themselves, and AI flags unpaid dues and unusual entries for the committee.' },
      ],
    },
  },

  process: {
    heading: ['From scattered', 'to connected.'],
    sub: 'Most of our clients already run on Tally and WhatsApp. What they lack is the wiring between them.',
    steps: [
      { name: 'Look', body: 'We sit with you and map what you already use: Tally, the store, the WhatsApp groups, the registers, the devices.' },
      { name: 'Connect', body: 'We join those systems so data moves between them on its own. No double entry, no copying between screens.' },
      { name: 'Automate', body: 'Reminders, reports and alerts start running by themselves, on the days and times you choose.' },
      { name: 'Add AI', body: 'Where it helps, AI answers questions about your figures and points out what needs attention. Optional.' },
    ],
  },

  about: {
    heading: 'Built in Vijayawada, for the businesses around it.',
    body: 'We work with owners who run on Tally and WhatsApp today and want the whole picture without hiring a technical team. Advanced technology, delivered in a way you can trust and use every day.',
    audiences: ['Small businesses', 'Dealers and distributors', 'Agents', 'Clinics and health providers', 'Investment agents'],
    values: [
      ['Innovative', 'AI and automation where they save real hours.'],
      ['Reliable', 'Systems that run quietly, every day.'],
      ['Approachable', 'Plain language. No jargon, no lock-in to new software.'],
    ],
  },

  faq: {
    heading: 'Questions',
    items: [
      { q: 'Do we have to stop using Tally?', a: 'No. We work with the Tally you already run. Your team keeps entering bills the way it does today; we read the data and put it to work.' },
      { q: 'Which tools can you connect?', a: 'Tally, Shopify, WooCommerce, WhatsApp, connected devices and your website. If you use something else, ask us and we will tell you plainly whether it can be joined in.' },
      { q: 'Do we need technical staff?', a: 'No. We set the system up. Day to day, reports and alerts arrive where you already look: on WhatsApp and in a simple dashboard.' },
      { q: 'Is the AI part required?', a: 'No. The AI features are optional. The connections, reports, reminders and alerts all work without them.' },
      { q: 'Who do you work with?', a: 'Small businesses, dealers and distributors, agents, clinics and health providers, and investment agents.' },
      { q: 'Where can we meet you?', a: 'At our office: Shop No 4, Mahatma Gandhi Commercial Complex, Mahendra Nagar, Gollapudi, Vijayawada 520012.' },
    ],
  },

  enquiry: {
    heading: ['Let’s connect', 'your business.'],
    sub: 'Tick what you run today. We’ll show you what we would join together, then send us a note.',
    tools: [
      { id: 'tally', label: 'Tally' },
      { id: 'whatsapp', label: 'WhatsApp' },
      { id: 'shopify', label: 'Shopify' },
      { id: 'woocommerce', label: 'WooCommerce' },
      { id: 'iot', label: 'Devices and sensors' },
      { id: 'website', label: 'A website' },
    ],
    // Each connection appears when all the tools it needs are ticked.
    flows: [
      { needs: ['tally', 'whatsapp'], text: 'Overdue bills in Tally become WhatsApp reminders to the dealer.' },
      { needs: ['tally'], text: 'Tally sales turn into a weekly target-versus-actual report.' },
      { needs: ['tally', 'shopify'], text: 'Shopify orders raise the invoice in Tally and update stock.' },
      { needs: ['tally', 'woocommerce'], text: 'WooCommerce orders raise the invoice in Tally and update stock.' },
      { needs: ['shopify', 'whatsapp'], text: 'Shopify customers get order and delivery updates on WhatsApp.' },
      { needs: ['woocommerce', 'whatsapp'], text: 'WooCommerce customers get order and delivery updates on WhatsApp.' },
      { needs: ['iot', 'whatsapp'], text: 'A sensor reading out of range sends you a WhatsApp alert.' },
      { needs: ['iot'], text: 'Device readings collect on one dashboard, with limits you set.' },
      { needs: ['website', 'whatsapp'], text: 'Website enquiries reach WhatsApp the moment they are sent.' },
      { needs: ['whatsapp'], text: 'Campaigns and reminders go to your customer list on schedule.' },
    ],
  },
}
