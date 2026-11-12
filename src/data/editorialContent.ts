export interface ProjectStory {
  id: string;
  chapterNumber: string;
  title: string;
  subtitle: string;
  category: string;
  period: string;
  githubUrl: string;
  liveDemoUrl?: string;
  isComplete: boolean;
  
  // Editorial Storytelling Framework
  theProblem: string;
  theIdea: string;
  theBuild: string;
  theArchitecture: {
    summary: string;
    components: {
      name: string;
      role: string;
      tech: string;
    }[];
    dataFlowSteps: string[];
  };
  theChallenges: {
    title: string;
    description: string;
  }[];
  theLessons: string;
  whatComesNext: string[];
  codeExcerpt?: {
    filename: string;
    language: string;
    code: string;
    explanation: string;
  };
  technologies: string[];
}

export const PRAVEEN_PROFILE = {
  name: 'PRAVEEN C',
  title: 'Computer Science Engineer',
  focus: 'Backend Development · Distributed Systems · Cloud Engineering',
  headline: 'Building systems. Understanding problems. Creating things that matter.',
  education: {
    degree: 'Bachelor of Engineering in Computer Science and Engineering',
    institution: 'HKBK College of Engineering',
    location: 'Bengaluru, Karnataka, India',
    graduationYear: '2027 (Expected)',
    coursework: [
      'Data Structures & Algorithms',
      'Operating Systems',
      'Database Management Systems',
      'Computer Networks',
      'Object Oriented Programming',
    ],
  },
  socials: {
    github: 'https://github.com/PraveenC-13',
    linkedin: 'https://linkedin.com/in/praveenc13',
    leetcode: 'https://leetcode.com/u/PRAVEEN-C13',
    email: 'praveenc13.dev@gmail.com', // Configurable email address
  },
  statement: `I am an undergraduate computer science engineer in Bengaluru with a deep inclination toward backend architectures, systems programming, and algorithmic problem solving. Rather than assembling superficial interfaces or memorizing syntax, I prefer understanding how pieces fit under the hood—how spatial data is indexed in memory, how network protocols buffer telemetry under stress, and how autonomous feedback loops balance compute workloads.`,
  learningApproach: `My approach to software engineering is rooted in first principles and direct construction. When a concept fascinates me—be it concurrent stream processing, reinforcement learning control loops, or maritime berth optimization—I set up a local environment, inspect the bottlenecks, handle failure modes, and build a working system from scratch.`,
};

