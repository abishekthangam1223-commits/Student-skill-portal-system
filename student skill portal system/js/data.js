/**
 * SkillSync - Student Skill Portal System
 * Mock Data & LocalStorage State Store
 */

const DEFAULT_PROFILE = {
    name: "Alex Morgan",
    handle: "alexmorgan_dev",
    title: "Senior Computer Science & AI Honors",
    tagline: "Aspiring Full-Stack Machine Learning Engineer & Cloud Architect",
    institution: "Institute of Technology & Applied Sciences",
    cohort: "Class of 2027 • Senior Year",
    email: "alex.morgan@university.edu",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    readinessScore: 84, // Overall readiness %
    readinessMetrics: {
        technical: 88,
        softSkills: 78,
        portfolio: 85,
        credentials: 86
    },
    stats: {
        skillsVerified: 18,
        activeCourses: 4,
        capstoneProjects: 3,
        globalRank: 12,
        totalStudents: 1420,
        totalPoints: 4850,
        streakDays: 32,
        peerEndorsements: 54
    },
    links: {
        github: "https://github.com/alexmorgan-dev",
        linkedin: "https://linkedin.com/in/alex-morgan-skillsync",
        portalRepo: "https://github.com/alexmorgan-dev/student-skill-portal"
    }
};

const DEFAULT_SKILLS = [
    // Technical Skills
    {
        id: "tech-python",
        name: "Python & Scientific Stack",
        category: "technical",
        proficiency: "Advanced",
        progress: 92,
        status: "verified",
        verifiedBy: "Faculty Assessment • Prof. Marcus Davis (Score: 96%)",
        verificationDate: "Sep 2026",
        endorsements: 19,
        endorsedBy: ["Elena Rostova", "Jordan Chen", "Maya Patel"],
        icon: "cpu",
        description: "Advanced async programming, NumPy, Pandas, PyTorch workflows, and performance optimization."
    },
    {
        id: "tech-react",
        name: "React 19 & Next.js Ecosystem",
        category: "technical",
        proficiency: "Advanced",
        progress: 88,
        status: "verified",
        verifiedBy: "Meta Front-End Spec • Credential Verified",
        verificationDate: "Aug 2026",
        endorsements: 16,
        endorsedBy: ["David Kim", "Sarah Lin"],
        icon: "code",
        description: "Server Components, hooks architecture, state machines, and performant reactive UI rendering."
    },
    {
        id: "tech-dsa",
        name: "Data Structures & Algorithms",
        category: "technical",
        proficiency: "Advanced",
        progress: 90,
        status: "verified",
        verifiedBy: "Competitive Programming Arena (Top 5% Rank)",
        verificationDate: "Oct 2026",
        endorsements: 22,
        endorsedBy: ["Elena Rostova", "Carlos Gomez", "Aria Thorne"],
        icon: "layers",
        description: "Graph algorithms, dynamic programming, tree traversals, and amortized complexity analysis."
    },
    {
        id: "tech-sql",
        name: "SQL & PostgreSQL Database Design",
        category: "technical",
        proficiency: "Intermediate",
        progress: 80,
        status: "verified",
        verifiedBy: "Database Systems Lab Assessment (Grade: A)",
        verificationDate: "Jul 2026",
        endorsements: 12,
        endorsedBy: ["Jordan Chen", "Sarah Lin"],
        icon: "layers",
        description: "Query planning, indexing, CTEs, normalization, and relational schema migrations."
    },
    {
        id: "tech-typescript",
        name: "TypeScript Strict & Architecture",
        category: "technical",
        proficiency: "Intermediate",
        progress: 82,
        status: "verified",
        verifiedBy: "Capstone Code Reviewer",
        verificationDate: "Aug 2026",
        endorsements: 14,
        endorsedBy: ["David Kim"],
        icon: "code",
        description: "Generics, conditional types, discriminated unions, and scalable type definitions."
    },
    {
        id: "tech-docker",
        name: "Docker & Container Orchestration",
        category: "technical",
        proficiency: "Intermediate",
        progress: 74,
        status: "in-progress",
        verifiedBy: "Pending final CI/CD deployment test",
        verificationDate: "In Progress",
        endorsements: 8,
        endorsedBy: ["Jordan Chen"],
        icon: "cpu",
        description: "Multi-stage builds, docker-compose, rootless containers, and deployment workflows."
    },
    {
        id: "tech-nodejs",
        name: "Node.js & Express Microservices",
        category: "technical",
        proficiency: "Advanced",
        progress: 86,
        status: "verified",
        verifiedBy: "Backend Engineering Practicum",
        verificationDate: "Jun 2026",
        endorsements: 15,
        endorsedBy: ["Carlos Gomez", "Maya Patel"],
        icon: "cpu",
        description: "Event-loop internals, streams, JWT security middleware, and clustering."
    },

    // Soft Skills
    {
        id: "soft-leadership",
        name: "Technical Team Leadership",
        category: "soft",
        proficiency: "Advanced",
        progress: 85,
        status: "verified",
        verifiedBy: "Hackathon Lead Mentor & Faculty Review",
        verificationDate: "Sep 2026",
        endorsements: 18,
        endorsedBy: ["Elena Rostova", "Maya Patel", "David Kim"],
        icon: "users",
        description: "Mentoring 8 junior developers, sprint prioritization, conflict mediation, and roadmap delivery."
    },
    {
        id: "soft-speaking",
        name: "Public Speaking & Tech Demos",
        category: "soft",
        proficiency: "Intermediate",
        progress: 78,
        status: "verified",
        verifiedBy: "University Tech Symposium Keynote Speaker",
        verificationDate: "May 2026",
        endorsements: 13,
        endorsedBy: ["Carlos Gomez"],
        icon: "sparkles",
        description: "Live technical demonstrations, slide deck storytelling, and Q&A handling."
    },
    {
        id: "soft-agile",
        name: "Agile & Scrum Sprint Workflow",
        category: "soft",
        proficiency: "Advanced",
        progress: 90,
        status: "verified",
        verifiedBy: "Certified Scrum Student Master (CSSM)",
        verificationDate: "Aug 2026",
        endorsements: 17,
        endorsedBy: ["Maya Patel", "Jordan Chen"],
        icon: "git-branch",
        description: "Standups, retrospective facilitation, backlog grooming, and burndown velocity tracking."
    },
    {
        id: "soft-problem",
        name: "Complex Problem Decomposition",
        category: "soft",
        proficiency: "Advanced",
        progress: 91,
        status: "verified",
        verifiedBy: "Algorithms Olympiad Faculty Committee",
        verificationDate: "Sep 2026",
        endorsements: 21,
        endorsedBy: ["Elena Rostova", "Aria Thorne"],
        icon: "trending-up",
        description: "Breaking multi-tier ambiguous problems into testable mathematical & engineering submodules."
    },

    // Emerging Tech
    {
        id: "emerging-genai",
        name: "GenAI & LLM Fine-Tuning",
        category: "emerging",
        proficiency: "Advanced",
        progress: 89,
        status: "verified",
        verifiedBy: "DeepLearning.AI Assessment Verified",
        verificationDate: "Oct 2026",
        endorsements: 20,
        endorsedBy: ["Elena Rostova", "Carlos Gomez", "Maya Patel"],
        icon: "sparkles",
        description: "LoRA, QLoRA, RAG with vector indices, prompt engineering, and evaluation guardrails."
    },
    {
        id: "emerging-cloud",
        name: "Cloud Architecture (AWS / GCP)",
        category: "emerging",
        proficiency: "Advanced",
        progress: 87,
        status: "verified",
        verifiedBy: "AWS Solutions Architect Associate Credential",
        verificationDate: "Aug 2026",
        endorsements: 16,
        endorsedBy: ["Jordan Chen", "David Kim"],
        icon: "shield-check",
        description: "VPC networking, serverless Lambda, S3 security policies, DynamoDB, and ECS."
    },
    {
        id: "emerging-mlops",
        name: "MLOps & Vector Search Pipelines",
        category: "emerging",
        proficiency: "Intermediate",
        progress: 75,
        status: "in-progress",
        verifiedBy: "Course in progress (Assignment 3 submitted)",
        verificationDate: "Pending Review",
        endorsements: 9,
        endorsedBy: ["Elena Rostova"],
        icon: "cpu",
        description: "ChromaDB, Pinecone, MLflow model registry, and automated inference endpoints."
    },
    {
        id: "emerging-cyber",
        name: "Cybersecurity & OAuth2 / RBAC",
        category: "emerging",
        proficiency: "Intermediate",
        progress: 72,
        status: "verified",
        verifiedBy: "Security Lab Challenge (White-Hat Rank)",
        verificationDate: "Jun 2026",
        endorsements: 11,
        endorsedBy: ["Jordan Chen"],
        icon: "shield-check",
        description: "PKCE flow, asymmetric token verification, CSP header hardening, and OWASP Top 10 defense."
    }
];

