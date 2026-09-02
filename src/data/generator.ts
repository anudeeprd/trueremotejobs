import { Job, CompanyStage, ExperienceLevel, EmploymentType, Department } from '../types/job';

// Fictional tech companies with rich profiles
interface SeedCompany {
  id: string;
  name: string;
  badgeBg: string;
  description: string;
  website: string;
  industry: string;
  companyStage: CompanyStage;
  employeeCount: number;
  headquarters: string;
  fundingRaised: string;
}

const COMPANIES: SeedCompany[] = [
  {
    id: 'c-novastack',
    name: 'NovaStack',
    badgeBg: '#4F46E5',
    description: 'Next-generation cloud infrastructure orchestration for edge microservices and distributed databases.',
    website: 'https://novastack.example.com',
    industry: 'Developer Tools',
    companyStage: 'Series A',
    employeeCount: 42,
    headquarters: 'San Francisco, CA (Remote-First)',
    fundingRaised: '$14.5M'
  },
  {
    id: 'c-orbitlabs',
    name: 'Orbit Labs',
    badgeBg: '#0891B2',
    description: 'Collaborative spatial computing and cross-platform mobile workplace tools for distributed teams.',
    website: 'https://orbitlabs.example.com',
    industry: 'Productivity',
    companyStage: 'Series B',
    employeeCount: 78,
    headquarters: 'New York, NY (Fully Remote)',
    fundingRaised: '$32.0M'
  },
  {
    id: 'c-mosaicai',
    name: 'Mosaic AI',
    badgeBg: '#7C3AED',
    description: 'Enterprise generative AI workflows with local data governance, synthetic testing, and model evaluation.',
    website: 'https://mosaicai.example.com',
    industry: 'AI',
    companyStage: 'Series A',
    employeeCount: 35,
    headquarters: 'Seattle, WA (Remote-First)',
    fundingRaised: '$18.0M'
  },
  {
    id: 'c-cinder',
    name: 'Cinder',
    badgeBg: '#EA580C',
    description: 'Continuous security posture observability and identity threat automation for high-growth tech firms.',
    website: 'https://cindersec.example.com',
    industry: 'Cybersecurity',
    companyStage: 'Seed',
    employeeCount: 18,
    headquarters: 'Austin, TX (Fully Remote)',
    fundingRaised: '$4.2M'
  },
  {
    id: 'c-lanternlabs',
    name: 'Lantern Labs',
    badgeBg: '#D97706',
    description: 'Real-time telemetry and unified tracing platform built on open standards and eBPF.',
    website: 'https://lanternlabs.example.com',
    industry: 'Developer Tools',
    companyStage: 'Series A',
    employeeCount: 48,
    headquarters: 'Boston, MA (Fully Remote)',
    fundingRaised: '$16.0M'
  },
  {
    id: 'c-cloudsmithy',
    name: 'Cloudsmithy',
    badgeBg: '#2563EB',
    description: 'Automated multicloud cost intelligence and serverless infrastructure scaling.',
    website: 'https://cloudsmithy.example.com',
    industry: 'Developer Tools',
    companyStage: 'Series B',
    employeeCount: 95,
    headquarters: 'Chicago, IL (Remote-First)',
    fundingRaised: '$28.5M'
  },
  {
    id: 'c-sundial',
    name: 'Sundial',
    badgeBg: '#059669',
    description: 'Asynchronous team collaboration and meeting synthesis platform with verified action capture.',
    website: 'https://sundialhq.example.com',
    industry: 'Productivity',
    companyStage: 'Seed',
    employeeCount: 14,
    headquarters: 'Denver, CO (Fully Remote)',
    fundingRaised: '$3.5M'
  },
  {
    id: 'c-paperplane',
    name: 'Paperplane',
    badgeBg: '#E11D48',
    description: 'Next-generation documentation platform for engineering architectures and live API specs.',
    website: 'https://paperplane.example.com',
    industry: 'SaaS',
    companyStage: 'Series A',
    employeeCount: 38,
    headquarters: 'San Francisco, CA (Remote-First)',
    fundingRaised: '$12.0M'
  },
  {
    id: 'c-vertexflow',
    name: 'VertexFlow',
    badgeBg: '#9333EA',
    description: 'High-throughput real-time streaming analytics engine and vector database connector.',
    website: 'https://vertexflow.example.com',
    industry: 'Data',
    companyStage: 'Series B',
    employeeCount: 65,
    headquarters: 'Toronto, Canada (Fully Remote)',
    fundingRaised: '$24.0M'
  },
  {
    id: 'c-bluepeak',
    name: 'BluePeak',
    badgeBg: '#0284C7',
    description: 'Modern treasury management and cross-border payroll infrastructure for global remote workforces.',
    website: 'https://bluepeakfinance.example.com',
    industry: 'Fintech',
    companyStage: 'Series A',
    employeeCount: 52,
    headquarters: 'London, UK (Fully Remote)',
    fundingRaised: '$15.5M'
  },
  {
    id: 'c-relayworks',
    name: 'RelayWorks',
    badgeBg: '#10B981',
    description: 'Zero-configuration edge messaging queues and durable workflows for modern microservices.',
    website: 'https://relayworks.example.com',
    industry: 'Developer Tools',
    companyStage: 'Seed',
    employeeCount: 22,
    headquarters: 'Berlin, Germany (Remote-First)',
    fundingRaised: '$5.0M'
  },
  {
    id: 'c-mintlayer',
    name: 'MintLayer',
    badgeBg: '#65A30D',
    description: 'Open compliance accounting and automated billing ledger for SaaS and AI API providers.',
    website: 'https://mintlayer.example.com',
    industry: 'Fintech',
    companyStage: 'Series A',
    employeeCount: 30,
    headquarters: 'New York, NY (Fully Remote)',
    fundingRaised: '$11.2M'
  },
  {
    id: 'c-atlasgrid',
    name: 'AtlasGrid',
    badgeBg: '#475569',
    description: 'Distributed geospatial intelligence and asset telemetry pipeline for logistics fleets.',
    website: 'https://atlasgrid.example.com',
    industry: 'Logistics',
    companyStage: 'Series B',
    employeeCount: 82,
    headquarters: 'Amsterdam, Netherlands (Fully Remote)',
    fundingRaised: '$30.0M'
  },
  {
    id: 'c-kestrelhealth',
    name: 'Kestrel Health',
    badgeBg: '#0D9488',
    description: 'Remote clinical trial data aggregation and predictive patient adherence diagnostics.',
    website: 'https://kestrelhealth.example.com',
    industry: 'Healthtech',
    companyStage: 'Series A',
    employeeCount: 44,
    headquarters: 'San Diego, CA (Remote-First)',
    fundingRaised: '$17.0M'
  },
  {
    id: 'c-prismhq',
    name: 'Prism HQ',
    badgeBg: '#F59E0B',
    description: 'Unified customer journey analytics and user behavior attribution across multi-touch funnels.',
    website: 'https://prismhq.example.com',
    industry: 'Analytics',
    companyStage: 'Seed',
    employeeCount: 16,
    headquarters: 'Portland, OR (Fully Remote)',
    fundingRaised: '$4.5M'
  },
  {
    id: 'c-strata-db',
    name: 'StrataDB',
    badgeBg: '#3B82F6',
    description: 'Next-gen distributed HTAP database built for cloud-scale transactional microservices.',
    website: 'https://stratadb.example.com',
    industry: 'Developer Tools',
    companyStage: 'Series B',
    employeeCount: 110,
    headquarters: 'San Francisco, CA (Remote-First)',
    fundingRaised: '$45.0M'
  },
  {
    id: 'c-focalpoint',
    name: 'FocalPoint',
    badgeBg: '#EC4899',
    description: 'Generative design workspace for interactive UI components, design tokens, and prototyping.',
    website: 'https://focalpoint.example.com',
    industry: 'Productivity',
    companyStage: 'Series A',
    employeeCount: 29,
    headquarters: 'Stockholm, Sweden (Fully Remote)',
    fundingRaised: '$9.8M'
  },
  {
    id: 'c-zephyrcloud',
    name: 'Zephyr Cloud',
    badgeBg: '#6366F1',
    description: 'Intelligent serverless micro-VM containers running at the edge with millisecond cold starts.',
    website: 'https://zephyrcloud.example.com',
    industry: 'Developer Tools',
    companyStage: 'Bootstrapped',
    employeeCount: 12,
    headquarters: 'Dublin, Ireland (Fully Remote)',
    fundingRaised: 'Bootstrapped ($3M ARR)'
  },
  {
    id: 'c-hyperiondata',
    name: 'Hyperion Data',
    badgeBg: '#8B5CF6',
    description: 'Automated data lineage and privacy audit pipelines for regulated modern enterprises.',
    website: 'https://hyperiondata.example.com',
    industry: 'Data',
    companyStage: 'Series A',
    employeeCount: 36,
    headquarters: 'Toronto, Canada (Fully Remote)',
    fundingRaised: '$13.5M'
  },
  {
    id: 'c-luminasec',
    name: 'Lumina Security',
    badgeBg: '#EF4444',
    description: 'Autonomous cloud vulnerability scanning and supply chain package integrity verification.',
    website: 'https://luminasec.example.com',
    industry: 'Cybersecurity',
    companyStage: 'Series A',
    employeeCount: 40,
    headquarters: 'Tel Aviv / Remote (Fully Remote)',
    fundingRaised: '$16.2M'
  }
];

