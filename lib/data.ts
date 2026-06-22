export const personalInfo = {
  name: "Mansi Patoliya",
  titleLine1: "Lead Full-Stack",
  titleLine2: "Developer",
  tagline:
    "Designing and leading scalable web applications for 5+ years — from React and SvelteKit frontends to Node.js, FastAPI, and cloud deployments.",
  about:
    "I'm a Lead Full-Stack Developer with 5+ years of experience building and owning production web applications across React, Angular, SvelteKit, and backend systems with Node.js, Python FastAPI, and PHP. I lead architecture decisions, mentor developers, integrate secure payment systems, manage monorepo codebases, and deploy on AWS, Vercel, DigitalOcean, and Hetzner.",
  email: "manasipatoliya@gmail.com",
  phone: "+91 8490828266",
  linkedin: "https://www.linkedin.com/in/mansi-p-b3077b197",
  github: "https://github.com/mansi-1011",
  location: "Surat, India · Available for remote (US/EU overlap)",
  availability: "Open to freelance & full-time remote roles",
}

export const marqueeItems = [
  "Lead Full-Stack Developer",
  "React & SvelteKit",
  "Node.js & FastAPI",
  "Monorepo Architect",
  "AWS & Cloud Deployment",
]

export const aboutCards = [
  {
    eyebrow: "Technical Leadership",
    title: "5+ Years in Production",
    body: "I lead multiple frontend and full-stack projects, handle architecture and code reviews, mentor developers, and act as the primary technical contact for clients.",
    cta: "View Projects",
    href: "#projects",
    accent: "#7FFFD4",
  },
  {
    eyebrow: "End-to-End Ownership",
    title: "Plan to Production",
    body: "From requirement gathering and task planning to CI/CD, deployment, and production support — I deliver maintainable, high-quality solutions.",
    cta: "Contact Me",
    href: "#contact",
    accent: "#FF7E87",
  },
  {
    eyebrow: "Technical Focus",
    title: "Full-Stack & Cloud",
    body: "React, SvelteKit, Node.js, FastAPI, monorepo architectures, payment integrations, real-time systems, and cloud platforms including AWS, Vercel, and Cloudflare.",
    cta: "My Stack",
    href: "#skills",
    accent: "#B48EF7",
  },
]

export const achievements = [
  {
    title: "5+ Years Experience",
    subtitle: "Full-stack development & leadership",
    description:
      "Designing, developing, and leading scalable web applications across React, Angular, SvelteKit, Node.js, Python FastAPI, and PHP.",
    accent: "#7FFFD4",
  },
  {
    title: "Multi-Site Monorepo",
    subtitle: "Lokal-Nyt platform",
    description:
      "Built a scalable multi-site news platform serving city-wise and domain-wise websites from a single SvelteKit + Node.js monorepo on AWS EC2.",
    accent: "#FFC857",
  },
  {
    title: "Secure Payment Systems",
    subtitle: "Yetuyene platform",
    description:
      "Led end-to-end delivery of a full-scale platform with secure payment gateway integration and production-ready business workflows.",
    accent: "#FF7E87",
  },
  {
    title: "Real-Time Energy Portal",
    subtitle: "VPP Njord Power Portal",
    description:
      "Delivered a real-time energy management portal with React, Python FastAPI, MQTT communication, and cross-platform web + mobile integration.",
    accent: "#B48EF7",
  },
  {
    title: "Browser Extension",
    subtitle: "ZipIt Steam Market Trade",
    description:
      "Built a Chrome and Firefox extension for Steam Market trading with real-time price tracking, automation, and trade verification.",
    accent: "#7FFFD4",
  },
]

export type AccentColor = "mint" | "coral" | "amber" | "purple"

export interface Project {
  title: string
  category: string
  role: string
  description: string
  tech: string[]
  features: string[]
  accent: AccentColor
  year: string
  href?: string
}

