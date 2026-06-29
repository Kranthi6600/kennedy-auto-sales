export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  category: string;
  img: string;
  author: string;
  authorRole: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Top 5 SUVs Under $40,000 for 2025',
    excerpt: 'We round up the best SUVs that combine value, performance, and reliability — all under $40K.',
    content: [
      'The SUV market has never been more competitive, and 2025 brings an incredible lineup of options for budget-conscious buyers. Whether you need a family hauler, a daily commuter, or something that can handle weekend adventures, there is an SUV under $40,000 that fits the bill.',
      '1. Toyota RAV4 — Starting at $31,500\nThe RAV4 continues to dominate the compact SUV segment. With its proven reliability, excellent fuel economy, and spacious interior, it is easy to see why. The 2.5L engine delivers 203 horsepower while achieving up to 35 MPG on the highway. Toyota Safety Sense 2.0 comes standard, including pre-collision warning, lane departure alert, and adaptive cruise control.',
      '2. Honda CR-V — Starting at $33,200\nThe redesigned CR-V offers a more refined cabin, improved ride quality, and a hybrid powertrain option. The 1.5L turbocharged engine provides a smooth 190 horsepower, while the hybrid variant achieves an impressive 40 MPG combined. Honda Sensing safety suite is standard across all trims.',
      '3. Mazda CX-5 — Starting at $28,700\nFor buyers who prioritize driving dynamics and premium interior quality, the CX-5 is hard to beat. Its 2.5L naturally aspirated engine delivers 187 horsepower, and the available turbo version pushes that to 256. The cabin feels a class above its price point with premium materials throughout.',
      '4. Hyundai Tucson — Starting at $31,200\nThe Tucson stands out with its bold exterior design and tech-forward interior. The standard 2.5L engine produces 187 horsepower, and the available hybrid and plug-in hybrid options offer excellent efficiency. Hyundai industry-leading 10-year/100,000-mile powertrain warranty provides peace of mind.',
      '5. Kia Sportage — Starting at $30,000\nThe Sportage offers the most cargo space in its class, along with a striking design and a comprehensive list of standard features. The 2.5L engine delivers 187 horsepower, and the available X-Line trim adds rugged styling cues for an adventurous look.',
      'When shopping for an SUV under $40,000, consider your priorities: fuel economy, cargo space, technology, or driving dynamics. All five of these options deliver exceptional value, and the best one for you depends on which boxes matter most. Visit Kennedy Auto Sales to test drive any of these vehicles today.',
    ],
    date: 'Jun 15, 2025',
    category: 'Reviews',
    img: '/assets/pexels-mikebirdy-1035108.jpg',
    author: 'Mike Kennedy',
    authorRole: 'Senior Sales Consultant',
    readTime: '6 min read',
  },
  {
    id: 2,
    title: 'How to Get the Best Financing Rate',
    excerpt: 'A step-by-step guide to securing the lowest interest rate on your next auto loan.',
    content: [
      'Financing a vehicle is one of the most significant financial decisions you will make. Getting the best possible interest rate can save you thousands over the life of your loan. Here is a comprehensive guide to help you secure the lowest rate.',
      'Step 1: Check Your Credit Score\nYour credit score is the single biggest factor in determining your interest rate. Scores above 740 typically qualify for the best rates. Before applying, pull your credit report from Equifax or TransUnion and check for errors. If your score is below 700, consider taking a few months to improve it by paying down debt and making all payments on time.',
      'Step 2: Get Pre-Approved\nDo not rely solely on dealership financing. Visit your bank or credit union first to get pre-approved. This gives you a baseline rate to compare against what the dealership offers. Credit unions often offer rates 1-2% lower than traditional banks.',
      'Step 3: Compare Multiple Lenders\nAt Kennedy Auto Sales, we work with 20+ lenders to find you the best rate. Do not be afraid to let lenders compete. When one offers you a rate, ask another if they can beat it. Even a 0.5% difference can save you hundreds over a 5-year loan.',
      'Step 4: Consider Loan Term Carefully\nWhile longer terms (72-84 months) lower your monthly payment, they increase the total interest paid. A 60-month loan at 5% on $30,000 costs $3,968 in interest. An 84-month loan at the same rate costs $5,622. Aim for the shortest term you can comfortably afford.',
      'Step 5: Make a Down Payment\nA down payment of 20% or more reduces the amount you need to finance, which can help you qualify for a better rate. It also prevents you from being upside down on your loan — owing more than the car is worth.',
      'Step 6: Time Your Purchase\nDealerships often offer promotional rates at the end of the month, quarter, or year. Holiday weekends and model-year clearance events are also great times to find special financing offers.',
      'At Kennedy Auto Sales, our financing team works hard to get you the best possible rate regardless of your credit history. Get pre-approved in 60 seconds on our website or visit our showroom to speak with a financing specialist.',
    ],
    date: 'Jun 8, 2025',
    category: 'Financing',
    img: '/assets/pexels-alexander-pollinger-137430820-10475748.jpg',
    author: 'Sarah Chen',
    authorRole: 'Finance Manager',
    readTime: '8 min read',
  },
  {
    id: 3,
    title: 'Electric vs Hybrid: Which Is Right for You?',
    excerpt: 'We break down the pros and cons of EVs and hybrids to help you make the right choice.',
    content: [
      'As Canada moves toward a greener future, more buyers are considering electric and hybrid vehicles. But which is right for you? Let us break down the key differences, benefits, and drawbacks of each.',
      'Understanding the Options\nA hybrid vehicle combines a traditional gas engine with an electric motor. A plug-in hybrid (PHEV) is similar but has a larger battery that can be charged externally, allowing 30-60 km of pure electric driving. A full electric vehicle (EV) runs entirely on electricity with no gas engine.',
      'Hybrid Pros: No range anxiety, lower upfront cost, excellent fuel economy, no charging infrastructure needed. Cons: Still uses gas, higher maintenance than EVs, limited electric-only range.',
      'EV Pros: Zero emissions, lower operating costs, minimal maintenance, instant torque, government incentives up to $5,000. Cons: Higher upfront cost, range limitations on long trips, charging time, battery degradation concerns.',
      'Range Considerations\nThe average Canadian drives 40-60 km per day. Most EVs now offer 350-500 km of range, which is more than enough for daily use. However, if you frequently take long road trips, a hybrid or PHEV may be more practical until charging infrastructure expands further.',
      'Charging at Home\nLevel 1 charging (standard outlet) adds about 8 km of range per hour. Level 2 (240V) adds 30-40 km per hour and requires a dedicated circuit. Installation costs $500-$1,500 but many provincial rebates are available. If you cannot charge at home, public charging becomes essential — and costs add up.',
      'Total Cost of Ownership\nWhile EVs cost more upfront, they save money over time. Electricity costs roughly one-third of gas per kilometer. EVs also require no oil changes, spark plugs, or transmission fluid. Over 5 years, an EV can save $4,000-$6,000 in fuel and maintenance.',
      'The Verdict\nChoose a hybrid if you want excellent fuel economy without changing your habits. Choose a PHEV if your daily commute is under 50 km but you take occasional long trips. Choose an EV if you can charge at home and want the lowest long-term operating costs.',
      'Visit Kennedy Auto Sales to explore our selection of hybrid and electric vehicles, and talk to our team about which option best fits your lifestyle.',
    ],
    date: 'May 30, 2025',
    category: 'Guides',
    img: '/assets/pexels-lumi-fayaz-2162189197-38048842.jpg',
    author: 'James Patel',
    authorRole: 'Product Specialist',
    readTime: '7 min read',
  },
  {
    id: 4,
    title: "Trade-In Tips: Maximize Your Car's Value",
    excerpt: 'Simple steps to boost your trade-in value before bringing your car to the dealership.',
    content: [
      'Trading in your current vehicle is one of the easiest ways to reduce the cost of your next purchase. But many sellers leave money on the table by not preparing their car properly. Here are proven tips to maximize your trade-in value.',
      '1. Clean It Inside and Out\nA clean car creates a positive first impression and signals that the vehicle was well cared for. Wash and wax the exterior, clean the wheels, vacuum the interior, wipe down all surfaces, and remove personal items. Consider a professional detail if the car is heavily soiled — it can pay for itself many times over.',
      '2. Fix Small Issues\nReplace burnt-out bulbs, fix minor scratches with touch-up paint, and address small dents. These inexpensive fixes show the appraiser that the car has been maintained. However, do not invest in major repairs — the dealership will likely redo them anyway at wholesale rates.',
      '3. Gather Maintenance Records\nDocumentation of regular oil changes, tire rotations, and scheduled maintenance proves the vehicle was cared for. Organized records can add $500-$1,000 to your trade-in offer. If you do not have paper records, ask your mechanic to print a service history.',
      '4. Know Your Car Value\nResearch your vehicle value on Canadian Black Book and AutoTrader before visiting the dealership. This gives you a realistic expectation and helps you negotiate. Remember that trade-in values are typically 10-15% below retail prices, as the dealership needs to recondition and resell the vehicle.',
      '5. Time It Right\nVehicles depreciate over time, so trading in sooner rather than later generally yields a higher value. Convertibles and sports cars sell best in spring and summer. SUVs and trucks command premium prices in fall and winter. Timing your trade-in with seasonal demand can add hundreds to your offer.',
      '6. Be Honest About Condition\nDo not hide accident history, mechanical issues, or warning lights. Dealerships run vehicle history reports and inspect every trade-in. Being upfront builds trust and prevents the offer from being reduced after the inspection.',
      '7. Consider Selling Privately\nWhile trading in is convenient, selling privately can net $1,000-$3,000 more. However, it requires time, effort, and dealing with potential buyers. If convenience matters more than maximizing value, trading in is the right choice.',
      'At Kennedy Auto Sales, we offer instant, no-obligation trade-in appraisals. Our process is transparent, and we guarantee the highest market value for your vehicle. Get an online estimate today or visit our showroom for an in-person appraisal.',
    ],
    date: 'May 22, 2025',
    category: 'Tips',
    img: '/assets/pexels-alshreef-29883933.jpg',
    author: 'Mike Kennedy',
    authorRole: 'Senior Sales Consultant',
    readTime: '5 min read',
  },
  {
    id: 5,
    title: 'Winter Tires 101: When and Why to Switch',
    excerpt: 'Everything you need to know about winter tires and staying safe on Canadian roads.',
    content: [
      'Canadian winters are unforgiving, and the right tires can mean the difference between a safe commute and a dangerous accident. Here is everything you need to know about winter tires.',
      'Why Winter Tires Matter\nWinter tires are not just about snow. They are made from a softer rubber compound that stays flexible below 7°C, providing better grip on cold, dry pavement. All-season tires harden in cold temperatures, reducing traction significantly. Winter tires also have deeper treads and more siping (small slits) to channel snow and slush away from the contact patch.',
      'When to Switch\nThe general rule is to install winter tires when temperatures consistently drop below 7°C — typically late October or early November in most of Canada. Remove them when temperatures stay above 7°C in the spring, usually around April. Waiting too long in spring causes the softer compound to wear faster on warm pavement.',
      'Do I Need Four Winter Tires?\nYes, always install four winter tires, not just two on the drive wheels. Mixing winter and all-season tires creates uneven grip front-to-rear, which can cause unpredictable handling — especially in emergency maneuvers. Four matching winter tires provide balanced traction for acceleration, braking, and cornering.',
      'Studded vs Non-Studded\nStudded tires provide superior grip on ice but are noisier and can damage roads. They are legal in most Canadian provinces from October to April. Non-studded winter tires use advanced rubber compounds and tread designs to grip ice without studs. For most urban drivers, non-studded tires are the better choice.',
      'Winter Tire Myths\nMyth: "I have AWD, so I do not need winter tires." Fact: AWD helps you accelerate but does not help you stop or turn. Winter tires improve braking distance by up to 30% compared to all-seasons.\nMyth: "All-season tires are fine for winter." Fact: All-season tires are a compromise that performs poorly in temperatures below 7°C.\nMyth: "Winter tires wear out faster." Fact: When used in the right season, winter tires wear at the same rate as all-seasons.',
      'Insurance Benefits\nMany insurance providers offer discounts of 5-10% for using winter tires. Check with your provider to see if you qualify. In some provinces, winter tire use is mandatory during certain months.',
      'Storage Tips\nWhen storing off-season tires, keep them in a cool, dry place away from sunlight. Tire storage bags prevent ozone degradation. Avoid stacking tires on concrete for extended periods — use a tire rack or stand them upright.',
      'At Kennedy Auto Sales, our service center offers winter tire installation, storage, and balancing. Book your appointment early to avoid the fall rush.',
    ],
    date: 'May 10, 2025',
    category: 'Guides',
    img: '/assets/pexels-svonhorst-2920064.jpg',
    author: 'James Patel',
    authorRole: 'Product Specialist',
    readTime: '6 min read',
  },
  {
    id: 6,
    title: 'The Kennedy Auto 150-Point Inspection Explained',
    excerpt: 'What our certified technicians check before a vehicle earns the Kennedy Auto seal.',
    content: [
      'Every certified pre-owned vehicle at Kennedy Auto Sales undergoes a rigorous 150-point inspection. But what exactly do we check? Here is an inside look at our process.',
      'Why 150 Points?\nA thorough inspection protects both the buyer and the dealership. It ensures that every vehicle we sell meets our standards for safety, reliability, and value. Our 150-point checklist covers every major system and component, from the engine to the upholstery.',
      'Engine and Transmission (35 points)\nOur technicians check compression, oil pressure, coolant condition, transmission fluid quality, belt and hose condition, and exhaust system integrity. We road test every vehicle to evaluate acceleration, shifting, braking, and handling under real-world conditions.',
      'Safety Systems (30 points)\nThis includes brake pad thickness, rotor condition, ABS function, airbag system diagnostics, tire tread depth and age, suspension components, steering linkage, and headlight alignment. Every safety system must pass completely — no exceptions.',
      'Electrical and Electronics (25 points)\nWe test the battery, alternator, starter, all lighting, power windows, locks, mirrors, infotainment system, climate control, backup camera, and all driver assistance features. A diagnostic scan checks for any stored error codes in the ECU.',
      'Body and Exterior (20 points)\nOur team inspects for previous accident damage, panel alignment, paint condition, glass condition, door and trunk seals, undercarriage rust, and frame integrity. Any cosmetic issues are documented and addressed.',
      'Interior (20 points)\nWe check seat condition, carpet, headliner, dashboard functionality, odor, cleanliness, and all interior features. Every vehicle is professionally detailed before hitting the lot.',
      'Fluids and Filters (10 points)\nOil and filter change, coolant flush if needed, brake fluid check, power steering fluid, transmission fluid, and cabin air filter replacement are all part of the process.',
      'Tires and Wheels (10 points)\nWe measure tread depth on all four tires, check for uneven wear patterns, inspect wheels for damage, and ensure proper torque. Tires with less than 4/32" tread are replaced.',
      'What Happens If Something Fails?\nIf any point fails inspection, the issue is repaired or the component is replaced using OEM parts. If a major system cannot be brought to standard, the vehicle does not earn our certified seal and is sold as-is with full disclosure.',
      'The Kennedy Auto Guarantee\nEvery certified pre-owned vehicle comes with a 30-day exchange policy, extended warranty options, and a free first service. Our 150-point inspection is your assurance that the vehicle you drive home is ready for the road ahead.',
    ],
    date: 'Apr 28, 2025',
    category: 'Dealership',
    img: '/assets/pexels-burak-karagoz-663432887-17746219.jpg',
    author: 'Sarah Chen',
    authorRole: 'Finance Manager',
    readTime: '7 min read',
  },
];

export function getPostById(id: number): BlogPost | undefined {
  return blogPosts.find((p) => p.id === id);
}

export function getRelatedPosts(currentId: number, limit: number = 3): BlogPost[] {
  return blogPosts.filter((p) => p.id !== currentId).slice(0, limit);
}
