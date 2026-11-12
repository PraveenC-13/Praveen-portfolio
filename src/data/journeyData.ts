export interface SceneMeta {
  id: string;
  chapterNumber: string;
  title: string;
  subtitle: string;
  quote: string;
  tech: string;
  category: string;
  color: string;
  description: string;
  duration: number; // relative scroll duration
}

export const JOURNEY_SCENES: SceneMeta[] = [
  {
    id: 'desert-node',
    chapterNumber: '01',
    title: 'THE ENDLESS DESERT',
    subtitle: 'THE NODE.JS MONUMENT',
    quote: 'Building the foundation.',
    tech: 'NODE.JS',
    category: 'RUNTIME & SERVERS',
    color: '#339933',
    description: 'A lone traveller steps into the boundless sandstone desert. Ahead in the scorching haze, an ancient monumental monolith stands weathered yet unshakable—carved deep with the authentic hexagonal Node.js glyph, representing event-driven scalability and resilient backend architectures.',
    duration: 1.0,
  },
  {
    id: 'beach-java',
    chapterNumber: '02',
    title: 'THE DESERT BEACH',
    subtitle: 'THE JAVA COFFEE MOMENT',
    quote: 'An essential part of the journey.',
    tech: 'JAVA',
    category: 'ENTERPRISE & RUNTIME',
    color: '#f89820',
    description: 'Transitioning from the burning dunes, the traveller arrives at a silent coastal shore where pale sand meets gentle ocean waves. Pausing on a weathered timber bench beneath the golden sunset, he lifts an engraved glass of steaming coffee featuring the authentic Java mark—a quiet moment of clarity before the voyage.',
    duration: 1.0,
  },
  {
    id: 'ocean-dragons',
    chapterNumber: '03',
    title: 'THE FURIOUS OCEAN',
    subtitle: 'THE NINE DSA DRAGONS',
    quote: 'Conquering algorithmic depths.',
    tech: 'DATA STRUCTURES & ALGORITHMS',
    category: 'CORE COMPUTATION',
    color: '#38bdf8',
    description: 'Boarding a seafaring vessel through torrential swells, 9 colossal mythical beasts rise from the deep. Each leviathan embodies an algorithmic titan—from indexed Array dragons to Tree branching leviathans and Sorting tempest storms.',
    duration: 2.2,
  },
  {
    id: 'kubernetes-helm',
    chapterNumber: '04',
    title: 'THE KUBERNETES HELM',
    subtitle: 'ORCHESTRATING THE STORM',
    quote: 'Orchestrating the journey.',
    tech: 'KUBERNETES',
    category: 'CONTAINER ORCHESTRATION',
    color: '#326ce5',
    description: 'Amidst gale winds and crushing waves, the traveller grasps the monumental ship helm bearing the official 7-spoked Kubernetes wheel. Every turn dynamically coordinates the vessel, navigating safely between the gargantuan algorithmic leviathans.',
    duration: 1.0,
  },
  {
    id: 'docker-whale',
    chapterNumber: '05',
    title: 'THE DOCKER WHALE',
    subtitle: 'THE GO COMPANION',
    quote: 'Building and packaging applications.',
    tech: 'DOCKER & GO',
    category: 'CONTAINERIZATION & CONCURRENCY',
    color: '#2496ed',
    description: 'The tempest calms into an ethereal ocean of deep navy and bioluminescent mist. A titanic photorealistic blue whale breaches gracefully, bearing container pods along its spine. Riding atop the gentle giant is the Go Gopher—embodying lightning-fast concurrency and lightweight microservices.',
    duration: 1.1,
  },
  {
    id: 'python-forest',
    chapterNumber: '06',
    title: 'THE PYTHON FOREST',
    subtitle: 'THE ANCIENT SERPENTS',
    quote: 'Exploring the power of programming.',
    tech: 'PYTHON',
    category: 'DATA SCIENCE & SYSTEM AUTOMATION',
    color: '#3776ab',
    description: 'The ship anchors at a misty primeval coastline. Stepping beneath towering redwood and mossy canopies, majestic serpents glide through the underbrush, circling a sacred stone emblem carved with the intertwined Python serpent geometry.',
    duration: 1.0,
  },
  {
    id: 'react-destination',
    chapterNumber: '07',
    title: 'THE REACT DESTINATION',
    subtitle: 'THE ATOM SANCTUARY',
    quote: 'Building interactive experiences.',
    tech: 'REACT',
    category: 'UI & CLIENT ARCHITECTURE',
    color: '#61dafb',
    description: 'At the heart of the forest clearing, sunlight penetrates the canopy onto a colossal monolithic stone sanctuary. Rotating silently at its core is the carved atomic orbital React glyph—symbolizing modular, reactive interfaces and state-driven elegance.',
    duration: 1.0,
  },
];