export const projectGroups = [
  {
    title: "Full Stack & Platform Projects",
    subtitle: "End-to-end systems with architecture ownership, cloud deployment, and production support",
    projects: [
      {
        title: "Lokal-Nyt",
        category: "News Platform",
        role: "Lead Full-Stack Developer",
        description:
          "Scalable multi-site automated news platform managing city-wise and domain-wise dynamic websites from a single codebase, with social and news content scraping.",
        tech: ["SvelteKit", "Node.js", "Monorepo", "AWS EC2", "CI/CD"],
        features: [
          "Multi-site monorepo architecture",
          "Dynamic domain & city-based content",
          "Automated social media scraping",
          "AWS EC2 deployment & performance optimization",
        ],
        accent: "mint" as AccentColor,
        year: "2024",
      },
      {
        title: "Yetuyene",
        category: "Web Platform",
        role: "Project Lead / Full-Stack Developer",
        description:
          "Full-scale web platform with scalable backend services, end-to-end business workflows, and secure payment processing.",
        tech: ["Angular", "Node.js", "Payment Gateway", "REST APIs"],
        features: [
          "Secure payment gateway integration",
          "End-to-end business workflows",
          "Production releases & stability",
          "Feature planning and coordination",
        ],
        accent: "coral" as AccentColor,
        year: "2024",
      },
      {
        title: "VPP Njord Power Portal",
        category: "Energy Management",
        role: "Project Lead / Full-Stack Developer",
        description:
          "Real-time energy management portal for monitoring and visualizing power data across distributed systems via web and mobile.",
        tech: ["React.js", "Python FastAPI", "MQTT", "Flutter"],
        features: [
          "Real-time MQTT data communication",
          "High-performance FastAPI backend",
          "Cross-platform web & mobile access",
          "System integration & scalability",
        ],
        accent: "amber" as AccentColor,
        year: "2024",
      },
      {
        title: "Hands On Booking",
        category: "Booking Platform",
        role: "Lead Full-Stack Developer",
        description:
          "Online booking platform for managing bookings, journals, and courses — built for scalability and long-term production use.",
        tech: ["React", "Redux", "Material UI", "Node.js", "JavaScript"],
        features: [
          "Scalable React + Material UI frontend",
          "Redux state management",
          "Node.js backend integration",
          "Stakeholder coordination & mentoring",
        ],
        accent: "purple" as AccentColor,
        year: "2022",
      },
      {
        title: "ZipIt",
        category: "Real-Time Marketplace",
        role: "Senior Full-Stack Developer (Lead)",
        description:
          "Real-time platform for buying and selling CS:GO items with live price updates, WebSockets, and secure transactions.",
        tech: ["React", "Redux", "Node.js", "Laravel", "WebSockets", "AWS EC2"],
        features: [
          "Real-time price updates via WebSockets",
          "React + Redux responsive UI",
          "Node.js & Laravel backend integration",
          "AWS EC2 deployment & monitoring",
        ],
        accent: "mint" as AccentColor,
        year: "2022",
      },
    ],
  },
  {
    title: "Frontend & Enterprise Apps",
    subtitle: "CRM, financial, and business applications with strong UI and performance focus",
    projects: [
      {
        title: "CRM Socomep",
        category: "CRM System",
        role: "Senior Front-End Developer (Lead)",
        description:
          "CRM system for job creation, task management, and reporting with modular React architecture.",
        tech: ["Vite.js", "React", "Tailwind CSS", "Redux", "Node.js"],
        features: [
          "Responsive React + Tailwind UI",
          "Modular Vite.js components",
          "Job & task workflow API integration",
          "Performance optimization",
        ],
        accent: "coral" as AccentColor,
        year: "2022",
      },
      {
        title: "Reserve Fund Advisors",
        category: "Financial Application",
        role: "Frontend Lead Developer",
        description:
          "Financial web application delivering data-driven insights and reports with emphasis on performance, accuracy, and usability.",
        tech: ["React.js", "PHP", "Jest", "REST APIs"],
        features: [
          "Frontend architecture with React.js",
          "PHP backend integration",
          "Jest unit testing",
          "UI performance & maintainability",
        ],
        accent: "amber" as AccentColor,
        year: "2023",
      },
      {
        title: "Above Standard",
        category: "Business Website",
        role: "Senior Front-End Developer (Lead)",
        description: "SEO-friendly single-page business website with optimized frontend and AWS deployment.",
        tech: ["Next.js", "React", "Material UI", "WordPress", "AWS EC2"],
        features: [
          "Next.js for SEO optimization",
          "Material UI implementation",
          "AWS EC2 deployment",
          "Performance-focused SPA",
        ],
        accent: "purple" as AccentColor,
        year: "2023",
      },
      {
        title: "Njord Recycle",
        category: "Business Website",
        role: "Senior Front-End Developer (Lead)",
        description: "Simple, SEO-friendly single-page website maintained on One.com cloud servers.",
        tech: ["Next.js", "React", "Material UI", "WordPress"],
        features: [
          "Next.js frontend development",
          "Material UI design system",
          "One.com cloud deployment",
          "Daily standups & maintenance",
        ],
        accent: "mint" as AccentColor,
        year: "2023",
      },
      {
        title: "Apprato",
        category: "Business Website",
        role: "React Developer",
        description: "SEO-friendly single-page website with React frontend and cloud server maintenance.",
        tech: ["React", "Material UI", "JavaScript", "WordPress"],
        features: [
          "React.js frontend development",
          "Material UI components",
          "One.com cloud hosting",
          "Ongoing maintenance",
        ],
        accent: "coral" as AccentColor,
        year: "2023",
      },
    ],
  },
  {
    title: "Browser Extensions",
    subtitle: "Cross-browser tools for enhanced user workflows",
    projects: [
      {
        title: "ZipIt Steam Market Trade",
        category: "Chrome & Firefox Extension",
        role: "Developer",
        description:
          "Browser extension for seamless Steam Market trading with automation, real-time insights, and security features.",
        tech: ["JavaScript", "Chrome Extension", "Firefox Extension", "Web APIs"],
        features: [
          "Automated Steam Market trades",
          "Real-time price tracking & suggestions",
          "Trade verification & anti-scam measures",
          "Cross-browser Chrome & Firefox support",
        ],
        accent: "amber" as AccentColor,
        year: "2023",
      },
    ],
  },
]