// Helper to construct deterministic dates (relative to now)
function getIsoDateAgo(daysAgo: number, hoursAgo = 0): string {
  const date = new Date('2026-09-02T18:00:00.000Z');
  date.setDate(date.getDate() - daysAgo);
  date.setHours(date.getHours() - hoursAgo);
  return date.toISOString();
}

/**
 * 1. Curated Key Demo Jobs explicitly seeded to guarantee top-quality results
 * for the hackathon judging scenarios:
 *  - React Native + India eligible + $60k+
 *  - Senior engineering + Series A
 *  - Frontend + $60k+
 *  - Product Designer + Worldwide
 *  - AI Engineer + posted within 7 days
 *  - Entry-level + India eligible
 *  - Product Manager + Seed/Series A
 *  - TypeScript + $100k+
 */
const CURATED_DEMO_JOBS: Job[] = [
  {
    id: 'job-1',
    slug: 'novastack-senior-react-native-engineer',
    title: 'Senior React Native Engineer',
    company: {
      ...COMPANIES[0],
      logo: 'NS'
    },
    employmentType: 'Full-time',
    experienceLevel: 'Senior',
    department: 'Engineering',
    remote: {
      type: 'Fully Remote',
      worldwide: true,
      allowedCountries: ['India', 'United States', 'Canada', 'United Kingdom', 'Germany', 'Singapore'],
      allowedRegions: ['Worldwide', 'APAC', 'Americas', 'EMEA'],
      timezone: 'Any timezone (4 hours UTC overlap)',
      timezoneOverlapHours: 4
    },
    salary: {
      min: 75000,
      max: 95000,
      currency: 'USD',
      period: 'year',
      salaryUsdEquivalent: 85000
    },
    equity: {
      available: true,
      min: '0.1%',
      max: '0.25%'
    },
    skills: {
      required: ['React Native', 'TypeScript', 'Expo', 'Mobile Architecture', 'State Management'],
      preferred: ['GraphQL', 'Native iOS/Android modules', 'Jest / Detox', 'CI/CD Fastlane']
    },
    techStack: ['React Native', 'TypeScript', 'Expo', 'React Navigation', 'GraphQL', 'Tailwind', 'Detox'],
    minimumYearsExperience: 5,
    maximumYearsExperience: 8,
    description: 'NovaStack is building next-generation developer tooling and monitoring companions for cloud architects. We are seeking an experienced Senior React Native Engineer to lead the architecture, performance, and cross-platform delivery of our flagship mobile operations console.',
    responsibilities: [
      'Design, build, and maintain high-performance, cross-platform mobile applications using React Native and TypeScript.',
      'Architect robust local-first offline synchronization and real-time streaming WebSocket dashboards.',
      'Collaborate closely with product designers, backend engineers, and open-source contributors.',
      'Mentor intermediate engineers and establish best practices for mobile component testing and native bridges.'
    ],
    requirements: [
      '5+ years of software engineering experience with at least 3+ years dedicated to production React Native applications.',
      'Deep fluency in modern TypeScript, React hooks, and component lifecycle performance tuning.',
      'Demonstrated experience shipping apps to both the Apple App Store and Google Play Store.',
      'Strong communication skills in an asynchronous, remote-first engineering culture.'
    ],
    niceToHave: [
      'Experience with JSI, TurboModules, or C++ native mobile integrations.',
      'Familiarity with cloud telemetry platforms, OpenTelemetry, or Kubernetes.'
    ],
    benefits: [
      '100% remote flexibility with home office stipend ($1,500 setup budget)',
      'Health, dental, and vision insurance coverage or equivalent international allowance',
      'Flexible paid time off (minimum 25 days recommended per year)',
      'Annual learning and conference stipend ($2,000)',
      'Top-tier Apple hardware (MacBook Pro M3/M4)'
    ],
    visaSponsorship: false,
    relocationSupport: false,
    postedDate: getIsoDateAgo(2, 4),
    applicationDeadline: '2026-10-15',
    featured: true,
    verifiedDemoCompany: true
  },
  {
    id: 'job-2',
    slug: 'orbitlabs-lead-react-native-architect',
    title: 'Lead React Native Architect',
    company: {
      ...COMPANIES[1],
      logo: 'OL'
    },
    employmentType: 'Full-time',
    experienceLevel: 'Lead',
    department: 'Engineering',
    remote: {
      type: 'Fully Remote',
      worldwide: false,
      allowedCountries: ['India', 'Singapore', 'United Kingdom', 'Germany', 'Australia'],
      allowedRegions: ['APAC', 'EMEA'],
      timezone: 'UTC+2 to UTC+8',
      timezoneOverlapHours: 4
    },
    salary: {
      min: 80000,
      max: 110000,
      currency: 'USD',
      period: 'year',
      salaryUsdEquivalent: 95000
    },
    equity: {
      available: true,
      min: '0.2%',
      max: '0.4%'
    },
    skills: {
      required: ['React Native', 'TypeScript', 'Redux Toolkit', 'Performance Optimization', 'iOS / Android'],
      preferred: ['WebRTC', 'Bluetooth LE', 'Microfrontends', 'Automated Testing']
    },
    techStack: ['React Native', 'TypeScript', 'Redux', 'Kotlin', 'Swift', 'WebRTC', 'Jest'],
    minimumYearsExperience: 7,
    maximumYearsExperience: 10,
    description: 'Orbit Labs builds spatial collaboration tools and ultra-low latency remote workspaces. We are looking for a Lead React Native Architect to take ownership of our mobile ecosystem, driving technical decisions, component design systems, and memory profiling.',
    responsibilities: [
      'Spearhead the technical architecture of our cross-platform mobile suite across iOS, Android, and tablet devices.',
      'Optimize 60fps rendering, memory footprint, and low-latency audio/video stream controls.',
      'Guide team on architectural patterns, modularization, and automated end-to-end regression pipelines.',
      'Work alongside the VP of Engineering to evaluate native vs. hybrid trade-offs.'
    ],
    requirements: [
      '7+ years in mobile software development with extensive hands-on React Native leadership.',
      'Proven expertise in native bridge development in Swift / Kotlin and modern React Native architecture.',
      'Strong understanding of memory profiling, Hermes engine, and bundle splitting.'
    ],
    niceToHave: [
      'Prior experience with WebRTC or real-time gaming protocols.',
      'Background in designing public UI component libraries.'
    ],
    benefits: [
      'Competitive compensation in USD with equity participation',
      'Comprehensive wellness and private health insurance',
      'Generous parental leave policy (16 weeks fully paid)',
      'Home workstation and co-working pass budget',
      'Annual company offsite in European / Asian destinations'
    ],
    visaSponsorship: false,
    relocationSupport: false,
    postedDate: getIsoDateAgo(3, 1),
    applicationDeadline: '2026-10-30',
    featured: true,
    verifiedDemoCompany: true
  },
  {
    id: 'job-3',
    slug: 'mosaicai-staff-mobile-engineer-react-native',
    title: 'Staff Mobile Engineer (React Native & AI)',
    company: {
      ...COMPANIES[2],
      logo: 'MA'
    },
    employmentType: 'Full-time',
    experienceLevel: 'Staff',
    department: 'Engineering',
    remote: {
      type: 'Fully Remote',
      worldwide: true,
      allowedCountries: ['India', 'United States', 'Canada', 'United Kingdom', 'Netherlands', 'Brazil'],
      allowedRegions: ['Worldwide', 'APAC', 'Americas', 'EMEA'],
      timezone: 'Any global timezone',
      timezoneOverlapHours: 3
    },
    salary: {
      min: 90000,
      max: 130000,
      currency: 'USD',
      period: 'year',
      salaryUsdEquivalent: 110000
    },
    equity: {
      available: true,
      min: '0.15%',
      max: '0.35%'
    },
    skills: {
      required: ['React Native', 'TypeScript', 'AI Tooling', 'Local AI Inference', 'Mobile Security'],
      preferred: ['ONNX Runtime', 'CoreML', 'TensorFlow Lite', 'Python']
    },
    techStack: ['React Native', 'TypeScript', 'ONNX', 'CoreML', 'Python', 'Tailwind', 'GraphQL'],
    minimumYearsExperience: 6,
    maximumYearsExperience: 9,
    description: 'Mosaic AI creates client-side intelligence tools for enterprise operators. We are looking for a Staff Mobile Engineer with deep React Native mastery to embed local on-device inference models and craft frictionless mobile AI experiences.',
    responsibilities: [
      'Lead mobile client initiatives connecting enterprise AI models to smooth React Native interactions.',
      'Benchmark and optimize local neural network execution on mobile chipsets (Apple Neural Engine, Snapdragon NPU).',
      'Ensure airtight local data encryption and enterprise privacy guarantees.',
      'Partner with ML researchers to package cutting-edge transformer models into lightweight mobile binaries.'
    ],
    requirements: [
      '6+ years of software development experience with extensive React Native and mobile systems expertise.',
      'Solid foundations in TypeScript, asynchronous reactive programming, and native platform capabilities.',
      'Comfort working with AI/ML concepts and mobile model runtimes.'
    ],
    niceToHave: [
      'Direct experience integrating CoreML or ONNX models into React Native.',
      'Published open-source React Native libraries.'
    ],
    benefits: [
      'Silicon Valley tier base salary in USD regardless of location',
      'Stock options in high-growth Series A startup backed by premier VCs',
      'Unlimited time off with mandatory 20 days minimum',
      '$3,000 yearly tech & hardware budget'
    ],
    visaSponsorship: false,
    relocationSupport: false,
    postedDate: getIsoDateAgo(1, 2),
    applicationDeadline: '2026-11-01',
    featured: true,
    verifiedDemoCompany: true
  },
  {
    id: 'job-4',
    slug: 'cinder-react-native-mobile-developer',
    title: 'React Native Mobile Developer',
    company: {
      ...COMPANIES[3],
      logo: 'CD'
    },
    employmentType: 'Full-time',
    experienceLevel: 'Mid Level',
    department: 'Engineering',
    remote: {
      type: 'Fully Remote',
      worldwide: false,
      allowedCountries: ['India', 'Japan', 'Australia', 'New Zealand', 'Singapore'],
      allowedRegions: ['APAC'],
      timezone: 'UTC+5 to UTC+10',
      timezoneOverlapHours: 5
    },
    salary: {
      min: 65000,
      max: 85000,
      currency: 'USD',
      period: 'year',
      salaryUsdEquivalent: 75000
    },
    equity: {
      available: true,
      min: '0.05%',
      max: '0.15%'
    },
    skills: {
      required: ['React Native', 'TypeScript', 'REST APIs', 'UI/UX Polish', 'State Management'],
      preferred: ['Zustand', 'React Query', 'App Store deployment']
    },
    techStack: ['React Native', 'TypeScript', 'Zustand', 'React Query', 'Tailwind', 'Push Notifications'],
    minimumYearsExperience: 3,
    maximumYearsExperience: 5,
    description: 'Cinder is re-inventing cybersecurity alerts for fast-moving engineering teams. We are seeking a talented React Native developer to build our mobile notification, approval triage, and incident response app.',
    responsibilities: [
      'Implement clean, pixel-perfect user interfaces with smooth gestures and instant feedback.',
      'Build responsive, reliable offline caching with React Query and local sqlite stores.',
      'Integrate push notification triggers, biometrics (FaceID/TouchID), and deep links.',
      'Participate in code reviews, bug fixes, and sprint planning sessions.'
    ],
    requirements: [
      '3+ years of professional React Native experience.',
      'Strong grasp of JavaScript ES6+, TypeScript, and modern CSS-in-JS / Tailwind paradigms.',
      'Experience handling push notifications and deep linking on both iOS and Android.'
    ],
    niceToHave: [
      'Familiarity with enterprise SSO (SAML/Okta) authentication flows.',
      'Eye for design and micro-animations.'
    ],
    benefits: [
      'Full health and dental coverage',
      'Flexible working schedule centered on asynchronous delivery',
      'Home office allowance and annual retreat'
    ],
    visaSponsorship: false,
    relocationSupport: false,
    postedDate: getIsoDateAgo(4, 6),
    applicationDeadline: '2026-10-20',
    featured: false,
    verifiedDemoCompany: true
  },
  {
    id: 'job-5',
    slug: 'novastack-senior-frontend-engineer',
    title: 'Senior Frontend Engineer (React & Design Systems)',
    company: {
      ...COMPANIES[0],
      logo: 'NS'
    },
    employmentType: 'Full-time',
    experienceLevel: 'Senior',
    department: 'Engineering',
    remote: {
      type: 'Fully Remote',
      worldwide: true,
      allowedCountries: ['India', 'United States', 'Canada', 'Germany', 'United Kingdom'],
      allowedRegions: ['Worldwide', 'Americas', 'EMEA', 'APAC'],
      timezone: 'UTC-8 to UTC+5.5',
      timezoneOverlapHours: 4
    },
    salary: {
      min: 80000,
      max: 115000,
      currency: 'USD',
      period: 'year',
      salaryUsdEquivalent: 97500
    },
    equity: {
      available: true,
      min: '0.1%',
      max: '0.2%'
    },
    skills: {
      required: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Design Systems'],
      preferred: ['Radix UI', 'Framer Motion', 'WebSockets', 'Vitest']
    },
    techStack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Radix UI', 'Vitest'],
    minimumYearsExperience: 5,
    maximumYearsExperience: 8,
    description: 'Lead the frontend architecture of our cloud observability web platform. You will build accessible, keyboard-first dashboard interfaces that handle thousands of real-time telemetry updates per second.',
    responsibilities: [
      'Develop modular, accessible React components for high-density data views.',
      'Maintain our shared component library and design tokens.',
      'Optimize web performance, Core Web Vitals, and canvas visualizations.'
    ],
    requirements: [
      '5+ years building web applications with modern React and TypeScript.',
      'Deep appreciation for accessibility (WCAG 2.1 AA), keyboard navigation, and design consistency.'
    ],
    niceToHave: ['Experience with web canvas or WebGL graphing.'],
    benefits: ['100% remote', 'Health benefits', 'Learning stipend', '$1,500 home office grant'],
    visaSponsorship: false,
    relocationSupport: false,
    postedDate: getIsoDateAgo(1, 8),
    applicationDeadline: '2026-10-18',
    featured: true,
    verifiedDemoCompany: true
  },
  {
    id: 'job-6',
    slug: 'lanternlabs-senior-fullstack-engineer-series-a',
    title: 'Senior Full Stack Engineer',
    company: {
      ...COMPANIES[4],
      logo: 'LL'
    },
    employmentType: 'Full-time',
    experienceLevel: 'Senior',
    department: 'Engineering',
    remote: {
      type: 'Fully Remote',
      worldwide: true,
      allowedCountries: ['India', 'United States', 'United Kingdom', 'Canada', 'France', 'Poland'],
      allowedRegions: ['Worldwide', 'Americas', 'EMEA', 'APAC'],
      timezone: 'UTC-5 to UTC+5.5',
      timezoneOverlapHours: 4
    },
    salary: {
      min: 95000,
      max: 135000,
      currency: 'USD',
      period: 'year',
      salaryUsdEquivalent: 115000
    },
    equity: {
      available: true,
      min: '0.15%',
      max: '0.3%'
    },
    skills: {
      required: ['TypeScript', 'Node.js', 'React', 'PostgreSQL', 'Cloud Infrastructure'],
      preferred: ['ClickHouse', 'Docker', 'Kubernetes', 'Redis']
    },
    techStack: ['TypeScript', 'Node.js', 'React', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    minimumYearsExperience: 5,
    maximumYearsExperience: 9,
    description: 'Lantern Labs is expanding our Series A core engineering group. We need a Senior Full Stack Engineer to architect end-to-end ingestion pipelines and responsive observability interfaces.',
    responsibilities: [
      'Build scalable backend services in Node.js/TypeScript and interactive frontend dashboards in React.',
      'Model complex data schemas for high-cardinality distributed tracing.',
      'Collaborate with product and devops to ensure 99.99% availability.'
    ],
    requirements: [
      '5+ years building production full-stack systems.',
      'Strong database design skills in PostgreSQL and distributed caches.'
    ],
    niceToHave: ['Background in monitoring, eBPF, or OpenTelemetry.'],
    benefits: ['Full remote work', 'Flexible schedule', 'Comprehensive health cover', 'Equity options'],
    visaSponsorship: false,
    relocationSupport: false,
    postedDate: getIsoDateAgo(3, 3),
    applicationDeadline: '2026-10-25',
    featured: true,
    verifiedDemoCompany: true
  },
  {
    id: 'job-7',
    slug: 'focalpoint-lead-product-designer-worldwide',
    title: 'Lead Product Designer',
    company: {
      ...COMPANIES[16],
      logo: 'FP'
    },
    employmentType: 'Full-time',
    experienceLevel: 'Lead',
    department: 'Design',
    remote: {
      type: 'Fully Remote',
      worldwide: true,
      allowedCountries: ['India', 'United States', 'United Kingdom', 'Germany', 'Sweden', 'Japan', 'Brazil'],
      allowedRegions: ['Worldwide', 'Americas', 'EMEA', 'APAC'],
      timezone: 'Any worldwide timezone',
      timezoneOverlapHours: 3
    },
    salary: {
      min: 85000,
      max: 120000,
      currency: 'USD',
      period: 'year',
      salaryUsdEquivalent: 102500
    },
    equity: {
      available: true,
      min: '0.2%',
      max: '0.5%'
    },
    skills: {
      required: ['Product Design', 'Figma', 'Design Systems', 'UX Research', 'Prototyping'],
      preferred: ['HTML/CSS', 'Micro-interactions', 'Design tokens']
    },
    techStack: ['Figma', 'Design Tokens', 'Storybook', 'FigJam', 'Principle'],
    minimumYearsExperience: 6,
    maximumYearsExperience: 10,
    description: 'FocalPoint is building the future workspace for digital product teams. As Lead Product Designer, you will define the core interactions, visual elegance, and usability patterns across all screens.',
    responsibilities: [
      'Lead end-to-end product design from concept wireframes to production handoff.',
      'Maintain and evolve our design system with high craftsmanship.',
      'Conduct user interviews and synthesize feedback into crisp product solutions.'
    ],
    requirements: [
      '6+ years designing B2B SaaS or developer tools.',
      'Exceptional portfolio showcasing typography, layout, interaction design, and system thinking.'
    ],
    niceToHave: ['Ability to prototype in code (React/Tailwind).'],
    benefits: ['Worldwide remote', 'Flexible working hours', 'Quarterly design equipment budget'],
    visaSponsorship: false,
    relocationSupport: false,
    postedDate: getIsoDateAgo(2, 5),
    applicationDeadline: '2026-11-05',
    featured: true,
    verifiedDemoCompany: true
  },
  {
    id: 'job-8',
    slug: 'mosaicai-senior-ai-engineer-recent',
    title: 'Senior AI Engineer (LLM & Agent Systems)',
    company: {
      ...COMPANIES[2],
      logo: 'MA'
    },
    employmentType: 'Full-time',
    experienceLevel: 'Senior',
    department: 'AI / ML',
    remote: {
      type: 'Fully Remote',
      worldwide: true,
      allowedCountries: ['India', 'United States', 'Canada', 'United Kingdom', 'Germany', 'Singapore'],
      allowedRegions: ['Worldwide', 'Americas', 'EMEA', 'APAC'],
      timezone: 'UTC-8 to UTC+6',
      timezoneOverlapHours: 4
    },
    salary: {
      min: 110000,
      max: 160000,
      currency: 'USD',
      period: 'year',
      salaryUsdEquivalent: 135000
    },
    equity: {
      available: true,
      min: '0.2%',
      max: '0.45%'
    },
    skills: {
      required: ['Python', 'AI / ML', 'LLM Prompt Engineering', 'Model Context Protocol', 'Vector Databases'],
      preferred: ['LangChain', 'LlamaIndex', 'PyTorch', 'FastAPI']
    },
    techStack: ['Python', 'FastAPI', 'PyTorch', 'Qdrant', 'OpenAI API', 'MCP', 'Docker'],
    minimumYearsExperience: 4,
    maximumYearsExperience: 8,
    description: 'Mosaic AI is architecting autonomous agent orchestration layers. We need a Senior AI Engineer to design tool-calling protocols, agent execution sandboxes, and low-latency embeddings pipelines.',
    responsibilities: [
      'Design reliable AI agent workflows using tool-use standards and structured outputs.',
      'Optimize vector similarity retrieval and semantic caching for enterprise datasets.',
      'Evaluate model hallucinations, benchmarking accuracy, and safety constraints.'
    ],
    requirements: [
      '4+ years software engineering with 2+ years working with LLMs, prompt engineering, and agent systems.',
      'Proficiency in Python and asynchronous API architecture.'
    ],
    niceToHave: ['Experience implementing MCP (Model Context Protocol) servers or client agents.'],
    benefits: ['Top-of-market compensation', 'Substantial equity', 'Comprehensive health coverage'],
    visaSponsorship: false,
    relocationSupport: false,
    postedDate: getIsoDateAgo(1, 1),
    applicationDeadline: '2026-10-15',
    featured: true,
    verifiedDemoCompany: true
  },
  {
    id: 'job-9',
    slug: 'sundial-entry-level-developer-india-eligible',
    title: 'Junior / Entry Level Software Developer',
    company: {
      ...COMPANIES[6],
      logo: 'SD'
    },
    employmentType: 'Full-time',
    experienceLevel: 'Entry Level',
    department: 'Engineering',
    remote: {
      type: 'Fully Remote',
      worldwide: true,
      allowedCountries: ['India', 'United States', 'Philippines', 'Vietnam', 'Kenya'],
      allowedRegions: ['Worldwide', 'APAC', 'EMEA'],
      timezone: 'UTC+2 to UTC+7',
      timezoneOverlapHours: 4
    },
    salary: {
      min: 35000,
      max: 50000,
      currency: 'USD',
      period: 'year',
      salaryUsdEquivalent: 42500
    },
    equity: {
      available: true,
      min: '0.05%',
      max: '0.1%'
    },
    skills: {
      required: ['TypeScript', 'React', 'Git', 'Problem Solving', 'REST APIs'],
      preferred: ['Node.js', 'Tailwind CSS', 'SQL']
    },
    techStack: ['TypeScript', 'React', 'Node.js', 'Tailwind', 'PostgreSQL', 'Git'],
    minimumYearsExperience: 0,
    maximumYearsExperience: 2,
    description: 'Sundial is seeking an ambitious junior developer eager to build collaborative tools with modern web standards. We offer direct mentorship from experienced staff engineers in an open, kind culture.',
    responsibilities: [
      'Contribute clean, well-tested code to user-facing React components.',
      'Fix bugs, implement small features, and write unit tests.',
      'Participate actively in code reviews and pair programming sessions.'
    ],
    requirements: [
      'Solid command of TypeScript/JavaScript fundamentals and modern React.',
      'Passionate about remote work, curiosity, and high velocity learning.',
      'Good written English communication skills.'
    ],
    niceToHave: ['Personal projects, open source contributions, or internship experience.'],
    benefits: ['100% remote', 'Mentorship program', 'Hardware budget ($1,200)', 'Annual learning budget'],
    visaSponsorship: false,
    relocationSupport: false,
    postedDate: getIsoDateAgo(3, 7),
    applicationDeadline: '2026-10-31',
    featured: false,
    verifiedDemoCompany: true
  },
  {
    id: 'job-10',
    slug: 'paperplane-remote-product-manager-series-a',
    title: 'Product Manager (Developer Experience)',
    company: {
      ...COMPANIES[7],
      logo: 'PP'
    },
    employmentType: 'Full-time',
    experienceLevel: 'Mid Level',
    department: 'Product',
    remote: {
      type: 'Fully Remote',
      worldwide: true,
      allowedCountries: ['India', 'United States', 'Canada', 'United Kingdom', 'Germany'],
      allowedRegions: ['Worldwide', 'Americas', 'EMEA', 'APAC'],
      timezone: 'UTC-5 to UTC+5.5',
      timezoneOverlapHours: 4
    },
    salary: {
      min: 80000,
      max: 110000,
      currency: 'USD',
      period: 'year',
      salaryUsdEquivalent: 95000
    },
    equity: {
      available: true,
      min: '0.1%',
      max: '0.25%'
    },
    skills: {
      required: ['Product Management', 'Developer Tools', 'Roadmapping', 'User Research', 'Analytics'],
      preferred: ['API Design', 'Technical Writing', 'Agile / Scrum']
    },
    techStack: ['Linear', 'Notion', 'Figma', 'Mixpanel', 'GitHub'],
    minimumYearsExperience: 3,
    maximumYearsExperience: 6,
    description: 'Paperplane is creating the next standard in documentation and API developer experiences. We need a technical Product Manager to champion user empathy, drive our feature roadmap, and partner with engineering.',
    responsibilities: [
      'Define clear product specs, user stories, and acceptance criteria for engineering sprints.',
      'Analyze developer analytics, feedback loops, and customer discovery insights.',
      'Coordinate cross-functional launches with marketing and customer success.'
    ],
    requirements: [
      '3+ years in product management at a tech startup or developer tooling company.',
      'Technical literacy—able to understand API specs, CLI workflows, and architecture diagrams.'
    ],
    niceToHave: ['Former software engineering background or computer science degree.'],
    benefits: ['Competitive USD salary & equity', 'Health insurance', 'Generous vacation policy'],
    visaSponsorship: false,
    relocationSupport: false,
    postedDate: getIsoDateAgo(4, 2),
    applicationDeadline: '2026-11-01',
    featured: true,
    verifiedDemoCompany: true
  }
];

// Helper procedural generation lists
const ROLES: { title: string; dept: Department; skills: string[]; tech: string[]; minExp: number; maxExp: number; level: ExperienceLevel }[] = [
  { title: 'Senior Backend Engineer', dept: 'Engineering', skills: ['Go', 'Distributed Systems', 'PostgreSQL', 'gRPC', 'Kubernetes'], tech: ['Go', 'PostgreSQL', 'Docker', 'Kubernetes', 'gRPC'], minExp: 5, maxExp: 8, level: 'Senior' },
  { title: 'Frontend Engineer', dept: 'Engineering', skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Frontend Architecture'], tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'], minExp: 3, maxExp: 6, level: 'Mid Level' },
  { title: 'Senior Frontend Architect', dept: 'Engineering', skills: ['React', 'TypeScript', 'Frontend Performance', 'Design Systems'], tech: ['React', 'TypeScript', 'Next.js', 'Vitest'], minExp: 6, maxExp: 9, level: 'Senior' },
  { title: 'Staff Platform Engineer', dept: 'Engineering', skills: ['Terraform', 'Kubernetes', 'AWS', 'CI/CD', 'Observability'], tech: ['AWS', 'Kubernetes', 'Terraform', 'Prometheus', 'ArgoCD'], minExp: 7, maxExp: 11, level: 'Staff' },
  { title: 'TypeScript Engineer', dept: 'Engineering', skills: ['TypeScript', 'Node.js', 'React', 'GraphQL', 'PostgreSQL'], tech: ['TypeScript', 'Node.js', 'GraphQL', 'Next.js', 'Prisma'], minExp: 4, maxExp: 7, level: 'Mid Level' },
  { title: 'Senior TypeScript Architect', dept: 'Engineering', skills: ['TypeScript', 'Distributed Systems', 'Full Stack', 'Cloud Architecture'], tech: ['TypeScript', 'Node.js', 'React', 'AWS', 'Redis'], minExp: 6, maxExp: 10, level: 'Senior' },
  { title: 'Machine Learning Engineer', dept: 'AI / ML', skills: ['Python', 'PyTorch', 'Transformers', 'MLOps', 'Vector Search'], tech: ['Python', 'PyTorch', 'Hugging Face', 'Qdrant', 'Kubeflow'], minExp: 4, maxExp: 7, level: 'Mid Level' },
  { title: 'Senior AI Research Engineer', dept: 'AI / ML', skills: ['Python', 'Deep Learning', 'LLMs', 'Model Optimization', 'CUDA'], tech: ['Python', 'PyTorch', 'CUDA', 'Triton', 'vLLM'], minExp: 5, maxExp: 9, level: 'Senior' },
  { title: 'Product Designer', dept: 'Design', skills: ['Figma', 'UI Design', 'Design Systems', 'Prototyping', 'User Research'], tech: ['Figma', 'Design Tokens', 'Storybook'], minExp: 3, maxExp: 6, level: 'Mid Level' },
  { title: 'Senior UX Researcher', dept: 'Design', skills: ['User Interviews', 'Usability Testing', 'Quantitative Analysis', 'Figma'], tech: ['Figma', 'Dovetail', 'Lookback', 'Hotjar'], minExp: 5, maxExp: 8, level: 'Senior' },
  { title: 'Technical Product Manager', dept: 'Product', skills: ['Product Strategy', 'API Architecture', 'Agile', 'Data Analysis'], tech: ['Linear', 'SQL', 'Mixpanel', 'Postman'], minExp: 4, maxExp: 7, level: 'Senior' },
  { title: 'Product Manager (Core Platform)', dept: 'Product', skills: ['Product Discovery', 'User Stories', 'Roadmapping', 'Metrics'], tech: ['Linear', 'Notion', 'Figma'], minExp: 3, maxExp: 5, level: 'Mid Level' },
  { title: 'Associate Product Manager', dept: 'Product', skills: ['Product Discovery', 'User Stories', 'Wireframing', 'Metrics'], tech: ['Linear', 'Notion', 'Figma'], minExp: 1, maxExp: 3, level: 'Junior' },
  { title: 'Entry Level Software Engineer', dept: 'Engineering', skills: ['TypeScript', 'React', 'Git', 'Problem Solving'], tech: ['TypeScript', 'React', 'Tailwind', 'Git'], minExp: 0, maxExp: 2, level: 'Entry Level' },
  { title: 'Junior Frontend Developer', dept: 'Engineering', skills: ['React', 'JavaScript', 'HTML/CSS', 'Responsive Design'], tech: ['React', 'JavaScript', 'Tailwind CSS'], minExp: 0, maxExp: 2, level: 'Entry Level' },
  { title: 'DevOps / Site Reliability Engineer', dept: 'Engineering', skills: ['Linux', 'Kubernetes', 'Terraform', 'Datadog', 'Incident Response'], tech: ['Kubernetes', 'Terraform', 'Datadog', 'AWS', 'GitHub Actions'], minExp: 4, maxExp: 7, level: 'Mid Level' },
  { title: 'Senior React Native Developer', dept: 'Engineering', skills: ['React Native', 'TypeScript', 'Expo', 'Mobile CI/CD'], tech: ['React Native', 'TypeScript', 'Expo', 'Fastlane'], minExp: 5, maxExp: 8, level: 'Senior' },
  { title: 'Security Engineer', dept: 'Engineering', skills: ['Application Security', 'Threat Modeling', 'Cloud Security', 'Penetration Testing'], tech: ['AWS IAM', 'Trivy', 'OWASP ZAP', 'Python'], minExp: 4, maxExp: 7, level: 'Mid Level' },
  { title: 'Data Engineer', dept: 'Data', skills: ['Python', 'SQL', 'Snowflake', 'dbt', 'Apache Airflow'], tech: ['Python', 'Snowflake', 'dbt', 'Airflow', 'Kafka'], minExp: 3, maxExp: 6, level: 'Mid Level' },
  { title: 'Senior Data Scientist', dept: 'Data', skills: ['Python', 'SQL', 'Statistical Modeling', 'Machine Learning', 'A/B Testing'], tech: ['Python', 'R', 'Snowflake', 'Pandas', 'Scikit-learn'], minExp: 5, maxExp: 8, level: 'Senior' },
  { title: 'Growth Marketing Manager', dept: 'Marketing', skills: ['Performance Marketing', 'SEO', 'Conversion Rate Optimization', 'Analytics'], tech: ['Google Analytics', 'HubSpot', 'Mixpanel', 'Webflow'], minExp: 4, maxExp: 7, level: 'Mid Level' },
  { title: 'Content & Technical Marketer', dept: 'Marketing', skills: ['Technical Writing', 'Developer Advocacy', 'SEO', 'Editorial'], tech: ['Notion', 'Webflow', 'Markdown', 'Ahrefs'], minExp: 2, maxExp: 5, level: 'Junior' },
  { title: 'Enterprise Account Executive', dept: 'Sales', skills: ['B2B SaaS Sales', 'Enterprise Closing', 'Pipeline Generation', 'CRM'], tech: ['Salesforce', 'Apollo', 'Gong', 'LinkedIn Sales Nav'], minExp: 4, maxExp: 8, level: 'Senior' },
  { title: 'Customer Success Manager', dept: 'Customer Success', skills: ['Onboarding', 'Account Retention', 'Technical Support', 'Zendesk'], tech: ['Zendesk', 'HubSpot', 'Linear', 'Loom'], minExp: 2, maxExp: 5, level: 'Mid Level' },
  { title: 'Operations & Remote People Lead', dept: 'People / HR', skills: ['Global Payroll', 'Talent Acquisition', 'Remote Culture', 'Compliance'], tech: ['Deel', 'Rippling', 'Ashby', 'Notion'], minExp: 5, maxExp: 8, level: 'Lead' }
];