const DEFAULT_PROJECTS = [
    {
        id: "proj-1",
        title: "NeuroPulse - Clinical AI Diagnostic Assistant",
        tagline: "HIPAA-compliant medical summarization engine utilizing localized LLMs",
        description: "Engineered a high-performance clinical NLP pipeline that ingests physician voice recordings, extracts medical entities (SNOMED-CT / ICD-10), and produces structured EHR SOAP notes in under 800ms.",
        category: "AI & Healthcare",
        tags: ["Python", "FastAPI", "React", "LangChain", "Docker", "PyTorch"],
        skillsUtilized: ["Python & Scientific Stack", "GenAI & LLM Fine-Tuning", "React 19 & Next.js Ecosystem", "Docker & Container Orchestration"],
        githubUrl: "https://github.com/alexmorgan-dev/neuropulse-ai",
        demoUrl: "https://neuropulse-ai.demo.app",
        stars: 148,
        featured: true,
        gradient: "linear-gradient(135deg, #3b82f6 0%, #2dd4bf 100%)",
        icon: "sparkles",
        date: "Fall 2026"
    },
    {
        id: "proj-2",
        title: "Distributed Stream Ledger & Consensus Engine",
        tagline: "Asynchronous fault-tolerant transaction pipeline running 45,000 TPS",
        description: "Built a distributed log architecture featuring Raft consensus, dynamic shard rebalancing, zero-copy socket serialization, and benchmarked resilience against arbitrary node dropouts.",
        category: "Systems & Cloud",
        tags: ["Node.js", "TypeScript", "SQL & PostgreSQL", "Redis", "Docker"],
        skillsUtilized: ["Node.js & Express Microservices", "TypeScript Strict & Architecture", "SQL & PostgreSQL Database Design"],
        githubUrl: "https://github.com/alexmorgan-dev/stream-ledger",
        demoUrl: "https://streamledger.dev",
        stars: 96,
        featured: true,
        gradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
        icon: "layers",
        date: "Summer 2026"
    },
    {
        id: "proj-3",
        title: "OmniFlow - Agile Velocity & PR Health Predictor",
        tagline: "ML-driven sprint delivery analytics and Monte Carlo simulation",
        description: "Empowered 12 university student engineering teams with automated Git repository telemetry, PR review bottlenecks detection, and probabilistic completion forecasts.",
        category: "DevOps & Tooling",
        tags: ["React", "TypeScript", "Chart.js", "REST & GraphQL APIs", "TailwindCSS"],
        skillsUtilized: ["React 19 & Next.js Ecosystem", "Agile & Scrum Sprint Workflow", "Technical Team Leadership"],
        githubUrl: "https://github.com/alexmorgan-dev/omniflow-agile",
        demoUrl: "https://omniflow-suite.io",
        stars: 84,
        featured: true,
        gradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
        icon: "trending-up",
        date: "Spring 2026"
    },
    {
        id: "proj-4",
        title: "Autonomous Drone Visual Odometry Simulator",
        tagline: "Synthetic vision obstacle avoidance in GPS-denied environments",
        description: "Implemented stereo-camera depth estimation and optical flow SLAM for micro quadcopters navigating simulated dense forest canopies using ROS2 and PyTorch.",
        category: "Robotics & CV",
        tags: ["Python", "PyTorch", "Computer Vision", "ROS2", "Docker"],
        skillsUtilized: ["Python & Scientific Stack", "Complex Problem Decomposition", "Docker & Container Orchestration"],
        githubUrl: "https://github.com/alexmorgan-dev/vision-drone-sim",
        demoUrl: "https://drone-sim-sandbox.tech",
        stars: 112,
        featured: false,
        gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
        icon: "cpu",
        date: "Winter 2026"
    }
];

