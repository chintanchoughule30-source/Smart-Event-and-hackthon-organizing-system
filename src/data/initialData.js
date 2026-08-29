// Comprehensive Initial State for Hackathon / Smart Event Management

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: 'ann-1',
    title: '🚨 Submissions Closing in 2 Hours!',
    message: 'Ensure your GitHub repository link and video demo are posted in the Judging Portal before 5:00 PM EST.',
    timestamp: '14:30 PM',
    priority: 'high',
    category: 'Urgent Alert',
    author: 'Organizer HQ'
  },
  {
    id: 'ann-2',
    title: '🍕 Midnight Pizza & Energy Drinks Served',
    message: 'Head over to Main Hall B for hot pizza slices, gluten-free options, and cold Red Bull!',
    timestamp: '00:00 AM',
    priority: 'medium',
    category: 'Food & Refreshments',
    author: 'Hospitality Team'
  },
  {
    id: 'ann-3',
    title: '🤖 Mentor Office Hours Open (AI & Cloud track)',
    message: 'AWS & OpenAI mentors are now available in Room 302 for API architecture guidance.',
    timestamp: '11:15 AM',
    priority: 'low',
    category: 'Mentorship',
    author: 'Tech Lead'
  }
];

export const INITIAL_ATTENDEES = [
  {
    id: 'ATT-101',
    name: 'Sarah Chen',
    email: 'sarah.chen@dev.io',
    role: 'Frontend / UI Engineer',
    track: 'AI & Machine Learning',
    skills: ['React', 'Tailwind', 'Three.js', 'Figma'],
    bio: 'Building immersive 3D spatial web apps. Looking for ML backend dev.',
    checkedIn: true,
    checkInTime: '09:12 AM',
    teamId: 'TEAM-01',
    teamName: 'NeuralPulse AI',
    qrCode: 'NEXUS-ATT-101-SARAH-CHEN'
  },
  {
    id: 'ATT-102',
    name: 'Marcus Vance',
    email: 'marcus.vance@tech.com',
    role: 'AI / Backend Engineer',
    track: 'AI & Machine Learning',
    skills: ['Python', 'PyTorch', 'FastAPI', 'LangChain'],
    bio: 'Specialized in RAG agents and LLM orchestration.',
    checkedIn: true,
    checkInTime: '09:24 AM',
    teamId: 'TEAM-01',
    teamName: 'NeuralPulse AI',
    qrCode: 'NEXUS-ATT-102-MARCUS-VANCE'
  },
  {
    id: 'ATT-103',
    name: 'Elena Rostova',
    email: 'elena.rostova@design.org',
    role: 'UX / Product Designer',
    track: 'FinTech & Web3',
    skills: ['Figma', 'UX Research', 'Design Systems', 'Prototyping'],
    bio: 'Passionate about seamless onboarding for decentralized finance.',
    checkedIn: true,
    checkInTime: '09:45 AM',
    teamId: 'TEAM-02',
    teamName: 'QuantumPay',
    qrCode: 'NEXUS-ATT-103-ELENA-ROSTOVA'
  },
  {
    id: 'ATT-104',
    name: 'David Kim',
    email: 'david.kim@cyber.net',
    role: 'Fullstack Engineer',
    track: 'FinTech & Web3',
    skills: ['Solidity', 'Next.js', 'Node.js', 'Ethers.js'],
    bio: 'Blockchain security auditor building zero-knowledge proof payments.',
    checkedIn: true,
    checkInTime: '10:02 AM',
    teamId: 'TEAM-02',
    teamName: 'QuantumPay',
    qrCode: 'NEXUS-ATT-104-DAVID-KIM'
  },
  {
    id: 'ATT-105',
    name: 'Aisha Patel',
    email: 'aisha.p@healthtech.co',
    role: 'Data Scientist & ML Developer',
    track: 'Health & BioTech',
    skills: ['Python', 'TensorFlow', 'OpenCV', 'Pandas'],
    bio: 'Developing early diagnostic image classification algorithms.',
    checkedIn: true,
    checkInTime: '10:15 AM',
    teamId: 'TEAM-03',
    teamName: 'BioScan AI',
    qrCode: 'NEXUS-ATT-105-AISHA-PATEL'
  },
  {
    id: 'ATT-106',
    name: 'Liam O\'Connor',
    email: 'liam.oc@mobile.dev',
    role: 'Mobile Dev (Flutter / iOS)',
    track: 'Health & BioTech',
    skills: ['Flutter', 'Dart', 'Swift', 'Firebase'],
    bio: 'Building cross-platform real-time patient monitors.',
    checkedIn: false,
    checkInTime: null,
    teamId: 'TEAM-03',
    teamName: 'BioScan AI',
    qrCode: 'NEXUS-ATT-106-LIAM-OCONNOR'
  },
  {
    id: 'ATT-107',
    name: 'Sophia Martinez',
    email: 'sophia.m@free.io',
    role: 'AI / Backend Engineer',
    track: 'Sustainability & Green Tech',
    skills: ['Python', 'Docker', 'PostgreSQL', 'Go'],
    bio: 'Looking for a frontend designer for carbon footprint tracking platform!',
    checkedIn: true,
    checkInTime: '10:30 AM',
    teamId: null,
    teamName: null,
    qrCode: 'NEXUS-ATT-107-SOPHIA-MARTINEZ'
  },
  {
    id: 'ATT-108',
    name: 'Alex Rivera',
    email: 'alex.r@hacker.org',
    role: 'Frontend / UI Engineer',
    track: 'Sustainability & Green Tech',
    skills: ['Vue.js', 'Tailwind', 'Chart.js'],
    bio: 'Passionate about clean tech visualizations. Free agent available!',
    checkedIn: false,
    checkInTime: null,
    teamId: null,
    teamName: null,
    qrCode: 'NEXUS-ATT-108-ALEX-RIVERA'
  }
];