const REGION_SETS = [
  {
    worldwide: true,
    allowedCountries: ['India', 'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Singapore', 'Australia', 'Brazil'],
    allowedRegions: ['Worldwide', 'APAC', 'EMEA', 'Americas']
  },
  {
    worldwide: true,
    allowedCountries: ['India', 'United States', 'Canada', 'United Kingdom', 'Netherlands', 'Spain', 'Poland'],
    allowedRegions: ['Worldwide', 'APAC', 'EMEA', 'Americas']
  },
  {
    worldwide: false,
    allowedCountries: ['India', 'Singapore', 'Japan', 'Australia', 'Indonesia', 'Philippines'],
    allowedRegions: ['APAC']
  },
  {
    worldwide: false,
    allowedCountries: ['United States', 'Canada'],
    allowedRegions: ['Americas']
  },
  {
    worldwide: false,
    allowedCountries: ['United Kingdom', 'Germany', 'France', 'Netherlands', 'Sweden', 'Ireland'],
    allowedRegions: ['Europe', 'EMEA']
  },
  {
    worldwide: false,
    allowedCountries: ['India', 'United Kingdom', 'Germany', 'United Arab Emirates'],
    allowedRegions: ['EMEA', 'APAC']
  },
  {
    worldwide: true,
    allowedCountries: ['India', 'Brazil', 'Mexico', 'Argentina', 'Colombia'],
    allowedRegions: ['Worldwide', 'LATAM', 'APAC']
  }
];