const DEFAULT_CERTIFICATIONS = [
    {
        id: "cert-aws",
        title: "AWS Certified Solutions Architect – Associate",
        issuer: "Amazon Web Services (AWS)",
        issuerLogo: "aws",
        issueDate: "August 2026",
        expiryDate: "August 2029 (Active)",
        credentialId: "AWS-SAA-840912-VERIFIED",
        verifyUrl: "https://aws.amazon.com/verification/AWS-SAA-840912",
        status: "Verified",
        tier: "Gold",
        skills: ["Cloud Architecture (AWS / GCP)", "Docker & Containers", "Security"],
        badgeIcon: "shield-check",
        description: "Validates comprehensive expertise in designing secure, resilient, high-performing cloud architectures."
    },
    {
        id: "cert-meta",
        title: "Meta Front-End Developer Professional Certificate",
        issuer: "Meta & Coursera",
        issuerLogo: "meta",
        issueDate: "June 2026",
        expiryDate: "Lifetime Credential",
        credentialId: "META-FED-9924-HONORS",
        verifyUrl: "https://coursera.org/verify/META-FED-9924",
        status: "Verified",
        tier: "Gold",
        skills: ["React 19 & Next.js Ecosystem", "TypeScript Strict & Architecture"],
        badgeIcon: "code",
        description: "Mastery of advanced modern JavaScript, React components, state management, testing, and UX design."
    },
    {
        id: "cert-dlai",
        title: "Generative AI with Large Language Models",
        issuer: "DeepLearning.AI & AWS",
        issuerLogo: "deeplearning",
        issueDate: "September 2026",
        expiryDate: "Lifetime Credential",
        credentialId: "DLAI-GENAI-44102-LLM",
        verifyUrl: "https://deeplearning.ai/verify/DLAI-GENAI-44102",
        status: "Verified",
        tier: "Platinum",
        skills: ["GenAI & LLM Fine-Tuning", "Python & Scientific Stack"],
        badgeIcon: "sparkles",
        description: "Hands-on fine-tuning (PEFT/LoRA), RLHF, quantization, and deployment of foundation models."
    },
    {
        id: "cert-google",
        title: "Google Cloud Professional Data Engineer",
        issuer: "Google Cloud",
        issuerLogo: "google",
        issueDate: "July 2026",
        expiryDate: "July 2028 (Active)",
        credentialId: "GCP-PDE-102938-CERT",
        verifyUrl: "https://googlecloud.credential.net/GCP-PDE-102938",
        status: "Verified",
        tier: "Gold",
        skills: ["SQL & PostgreSQL Database Design", "Cloud Architecture (AWS / GCP)"],
        badgeIcon: "layers",
        description: "Designing, building, operationalizing, securing, and monitoring data processing systems on GCP."
    },
    {
        id: "cert-cs50",
        title: "Harvard CS50: Introduction to Computer Science",
        issuer: "HarvardX / edX",
        issuerLogo: "harvard",
        issueDate: "January 2025",
        expiryDate: "Lifetime Credential",
        credentialId: "CS50X-EDX-771890",
        verifyUrl: "https://certificates.cs50.io/771890",
        status: "Verified",
        tier: "Silver",
        skills: ["Data Structures & Algorithms", "Python & Scientific Stack"],
        badgeIcon: "graduation-cap",
        description: "Comprehensive foundational computer science principles, memory allocation, and algorithmic design."
    }
];