export interface ProjectData {
  id: string;
  number: string;
  title: string;
  name: string;
  tagline: string;
  description: string;
  technologies: string[];
  metrics: string[];
  architecture: string;
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
}

export const PROJECTS: ProjectData[] = [
  {
    id: 'bmtc-tracker',
    number: '01',
    name: 'BMTC TRACKER',
    title: 'A CITY IN MOTION',
    tagline: 'Real-Time Urban Transit & Geospatial Fleet Intelligence',
    description: 'High-throughput real-time public bus transportation monitoring engine deployed across Bengaluru transit networks. Ingests high-frequency GPS telemetry, processes route deviation algorithms, computes dynamic ETAs using spatial interpolation, and broadcasts low-latency stream updates to commuter devices.',
    technologies: ['Go', 'Apache Kafka', 'PostgreSQL', 'PostGIS', 'Redis', 'Python'],
    metrics: ['Sub-second ETA computation', 'Distributed Kafka ingestion pipeline', 'PostGIS spatial geofencing'],
    architecture: 'Microservices architecture with Go stream consumers, Redis geospatial caching, and Kafka partitioned message brokers.',
    githubUrl: 'https://github.com/PraveenC-13/BMTC-Tracker',
    featured: true,
  },
  {
    id: 'cost-aware-autoscaling',
    number: '02',
    name: 'COST-AWARE CLOUD AUTOSCALING',
    title: 'BALANCING THE CLOUD',
    tagline: 'Deep Reinforcement Learning Cloud Elasticity Engine',
    description: 'Autonomous cloud resource provisioning system powered by Proximal Policy Optimization (PPO). Evaluates workload variance, spot instance volatility, and SLA response time penalties to dynamically scale cluster pods with minimal financial expenditure.',
    technologies: ['Python', 'PPO Reinforcement Learning', 'Docker', 'Spring Boot', 'PostgreSQL', 'InfluxDB'],
    metrics: ['~34% Infrastructure cost reduction', 'Zero-SLA breach under stress spikes', 'Continuous policy convergence'],
    architecture: 'Custom Gymnasium environment, PyTorch actor-critic neural network, real-time InfluxDB telemetry feedback loop.',
    githubUrl: 'https://github.com/PraveenC-13/Cost-aware-cloud-auto-scaling-Reinforcement-learning',
    featured: true,
  },
  {
    id: 'smart-port',
    number: '03',
    name: 'SMART-PORT',
    title: 'BEYOND THE HORIZON',
    tagline: 'Maritime Port Logistics & Autonomous Berth Operations',
    description: 'Comprehensive maritime port management and logistics coordination platform. Features an interactive telemetry dashboard, berth assignment optimization, real-time cargo container tracking, and vessel arrival scheduling.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    metrics: ['Automated berth turnaround scheduling', 'Interactive dock telemetry board', 'Role-based vessel manifests'],
    architecture: 'Full-stack reactive web dashboard paired with containerized backend services and automated scheduling algorithms.',
    githubUrl: 'https://github.com/PraveenC-13',
    featured: true,
  },
];

export interface DsaDragon {
  id: string;
  number: string;
  name: string;
  concept: string;
  quote: string;
  creatureType: string;
  visualTrait: string;
  timeComplexity: string;
  color: string;
}