const SALARY_BANDS = [
  { min: 45000, max: 65000 },
  { min: 60000, max: 80000 },
  { min: 70000, max: 95000 },
  { min: 80000, max: 110000 },
  { min: 95000, max: 135000 },
  { min: 110000, max: 155000 },
  { min: 125000, max: 180000 },
  { min: 140000, max: 210000 }
];

/**
 * Generate a total of 200 deterministic jobs
 */
export function generateDeterministicJobs(): Job[] {
  const jobs: Job[] = [...CURATED_DEMO_JOBS];
  const targetCount = 200;

  for (let i = CURATED_DEMO_JOBS.length + 1; i <= targetCount; i++) {
    // Cross-rotate company and role using coprime multipliers so every combination is reached
    const company = COMPANIES[(i * 3) % COMPANIES.length];
    const role = ROLES[i % ROLES.length];
    const region = REGION_SETS[(i * 2) % REGION_SETS.length];
    const salaryBand = SALARY_BANDS[i % SALARY_BANDS.length];
    const daysAgo = (i % 28) + 1; // 1 to 28 days ago
    const hoursAgo = (i * 3) % 24;

    const salaryUsd = Math.round((salaryBand.min + salaryBand.max) / 2);
    const slug = `${company.name.toLowerCase().replace(/[^a-z0-9]/g, '')}-${role.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-job-${i}`;

    const job: Job = {
      id: `job-${i}`,
      slug,
      title: role.title,
      company: {
        ...company,
        logo: company.name.substring(0, 2).toUpperCase()
      },
      employmentType: (i % 12 === 0) ? 'Contract' : (i % 25 === 0) ? 'Part-time' : 'Full-time',
      experienceLevel: role.level,
      department: role.dept,
      remote: {
        type: (i % 5 === 0) ? 'Remote First' : 'Fully Remote',
        worldwide: region.worldwide,
        allowedCountries: region.allowedCountries,
        allowedRegions: region.allowedRegions,
        timezone: region.worldwide ? 'Flexible worldwide timezone' : 'Specified region core hours',
        timezoneOverlapHours: (i % 3) + 3
      },
      salary: {
        min: salaryBand.min,
        max: salaryBand.max,
        currency: 'USD',
        period: 'year',
        salaryUsdEquivalent: salaryUsd
      },
      equity: {
        available: (i % 3 !== 0),
        min: '0.05%',
        max: '0.25%'
      },
      skills: {
        required: role.skills,
        preferred: [`Modern tooling`, `CI/CD pipelines`, `System design`]
      },
      techStack: role.tech,
      minimumYearsExperience: role.minExp,
      maximumYearsExperience: role.maxExp,
      description: `${company.name} is seeking a motivated ${role.title} to join our distributed team. You will play a crucial role in delivering scalable systems and delighting global customers in the ${company.industry} space.`,
      responsibilities: [
        `Design and implement critical components in collaboration with cross-functional partners.`,
        `Maintain high technical standards through peer reviews, documentation, and automated testing.`,
        `Solve ambiguous technical hurdles while maintaining rapid iteration velocity.`,
        `Actively participate in asynchronous architectural discussions.`
      ],
      requirements: [
        `${role.minExp}+ years of relevant experience in ${role.dept.toLowerCase()} disciplines.`,
        `Proven track record with ${role.skills.slice(0, 2).join(' and ')}.`,
        `High self-drive, clear asynchronous communication, and collaborative mindset.`
      ],
      niceToHave: [
        `Prior experience working in distributed or remote-first startups.`,
        `Familiarity with modern deployment stacks and automated testing.`
      ],
      benefits: [
        `100% remote working culture with flexible hours`,
        `Comprehensive health, dental, and vision insurance`,
        `Generous hardware grant ($1,500 - $2,500)`,
        `Annual team gatherings in inspiring locations`,
        `Personal education and conference stipend`
      ],
      visaSponsorship: (i % 8 === 0),
      relocationSupport: false,
      postedDate: getIsoDateAgo(daysAgo, hoursAgo),
      applicationDeadline: `2026-11-${((i % 25) + 5).toString().padStart(2, '0')}`,
      featured: (i % 7 === 0),
      verifiedDemoCompany: true
    };

    jobs.push(job);
  }

  return jobs;
}