const DEFAULT_BADGES = [
    {
        id: "badge-algo",
        title: "Algorithm Grandmaster",
        rarity: "Top 2% University-wide",
        tier: "Diamond",
        earnedDate: "Oct 2026",
        icon: "trophy",
        color: "#6366f1",
        description: "Solved 120+ algorithmic challenges with optimal runtime and zero memory regressions."
    },
    {
        id: "badge-oss",
        title: "Open Source Architect",
        rarity: "Top 5% Contributor",
        tier: "Platinum",
        earnedDate: "Sep 2026",
        icon: "git-branch",
        color: "#10b981",
        description: "Authored 4 production PRs accepted into major open-source machine learning repositories."
    },
    {
        id: "badge-hack",
        title: "Hackathon Champion 2026",
        rarity: "1st Place Winner",
        tier: "Gold",
        earnedDate: "Aug 2026",
        icon: "sparkles",
        color: "#f59e0b",
        description: "Led 4-person team to first place in the Annual AI Innovation Collegiate Hackathon."
    },
    {
        id: "badge-streak",
        title: "32-Day Code Sprint",
        rarity: "Consistency Legend",
        tier: "Gold",
        earnedDate: "Current Active",
        icon: "flame",
        color: "#ec4899",
        description: "Maintained daily verified commits, skill assessments, or peer reviews for 32 consecutive days."
    },
    {
        id: "badge-mentor",
        title: "Peer Mentor Commendation",
        rarity: "Faculty Honoree",
        tier: "Silver",
        earnedDate: "Jul 2026",
        icon: "users",
        color: "#06b6d4",
        description: "Received 50+ helpful endorsements from peers for code reviews and lab tutoring."
    },
    {
        id: "badge-security",
        title: "Zero-Vuln Security Auditor",
        rarity: "Specialist",
        tier: "Bronze",
        earnedDate: "May 2026",
        icon: "shield-check",
        color: "#8b5cf6",
        description: "Passed rigorous secure code verification with 100% defense against OWASP top vulnerabilities."
    }
];

