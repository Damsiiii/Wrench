// Comprehensive Sri Lankan Mock Data matching Wrench UI Reference Boards

export const TOWNS = [
  'Kurunegala',
  'Colombo',
  'Kandy',
  'Gampaha',
  'Mawathagama',
  'Polgahawela',
  'Negombo',
  'Galle'
];

export const CATEGORIES = [
  { id: 'all', name: 'All categories', icon: 'Wrench' },
  { id: 'plumbing', name: 'Plumbing', icon: 'Pipette' },
  { id: 'electrical', name: 'Electrical', icon: 'Zap' },
  { id: 'painting', name: 'Painting', icon: 'Paintbrush' },
  { id: 'carpentry', name: 'Carpentry', icon: 'Hammer' },
  { id: 'appliances', name: 'AC & Appliances', icon: 'Fan' },
  { id: 'masonry', name: 'Masonry', icon: 'Layers' }
];

export const INITIAL_WORKERS = [
  {
    id: 'w-1',
    name: 'Saman Kumara',
    trade: 'Plumbing',
    tradeCategory: 'plumbing',
    town: 'Kurunegala',
    serviceAreas: ['Kurunegala', 'Polgahawela', 'Mawathagama'],
    rating: 4.8,
    reviewsCount: 42,
    profileReviewsCount: 12,
    experience: '6 years experience',
    experienceRange: '5 - 10 years',
    languages: ['Sinhala', 'English'],
    availability: 'Available this week',
    phone: '077 123 4567',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    about:
      'I am a qualified plumber with 6 years of hands-on experience. I do leak repairs, tap fitting, water pump installation and general plumbing work. I take pride in quality work and friendly service.',
    services: ['Leak repairs', 'Tap fitting', 'Water pump installation', 'Pipe repairs', 'General plumbing'],
    previousWork: [
      {
        title: 'Leak repair under basin',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80'
      },
      {
        title: 'Water pump installation',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
      },
      {
        title: 'Tap fitting',
        image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80'
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Kasun Perera',
        town: 'Kurunegala',
        date: '12 Mar 2024',
        rating: 5.0,
        text: 'Great service! Fixed the leaking bathroom pipe quickly and checked other fittings as well. Very professional and friendly. Highly recommended.'
      },
      {
        id: 'rev-2',
        author: 'Nimali Fernando',
        town: 'Mawathagama',
        date: '3 Feb 2024',
        rating: 4.5,
        text: 'Installed a new water pump at our house. Good communication and neat work. Arrived on time and completed the job as discussed.'
      }
    ],
    shortDesc: 'Leaks, pipe repairs, bathroom fittings and more.'
  },
  {
    id: 'w-2',
    name: 'Perera Electrical',
    trade: 'Electrical',
    tradeCategory: 'electrical',
    town: 'Kurunegala',
    serviceAreas: ['Kurunegala', 'Gampaha'],
    rating: 4.7,
    reviewsCount: 36,
    profileReviewsCount: 15,
    experience: '8 years experience',
    experienceRange: '5 - 10 years',
    languages: ['Sinhala', 'English'],
    availability: 'Available tomorrow',
    phone: '076 987 6543',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    about: 'Certified electrician specializing in residential wiring, short circuits, breaker panels, and ceiling fans.',
    services: ['Wiring', 'Lighting', 'Sockets', 'Fan installation', 'Breaker repairs'],
    previousWork: [
      {
        title: 'Ceiling fan mounting',
        image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=600&q=80'
      }
    ],
    reviews: [
      {
        id: 'rev-3',
        author: 'Sunil Weerasinghe',
        town: 'Kurunegala',
        date: '20 Jan 2024',
        rating: 5.0,
        text: 'Punctual, safety-conscious and clean work on our distribution box.'
      }
    ],
    shortDesc: 'Wiring, lighting, sockets, fan installation and electrical repairs.'
  },
  {
    id: 'w-3',
    name: 'Nuwan Fernando',
    trade: 'Painting & decorating',
    tradeCategory: 'painting',
    town: 'Kurunegala',
    serviceAreas: ['Kurunegala', 'Kandy', 'Mawathagama'],
    rating: 4.6,
    reviewsCount: 28,
    profileReviewsCount: 10,
    experience: '5 years experience',
    experienceRange: '5 - 10 years',
    languages: ['Sinhala', 'Tamil'],
    availability: 'Available next week',
    phone: '071 234 5678',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    about: 'Expert interior and exterior painter. Clean edge lines, waterproof coatings, and smooth wall putty finishes.',
    services: ['Interior painting', 'Exterior weather coating', 'Wall putty', 'Wood polish'],
    previousWork: [
      {
        title: 'Living room repaint',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80'
      }
    ],
    reviews: [],
    shortDesc: 'Interior & exterior painting, wall repairs, polishing.'
  },
  {
    id: 'w-4',
    name: 'Chamara Silva',
    trade: 'Carpentry',
    tradeCategory: 'carpentry',
    town: 'Kurunegala',
    serviceAreas: ['Kurunegala', 'Polgahawela'],
    rating: 4.7,
    reviewsCount: 31,
    profileReviewsCount: 14,
    experience: '10+ years experience',
    experienceRange: '10+ years',
    languages: ['Sinhala'],
    availability: 'Available this week',
    phone: '075 678 1234',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    about: 'Master carpenter. Custom wood fittings, door locks, hinges, window sash repairs and wooden roof work.',
    services: ['Door installation', 'Window frame repairs', 'Furniture fixing', 'Roof carpentry'],
    previousWork: [],
    reviews: [],
    shortDesc: 'Doors, windows, furniture, repairs and custom work.'
  },
  {
    id: 'w-5',
    name: 'Tharushi Fernando',
    trade: 'Cleaning & housekeeping',
    tradeCategory: 'cleaning',
    town: 'Kurunegala',
    serviceAreas: ['Kurunegala', 'Mawathagama'],
    rating: 4.5,
    reviewsCount: 24,
    profileReviewsCount: 9,
    experience: '4 years experience',
    experienceRange: '1 - 5 years',
    languages: ['Sinhala', 'English'],
    availability: 'Available today',
    phone: '078 901 2345',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    about: 'Thorough and dependable home cleaner. Move-in deep cleans, kitchen degreasing, bathroom scrubbing.',
    services: ['General cleaning', 'Deep cleaning', 'Kitchen cleanup', 'Move-in cleaning'],
    previousWork: [],
    reviews: [],
    shortDesc: 'Home cleaning, deep cleaning, move-in/out cleaning.'
  },
  {
    id: 'w-6',
    name: 'Lahiru Mendis',
    trade: 'Masonry',
    tradeCategory: 'masonry',
    town: 'Kurunegala',
    serviceAreas: ['Kurunegala', 'Gampaha', 'Colombo'],
    rating: 4.6,
    reviewsCount: 27,
    profileReviewsCount: 11,
    experience: '7 years experience',
    experienceRange: '5 - 10 years',
    languages: ['Sinhala'],
    availability: 'Available this week',
    phone: '070 345 6789',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    about: 'Experienced mason for bricklaying, boundary walls, floor tiling, bathroom waterproofing, and cement plastering.',
    services: ['Floor tiling', 'Wall plastering', 'Brickwork', 'Concrete repairs'],
    previousWork: [],
    reviews: [],
    shortDesc: 'Wall construction, plastering, tiling and general masonry.'
  }
];

