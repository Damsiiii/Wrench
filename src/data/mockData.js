// Market Benchmark Data & Price Reasonableness Explanations
export const MARKET_BENCHMARKS = [
  {
    id: 'mb-1',
    category: 'Electrician',
    taskName: '200A Main Breaker Box Upgrade',
    avgPrice: 1850,
    priceRange: [1500, 2400],
    unit: 'project',
    breakdown: {
      labor: '60% ($1,110)',
      materials: '30% ($555)',
      permitsAndInspections: '10% ($185)',
    },
    whyReasonable:
      'Replacing a 200A service panel requires a master electrician license, utility coordination, city permit fees ($150-$250), heavy 2/0 copper/aluminum wiring, and 4-8 hours of meticulous installation to comply with National Electrical Code (NEC).'
  },
  {
    id: 'mb-2',
    category: 'Plumber',
    taskName: 'Main Sewer Line Hydro-Jetting & Drain Clearing',
    avgPrice: 420,
    priceRange: [300, 650],
    unit: 'job',
    breakdown: {
      equipmentAndDepreciation: '40% ($168)',
      laborAndExpertise: '45% ($189)',
      disposalAndSanitation: '15% ($63)',
    },
    whyReasonable:
      'Commercial hydro-jetters deliver 4,000 PSI water pressure to scour tree roots and heavy grease without replacing pipes. High equipment maintenance costs ($30,000+ jetter rig) and biohazard disposal standards factor into this price.'
  },
  {
    id: 'mb-3',
    category: 'Handyman',
    taskName: 'TV Wall Mounting (55"-75") with Concealed Wire Channel',
    avgPrice: 145,
    priceRange: [110, 210],
    unit: 'task',
    breakdown: {
      labor: '70% ($101.50)',
      hardwareAndAnchors: '20% ($29)',
      travelAndTools: '10% ($14.50)',
    },
    whyReasonable:
      'Includes precision stud-scanning, heavy-duty toggle bolt installation for drywall or brick, in-wall wire concealment tubing, and leveling testing to protect $1,000+ televisions.'
  },
  {
    id: 'mb-4',
    category: 'HVAC Tech',
    taskName: 'AC Capacitor Replacement & Refrigerant Top-Up',
    avgPrice: 280,
    priceRange: [200, 420],
    unit: 'service',
    breakdown: {
      partCost: '25% ($70)',
      epaCertifiedLabor: '55% ($154)',
      refrigerantR410A: '20% ($56)',
    },
    whyReasonable:
      'Working with high-voltage 440V dual capacitors and pressurized R-410A refrigerant requires EPA 608 certification, vacuum recovery pump usage, and leak testing.'
  },
  {
    id: 'mb-5',
    category: 'Painter',
    taskName: 'Interior Room Painting (12ft x 15ft with Trim)',
    avgPrice: 550,
    priceRange: [400, 800],
    unit: 'room',
    breakdown: {
      premiumPaintAndPrimer: '35% ($192.50)',
      prepAndSandingLabor: '50% ($275)',
      tapeAndProtection: '15% ($82.50)',
    },
    whyReasonable:
      'Covers 2 coats of low-VOC premium paint, wall patching/sanding, floor masking with heavy canvas drop cloths, and double-cut trim lines requiring 6-8 total man-hours.'
  },
  {
    id: 'mb-6',
    category: 'Locksmith',
    taskName: 'Smart Lock Installation & Keypad Re-Keying',
    avgPrice: 160,
    priceRange: [120, 240],
    unit: 'door',
    breakdown: {
      laborAndCalibration: '65% ($104)',
      travelServiceCall: '25% ($40)',
      consumablesAndKeys: '10% ($16)',
    },
    whyReasonable:
      'Ensures deadbolt bore alignment, door frame strike plate reinforcement, Wi-Fi smart lock pairing, and precision re-keying to match existing house master keys.'
  }
];