const DEFAULT_LEADERBOARD = [
    {
        rank: 1,
        name: "Elena Rostova",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        major: "AI & Quantum Computing",
        year: "Senior",
        score: 5420,
        skillsCount: 24,
        badgesCount: 12,
        trend: "up",
        highlightSkill: "Quantum Algorithms & PyTorch",
        endorsements: 88,
        isCurrentUser: false,
        github: "https://github.com/elena-rostova",
        linkedin: "https://linkedin.com/in/elena-rostova-dev"
    },
    {
        rank: 2,
        name: "Jordan Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        major: "Cybersecurity & Systems",
        year: "Senior",
        score: 5210,
        skillsCount: 22,
        badgesCount: 11,
        trend: "up",
        highlightSkill: "Rust Kernel Dev & Zero-Trust",
        endorsements: 76,
        isCurrentUser: false,
        github: "https://github.com/jordanchen-sec",
        linkedin: "https://linkedin.com/in/jordan-chen-cyber"
    },
    {
        rank: 3,
        name: "Maya Patel",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
        major: "Cloud Architecture & DevOps",
        year: "Junior",
        score: 5090,
        skillsCount: 21,
        badgesCount: 10,
        trend: "neutral",
        highlightSkill: "Kubernetes & Multi-Cloud",
        endorsements: 64,
        isCurrentUser: false,
        github: "https://github.com/mayapatel-cloud",
        linkedin: "https://linkedin.com/in/maya-patel-cloud"
    },
    {
        rank: 4,
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
        major: "Full-Stack Web Engineering",
        year: "Senior",
        score: 4970,
        skillsCount: 19,
        badgesCount: 9,
        trend: "up",
        highlightSkill: "Distributed Systems & React",
        endorsements: 60,
        isCurrentUser: false,
        github: "https://github.com/davidkim-fullstack",
        linkedin: "https://linkedin.com/in/david-kim-eng"
    },
    {
        rank: 5,
        name: "Carlos Gomez",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
        major: "Data Engineering & Analytics",
        year: "Senior",
        score: 4910,
        skillsCount: 19,
        badgesCount: 8,
        trend: "down",
        highlightSkill: "Apache Spark & Real-time Kafka",
        endorsements: 52,
        isCurrentUser: false,
        github: "https://github.com/carlosgomez-data",
        linkedin: "https://linkedin.com/in/carlos-gomez-dev"
    },
    {
        rank: 12,
        name: "Alex Morgan (You)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        major: "Computer Science & AI Honors",
        year: "Senior",
        score: 4850,
        skillsCount: 18,
        badgesCount: 8,
        trend: "up",
        highlightSkill: "GenAI & LLM Fine-Tuning",
        endorsements: 54,
        isCurrentUser: true,
        github: "https://github.com/alexmorgan-dev",
        linkedin: "https://linkedin.com/in/alex-morgan-skillsync"
    },
    {
        rank: 13,
        name: "Sarah Lin",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
        major: "HCI & UI Engineering",
        year: "Junior",
        score: 4790,
        skillsCount: 17,
        badgesCount: 7,
        trend: "up",
        highlightSkill: "Accessibility & Design Systems",
        endorsements: 49,
        isCurrentUser: false,
        github: "https://github.com/sarahlin-ui",
        linkedin: "https://linkedin.com/in/sarah-lin-ux"
    },
    {
        rank: 14,
        name: "Aria Thorne",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80",
        major: "Bioinformatics & ML",
        year: "Senior",
        score: 4710,
        skillsCount: 16,
        badgesCount: 7,
        trend: "neutral",
        highlightSkill: "AlphaFold & Genomics Modeling",
        endorsements: 45,
        isCurrentUser: false,
        github: "https://github.com/ariathorne-bio",
        linkedin: "https://linkedin.com/in/aria-thorne-ai"
    }
];