export const skills = {
  Frontend: [
    "React.js",
    "Next.js",
    "Angular",
    "Svelte",
    "SvelteKit",
    "Vue.js",
    "Redux",
    "Redux Toolkit",
    "Material UI",
    "Tailwind CSS",
    "Bootstrap",
    "ShadCN UI",
    "React Hook Form",
  ],
  Backend: [
    "Node.js",
    "Express.js",
    "Python FastAPI",
    "PHP (Laravel)",
    "PHP (CodeIgniter)",
    "Prisma ORM",
    "REST APIs",
    "GraphQL",
    "WebSockets",
    "MQTT",
    "Payment Gateway Integration",
  ],
  Database: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "SQLite", "SQL"],
  Languages: ["JavaScript", "TypeScript", "HTML5", "CSS3", "Python", "jQuery"],
  "Cloud & DevOps": [
    "AWS EC2",
    "Azure",
    "Vercel",
    "DigitalOcean",
    "Hetzner",
    "Cloudflare",
    "Docker",
    "Nginx",
    "Linux",
    "CI/CD Pipelines",
  ],
  "Testing & Tools": [
    "Jest",
    "Monorepo Architecture",
    "Microservices",
    "GitHub",
    "GitLab",
    "Postman",
    "Docker",
    "Figma",
    "Jira",
    "VS Code",
  ],
}

export const experience = [
  {
    company: "KG Krunch Solutions",
    role: "Lead Full-Stack Developer / Technical Team Lead",
    period: "2024 – Present",
    points: [
      "Leading multiple frontend and full-stack projects across React, Angular, and SvelteKit.",
      "Handling architecture decisions, task planning, code reviews, and client communication.",
      "Mentoring developers, enforcing best practices, and managing deployments and production stability.",
    ],
    tech: ["React", "Angular", "SvelteKit", "Node.js", "AWS EC2", "Monorepo", "CI/CD"],
  },
  {
    company: "KG Krunch Solutions",
    role: "Web Developer",
    period: "2022 – 2024",
    points: [
      "Started as a fresher and worked on multiple client projects across the full stack.",
      "Fixed frontend and backend bugs and implemented new features based on client requirements.",
      "Gained hands-on experience in production support, deployments, and stakeholder collaboration.",
    ],
    tech: ["React", "Node.js", "PHP", "JavaScript", "MySQL", "WordPress"],
  },
]

export interface EducationEntry {
  title: string
  institution: string
  period: string
  highlight?: string
  details: { label: string; value: string }[]
  accent: string
}

export const education: EducationEntry[] = [
  {
    title: "Bachelor of Computer Applications (BCA)",
    institution: "Rabindranath Tagore University, Bhopal",
    period: "2019 – 2022",
    details: [
      { label: "Degree", value: "Bachelor of Computer Applications (BCA)" },
      { label: "University", value: "Rabindranath Tagore University, Bhopal" },
      { label: "Duration", value: "2019 – 2022" },
    ],
    accent: "#7FFFD4",
  },
  {
    title: "Higher Secondary Education",
    institution: "Aashadeep Group of School",
    period: "2018 – 2019",
    details: [
      { label: "School", value: "Aashadeep Group of School" },
      { label: "Duration", value: "2018 – 2019" },
    ],
    accent: "#FFC857",
  },
]

export const socialLinks = [
  { label: "LinkedIn", href: personalInfo.linkedin },
  { label: personalInfo.email, href: `mailto:${personalInfo.email}` },
]