// Initial Posted Jobs with Contractor Bids
export const INITIAL_JOBS = [
  {
    id: 'job-101',
    title: 'Recessed LED Lighting Installation in Living Room (6 Lights)',
    category: 'Electrician',
    postedBy: 'Sarah M.',
    location: 'Austin, TX (78704)',
    postedTime: '2 hours ago',
    urgent: true,
    status: 'open',
    description:
      'Looking for a licensed electrician to install 6 ultra-slim dimmable LED recessed lights in our 20x15 living room. Attic access is available directly above. Need new wall dimmer switch installed as well.',
    targetBudget: 600,
    avgMarketBenchmark: 680,
    photos: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800'
    ],
    bids: [
      {
        id: 'bid-1',
        contractorId: 'c1',
        contractorName: 'SparkCraft Electric',
        contractorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
        badge: 'Master Licensed',
        rating: 4.9,
        jobsCompleted: 142,
        amount: 580,
        laborHours: 4,
        partsCost: 140,
        calloutFee: 40,
        proposedTimeline: 'Tomorrow at 9:00 AM',
        bidExplanation:
          'Our $580 bid is $100 below local average because we purchase Commercial Lutron LED wafer packs in bulk. Includes 6 ultra-slim 5000K daylight/warm LEDs, Lutron Diva Dimmer, attic wire fishing, and full clean-up.',
        status: 'pending'
      },
      {
        id: 'bid-2',
        contractorId: 'c2',
        contractorName: 'VoltPros Electrical LLC',
        contractorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
        badge: 'Insured & Bonded',
        rating: 4.8,
        jobsCompleted: 88,
        amount: 640,
        laborHours: 3.5,
        partsCost: 180,
        calloutFee: 50,
        proposedTimeline: 'Thursday at 2:00 PM',
        bidExplanation:
          'Includes high-end Halo LED fixtures with 5CCT color selector switch so you can change warmth anytime. Includes 2-year warranty on labor and materials.',
        status: 'pending'
      }
    ]
  },
  {
    id: 'job-102',
    title: 'Kitchen Sink Garbage Disposal Replacement & Leak Repair',
    category: 'Plumber',
    postedBy: 'David K.',
    location: 'Dallas, TX (75201)',
    postedTime: '5 hours ago',
    urgent: false,
    status: 'open',
    description:
      'Current Badger 5 1/2 HP disposal is leaking from the bottom casing. Need it removed and replaced with a quiet 3/4 HP InSinkErator model, plus new PVC p-trap connection.',
    targetBudget: 320,
    avgMarketBenchmark: 380,
    photos: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800'
    ],
    bids: [
      {
        id: 'bid-3',
        contractorId: 'c3',
        contractorName: 'FlowMaster Plumbing',
        contractorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        badge: 'Master Plumber',
        rating: 5.0,
        jobsCompleted: 215,
        amount: 310,
        laborHours: 2,
        partsCost: 150,
        calloutFee: 30,
        proposedTimeline: 'Same-Day (5:00 PM today)',
        bidExplanation:
          'Bid matches target budget. We carry InSinkErator Evolution Compact 3/4 HP disposals in stock. Includes new dishwasher drain connector and stainless sink flange.',
        status: 'pending'
      }
    ]
  },
  {
    id: 'job-103',
    title: 'Assemble IKEA Pax 3-Door Wardrobe with Glass Drawers',
    category: 'Handyman',
    postedBy: 'Elena R.',
    location: 'Houston, TX (77002)',
    postedTime: '1 day ago',
    urgent: false,
    status: 'open',
    description:
      'Need experienced handyman to assemble 2.3m Pax frame with sliding glass doors, 4 internal drawers, and top LED lighting strip. Must bring own tools.',
    targetBudget: 220,
    avgMarketBenchmark: 260,
    photos: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800'
    ],
    bids: [
      {
        id: 'bid-4',
        contractorId: 'c4',
        contractorName: 'FixIt Express Handyman',
        contractorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
        badge: 'Top Assembly Pro',
        rating: 4.9,
        jobsCompleted: 310,
        amount: 195,
        laborHours: 3,
        partsCost: 15,
        calloutFee: 20,
        proposedTimeline: 'Saturday Morning (10:00 AM)',
        bidExplanation:
          'Assembled over 80+ PAX systems. I anchor the frame securely to wall studs to prevent tipping, align all sliding glass doors perfectly, and wire up the lighting.',
        status: 'pending'
      }
    ]
  }
];