export const INITIAL_JOBS = [
  {
    id: 'job-1',
    jobCode: 'Job #J1024',
    title: 'Fix leaking bathroom pipe',
    category: 'Plumbing',
    tradeCategory: 'plumbing',
    town: 'Kurunegala',
    address: '123 Perera Mawatha, Kurunegala 60000',
    budget: 5000,
    status: 'open', // 'open' | 'in_progress' | 'completed'
    postedTime: 'Posted 2 hours ago',
    postedDate: '16 Sep 2026',
    isUrgent: false,
    timing: 'This week',
    materials: 'Please include materials in your quote.',
    additionalDetails: "Bathroom is on the ground floor. You're welcome to ask any questions.",
    description:
      'Water leaking from wash basin pipe. Need someone to fix the leak and check for any other issues. The leak happens even when the tap is fully closed.',
    photos: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80'
    ],
    customer: {
      name: 'Kasun Perera',
      town: 'Kurunegala',
      memberSince: '2026',
      verified: true
    },
    questions: [
      {
        id: 'q-1',
        asker: 'Saman Kumara',
        time: '3 hours ago',
        text: 'Is the pipe under the sink or inside the wall? Do you know if any parts need to be replaced?',
        reply: {
          author: 'Kasun Perera',
          time: '2 hours ago',
          text: "It's the pipe under the sink. It looks like the joint is leaking. You can check and let me know what parts are needed."
        }
      }
    ],
    quotes: [
      {
        id: 'quote-1',
        workerId: 'w-1',
        workerName: 'Saman Kumara',
        workerRating: 4.8,
        workerReviewsCount: 27,
        workerTown: 'Kurunegala',
        workerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        amount: 4500,
        availability: 'Available 18 Sep, morning',
        appointmentDate: '18 Sep 2026 (Friday)',
        appointmentTime: 'Morning (8.00 am - 12.00 pm)',
        includes: 'Includes fixing the leak, checking other joints and testing for leaks.',
        inclusionsDetails: 'Labour and replacement pipe fittings.',
        message: 'Hi Kasun, I can fix the leaking pipe and check for any other issues. Please let me know if you have any questions.',
        status: 'pending',
        recommended: true
      },
      {
        id: 'quote-2',
        workerId: 'w-7',
        workerName: 'Nimal Silva',
        workerRating: 4.6,
        workerReviewsCount: 18,
        workerTown: 'Kurunegala',
        workerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        amount: 5000,
        availability: 'Available 18 Sep, afternoon',
        appointmentDate: '18 Sep 2026 (Friday)',
        appointmentTime: 'Afternoon (1.00 pm - 5.00 pm)',
        includes: 'Includes fixing the leak and basic pipe adjustment.',
        inclusionsDetails: 'Basic inspection and standard sealant replacement.',
        message: 'Hi Kasun, can attend on Friday afternoon and sort it out.',
        status: 'pending'
      },
      {
        id: 'quote-3',
        workerId: 'w-8',
        workerName: 'Ruwan Perera',
        workerRating: 4.7,
        workerReviewsCount: 32,
        workerTown: 'Kurunegala',
        workerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        amount: 4800,
        availability: 'Available 19 Sep, morning',
        appointmentDate: '19 Sep 2026 (Saturday)',
        appointmentTime: 'Morning (8.00 am - 12.00 pm)',
        includes: 'Includes leak repair, replacing washers (if needed) and testing.',
        inclusionsDetails: 'Labour, replacement washers, silicone joint test.',
        message: 'Quality plumbing service, experienced in residential bath lines.',
        status: 'pending'
      }
    ],
    hiredQuote: null
  },
  {
    id: 'job-2',
    jobCode: 'Job #J1022',
    title: 'Install ceiling fan',
    category: 'Electrical',
    tradeCategory: 'electrical',
    town: 'Kurunegala',
    address: '45 Lake View Road, Kurunegala',
    budget: 4000,
    status: 'in_progress',
    postedTime: 'Posted 5 days ago',
    postedDate: '11 Sep 2026',
    isUrgent: false,
    timing: 'Urgent',
    materials: 'Fan provided by homeowner. Fasteners needed.',
    additionalDetails: 'Standard 10ft ceiling height with ladder provided.',
    description: 'Need to install a new ceiling fan (fan provided). Ceiling height is normal.',
    photos: [
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=600&q=80'
    ],
    customer: {
      name: 'Kasun Perera',
      town: 'Kurunegala',
      memberSince: '2026',
      verified: true
    },
    questions: [],
    quotes: [],
    hiredQuote: {
      id: 'quote-fan-1',
      workerId: 'w-2',
      workerName: 'Nimal Perera',
      workerRating: 4.7,
      workerReviewsCount: 36,
      workerTown: 'Kurunegala',
      workerPhone: '076 123 4567',
      workerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      amount: 4000,
      appointmentDate: 'Wed, 18 Sep 2026',
      appointmentTime: '9:00 AM – 11:00 AM',
      includes: 'Complete fan unboxing, rod installation, speed regulator wiring and balancing.'
    }
  },
  {
    id: 'job-3',
    jobCode: 'Job #J1019',
    title: 'Paint living room',
    category: 'Painting',
    tradeCategory: 'painting',
    town: 'Mawathagama',
    address: '88 Kandy Road, Mawathagama',
    budget: 18000,
    status: 'open',
    postedTime: 'Posted 1 day ago',
    postedDate: '15 Sep 2026',
    isUrgent: false,
    timing: 'Flexible',
    materials: 'Paint will be provided by homeowner.',
    additionalDetails: 'Furniture will be moved to center of room before start.',
    description:
      'Need to paint living room (approx. 12 ft x 15 ft). Walls only. Paint will be provided.',
    photos: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80'
    ],
    customer: {
      name: 'Nimal Silva',
      town: 'Mawathagama',
      memberSince: '2025',
      verified: true
    },
    questions: [],
    quotes: [
      {
        id: 'quote-paint-1',
        workerId: 'w-3',
        workerName: 'Nuwan Fernando',
        workerRating: 4.6,
        workerReviewsCount: 28,
        workerTown: 'Kurunegala',
        workerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        amount: 17500,
        availability: 'Available next Monday',
        appointmentDate: '22 Sep 2026',
        appointmentTime: 'Full Day (8.30 am - 5.00 pm)',
        includes: 'Two coats of emulsion on all 4 walls, edge cutting and drop-sheet protection.',
        status: 'pending'
      }
    ],
    hiredQuote: null
  },
  {
    id: 'job-4',
    jobCode: 'Job #J1015',
    title: 'Repair main gate',
    category: 'Masonry',
    tradeCategory: 'masonry',
    town: 'Kurunegala',
    address: '12 Temple Lane, Kurunegala',
    budget: 7500,
    status: 'open',
    postedTime: 'Posted 1 day ago',
    postedDate: '15 Sep 2026',
    isUrgent: true,
    timing: 'Urgent',
    materials: 'Need welding electrode and hinge lubrication.',
    additionalDetails: 'Gate is swinging unevenly and scraping ground.',
    description: 'Main gate not closing properly. Need welding and alignment.',
    photos: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80'
    ],
    customer: {
      name: 'Kasun Perera',
      town: 'Kurunegala',
      memberSince: '2026',
      verified: true
    },
    questions: [],
    quotes: [],
    hiredQuote: null
  },
  {
    id: 'job-5',
    jobCode: 'Job #J1008',
    title: 'Garden clean-up',
    category: 'Cleaning',
    tradeCategory: 'cleaning',
    town: 'Mawathagama',
    address: '54 Hill Crest, Mawathagama',
    budget: 3500,
    status: 'completed',
    postedTime: 'Posted 12 Sep 2024',
    postedDate: '12 Sep 2024',
    isUrgent: false,
    timing: 'Flexible',
    materials: 'Lawn trimmer provided if needed.',
    additionalDetails: 'Green bags ready for compost disposal.',
    description: 'Need general garden cleaning – grass cutting, weeding and collect the waste.',
    photos: [
      'https://images.unsplash.com/photo-1558904541-efa8c4a52d31?auto=format&fit=crop&w=600&q=80'
    ],
    customer: {
      name: 'Kasun Perera',
      town: 'Mawathagama',
      memberSince: '2026',
      verified: true
    },
    questions: [],
    quotes: [],
    hiredQuote: {
      workerName: 'Tharushi Fernando',
      amount: 3500,
      appointmentDate: '14 Sep 2024'
    },
    reviewGiven: null
  },
  {
    id: 'job-6',
    jobCode: 'Job #J1002',
    title: 'Replace kitchen tap',
    category: 'Plumbing',
    tradeCategory: 'plumbing',
    town: 'Kandy',
    address: '14 Peradeniya Road, Kandy',
    budget: 6000,
    status: 'in_progress',
    postedTime: 'Accepted Sep 18, 2024 at 10:15 AM',
    postedDate: '18 Sep 2024',
    isUrgent: false,
    timing: 'This week',
    materials: 'Tap provided by customer.',
    additionalDetails: 'Under sink flexible hose needs replacement.',
    description: 'Old kitchen tap is leaking. Need to replace with new tap (customer will provide).',
    photos: [
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80'
    ],
    customer: {
      name: 'Anura Fernando',
      town: 'Kandy',
      memberSince: '2024',
      verified: true
    },
    questions: [],
    quotes: [],
    hiredQuote: {
      workerName: 'Saman Kumara',
      amount: 6000,
      appointmentDate: '18 Sep 2024'
    }
  }
];

