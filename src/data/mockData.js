export const CATEGORIES = [
  {
    id: 'electrician',
    name: 'Electrician',
    icon: 'Zap',
    description: 'Wiring, outlets, lighting, circuit panels, EV chargers',
    popularTasks: ['Fix Outlet', 'Install Light Fixture', 'Panel Upgrade', 'EV Charger Setup'],
    color: 'bg-amber-500',
    lightBg: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    id: 'plumber',
    name: 'Plumber',
    icon: 'Droplets',
    description: 'Pipes, leaks, drain cleaning, water heaters, toilet repair',
    popularTasks: ['Unclog Drain', 'Fix Leaking Tap', 'Toilet Repair', 'Water Heater Service'],
    color: 'bg-blue-500',
    lightBg: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: 'handyman',
    name: 'Handyman & Assembly',
    icon: 'Wrench',
    description: 'Furniture assembly, TV mounting, drywall repair, small fixes',
    popularTasks: ['Mount TV', 'Furniture Assembly', 'Hang Mirrors/Art', 'Door Repair'],
    color: 'bg-emerald-500',
    lightBg: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    id: 'painter',
    name: 'Painter & Decorator',
    icon: 'Paintbrush',
    description: 'Interior wall painting, accent walls, exterior touchups',
    popularTasks: ['Paint Single Room', 'Wall Touch-up', 'Cabinet Painting', 'Wallpapering'],
    color: 'bg-purple-500',
    lightBg: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  {
    id: 'locksmith',
    name: 'Locksmith & Security',
    icon: 'KeyRound',
    description: 'Emergency lockout, lock rekeying, smart lock installation',
    popularTasks: ['Emergency Lockout', 'Change Door Locks', 'Smart Lock Setup', 'Key Copying'],
    color: 'bg-rose-500',
    lightBg: 'bg-rose-50 text-rose-700 border-rose-200'
  },
  {
    id: 'cleaner',
    name: 'Cleaning Services',
    icon: 'Sparkles',
    description: 'Deep house cleaning, move-in/out, carpet cleaning',
    popularTasks: ['Deep Clean', 'Move-out Clean', 'Carpet Wash', 'Window Cleaning'],
    color: 'bg-teal-500',
    lightBg: 'bg-teal-50 text-teal-700 border-teal-200'
  },
  {
    id: 'hvac',
    name: 'HVAC & Heating',
    icon: 'Wind',
    description: 'Air conditioning, furnace repair, duct cleaning, thermostat setup',
    popularTasks: ['AC Tune-up', 'Thermostat Install', 'Heater Repair', 'Filter Replacement'],
    color: 'bg-cyan-500',
    lightBg: 'bg-cyan-50 text-cyan-700 border-cyan-200'
  },
  {
    id: 'appliance',
    name: 'Appliance Repair',
    icon: 'Refrigerator',
    description: 'Washing machines, dishwashers, fridges, ovens',
    popularTasks: ['Washing Machine Fix', 'Dishwasher Leak', 'Fridge Cooling Issue', 'Oven Repair'],
    color: 'bg-indigo-500',
    lightBg: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  }
];

export const QUICK_SERVICES = [
  {
    id: 'quick-1',
    title: 'Unclog Drain & Sink',
    category: 'plumber',
    estPrice: 75,
    duration: '1-2 hrs',
    icon: 'Droplets',
    description: 'Fast clearance of blocked kitchen or bathroom drains using professional augers.'
  },
  {
    id: 'quick-2',
    title: 'TV Wall Mounting',
    category: 'handyman',
    estPrice: 65,
    duration: '1 hr',
    icon: 'Tv',
    description: 'Secure wall mounting up to 85 inches, including wire management and bracket alignment.'
  },
  {
    id: 'quick-3',
    title: 'Replace Light Switch / Socket',
    category: 'electrician',
    estPrice: 50,
    duration: '45 mins',
    icon: 'Zap',
    description: 'Safe replacement or upgrade of standard switches, dimmers, or wall outlets.'
  },
  {
    id: 'quick-4',
    title: 'Emergency Door Lockout',
    category: 'locksmith',
    estPrice: 90,
    duration: '30 mins',
    icon: 'KeyRound',
    description: 'Quick non-destructive entry service for home or office lockouts within 30 minutes.'
  },
  {
    id: 'quick-5',
    title: 'IKEA / Flatpack Assembly',
    category: 'handyman',
    estPrice: 55,
    duration: '1-3 hrs',
    icon: 'Box',
    description: 'Professional assembly of desks, beds, wardrobes, and modular shelving.'
  },
  {
    id: 'quick-6',
    title: 'Smart Thermostat Setup',
    category: 'hvac',
    estPrice: 80,
    duration: '1 hr',
    icon: 'Thermometer',
    description: 'Installation and app setup for Nest, Ecobee, or Honeywell smart thermostats.'
  }
];

export const PROVIDERS = [
  {
    id: 'p1',
    name: 'Alex Vance',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    category: 'electrician',
    title: 'Master Licensed Electrician',
    rating: 4.9,
    reviewCount: 142,
    hourlyRate: 65,
    minCalloutFee: 45,
    location: 'Downtown Area (3.2 miles away)',
    verified: true,
    badges: ['Top Rated 2025', 'Background Checked', 'Licensed & Insured'],
    yearsExp: 11,
    completedJobs: 480,
    responseTime: '< 15 mins',
    availability: 'Available Today',
    bio: 'Over a decade of residential and commercial electrical experience. Specializing in EV charger installation, circuit upgrades, recessed lighting, and urgent electrical trouble-shooting.',
    specialties: ['EV Chargers', 'Panel Upgrades', 'Smart Home Wiring', 'Lighting Installation', 'Troubleshooting'],
    reviews: [
      { id: 'r1', author: 'Sarah M.', rating: 5, date: '3 days ago', comment: 'Alex came within an hour when our main circuit breaker kept tripping. Super professional, solved the short circuit quickly and explained everything clearly!' },
      { id: 'r2', author: 'David K.', rating: 5, date: '1 week ago', comment: 'Installed a Level 2 Tesla charger in my garage. Clean conduit work and great price.' }
    ]
  },
  {
    id: 'p2',
    name: 'Marcus Thorne',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    category: 'plumber',
    title: 'Master Plumber & Pipe Specialist',
    rating: 4.95,
    reviewCount: 218,
    hourlyRate: 70,
    minCalloutFee: 50,
    location: 'Westside & Suburbs (2.1 miles away)',
    verified: true,
    badges: ['24/7 Emergency Pro', 'Licensed Master Plumber', 'Top Rated'],
    yearsExp: 14,
    completedJobs: 620,
    responseTime: '< 10 mins',
    availability: 'Available Today (24/7)',
    bio: 'Emergency plumbing & routine maintenance expert. Hydro-jetting, leak detection, water heater repairs & replacements, and drain unblocking.',
    specialties: ['Drain Cleaning', 'Water Heaters', 'Leak Detection', 'Pipe Replacement', 'Toilet & Sink Repair'],
    reviews: [
      { id: 'r3', author: 'Michael R.', rating: 5, date: 'Yesterday', comment: 'Saved us from a major burst pipe emergency late at night! Arrived in 20 minutes with full equipment.' },
      { id: 'r4', author: 'Elena G.', rating: 5, date: '2 weeks ago', comment: 'Replaced our old tankless water heater efficiently. Very respectful of our home and left everything spotless.' }
    ]
  },
  {
    id: 'p3',
    name: 'Carlos Mendez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    category: 'handyman',
    title: 'Multi-Skilled Home Repair & Builder',
    rating: 4.88,
    reviewCount: 185,
    hourlyRate: 48,
    minCalloutFee: 35,
    location: 'Central & East Side (1.5 miles away)',
    verified: true,
    badges: ['Great Value', 'Background Checked', 'Fast Worker'],
    yearsExp: 8,
    completedJobs: 390,
    responseTime: '< 20 mins',
    availability: 'Available Today',
    bio: 'Friendly, versatile handyman for all those small jobs around the home: furniture assembly, drywall patching, TV wall mounting, shelf fitting, and minor carpentry.',
    specialties: ['TV Mounting', 'IKEA Assembly', 'Drywall Repair', 'Door Fixtures', 'Curtains & Blinds'],
    reviews: [
      { id: 'r5', author: 'Jessica B.', rating: 5, date: '4 days ago', comment: 'Mounted 2 TVs and built a massive wardrobe. Super fast, friendly, and brought all his own heavy-duty hardware.' }
    ]
  },
  {
    id: 'p4',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    category: 'electrician',
    title: 'Certified Residential Electrical Tech',
    rating: 4.82,
    reviewCount: 88,
    hourlyRate: 58,
    minCalloutFee: 40,
    location: 'North District (4.5 miles away)',
    verified: true,
    badges: ['Certified Tech', 'Punctual Guarantee'],
    yearsExp: 6,
    completedJobs: 210,
    responseTime: '< 30 mins',
    availability: 'Available Tomorrow',
    bio: 'Specializing in home lighting designs, smart switches, chandelier ceiling mounts, and safety inspections.',
    specialties: ['Recessed Lighting', 'Smart Switches', 'Safety Audits', 'Ceiling Fans'],
    reviews: [
      { id: 'r6', author: 'Tom S.', rating: 5, date: '5 days ago', comment: 'Elena installed 8 dimmable recessed lights in our living room. Outcome looks high-end studio quality!' }
    ]
  },
  {
    id: 'p5',
    name: 'Viktor Novak',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    category: 'locksmith',
    title: 'Security Specialist & Master Locksmith',
    rating: 4.98,
    reviewCount: 130,
    hourlyRate: 62,
    minCalloutFee: 45,
    location: 'Metropolitan Area (1.8 miles away)',
    verified: true,
    badges: ['Emergency Lockout', 'Licensed & Insured'],
    yearsExp: 12,
    completedJobs: 510,
    responseTime: '< 15 mins',
    availability: 'Available Today (24/7)',
    bio: 'Fast emergency lockout service, high-security lock upgrades, deadbolt rekeying, and smart keypad lock installations.',
    specialties: ['Emergency Lockout', 'Smart Deadbolts', 'Lock Rekeying', 'Security Systems'],
    reviews: [
      { id: 'r7', author: 'Amanda P.', rating: 5, date: 'Yesterday', comment: 'I was locked out at 10 PM. Viktor arrived in 15 minutes and opened the door without damaging the lock. A lifesaver!' }
    ]
  },
  {
    id: 'p6',
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    category: 'painter',
    title: 'Interior Painting & Wall Specialist',
    rating: 4.91,
    reviewCount: 156,
    hourlyRate: 52,
    minCalloutFee: 80,
    location: 'South District (3.8 miles away)',
    verified: true,
    badges: ['Clean Work Guarantee', 'Top Rated'],
    yearsExp: 9,
    completedJobs: 310,
    responseTime: '< 25 mins',
    availability: 'Available This Week',
    bio: 'Precision interior painting with eco-friendly zero-VOC paints. Accent walls, cabinet refinishing, trim and door painting.',
    specialties: ['Interior Walls', 'Cabinet Painting', 'Accent Walls', 'Plaster Repair'],
    reviews: [
      { id: 'r8', author: 'Rachel C.', rating: 5, date: '1 week ago', comment: 'Sarah painted our entire 3-bedroom interior in 3 days. Clean edges, no drips, and zero smell. Outstanding!' }
    ]
  },
  {
    id: 'p7',
    name: 'Robert Sterling',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    category: 'hvac',
    title: 'HVAC Specialist & Climate Tech',
    rating: 4.87,
    reviewCount: 95,
    hourlyRate: 75,
    minCalloutFee: 60,
    location: 'East Side (5.0 miles away)',
    verified: true,
    badges: ['EPA Certified', 'HVAC Master'],
    yearsExp: 15,
    completedJobs: 440,
    responseTime: '< 20 mins',
    availability: 'Available Today',
    bio: 'AC diagnostic & repair, furnace servicing, heat pump maintenance, smart thermostat retrofitting.',
    specialties: ['AC Diagnostics', 'Furnace Repair', 'Duct Inspection', 'Smart Thermostats'],
    reviews: [
      { id: 'r9', author: 'Brian H.', rating: 5, date: '2 weeks ago', comment: 'Fixed our AC in the middle of a heatwave! Fast diagnostic and replaced a bad capacitor right away.' }
    ]
  },
  {
    id: 'p8',
    name: 'Jessica Albright',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    category: 'appliance',
    title: 'Appliance Repair Technician',
    rating: 4.86,
    reviewCount: 104,
    hourlyRate: 55,
    minCalloutFee: 40,
    location: 'Central Area (2.8 miles away)',
    verified: true,
    badges: ['Factory Trained', 'Genuine Parts'],
    yearsExp: 7,
    completedJobs: 280,
    responseTime: '< 30 mins',
    availability: 'Available Today',
    bio: 'Expert repair for major brand washers, dryers, dishwashers, refrigerators, and ovens. Stocked with common replacement parts.',
    specialties: ['Washing Machines', 'Refrigerators', 'Dishwashers', 'Ovens & Stoves'],
    reviews: [
      { id: 'r10', author: 'Daniel W.', rating: 5, date: '3 days ago', comment: 'Diagnosed why our dishwasher was leaking within 10 minutes. Replaced the door seal on the spot.' }
    ]
  }
];

export const MOCK_BOOKINGS = [
  {
    id: 'BK-1001',
    providerId: 'p2',
    providerName: 'Marcus Thorne',
    providerTitle: 'Master Plumber',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    category: 'plumber',
    serviceTitle: 'Fix Leaking Kitchen Pipe & Sink Drain',
    scheduledDate: '2025-03-05',
    scheduledTime: '10:00 AM - 12:00 PM',
    address: '742 Evergreen Terrace, Springfield',
    status: 'Confirmed',
    totalEstimated: '$120.00',
    notes: 'Under-sink water pooling whenever water runs.',
    createdAt: '2025-03-01'
  },
  {
    id: 'BK-1002',
    providerId: 'p1',
    providerName: 'Alex Vance',
    providerTitle: 'Master Licensed Electrician',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    category: 'electrician',
    serviceTitle: 'Living Room Ceiling Fan & Smart Switch Setup',
    scheduledDate: '2025-02-24',
    scheduledTime: '02:00 PM - 04:00 PM',
    address: '742 Evergreen Terrace, Springfield',
    status: 'Completed',
    totalEstimated: '$150.00',
    notes: 'Replaced existing chandelier with ceiling fan.',
    createdAt: '2025-02-20'
  }
];
