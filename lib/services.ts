export interface Service {
  slug: string;
  icon: string;
  title: string;
  desc: string;
  points: string[];
  longDesc: string;
  features: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: 'financing-leasing',
    icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z',
    title: 'Financing &amp; Leasing',
    desc: 'Get pre-approved in 60 seconds. We work with 20+ lenders to find you the best rate — regardless of credit history.',
    points: ['Rates from 4.99% APR', 'Bad credit? No problem', 'Flexible 24-84 month terms'],
    longDesc: 'At Kennedy Auto Sales, we believe financing should be simple, transparent, and accessible to everyone. Our dedicated finance team works with over 20 lenders — including major banks, credit unions, and sub-prime specialists — to secure the best possible rate for your situation. Whether you have excellent credit or are rebuilding, we have options for you. Our online pre-approval process takes just 60 seconds and won\'t affect your credit score.',
    features: [
      { title: '60-Second Pre-Approval', desc: 'Apply online with no impact on your credit score. Get instant conditional approval.' },
      { title: '20+ Lender Network', desc: 'We shop your application across banks, credit unions, and specialty lenders to find the best rate.' },
      { title: 'Flexible Terms', desc: 'Choose from 24 to 84 month terms with options for $0 down on qualified vehicles.' },
      { title: 'Credit Rebuilding', desc: 'Bad credit or no credit? We specialize in helping you get approved and rebuild your credit.' },
    ],
    faqs: [
      { q: 'Will applying affect my credit score?', a: 'No. Our pre-approval uses a soft credit check that does not impact your score. A hard check only happens once you proceed with a specific lender.' },
      { q: 'What interest rate can I expect?', a: 'Rates start from 4.99% APR for well-qualified buyers. Your actual rate depends on your credit profile, loan term, and vehicle selection.' },
      { q: 'Can I get financing with bad credit?', a: 'Yes. We work with sub-prime lenders who specialize in credit rebuilding. Many of our customers get approved even after bankruptcy or consumer proposals.' },
      { q: 'Is there a down payment required?', a: 'Not always. $0 down is available on qualified vehicles for well-qualified buyers. A down payment may be required depending on credit and vehicle choice.' },
    ],
  },
  {
    slug: 'trade-in-valuation',
    icon: 'M3 3h18v18H3z M3 9h18 M9 21V9',
    title: 'Trade-In Valuation',
    desc: 'Get an instant, no-obligation offer for your current vehicle. Put the value toward your next purchase.',
    points: ['Instant online appraisal', 'Highest market value guaranteed', 'No purchase required'],
    longDesc: 'Thinking about upgrading? Our trade-in valuation service gives you a fair, transparent offer for your current vehicle in minutes. We use real-time market data and comparable sales to ensure you get the highest possible value. There\'s no obligation to buy — you can take the offer as cash or apply it toward any vehicle in our inventory.',
    features: [
      { title: 'Instant Online Appraisal', desc: 'Enter your vehicle details and get a no-obligation offer in under 2 minutes.' },
      { title: 'Highest Market Value', desc: 'We guarantee the highest market value for your trade. If you find a better written offer, we\'ll beat it.' },
      { title: 'No Purchase Required', desc: 'You can sell us your vehicle outright or trade it in. Either way, the offer is the same.' },
      { title: 'Hassle-Free Process', desc: 'We handle all the paperwork, lien payouts, and ownership transfers. You just drop off the keys.' },
    ],
    faqs: [
      { q: 'How long is the offer valid?', a: 'Our trade-in offers are valid for 7 days. Market values can fluctuate, so we recommend acting quickly.' },
      { q: 'What if I still owe money on my car?', a: 'No problem. We\'ll pay off your existing loan directly and apply any remaining equity toward your new purchase or as cash to you.' },
      { q: 'Do you accept all vehicles?', a: 'We accept most vehicles regardless of age, mileage, or condition. Even if your car doesn\'t run, we may still make an offer.' },
    ],
  },
  {
    slug: 'test-drive-booking',
    icon: 'M12 2v20 M2 12h20',
    title: 'Test Drive Booking',
    desc: 'Schedule a test drive at your convenience — at our showroom or your driveway. Same-day appointments available.',
    points: ['Home test drives available', 'Same-day scheduling', 'No pressure, no obligation'],
    longDesc: 'The best way to know if a vehicle is right for you is to get behind the wheel. We offer flexible test drive options — visit our showroom, or we\'ll bring the vehicle to your home or office. Same-day appointments are often available. There\'s no pressure and no obligation. Our team is here to answer your questions, not push a sale.',
    features: [
      { title: 'Home Test Drives', desc: 'We bring the vehicle to you anywhere in the GTA. Try it on your own roads, at your own pace.' },
      { title: 'Same-Day Scheduling', desc: 'Need to drive today? Same-day appointments are frequently available. Just call or book online.' },
      { title: 'No Pressure Experience', desc: 'Our product specialists are here to inform, not to sell. Take your time — there\'s no obligation.' },
      { title: 'Extended Test Drives', desc: 'Considering a specific vehicle? Ask about our 24-hour extended test drive program.' },
    ],
    faqs: [
      { q: 'What do I need to bring for a test drive?', a: 'A valid driver\'s license and proof of insurance. That\'s it — no credit check or commitment required.' },
      { q: 'How far will you deliver for a home test drive?', a: 'Free home test drives are available within 50km of our showroom. For longer distances, please contact us for arrangements.' },
      { q: 'Can I test drive multiple vehicles?', a: 'Absolutely. We encourage comparing vehicles. Let us know which ones you\'re interested in and we\'ll have them ready.' },
    ],
  },
  {
    slug: 'free-home-delivery',
    icon: 'M3 17h18 M3 17l3-5h12l3 5 M6 17v3 M18 17v3',
    title: 'Free Home Delivery',
    desc: 'We deliver your new vehicle straight to your door anywhere in the GTA. Complete paperwork online and skip the trip.',
    points: ['Free within 100km', 'Paperwork done remotely', '7-day money-back guarantee'],
    longDesc: 'Why visit a dealership when the dealership can come to you? Our home delivery service brings your new vehicle directly to your door — anywhere in the Greater Toronto Area. All paperwork is completed online or at your kitchen table. And with our 7-day money-back guarantee, you can return the vehicle for any reason, no questions asked.',
    features: [
      { title: 'Free Within 100km', desc: 'Delivery is free within 100km of our showroom. Beyond that? Just a small fuel surcharge.' },
      { title: 'Remote Paperwork', desc: 'Sign everything digitally or in person at delivery. No trip to the dealership required.' },
      { title: '7-Day Money-Back', desc: 'Not in love with your purchase? Return it within 7 days for a full refund. No questions asked.' },
      { title: 'Vehicle Conditioning', desc: 'Every delivered vehicle is professionally detailed, full of fuel, and ready to drive.' },
    ],
    faqs: [
      { q: 'How does the 7-day money-back guarantee work?', a: 'If you\'re not satisfied for any reason within 7 days or 500km, return the vehicle for a full refund. The vehicle must be in the same condition as delivered.' },
      { q: 'What areas do you deliver to?', a: 'Free delivery covers the entire GTA and surrounding areas within 100km. Delivery beyond 100km is available for a small fee.' },
      { q: 'Can someone else receive the delivery on my behalf?', a: 'The registered purchaser must be present to sign final documents at the time of delivery.' },
    ],
  },
  {
    slug: 'certified-pre-owned',
    icon: 'M9 12l2 2 4-4 M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z',
    title: 'Certified Pre-Owned',
    desc: 'Every CPO vehicle undergoes our rigorous 150-point inspection by certified technicians before hitting the lot.',
    points: ['150-point inspection', '30-day exchange policy', 'Extended warranty options'],
    longDesc: 'Peace of mind comes standard with every Kennedy Auto Sales Certified Pre-Owned vehicle. Before any CPO vehicle reaches our lot, it must pass a comprehensive 150-point inspection by our certified technicians. We check everything — from the engine and transmission to the interior trim and tire tread depth. If something doesn\'t meet our standards, we fix it or we don\'t sell it.',
    features: [
      { title: '150-Point Inspection', desc: 'Every system, component, and surface is checked by certified technicians. Nothing is overlooked.' },
      { title: '30-Day Exchange', desc: 'Not the right fit? Exchange your CPO vehicle within 30 days for another in our inventory.' },
      { title: 'Extended Warranty', desc: 'Optional extended coverage up to 5 years/100,000km on major components.' },
      { title: 'Vehicle History Report', desc: 'Every CPO vehicle comes with a free Carfax report showing accident history, liens, and service records.' },
    ],
    faqs: [
      { q: 'What does the 150-point inspection cover?', a: 'It covers all major mechanical systems (engine, transmission, brakes, suspension), electrical components, safety features, interior condition, exterior paint, and tire condition.' },
      { q: 'Is the extended warranty included?', a: 'A basic 30-day powertrain warranty is included. Extended coverage up to 5 years is available for an additional cost.' },
      { q: 'What\'s the difference between used and CPO?', a: 'CPO vehicles pass our 150-point inspection, come with a warranty, and include a vehicle history report. Standard used vehicles are sold as-is.' },
    ],
  },
  {
    slug: 'after-sales-service',
    icon: 'M12 1v6 M12 17v6 M4.22 4.22l4.24 4.24 M15.54 15.54l4.24 4.24 M1 12h6 M17 12h6',
    title: 'After-Sales Service',
    desc: 'Full-service maintenance and repair center with OEM parts, certified mechanics, and transparent pricing.',
    points: ['OEM parts guaranteed', 'Service from $49.99', 'Loaner vehicles available'],
    longDesc: 'Our relationship doesn\'t end when you drive off the lot. Our state-of-the-art service center is staffed by certified mechanics who know your vehicle inside and out. We use only OEM (Original Equipment Manufacturer) parts and stand behind every repair with a 12-month/20,000km warranty. With transparent pricing and online booking, maintaining your vehicle has never been easier.',
    features: [
      { title: 'OEM Parts Guaranteed', desc: 'We use only Original Equipment Manufacturer parts — no aftermarket substitutes.' },
      { title: 'Service From $49.99', desc: 'Basic maintenance starts at just $49.99. Full pricing is provided upfront with no surprises.' },
      { title: 'Loaner Vehicles', desc: 'Need to get to work? Free loaner vehicles are available for repairs over 4 hours.' },
      { title: '12-Month Repair Warranty', desc: 'All repairs are backed by a 12-month/20,000km warranty on parts and labor.' },
    ],
    faqs: [
      { q: 'Do I need an appointment for service?', a: 'Appointments are recommended but not required. Walk-ins are welcome, though wait times may be longer.' },
      { q: 'Do you service all vehicle brands?', a: 'Yes. Our certified technicians are trained to service all makes and models, not just those purchased from us.' },
      { q: 'How long does typical maintenance take?', a: 'Oil changes and basic maintenance take 30-60 minutes. Major repairs will be quoted with an estimated completion time.' },
      { q: 'Is the loaner vehicle free?', a: 'Yes, loaner vehicles are provided free of charge for repairs expected to take more than 4 hours. You just need to provide proof of insurance.' },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