export const INITIAL_TEAMS = [
  {
    id: 'TEAM-01',
    name: 'NeuralPulse AI',
    tagline: 'Autonomous Real-time Medical Triage Agent using Multi-modal LLMs',
    track: 'AI & Machine Learning',
    repoUrl: 'https://github.com/neuralpulse/hackathon-2026',
    demoUrl: 'https://neuralpulse.demo.dev',
    members: ['ATT-101', 'ATT-102'],
    lookingFor: ['Cloud DevOps Specialist'],
    tableNumber: 'Table A-12',
    scores: {
      innovation: 9,
      execution: 9,
      design: 8,
      pitch: 9,
      comments: 'Phenomenal live demo with instant speech-to-diagnosis feedback loop. Clean UI.'
    },
    totalScore: 88,
    judged: true,
    judgedBy: 'Dr. Evelyn Reed'
  },
  {
    id: 'TEAM-02',
    name: 'QuantumPay',
    tagline: 'Instant Zero-Knowledge Micro-settlement Engine for Global Freelancers',
    track: 'FinTech & Web3',
    repoUrl: 'https://github.com/quantumpay/zk-settle',
    demoUrl: 'https://quantumpay.app',
    members: ['ATT-103', 'ATT-104'],
    lookingFor: ['Mobile iOS Engineer'],
    tableNumber: 'Table B-04',
    scores: {
      innovation: 9,
      execution: 8,
      design: 9,
      pitch: 8,
      comments: 'Very impressive ZK proof verification time under 400ms.'
    },
    totalScore: 85,
    judged: true,
    judgedBy: 'Marcus Sterling'
  },
  {
    id: 'TEAM-03',
    name: 'BioScan AI',
    tagline: 'Edge AI Scanner for Non-invasive Dermatological Screenings',
    track: 'Health & BioTech',
    repoUrl: 'https://github.com/bioscan/edge-ai-dermatology',
    demoUrl: 'https://bioscan-ai.health',
    members: ['ATT-105', 'ATT-106'],
    lookingFor: ['Hardware / Embedded Engineer'],
    tableNumber: 'Table C-19',
    scores: {
      innovation: 8,
      execution: 8,
      design: 7,
      pitch: 8,
      comments: 'Strong clinical model validation dataset.'
    },
    totalScore: 78,
    judged: true,
    judgedBy: 'Dr. Evelyn Reed'
  },
  {
    id: 'TEAM-04',
    name: 'EcoTrace Grid',
    tagline: 'IoT & Machine Learning Supply Chain Carbon Auditing Network',
    track: 'Sustainability & Green Tech',
    repoUrl: 'https://github.com/ecotrace/green-grid',
    demoUrl: 'https://ecotrace-grid.org',
    members: ['ATT-107'],
    lookingFor: ['Frontend / UI Engineer', 'Product Designer'],
    tableNumber: 'Table D-02',
    scores: {
      innovation: 7,
      execution: 7,
      design: 6,
      pitch: 7,
      comments: 'Great concept, needs more complete dashboard interface.'
    },
    totalScore: 68,
    judged: false,
    judgedBy: null
  }
];

export const RUBRICS = [
  { id: 'innovation', name: 'Innovation & Originality', weight: 0.30, maxScore: 10, description: 'How novel, creative, and groundbreaking is the idea?' },
  { id: 'execution', name: 'Technical Execution & Complexity', weight: 0.30, maxScore: 10, description: 'Code quality, architecture, performance, and functionality.' },
  { id: 'design', name: 'UI / UX & User Experience', weight: 0.20, maxScore: 10, description: 'Intuitive design, polish, responsiveness, and user journey.' },
  { id: 'pitch', name: 'Pitch & Commercial Impact', weight: 0.20, maxScore: 10, description: 'Value proposition, presentation clarity, and scalability.' }
];

export const HOURLY_CHECKIN_DATA = [
  { time: '08:00 AM', checkIns: 12 },
  { time: '09:00 AM', checkIns: 48 },
  { time: '10:00 AM', checkIns: 125 },
  { time: '11:00 AM', checkIns: 84 },
  { time: '12:00 PM', checkIns: 32 },
  { time: '01:00 PM', checkIns: 15 }
];
