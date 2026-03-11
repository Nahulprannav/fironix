export interface Project {
    title: string;
    period?: string;
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

export interface Education {
    degree: string;
    institution: string;
    location: string;
}

export interface EmployeeData {
    id: string;
    name: string;
    role: string;
    bio: string;
    email: string;
    phone?: string;
    photoURL?: string;
    socialUrls: {
        github?: string;
        linkedin?: string;
    };
    skills: string[];
    softSkills?: string[];
    education?: Education;
    experience: Experience[];
    projects: Project[];
}

export const TEAM_DATA: Record<string, EmployeeData> = {
    "nahul": {
        id: "nahul",
        name: "NAHUL PRANNAV S",
        role: "Aspiring Software Developer and AI Enthusiast",
        bio: "Aspiring Software Developer and AI Enthusiast with experience in Python development, MERN stack web development, automation tools, AI-based applications, and cybersecurity fundamentals. Proven ability to design intelligent systems, develop responsive web applications, and mentor students in programming and software development. Passionate about building scalable software solutions and exploring emerging technologies in AI, automation, and security.",
        email: "nahulprannav@gmail.com",
        phone: "+91 6382147517",
        photoURL: "/team-photo-n.jpeg",
        socialUrls: {
            github: "https://github.com/Nahulprannav",
            linkedin: "https://linkedin.com/in/nahul-prannav-27372029a",
        },
        skills: [
            "Python", "JavaScript", "Java", "C", "PHP", 
            "HTML5", "CSS3", "Bootstrap", "Tailwind CSS", "React.js", "jQuery",
            "Node.js", "Express.js", "MongoDB", "MySQL",
            "Unity", "Pygame",
            "TensorFlow", "scikit-learn", "spaCy (NLP)",
            "Nmap", "Network Scanning", "Security Testing Basics",
            "Selenium", "BeautifulSoup", "Requests",
            "Git", "GitHub", "Visual Studio Code", "Postman", "Figma",
            "Power BI", "Microsoft 365",
            "FlutterFlow", "Android Studio"
        ],
        softSkills: [
            "Problem Solving",
            "Critical Thinking",
            "Quick Learning",
            "Team Collaboration",
            "Time Management",
            "Public Speaking"
        ],
        education: {
            degree: "Bachelor of Technology – Information Technology",
            institution: "Christ the King Engineering College",
            location: "Coimbatore, Tamil Nadu"
        },
        experience: [
            {
                role: "Technical Mentor & Web Developer",
                company: "DLP International",
                period: "Work Experience",
                description: "Worked as Marketing and Web Development (MERN Stack) Trainer. Mentored students in MongoDB, Express.js, React.js, Node.js development. Conducted training sessions on game development using Unity. Guided students in building real-world software projects. Supported technical marketing and product demonstrations."
            },
            {
                role: "Software Development Intern",
                company: "Piano Tech",
                period: "Internship",
                description: "Contributed to web and application development projects. Developed automation scripts, game logic, and UI features. Assisted in debugging, testing, and documentation of software."
            },
            {
                role: "Freelance Web Developer",
                company: "Freelance",
                period: "Self-Employed",
                description: "Designed and deployed responsive websites for small businesses. Implemented custom features, admin dashboards, and SEO optimization. Delivered multiple client-based web development projects."
            }
        ],
        projects: [
            {
                title: "FRIDAY – AI Voice Assistant",
                description: "Developed a Python-based AI voice assistant activated by wake word 'Hey FRIDAY'. Integrated SpeechRecognition, PyAudio, gTTS, and pyttsx3. Implemented voice password authentication. Added functions like web search, note taking, and system automation. Used spaCy NLP for natural language understanding. Designed GUI with animated assistant interface.",
                tags: ["Python", "NLP", "AI", "GUI"],
                link: "#"
            },
            {
                title: "Gateway Software – Digital Library Access System",
                description: "Developed a secure digital library platform using Python. Implemented encrypted authentication system. Created admin dashboard for managing users and resources. Used role-based permissions for document security.",
                tags: ["Python", "Security", "MySQL"],
                link: "#"
            },
            {
                title: "Game Development Projects",
                description: "Developed three desktop games using Python (Pygame). Designed game logic, animations, UI systems, and scoring mechanisms.",
                tags: ["Python", "Pygame", "Game Dev"],
                link: "#"
            },
            {
                title: "Web Scraping & Automation Tools",
                description: "Developed automation tools using Selenium and BeautifulSoup. Extracted structured data and automated repetitive tasks.",
                tags: ["Python", "Selenium", "Scraping"],
                link: "#"
            },
            {
                title: "Mobile Application Development",
                description: "Developed two mobile apps using FlutterFlow. Focused on usability, performance, and student productivity tools.",
                tags: ["FlutterFlow", "Mobile App", "Low-code"],
                link: "#"
            }
        ]
    },
    "abishek": {
        id: "abishek",
        name: "ABISHEK VARADHARAJAN",
        role: "Web Developer",
        bio: "Aspiring professional seeking entry-level role in Industry, eager to leverage strong communication skills, enthusiasm for Full Stack Web Development, and collaborative spirit to drive company growth and success.",
        email: "abishektigerdiya@gmail.com",
        phone: "8248307188",
        photoURL: "/abishekvm.jpeg",
        socialUrls: {
            linkedin: "https://linkedin.com/in/abishek71",
        },
        skills: ["HTML", "CSS", "JavaScript", "Python", "Django", "SQL", "C++", "Canva", "Full Stack Development"],
        softSkills: ["Tamil (Fluent)", "English (Fluent)", "Communication", "Team Collaboration"],
        education: {
            degree: "BE ECE",
            institution: "SRI KRISHNA INSTITUTION",
            location: "Coimbatore, Tamil Nadu"
        },
        experience: [
            {
                role: "Python FullStack Development",
                company: "Sri accent technologies",
                period: "04/2024 - 09/2024",
                description: "Optimized database queries for faster retrieval of records from MySQL databases. Implemented object-oriented programming principles while developing new features for existing projects. Engaged in continuous learning to stay updated with the latest technologies."
            }
        ],
        projects: [
            {
                title: "Students Database Management System",
                description: "Developed a system to manage student records efficiently using SQL and Python.",
                tags: ["Python", "SQL", "Management"],
                link: "#"
            },
            {
                title: "Electricity generation using EG-HPS",
                description: "Project focused on innovative electricity generation presented at conference 2024.",
                tags: ["Hardware", "Energy"],
                link: "#"
            },
            {
                title: "Space debris removal",
                description: "Conceptual project exploring solutions for clearing orbital debris.",
                tags: ["Research", "Space"],
                link: "#"
            }
        ]
    },
    "ashwini": {
        id: "ashwini",
        name: "ASHWINI B",
        role: "CEO & Director | ML Specialist",
        bio: "Visionary leader at Fironix with a strong background in Machine Learning and Digital Marketing. Passionate about empowering the next generation of engineers through technical education and innovative digital solutions.",
        email: "ashwini@fironix.in",
        photoURL: "/team-photo.jpeg",
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
