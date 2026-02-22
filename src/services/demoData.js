export const DEMO_DATA = {
    goalOverview: {
        summary:
            'A Full Stack Engineer in the Indian tech ecosystem designs, develops, and maintains end-to-end web applications. They are highly sought after by Indian startups and product companies for their versatility in both frontend and backend domains.',
        nature:
            'Daily work involves building React components, designing Scalable REST APIs using Node.js, managing databases, and collaborating with cross-functional teams in agile sprints at companies like Zomato or Flipkart.',
        responsibilities: [
            'Build and maintain scalable front-end interfaces using React and Tailwind CSS',
            'Design and implement secure RESTful APIs and microservices with Node.js',
            'Architect and manage relational (PostgreSQL) and NoSQL (MongoDB) databases',
            'Collaborate with DevOps teams for CI/CD pipeline deployments using Docker',
            'Participate in agile sprints, code reviews, and technical design discussions',
        ],
    },
    skillGap: {
        currentSkills: ['JavaScript', 'React', 'HTML/CSS', 'Git', 'Node.js'],
        missingSkills: [
            'TypeScript',
            'PostgreSQL',
            'Docker',
            'System Design',
            'Next.js',
            'AWS / Azure',
            'Unit Testing (Jest)',
        ],
        readinessScore: 38,
        readinessSummary:
            'You have solid foundations in the MERN stack but need to master TypeScript, System Design, and Cloud services to land senior roles in top Indian product firms.',
    },
    marketValue: {
        juniorSalary: '₹6 - ₹10 LPA',
        midSalary: '₹12 - ₹22 LPA',
        seniorSalary: '₹30 - ₹55 LPA',
        growthPotential: 'High — Experienced full-stack engineers in India see rapid 20-30% annual salary growth in product sectors.',
        currency: 'INR (₹)',
    },
    jobMarket: {
        demandLevel: 'Extremely High',
        demandDescription:
            'Full Stack Engineering remains the #1 most requested role in the Indian startup ecosystem (NASSCOM 2024 Report).',
        topIndustries: ['FinTech', 'E-commerce', 'SaaS', 'HealthTech', 'EdTech'],
        topCompanies: ['Zomato', 'Flipkart', 'Swiggy', 'PhonePe', 'Razorpay', 'CRED', 'TCS', 'Infosys'],
        topLocations: ['Bangalore', 'Hyderabad', 'Pune', 'Gurgaon', 'Noida'],
    },
    futureOutlook: {
        trend: 'Accelerating',
        trendDescription:
            'India is projected to become the world\'s largest developer base by 2027, with a heavy shift towards Full Stack roles.',
        aiImpact:
            'AI tools are increasing developer productivity in India, shifting the focus towards architecture, security, and complex business logic.',
        evolution:
            'Indian Full Stack roles will evolve into "AI-Enabled Product Engineers," requiring deeper integration of LLMs and cloud-native serverless architectures.',
    },
    roadmap: [
        {
            phase: 'Phase 1 — Foundations',
            duration: '4 weeks',
            skills: [
                {
                    name: 'TypeScript',
                    description: 'The industry standard for large-scale Indian product companies. Improves code reliability and developer experience.',
                    resources: [
                        { type: 'YouTube', title: 'TypeScript for Beginners', url: 'https://www.youtube.com/results?search_query=typescript+tutorial+hindi' },
                        { type: 'Coursera', title: 'Modern JavaScript with TypeScript', url: 'https://www.coursera.org/' },
                        { type: 'Docs', title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/' },
                        { type: 'Book', title: 'Programming TypeScript', url: 'https://www.amazon.in/' },
                    ],
                },
                {
                    name: 'PostgreSQL & SQL',
                    description: 'Core of transactional systems in FinTech and E-commerce. Essential for backend data integrity.',
                    resources: [
                        { type: 'YouTube', title: 'PostgreSQL Course (Free)', url: 'https://www.youtube.com/results?search_query=postgresql+course' },
                        { type: 'Docs', title: 'PostgreSQL Docs', url: 'https://www.postgresql.org/docs/' },
                    ],
                },
            ],
        },
        {
            phase: 'Phase 2 — Scalability & Architecture',
            duration: '6 weeks',
            skills: [
                {
                    name: 'System Design',
                    description: 'Required to crack interviews at companies like Swiggy, Uber India, or Amazon India.',
                    resources: [
                        { type: 'YouTube', title: 'Hitesh Choudhary - System Design', url: 'https://www.youtube.com/@HiteshChoudharydotcom' },
                        { type: 'Docs', title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer' },
                    ],
                },
            ],
        },
        {
            phase: 'Phase 3 — Cloud & Advanced Topics',
            duration: '4 weeks',
            skills: [
                {
                    name: 'Cloud Services (AWS/Azure)',
                    description: 'Modern Indian tech stacks are 100% cloud-native. Knowledge of EC2, S3, and Lambda is a must.',
                    resources: [
                        { type: 'YouTube', title: 'AWS Cloud Practitioner', url: 'https://www.youtube.com/results?search_query=aws+cloud+practitioner+hindi' },
                    ],
                },
            ],
        },
    ],
};