export const EDITORIAL_PROJECTS: ProjectStory[] = [
  {
    id: 'bmtc-tracker',
    chapterNumber: '01',
    title: 'BMTC TRACKER',
    subtitle: 'Real-Time Urban Transit Streaming & Geospatial Fleet Intelligence',
    category: 'DISTRIBUTED SYSTEMS & GEOSPATIAL STREAMING',
    period: '2025 – 2026',
    githubUrl: 'https://github.com/PraveenC-13/BMTC-Tracker',
    isComplete: true,
    technologies: ['Go', 'Redis Streams', 'PostgreSQL', 'PostGIS', 'Python', 'PWA Geolocation'],
    theProblem: `Bengaluru's municipal bus network (BMTC) operates across thousands of congested corridors where dynamic traffic congestion makes static timetable schedules unreliable. Commuters frequently endure unpredictable wait intervals, while existing tracking implementations struggle under heavy spatial query loads and inconsistent GPS update frequencies from mobile devices.`,
    theIdea: `To engineer a lightweight, resilient tracking backend capable of consuming high-frequency vehicular telemetry, computing spatial road snapping along bus route geometries, and calculating accurate arrival times (ETAs) using continuous speed interpolation—all without incurring the massive server overhead of heavy streaming brokers.`,
    theBuild: `Developed a native Go HTTP and streaming server featuring a custom geospatial routing engine. Integrated PostgreSQL with PostGIS extensions to store authentic BMTC routes, stop coordinates, and spatial trajectories. Designed a Redis Stream producer pipeline to buffer incoming vehicle telemetry, paired with an in-memory ETA computation engine that estimates arrival times based on recent corridor traversal velocities.`,
    theArchitecture: {
      summary: 'Decoupled event-driven streaming pipeline separating raw telemetry ingestion, geospatial road interpolation, and client SSE/polling broadcasts.',
      components: [
        { name: 'Go Ingestion API', role: 'Accepts high-frequency bus GPS pings and validates coordinate bounds', tech: 'Go (net/http)' },
        { name: 'Redis Streams Buffer', role: 'In-memory telemetry queue decoupling ingestion from spatial calculations', tech: 'Redis Streams' },
        { name: 'Native ETA Engine', role: 'Computes road segment distances, stop sequence order, and velocity-weighted travel time', tech: 'Go & Spatial Mathematics' },
        { name: 'PostGIS Spatial Store', role: 'Persists static transit corridors, stop geometries, and topological route vectors', tech: 'PostgreSQL & PostGIS' },
        { name: 'Client PWA', role: 'Lightweight responsive web interface with offline manifest and live bus marker rendering', tech: 'HTML5, CSS3 & JavaScript' },
      ],
      dataFlowSteps: [
        'Transit device emits latitude, longitude, vehicle ID, and route identifier over HTTP POST.',
        'Go backend validates bounding box and appends payload to a Redis stream buffer.',
        'ETA Engine reads stream, matches coordinates to nearest PostGIS route linestring, and identifies subsequent stops.',
        'Traversed segment speed history is pulled from Redis cache to compute remaining travel duration.',
        'Commuter client fetches real-time ETA countdowns and live vehicle pins on an interactive route map.',
      ],
    },
    theChallenges: [
      {
        title: 'Geospatial GPS Drift & Off-Road Jitter',
        description: 'Raw GPS coordinates in dense urban corridors often drift by 15–30 meters into adjacent buildings or parallel service roads. Resolved this by introducing nearest-neighbor orthogonal projection against pre-mapped route polyline coordinates.',
      },
      {
        title: 'Overhead of Heavy Streaming Brokers on Local Hardware',
        description: 'Initial architectures explored Apache Kafka, but running full Kafka brokers and Zookeeper clusters was unnecessarily resource-intensive for this scale. Migrated telemetry buffering to Redis Streams, reducing idle memory footprint by over 80% while retaining ordered log semantics.',
      },
    ],
    theLessons: `Building BMTC Tracker demonstrated the critical distinction between theoretical throughput and practical operational simplicity. I learned how spatial indexing structures (R-trees in PostGIS) work internally, how in-memory caching must handle stale sensor telemetry, and why backend latency directly influences user trust in real-time interfaces.`,
    whatComesNext: [
      'Incorporate historical time-of-day traffic models using machine learning to predict peak-hour congestion spikes.',
      'Implement Server-Sent Events (SSE) or WebSockets for zero-polling real-time bus marker movement.',
      'Add crowdsourced passenger occupancy estimation indicators.',
    ],
    codeExcerpt: {
      filename: 'backend-go/main.go',
      language: 'go',
      code: `// Lightweight Redis Stream Producer (replaces heavyweight Kafka + Zookeeper)
producer := NewStreamProducer(redisClient.client)
defer producer.Close()

// Native Go Traffic & Continuous Learning ETA Engine
etaEngine := NewETAEngine(db, redisClient)

server := &Server{
    db:          db,
    redis:       redisClient,
    producer:    producer,
    etaEngine:   etaEngine,
}`,
      explanation: 'Architecture initialization demonstrating the transition from heavyweight messaging brokers to an efficient Redis stream and native Go ETA calculation pipeline.',
    },
  },
  {
    id: 'cost-aware-autoscaling',
    chapterNumber: '02',
    title: 'COST-AWARE CLOUD AUTOSCALING',
    subtitle: 'Dynamic Resource Scaling via Proximal Policy Optimization (PPO)',
    category: 'CLOUD INFRASTRUCTURE & REINFORCEMENT LEARNING',
    period: '2026',
    githubUrl: 'https://github.com/PraveenC-13/Cost-aware-cloud-auto-scaling-Reinforcement-learning',
    isComplete: true,
    technologies: ['Python', 'PyTorch / RL Engine', 'Spring Boot', 'Docker Compose', 'InfluxDB', 'PostgreSQL'],
    theProblem: `Conventional cloud auto-scalers rely primarily on static threshold heuristics (e.g., scale up when CPU > 75%). In practice, this causes severe over-provisioning during transient traffic spikes, resulting in high infrastructure expenditure, or delayed scaling during sudden bursts, resulting in service level agreement (SLA) latency violations.`,
    theIdea: `To investigate whether a reinforcement learning agent—specifically using Proximal Policy Optimization (PPO)—could learn to balance two inherently conflicting objectives: minimizing compute resource costs while maintaining strict response time latency under fluctuating workload distributions.`,
    theBuild: `Architected a multi-service simulation environment orchestrated via Docker Compose. The framework incorporates a telemetry monitoring agent logging metrics to InfluxDB, a master control plane managing worker replica states, an RL training loop written in Python that formulates reward signals based on cost-versus-latency trade-offs, and a monitoring dashboard.`,
    theArchitecture: {
      summary: 'Closed-loop feedback architecture where an RL policy continuously observes cluster telemetry, predicts scaling adjustments, and tracks reward penalties.',
      components: [
        { name: 'Telemetry Agent', role: 'Collects CPU, memory, request volume, and latency percentiles every cycle', tech: 'Python & InfluxDB' },
        { name: 'RL Engine (PPO Policy)', role: 'Processes multi-variate system state and predicts action: Scale-Up, Scale-Down, or Hold', tech: 'Python / PyTorch' },
        { name: 'Master Control Plane', role: 'Executes pod/container scaling commands with safety cooldown guards', tech: 'Spring Boot (Java)' },
        { name: 'Metrics Persistence', role: 'Stores historical time-series performance data for training evaluation', tech: 'InfluxDB & PostgreSQL' },
        { name: 'Operator Dashboard', role: 'Visualizes real-time cluster size, reward curves, and SLA health indicators', tech: 'Web Dashboard' },
      ],
      dataFlowSteps: [
        'Cluster instances report operational metrics to the telemetry collection pipeline.',
        'State vector (CPU utilization, pending queue length, latency, cost rate) is normalized and fed into the RL policy network.',
        'The PPO policy evaluates state and outputs an action with confidence weights: Scale +1, Scale -1, or Hold.',
        'Master controller validates action against safety thresholds (minimum pods, cooldown timers) and modifies container replica counts.',
        'Reward is computed: positive for low cost within SLA, negative penalty if response times breach target latency thresholds.',
      ],
    },
    theChallenges: [
      {
        title: 'Action Thrashing (Rapid Scale-Up / Scale-Down Oscillation)',
        description: 'Early reward formulations caused the agent to rapidly alternate between provisioning and terminating instances on successive steps. Solved by introducing an action penalty for unnecessary state changes and enforcing a mandatory cooldown window.',
      },
      {
        title: 'Reward Function Alignment',
        description: 'Finding the correct numerical balance between dollar cost and millisecond latency was tricky; overweighting cost led to SLA violations, while overweighting latency resulted in redundant idle instances. Formulated an asymmetric penalty function that sharply punishes SLA breaches while offering incremental rewards for lean operations.',
      },
    ],
    theLessons: `This project deepened my appreciation for distributed control theory. I learned how reinforcement learning agents interact with non-stationary real-world environments, why automated systems require deterministic guardrails to prevent runaway states, and how multi-container simulation testbeds enable safe algorithmic experimentation.`,
    whatComesNext: [
      'Incorporate spot-instance price fluctuation feeds directly into the observation vector.',
      'Evaluate model transferability across diverse traffic workload patterns (e.g., diurnal cycles vs. sudden flash crowds).',
      'Benchmark PPO against standard Kubernetes Horizontal Pod Autoscaler (HPA) policies.',
    ],
  },
  {
    id: 'smart-port',
    chapterNumber: '03',
    title: 'SMART-PORT',
    subtitle: 'Maritime Port Operational Simulation & Data Analytics Platform',
    category: 'OPERATIONAL RESEARCH & MARITIME ANALYTICS',
    period: '2025 – 2026',
    githubUrl: 'https://github.com/PraveenC-13',
    isComplete: true,
    technologies: ['Python', 'Flask', 'NumPy', 'Pandas', 'SQLite', 'Tailwind CSS', 'Power BI'],
    theProblem: `Commercial container ports face massive operational bottlenecks when incoming vessel arrivals coincide with limited berth space, constrained crane allocations, and congested container yard trucks. Inefficient scheduling leads to expensive vessel demurrage fees and terminal gridlock.`,
    theIdea: `To build an operational simulation digital twin capable of modeling a 100-day container port traffic baseline, optimizing crane and truck allocations per berth, and exporting clean analytics pipelines for executive decision-making.`,
    theBuild: `Engineered a Python and Flask backend implementing a digital twin optimization engine. Configured SQLite to persist simulation epoch parameters and vessel turnaround metrics. Built an automated export pipeline in Pandas to generate structured datasets, paired with an interactive web telemetry dashboard and Power BI analytical reporting models.`,
    theArchitecture: {
      summary: 'Simulation engine generating synthetic maritime vessel loads, optimizing resource scheduling, and feeding a multi-stage data analytics pipeline.',
      components: [
        { name: 'Port Digital Twin Engine', role: 'Simulates vessel arrivals, cargo drafts, weather delays, and crane operations', tech: 'Python (NumPy / SciPy)' },
        { name: 'Flask REST API', role: 'Serves endpoints for triggering simulation runs, fetching berth occupancy, and history logs', tech: 'Python / Flask' },
        { name: 'Persistence Store', role: 'Records simulation results, epoch scores, and optimal resource configurations', tech: 'SQLite (port_data.db)' },
        { name: 'Analytics Pipeline', role: 'Extracts turnaround metrics, cleans timestamps, and exports CSV datasets', tech: 'Pandas & OpenPyXL' },
        { name: 'Operations Dashboard', role: 'Visualizes live dock allocations, berth utilization, and cargo manifests', tech: 'Tailwind CSS & JavaScript' },
      ],
      dataFlowSteps: [
        'Vessel traffic generator initializes 100-day schedules with varying ship capacities and container loads.',
        'Optimization module evaluates berth assignments, balancing crane crane density against vessel turnaround time.',
        'Operational scores are recorded into SQLite with epoch timestamps.',
        'Export pipeline computes daily port turnaround averages, berth occupancy rates, and demurrage risks.',
        'Data feeds both the web dashboard and executive Power BI analytical visual models.',
      ],
    },
    theChallenges: [
      {
        title: 'Constraint Satisfaction Under Peak Congestion',
        description: 'Simulating peak storm arrivals with consecutive vessel delays created cascaded scheduling deadlocks at berth queues. Implemented priority-based berth allocation heuristics based on vessel cargo urgency and demurrage penalty rates.',
      },
      {
        title: 'Deterministic Analytics Export Pipeline',
        description: 'Ensuring that simulation runs produced consistent, reproducible datasets for business intelligence without data leakage or timestamp desynchronization. Built rigorous validation steps handling nulls and data type casting before Excel/Power BI export.',
      },
    ],
    theLessons: `Smart-Port highlighted the intersection of software engineering and operational logistics. I gained hands-on experience building discrete-event simulation models, designing RESTful interfaces around computational engines, and architecting data transformation pipelines that bridge code with analytical reporting.`,
    whatComesNext: [
      'Implement real-time AIS vessel tracking API integration for live coastal ship arrivals.',
      'Develop dynamic weather impact simulations using marine weather radar feeds.',
      'Containerize the full simulation suite with Docker for automated reproducible runs.',
    ],
  },
  {
    id: 'trinityforge-hackathon',
    chapterNumber: '04',
    title: 'TRINITYFORGE HACKATHON',
    subtitle: 'Competitive Engineering, Fast Prototyping & Collaborative Problem Solving',
    category: 'HACKATHON & PROTOTYPE ENGINEERING',
    period: '2026',
    githubUrl: 'https://github.com/PraveenC-13',
    isComplete: false, // Placeholder as requested for user confirmation
    technologies: ['Full-Stack Prototyping', 'Rapid System Design', 'API Integration', 'Team Collaboration'],
    theProblem: `Hackathons demand identifying an impactful real-world bottleneck, designing an intuitive user journey, and building a fully functional technical prototype within strict time constraints—requiring rapid decision-making and ruthless scope prioritization.`,
    theIdea: `[Placeholder for Praveen to expand: Specific project concept, problem statement, and initial architectural direction established during the TrinityForge Hackathon].`,
    theBuild: `[Placeholder for Praveen to detail: Technologies selected, architectural breakdown, frontend-backend integration, and feature implementation delivered during the hackathon sprint].`,
    theArchitecture: {
      summary: 'Fast-cycle prototyping architecture built for reliability and presentation during intense competitive judging.',
      components: [
        { name: 'Core Application Service', role: 'Main logic handling user requests and computational pipelines', tech: 'Backend Services' },
        { name: 'Client Interface', role: 'Responsive presentation layer designed for clear evaluation', tech: 'Frontend UI' },
        { name: 'Data & External APIs', role: 'External service integration and storage mechanisms', tech: 'Databases & APIs' },
      ],
      dataFlowSteps: [
        'User inputs parameters or uploads datasets via the client interface.',
        'Application service validates inputs and invokes specialized processing pipelines.',
        'Results are structured and displayed with actionable insights on the dashboard.',
      ],
    },
    theChallenges: [
      {
        title: 'Time-Constrained Scope Management',
        description: 'Balancing ambitious architectural ideas with the strict temporal limits of a 24/48-hour hackathon sprint. Solved by ruthlessly prioritizing core user-facing functionality first.',
      },
      {
        title: 'Rapid Cross-Component Integration',
        description: 'Integrating frontend interfaces with backend services under pressure. Resolved by establishing strict API schemas early in the development sprint.',
      },
    ],
    theLessons: `Participating in TrinityForge reinforced the importance of rapid prototyping, clear modular service boundaries, and delivering clean, demonstrable user value over theoretical feature bloat.`,
    whatComesNext: [
      'Refactor the prototype codebase into an extensible production-ready architecture.',
      'Incorporate automated testing suites and CI/CD deployment pipelines.',
      'Expand documentation and open-source the project repository.',
    ],
  },
];