const DEFAULT_ROADMAPS = [
    {
        id: "roadmap-ai-engineer",
        title: "Full-Stack AI & LLM Systems Engineer",
        targetRole: "Machine Learning / AI Software Engineer",
        completion: 82,
        milestones: [
            { id: "m1", title: "Foundational Python & DSA", status: "completed", date: "Q1 2025", desc: "Data structures, Big-O, asymptotic analysis, vector math" },
            { id: "m2", title: "Modern Web Frontend & APIs", status: "completed", date: "Q3 2025", desc: "React, Next.js, asynchronous state, REST/GraphQL" },
            { id: "m3", title: "Deep Learning Foundations", status: "completed", date: "Q1 2026", desc: "PyTorch, backpropagation, CNNs & Transformers architecture" },
            { id: "m4", title: "LLM Fine-Tuning & Prompt Systems", status: "completed", date: "Q3 2026", desc: "LoRA, PEFT, RAG pipelines, ChromaDB vector indexing" },
            { id: "m5", title: "Production Agentic Architectures", status: "in-progress", date: "Q4 2026", desc: "Multi-agent orchestration, tool calling, guardrails, LangGraph" },
            { id: "m6", title: "Edge Inference & TensorRT-LLM", status: "upcoming", date: "Q1 2027", desc: "Model quantization (GGUF/AWQ), vLLM deployment, low-latency APIs" }
        ]
    },
    {
        id: "roadmap-cloud-devops",
        title: "Cloud Infrastructure & Scalable Systems",
        targetRole: "Site Reliability / Cloud Architect",
        completion: 64,
        milestones: [
            { id: "c1", title: "Linux & Bash Internals", status: "completed", date: "Q2 2025", desc: "Process scheduling, IPC, memory management, scripting" },
            { id: "c2", title: "AWS Core Solutions Architect", status: "completed", date: "Q3 2026", desc: "IAM, VPC, EC2, S3, RDS, Lambda serverless patterns" },
            { id: "c3", title: "Containerization & Docker", status: "completed", date: "Q3 2026", desc: "Multi-stage images, rootless security, compose orchestration" },
            { id: "c4", title: "Kubernetes Cluster Management", status: "in-progress", date: "Q4 2026", desc: "Deployments, Ingress controllers, Helm charts, ServiceMesh" },
            { id: "c5", title: "Terraform Infrastructure as Code", status: "upcoming", date: "Q1 2027", desc: "Declarative multi-cloud provisioning and state locking" }
        ]
    }
];