export const INITIAL_CONVERSATIONS = [
  {
    id: 'conv-1',
    workerId: 'w-1',
    participantName: 'Saman Kumara',
    participantRole: 'Local worker',
    participantTown: 'Kurunegala',
    participantAvatar: 'SK',
    jobTitle: 'Fix leaking bathroom pipe',
    jobLocation: 'Kurunegala',
    jobCustomer: 'Kasun Perera',
    jobStatus: 'Accepted',
    acceptedQuote: 4500,
    yourBudget: 5000,
    acceptedDate: '18 Sep 2024, 9:15 AM',
    lastMessage: "Yes, around 9 am. I'll bring the fittings.",
    lastTime: '10:28 AM',
    messages: [
      {
        id: 'm-1',
        sender: 'customer',
        text: 'Can you come in the morning?',
        time: '9:12 AM',
        status: 'read'
      },
      {
        id: 'm-2',
        sender: 'worker',
        text: "Yes, around 9 am. I'll bring the fittings.",
        time: '9:20 AM'
      },
      {
        id: 'm-3',
        sender: 'customer',
        text: 'Great! See you then.',
        time: '9:22 AM',
        status: 'read'
      }
    ]
  },
  {
    id: 'conv-2',
    workerId: 'w-3',
    participantName: 'Nimal Perera',
    participantRole: 'Local worker',
    participantTown: 'Kurunegala',
    participantAvatar: 'NP',
    jobTitle: 'Paint living room',
    jobLocation: 'Mawathagama',
    jobCustomer: 'Kasun Perera',
    jobStatus: 'Pending',
    acceptedQuote: 17500,
    yourBudget: 18000,
    acceptedDate: '17 Sep 2024',
    lastMessage: 'Can you share a few more photos?',
    lastTime: '17 Sep',
    messages: [
      {
        id: 'm-4',
        sender: 'customer',
        text: 'Hi Nimal, looking for a quote on the living room paint.',
        time: '2:15 PM',
        status: 'read'
      },
      {
        id: 'm-5',
        sender: 'worker',
        text: 'Can you share a few more photos?',
        time: '3:00 PM'
      }
    ]
  },
  {
    id: 'conv-3',
    workerId: 'w-2',
    participantName: 'Ruwan Wijesinghe',
    participantRole: 'Local worker',
    participantTown: 'Kurunegala',
    participantAvatar: 'RW',
    jobTitle: 'Install ceiling fan',
    jobLocation: 'Kurunegala',
    jobCustomer: 'Kasun Perera',
    jobStatus: 'Accepted',
    acceptedQuote: 4000,
    yourBudget: 4000,
    acceptedDate: '16 Sep 2024',
    lastMessage: 'Sure, I can do this. When would you like...',
    lastTime: '16 Sep',
    messages: [
      {
        id: 'm-6',
        sender: 'worker',
        text: 'Sure, I can do this. When would you like to schedule it?',
        time: '11:10 AM'
      }
    ]
  }
];

export const FAQS = [
  {
    id: 'faq-1',
    question: 'What are the fees on WRENCH?',
    answer:
      'Posting a job and browsing quotes is completely free for homeowners. We do not charge upfront fees. Workers pay a tiny connection fee only when a quote is successfully accepted.'
  },
  {
    id: 'faq-2',
    question: 'How do I receive and compare quotes?',
    answer:
      'Once you publish your job with photos and description, verified workers in your town receive notifications. You will see itemized quotes in your dashboard with pricing, worker reviews, and available appointment windows.'
  },
  {
    id: 'faq-3',
    question: 'Can I cancel a job?',
    answer:
      'Yes, you can cancel an open job at any time before choosing a worker without any penalty. If you have already hired a worker, you can coordinate or cancel via the hired job dashboard.'
  },
  {
    id: 'faq-4',
    question: 'How do reviews work?',
    answer:
      'Only customers who have hired and completed a job with a verified worker can leave a rating and review. This guarantees 100% genuine feedback from real local homeowners.'
  }
];