export const TECHNICAL_SKILLS = {
  backend: [
    { name: 'Go (Golang)', description: 'High-concurrency network servers, streaming pipelines, and microservices' },
    { name: 'Java', description: 'Enterprise backend development, Spring Boot patterns, and OOP principles' },
    { name: 'Python', description: 'Systems scripting, computational modeling, reinforcement learning, and data pipelines' },
  ],
  dataAndMessaging: [
    { name: 'PostgreSQL & PostGIS', description: 'Relational data modeling, spatial indexing (R-trees), and geospatial querying' },
    { name: 'Redis & Redis Streams', description: 'In-memory caching, pub/sub, distributed locks, and lightweight streaming buffers' },
    { name: 'Apache Kafka', description: 'Distributed event streaming concepts, partitioned logs, and consumer groups' },
    { name: 'InfluxDB & SQLite', description: 'Time-series telemetry storage and lightweight embedded operational databases' },
  ],
  cloudAndInfrastructure: [
    { name: 'Docker & Docker Compose', description: 'Multi-service container orchestration, repeatable dev environments, and Dockerfiles' },
    { name: 'AWS Essentials', description: 'Foundational cloud infrastructure concepts, EC2, S3, and serverless primitives' },
    { name: 'Linux & Shell Scripting', description: 'Command-line system administration, process management, and automated deployment scripts' },
  ],
  engineeringPractices: [
    { name: 'Data Structures & Algorithms', description: 'Active problem solving on LeetCode with emphasis on computational efficiency' },
    { name: 'RESTful API Architecture', description: 'Clean resource routing, status code conventions, validation, and error boundaries' },
    { name: 'Git & Version Control', description: 'Branching workflows, atomic commits, pull requests, and collaborative code reviews' },
    { name: 'First-Principles Debugging', description: 'Root-cause analysis through log inspection, network profiling, and trace inspection' },
  ],
};