const DEFAULT_ACTIVITIES = [
    {
        id: "act-1",
        title: "Skill Verification Approved",
        desc: "Prof. Marcus Davis certified your 'GenAI & LLM Fine-Tuning' assessment (Score: 94%).",
        time: "2 hours ago",
        type: "verification",
        icon: "badge-check"
    },
    {
        id: "act-2",
        title: "New Peer Endorsement",
        desc: "Elena Rostova endorsed your 'Python & Scientific Stack' skill.",
        time: "5 hours ago",
        type: "endorsement",
        icon: "users"
    },
    {
        id: "act-3",
        title: "Project Milestone Upvoted",
        desc: "NeuroPulse reached 148 GitHub stars and 12 campus upvotes.",
        time: "Yesterday",
        type: "project",
        icon: "star"
    },
    {
        id: "act-4",
        title: "Digital Credential Synchronized",
        desc: "AWS Certified Solutions Architect ID was successfully verified via Credential Registry.",
        time: "3 days ago",
        type: "cert",
        icon: "shield-check"
    }
];

// State Manager with LocalStorage Fallback
class SkillSyncStore {
    constructor() {
        this.profile = this.load('skillsync_profile', DEFAULT_PROFILE);
        this.skills = this.load('skillsync_skills', DEFAULT_SKILLS);
        this.projects = this.load('skillsync_projects', DEFAULT_PROJECTS);
        this.certifications = this.load('skillsync_certs', DEFAULT_CERTIFICATIONS);
        this.badges = this.load('skillsync_badges', DEFAULT_BADGES);
        this.leaderboard = this.load('skillsync_leaderboard', DEFAULT_LEADERBOARD);
        this.roadmaps = this.load('skillsync_roadmaps', DEFAULT_ROADMAPS);
        this.activities = this.load('skillsync_activities', DEFAULT_ACTIVITIES);
    }

    load(key, fallback) {
        try {
            const stored = localStorage.getItem(key);
            if (stored) return JSON.parse(stored);
        } catch (e) {
            console.warn(`LocalStorage read error for ${key}:`, e);
        }
        return JSON.parse(JSON.stringify(fallback));
    }

