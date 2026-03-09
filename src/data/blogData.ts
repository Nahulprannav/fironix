export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    tag: string;
    content?: string;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        title: "Why MERN Stack is Still the Go-To for Full-Stack Devs in 2026",
        excerpt: "From server actions to edge rendering — here's why MongoDB, Express, React and Node continue to dominate modern web app architecture.",
        category: "Web Development",
        author: "Arvind Menon",
        date: "Feb 10, 2026",
        readTime: "7 min",
        tag: "engineering",
        content: `
            <p>The web development landscape has shifted significantly over the last decade, yet the MERN (MongoDB, Express, React, Node.js) stack remains at the pinnacle of industry choice. But why?</p>
            <h3>The Unified Language Advantage</h3>
            <p>JavaScript everywhere. This remains the strongest argument for MERN. Developers can switch between frontend and backend contexts with minimal friction. In 2026, with the maturity of TypeScript and the Hermes engine, this synergy is more powerful than ever.</p>
            <h3>JSON-First Architecture</h3>
            <p>MongoDB's BSON structure naturally mirrors JavaScript objects.</p>
            <h3>The React 19 Ecosystem</h3>
            <p>With the release of React 19, the integration between client and server has reached a new level.</p>
            <blockquote>"The MERN stack isn't just about the technologies; it's about the developer velocity it enables."</blockquote>
        `
    },
    { id: 2, title: "The Hidden Art of JWT: Beyond the Tutorials", excerpt: "Most courses teach you to 'sign' a token. Few explain token rotation, revocation, and the subtle attacks that break authentication flows.", category: "Cyber Security", author: "Priya Sharma", date: "Feb 12, 2026", readTime: "9 min", tag: "security", content: "<p>Deep dive into JWT security coming soon...</p>" },
    { id: 3, title: "Transformers 101: How Attention Literally Changed AI", excerpt: "A plain-English breakdown of multi-head attention, positional embeddings, and why encoder-decoder flows power every LLM you use today.", category: "Machine Learning", author: "Dr. Rohit Nair", date: "Feb 14, 2026", readTime: "11 min", tag: "ai", content: "<p>AI architecture deep dive coming soon...</p>" },
    { id: 4, title: "SQL Window Functions Will Change How You Think About Data", excerpt: "ROW_NUMBER, LAG, LEAD, NTILE — explaining each function with real business scenarios and why they replace 90% of self-joins.", category: "Data Analytics", author: "Sneha Pillai", date: "Feb 16, 2026", readTime: "8 min", tag: "data" },
    { id: 5, title: "Procedural Generation: The Math Behind Infinite Game Worlds", excerpt: "Perlin noise, Voronoi diagrams, and BSP trees — the algorithms that gave us Minecraft, No Man's Sky, and every open world you love.", category: "Game Development", author: "Karthik Balan", date: "Feb 18, 2026", readTime: "12 min", tag: "creative" },
    { id: 6, title: "Mastering Golden Hour: A Technical Photography Guide", excerpt: "How to predict magic hour light using free apps, set exposure compensation, and shoot raw DNG files that grade like cinema.", category: "Photography", author: "Divya Krishnan", date: "Feb 19, 2026", readTime: "6 min", tag: "creative" },
    { id: 7, title: "Color Science for Video Editors: LUTs Are Not Magic", excerpt: "Understanding primary and secondary color correction, the difference between CDL and 3D LUTs, and building your own look from scratch.", category: "Video Editing", author: "Rajan Patel", date: "Feb 21, 2026", readTime: "9 min", tag: "creative" },
    { id: 8, title: "Figma Auto-Layout vs CSS Flexbox: The Mental Model That Connects Both", excerpt: "Once you understand row/column, min/max sizing, and gap — Figma layouts click instantly. Here's the translation guide.", category: "Figma (UI & UX)", author: "Mahesh Varun", date: "Feb 23, 2026", readTime: "7 min", tag: "design" },
    { id: 9, title: "What Is Vibe Coding? The Philosophy of Writing Beautiful Software", excerpt: "Flow state isn't luck — it's engineered. We break down the environment, the constraints, and the mental rituals that make coding feel like art.", category: "Vibe Coding", author: "Anjali Rajan", date: "Feb 25, 2026", readTime: "5 min", tag: "engineering" },
    { id: 10, title: "Kubernetes for Skeptics: When You Actually Need It", excerpt: "k8s is overused. But for the right workload it's indispensable. Here's the honest breakdown of Pods, Services, and why Ingress controllers matter.", category: "Cloud Computing", author: "Suresh Iyer", date: "Feb 27, 2026", readTime: "10 min", tag: "infra" },
    { id: 11, title: "React Native vs Flutter: Choosing the Right Cross-Platform Stack", excerpt: "Dart vs JavaScript, Skia vs Native Modules, the Hermes engine — a factual, benchmark-backed comparison for 2026 projects.", category: "App Development", author: "Nisha Govind", date: "Mar 01, 2026", readTime: "8 min", tag: "engineering" },
    { id: 12, title: "How We Built a Real-Time Threat Dashboard Using the ELK Stack", excerpt: "Elasticsearch indexing, Logstash pipelines, and Kibana dashboards — a complete walkthrough of building a SOC-grade monitoring tool.", category: "Cyber Security", author: "Priya Sharma", date: "Mar 02, 2026", readTime: "14 min", tag: "security" },
    { id: 13, title: "Beyond React.useState: Mastering the Full State Landscape", excerpt: "Context, Zustand, Jotai, TanStack Query — every tool has a job. This mental model helps you pick the right one every time.", category: "Web Development", author: "Arvind Menon", date: "Mar 03, 2026", readTime: "10 min", tag: "engineering" },
    { id: 14, title: "Fine-Tuning LLMs on Custom Datasets: A Practical Walkthrough", excerpt: "Using QLoRA, PEFT, and Hugging Face TRL to fine-tune a 7B parameter model on a single GPU. Step-by-step with reproducible code.", category: "Machine Learning", author: "Dr. Rohit Nair", date: "Mar 04, 2026", readTime: "16 min", tag: "ai" },
    { id: 15, title: "The 5 Data Analytics Projects That Actually Get You Hired", excerpt: "Not Titanic. Not Iris. Real business-grade capstone projects using public datasets that actually impress data hiring managers.", category: "Data Analytics", author: "Sneha Pillai", date: "Mar 05, 2026", readTime: "6 min", tag: "data" },
    { id: 16, title: "Entity Component Systems: Why Modern Games Abandoned OOP", excerpt: "From Unity's DOTS to Bevy's ECS — the architectural paradigm shift that makes games faster, more maintainable, and scalable to millions of entities.", category: "Game Development", author: "Karthik Balan", date: "Mar 06, 2026", readTime: "11 min", tag: "creative" },
    { id: 17, title: "Designing for Dark Mode First: A Practical UI Guide", excerpt: "Why most dark mode implementations feel wrong, and how HSL color tokens, transparent surfaces, and glow effects create a premium feel.", category: "Figma (UI & UX)", author: "Mahesh Varun", date: "Mar 07, 2026", readTime: "8 min", tag: "design" },
    { id: 18, title: "AWS Lambda Cold Starts in 2026: Still a Problem?", excerpt: "Benchmarking Node.js 22, Python 3.12, and Rust Lambda functions with and without provisioned concurrency — the numbers might surprise you.", category: "Cloud Computing", author: "Suresh Iyer", date: "Mar 07, 2026", readTime: "9 min", tag: "infra" },
    { id: 19, title: "Cinematography Principles Every Video Editor Should Master", excerpt: "180-degree rule, match cuts, J-cuts, motivated camera movement — why understanding shooting saves you hours in the edit bay.", category: "Video Editing", author: "Rajan Patel", date: "Mar 08, 2026", readTime: "7 min", tag: "creative" },
    { id: 20, title: "Publishing to the App Store in 2026: What Nobody Warns You About", excerpt: "App privacy manifests, notarization exports, entitlements sandboxing, and the review rejection reasons that will catch you off-guard.", category: "App Development", author: "Nisha Govind", date: "Mar 08, 2026", readTime: "10 min", tag: "engineering" },
];
