export interface Project {
    title: string;
    description: string;
    tags: string[];
    link: string;
}

export interface Experience {
    role: string;
    company: string;
    period: string;
    description: string;
}

export interface EmployeeData {
    id: string;
    name: string;
    role: string;
    bio: string;
    email: string;
    socialUrls: {
        github?: string;
        linkedin?: string;
    };
    skills: string[];
    experience: Experience[];
    projects: Project[];
}

export const TEAM_DATA: Record<string, EmployeeData> = {
    "nahul": {
        id: "nahul",
        name: "NAHUL PRANNAV S",
        role: "Full-Stack Developer & AI Enthusiast",
        bio: "Passionate B.Tech Information Technology student at Christ the King Engineering College. Experienced in building real-time web and mobile applications, AI voice assistants, and automation tools. Dedicated to solving complex problems through efficient code and modern technology stacks.",
        email: "nahulprannav@gmail.com",
        socialUrls: {
            github: "https://github.com/Nahulprannav",
            linkedin: "https://linkedin.com/in/nahul-prannav-27372029a",
        },
        skills: ["Python", "JavaScript", "React.js", "Node.js", "PHP", "MySQL", "MongoDB", "FlutterFlow", "Selenium", "BeautifulSoup", "Power BI", "Tailwind CSS"],
        experience: [
            {
                role: "Intern",
                company: "Piano Tech",
                period: "Internship",
                description: "Contributed to web and app development projects in real-time environments. Built automation tools, game logic, and interface designs. Engaged in debugging, testing, and documenting code."
            },
            {
                role: "Web Developer",
                company: "Freelance",
                period: "Freelance",
                description: "Developed and deployed professional websites for small businesses. Customized layouts, features, and admin controls based on client needs. Ensured code maintainability and SEO best practices."
            }
        ],
        projects: [
            {
                title: "FRIDAY – AI Voice Assistant",
                description: "Developed an AI voice assistant in Python activated by 'Hey FRIDAY'. Features include user authentication via voice, custom NLP logic with spaCy, and a custom animated GUI.",
                tags: ["Python", "NLP", "GUI"],
                link: "#"
            },
            {
                title: "Gateway Software",
                description: "Secure access system for digital library resources with encrypted credentials, admin dashboard, and role-based permissions.",
                tags: ["Python", "Security", "Admin Portal"],
                link: "#"
            },
            {
                title: "Mobile App Development",
                description: "Developed multiple mobile apps using FlutterFlow focusing on usability, including a productivity tool and an educational app.",
                tags: ["FlutterFlow", "Mobile", "UX"],
                link: "#"
            },
            {
                title: "Web Scraping & Automation",
                description: "Created multiple automation scripts and scraping tools using Selenium and BeautifulSoup for complex data extraction tasks.",
                tags: ["Selenium", "BeautifulSoup", "Automation"],
                link: "#"
            }
        ]
    },
    "ashwini": {
        id: "ashwini",
        name: "ASHWINI B",
        role: "CEO & Director | ML Specialist",
        bio: "Visionary leader at Fironix with a strong background in Machine Learning and Digital Marketing. Passionate about empowering the next generation of engineers through technical education and innovative digital solutions. Specialized in MERN stack development and strategic marketing.",
        email: "ashwini@fironix.in",
        socialUrls: {
            linkedin: "#",
        },
        skills: ["Machine Learning", "Digital Marketing", "MERN Stack", "React.js", "Node.js", "Python", "Game Development", "Sales Marketing", "SEO", "Content Strategy"],
        experience: [
            {
                role: "ML Tutor & Digital Marketing",
                company: "DLP International Company",
                period: "Professional Experience",
                description: "Mentored students in advanced Machine Learning concepts and implemented comprehensive digital marketing strategies. Focused on data-driven growth and technical excellence."
            },
            {
                role: "MERN Stack Developer",
                company: "DLP International Company",
                period: "Project Execution",
                description: "Led the development of the company's primary web infrastructure using the MERN stack. Optimized performance and implemented complex user management systems."
            }
        ],
        projects: [
            {
                title: "DLP Corporate Infrastructure",
                description: "End-to-end development of a high-performance corporate platform with integrated marketing automation and real-time analytics.",
                tags: ["MERN", "Architecture", "Marketing"],
                link: "#"
            },
            {
                title: "Educational Game Suite",
                description: "Designed and developed a series of interactive games aimed at teaching complex ML concepts to beginners through gamification.",
                tags: ["Game Dev", "Education", "UI/UX"],
                link: "#"
            },
            {
                title: "Digital Growth Engine",
                description: "Implemented an automated sales and marketing system that increased lead conversion rates by 40% using ML-based targeting.",
                tags: ["ML", "Sales", "Automation"],
                link: "#"
            }
        ]
    }
};