export const DSA_DRAGONS: DsaDragon[] = [
  {
    id: 'array',
    number: '01',
    name: 'ARRAY LEVIATHAN',
    concept: 'ARRAYS',
    quote: 'Understanding indexed data.',
    creatureType: 'Segmented Armoured Wyrm',
    visualTrait: 'Continuous contiguous segmented plates numbered 0..N, rigid spatial indexing',
    timeComplexity: 'O(1) Access · O(N) Insertion',
    color: '#f59e0b',
  },
  {
    id: 'linked-list',
    number: '02',
    name: 'SERPENTINE LINKER',
    concept: 'LINKED LISTS',
    quote: 'Connecting every element.',
    creatureType: 'Node-Chained Deep Sea Serpent',
    visualTrait: 'Fluorescent link pointers connecting distinct autonomous bodily nodes',
    timeComplexity: 'O(1) Insertion · O(N) Search',
    color: '#10b981',
  },
  {
    id: 'stack',
    number: '03',
    name: 'TITAN OF THE ABYSS',
    concept: 'STACKS',
    quote: 'Last in. First out.',
    creatureType: 'Vertical Column Monolith Dragon',
    visualTrait: 'Vertical towering column of layered basalt plates; only the topmost segment shifts',
    timeComplexity: 'O(1) Push / Pop',
    color: '#8b5cf6',
  },
  {
    id: 'queue',
    number: '04',
    name: 'STREAMING HYDRA',
    concept: 'QUEUES',
    quote: 'First in. First out.',
    creatureType: 'Sequential Oceanic Caravan',
    visualTrait: 'Head ingesting storm currents at front while wake trails out in strict FIFO order',
    timeComplexity: 'O(1) Enqueue / Dequeue',
    color: '#06b6d4',
  },
  {
    id: 'trees',
    number: '05',
    name: 'ARBOR WYRM & BST',
    concept: 'TREES & BST',
    quote: 'Exploring hierarchical structures.',
    creatureType: 'Branching Coral Behemoth',
    visualTrait: 'Central trunk with bilateral recursive antler branches balancing left and right',
    timeComplexity: 'O(log N) Average BST Lookup',
    color: '#14b8a6',
  },
  {
    id: 'heap',
    number: '06',
    name: 'THE APEX HEAP',
    concept: 'HEAPS & PRIORITY',
    quote: 'Understanding priority.',
    creatureType: 'Pyramidal Armoured Chimera',
    visualTrait: 'Dominant apex crown horn strictly towering above smaller child segments',
    timeComplexity: 'O(log N) Push / Extract-Max',
    color: '#eab308',
  },
  {
    id: 'graph',
    number: '07',
    name: 'THE SYNAPSE KRAKEN',
    concept: 'GRAPHS',
    quote: 'Exploring connected systems.',
    creatureType: 'Multi-Noded Network Entity',
    visualTrait: 'Cluster of bioluminescent heads interlinked by tension energy conduits',
    timeComplexity: 'Dijkstra / BFS / DFS Traversal',
    color: '#ec4899',
  },
  {
    id: 'hash-table',
    number: '08',
    name: 'CHAMBERED NAUTILUS',
    concept: 'HASH TABLES',
    quote: 'Fast access and mapping.',
    creatureType: 'Multi-Chambered Shell Monster',
    visualTrait: 'Array of partitioned bucket alcoves illuminated instantly by key indexing',
    timeComplexity: 'O(1) Average Lookup & Store',
    color: '#f97316',
  },
  {
    id: 'sorting',
    number: '09',
    name: 'THE SORTING VORTEX',
    concept: 'SORTING & SEARCHING',
    quote: 'Finding order in complexity.',
    creatureType: 'Swarm of Coordinated Razor Wyrms',
    visualTrait: 'Nine agile swimmers dynamically swapping positions into strictly sorted ascension',
    timeComplexity: 'O(N log N) Quicksort / Mergesort',
    color: '#6366f1',
  },
];

export const TRAVELLER_BIO = {
  name: 'Praveen C',
  title: 'Software Engineering · Distributed Systems · Development',
  degree: 'B.E. Computer Science and Engineering',
  college: 'HKBK College of Engineering, Bengaluru',
  graduationYear: '2027',
  location: 'Bengaluru, India',
  philosophy: 'A computer science engineering student passionate about scalable backend systems, cloud architectures, algorithmic problem solving, and immersive web craft. Believing that every system is a journey from chaotic dunes to resilient destinations.',
  linkedin: 'https://linkedin.com/in/praveenc13',
  github: 'https://github.com/PraveenC-13',
  email: 'praveenchinnaraja13@gmail.com',
};