    save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.warn(`LocalStorage write error for ${key}:`, e);
        }
    }

    // Skill Methods
    addSkill(newSkill) {
        const skill = {
            id: 'skill-' + Date.now(),
            endorsements: 1,
            endorsedBy: ["Faculty Review Pending"],
            verificationDate: "Pending",
            ...newSkill
        };
        this.skills.unshift(skill);
        this.save('skillsync_skills', this.skills);
        this.recalculateStats();
        return skill;
    }

    requestVerification(skillId, proofDetails) {
        const skill = this.skills.find(s => s.id === skillId);
        if (skill) {
            skill.status = "pending";
            skill.verifiedBy = `Verification Requested: ${proofDetails.substring(0, 45)}...`;
            this.save('skillsync_skills', this.skills);
            
            this.activities.unshift({
                id: 'act-' + Date.now(),
                title: "Verification Requested",
                desc: `Submitted verification request for ${skill.name}.`,
                time: "Just now",
                type: "verification",
                icon: "clock"
            });
            this.save('skillsync_activities', this.activities);
        }
        return skill;
    }

    endorseSkill(skillId) {
        const skill = this.skills.find(s => s.id === skillId);
        if (skill) {
            skill.endorsements += 1;
            this.save('skillsync_skills', this.skills);
            this.profile.stats.peerEndorsements += 1;
            this.save('skillsync_profile', this.profile);
        }
        return skill;
    }

    // Project Methods
    addProject(newProject) {
        const project = {
            id: 'proj-' + Date.now(),
            stars: 1,
            featured: false,
            date: "Current",
            gradient: "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
            icon: "folder-git",
            ...newProject
        };
        this.projects.unshift(project);
        this.save('skillsync_projects', this.projects);
        this.profile.stats.capstoneProjects += 1;
        this.recalculateStats();

        this.activities.unshift({
            id: 'act-' + Date.now(),
            title: "New Project Published",
            desc: `Added '${project.title}' to portfolio showcase.`,
            time: "Just now",
            type: "project",
            icon: "folder-git"
        });
        this.save('skillsync_activities', this.activities);
        return project;
    }

    upvoteProject(projectId) {
        const proj = this.projects.find(p => p.id === projectId);
        if (proj) {
            proj.stars += 1;
            this.save('skillsync_projects', this.projects);
        }
        return proj;
    }

    // Certification Methods
    addCertification(certData) {
        const cert = {
            id: 'cert-' + Date.now(),
            status: "Verified",
            tier: "Gold",
            badgeIcon: "award",
            ...certData
        };
        this.certifications.unshift(cert);
        this.save('skillsync_certs', this.certifications);
        this.recalculateStats();

        this.activities.unshift({
            id: 'act-' + Date.now(),
            title: "Credential Added",
            desc: `Verified new credential: ${cert.title}`,
            time: "Just now",
            type: "cert",
            icon: "award"
        });
        this.save('skillsync_activities', this.activities);
        return cert;
    }

    // Peer Endorsement on Leaderboard
    endorsePeer(peerName) {
        const peer = this.leaderboard.find(p => p.name === peerName);
        if (peer) {
            peer.endorsements += 1;
            peer.score += 25;
            this.save('skillsync_leaderboard', this.leaderboard);
        }
        return peer;
    }

    recalculateStats() {
        const verifiedCount = this.skills.filter(s => s.status === 'verified').length;
        this.profile.stats.skillsVerified = verifiedCount;
        this.profile.stats.capstoneProjects = this.projects.length;
        
        // Dynamic Readiness calculation
        const techAvg = this.getCategoryAvg('technical');
        const softAvg = this.getCategoryAvg('soft');
        const emergingAvg = this.getCategoryAvg('emerging');
        const certBonus = Math.min(100, this.certifications.length * 18);
        const overall = Math.round((techAvg * 0.35) + (softAvg * 0.2) + (emergingAvg * 0.25) + (certBonus * 0.2));
        
        this.profile.readinessScore = Math.min(99, Math.max(50, overall));
        this.profile.readinessMetrics.technical = Math.round(techAvg);
        this.profile.readinessMetrics.softSkills = Math.round(softAvg);
        this.profile.readinessMetrics.credentials = Math.round(certBonus);
        this.save('skillsync_profile', this.profile);
    }

    getCategoryAvg(category) {
        const filtered = this.skills.filter(s => s.category === category);
        if (!filtered.length) return 75;
        const sum = filtered.reduce((acc, curr) => acc + curr.progress, 0);
        return sum / filtered.length;
    }

    resetToDefaults() {
        localStorage.clear();
        this.profile = JSON.parse(JSON.stringify(DEFAULT_PROFILE));
        this.skills = JSON.parse(JSON.stringify(DEFAULT_SKILLS));
        this.projects = JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
        this.certifications = JSON.parse(JSON.stringify(DEFAULT_CERTIFICATIONS));
        this.badges = JSON.parse(JSON.stringify(DEFAULT_BADGES));
        this.leaderboard = JSON.parse(JSON.stringify(DEFAULT_LEADERBOARD));
        this.roadmaps = JSON.parse(JSON.stringify(DEFAULT_ROADMAPS));
        this.activities = JSON.parse(JSON.stringify(DEFAULT_ACTIVITIES));
    }
}

// Global store instance
window.skillSyncStore = new SkillSyncStore();
