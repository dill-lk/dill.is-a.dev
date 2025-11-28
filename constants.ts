import { Experience, Project, SkillCategory } from "./types";

export const NAV_LINKS = [
  { label: 'Start', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const HERO_DATA = {
  name: "Jinuk Chathusa",
  role: "Full Stack Software Engineer",
  tagline: "Building scalable digital experiences with precision and creativity.",
  availableForWork: true,
};

export const ABOUT_DATA = `I am a passionate Full Stack Software Engineer with a deep interest in building scalable web applications and integrating AI solutions. With a strong foundation in both frontend aesthetics and backend architecture, I transform complex requirements into seamless user experiences. I thrive in collaborative environments and am always eager to adopt the latest technologies to solve real-world problems.`;

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: "Frontend",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux", "Framer Motion", "Three.js"]
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "Python", "Django", "PostgreSQL", "MongoDB", "Redis"]
  },
  {
    category: "DevOps & Cloud",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Nginx"]
  },
  {
    category: "AI & Tools",
    skills: ["Google Gemini API", "OpenAI API", "LangChain", "Git", "Jira", "Figma"]
  }
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: "1",
    company: "TechNova Solutions",
    role: "Senior Full Stack Engineer",
    period: "2021 - Present",
    description: [
      "Led the migration of a legacy monolith to a microservices architecture using Node.js and Docker, improving scalability by 40%.",
      "Mentored a team of 4 junior developers, conducting code reviews and implementing best practices.",
      "Developed a real-time analytics dashboard using React and WebSockets."
    ]
  },
  {
    id: "2",
    company: "Creative Pulse Studio",
    role: "Frontend Developer",
    period: "2019 - 2021",
    description: [
      "Collaborated with designers to implement pixel-perfect UI/UX for over 15 client projects.",
      "Optimized website performance, achieving a 98+ Lighthouse score across all metrics.",
      "Implemented complex animations and interactive elements using GSAP and React Spring."
    ]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "p1",
    title: "Corporate Intranet Redesign",
    description: "Led the end-to-end redesign of a corporate intranet portal for a mid-sized company. Focused on improving user experience, streamlining content delivery, and integrating with existing internal tools.",
    tags: ["React", "SharePoint API", "UI/UX", "Tailwind CSS"],
    github: "https://github.com/dill-lk",
    link: "#",
    image: "/assets/1.jpeg"
  },
  {
    id: "p2",
    title: "Inventory Management System",
    description: "Developed a custom inventory management system for a local retail business. The system tracks stock levels, sales data, and generates reports to help with restocking decisions.",
    tags: ["Next.js", "PostgreSQL", "Prisma", "Node.js"],
    github: "https://github.com/dill-lk",
    image: "/assets/2.jpeg"
  },
  {
    id: "p3",
    title: "Personal Portfolio Website",
    description: "Designed and built this personal portfolio website from scratch. The goal was to create a clean, modern, and performant site to showcase my skills and projects.",
    tags: ["Vite", "React", "TypeScript", "Framer Motion"],
    github: "https://github.com/dill-lk",
    link: "#",
    image: "/assets/3.jpeg"
  }
];

export const SYSTEM_INSTRUCTION = `
You are Jinuk AI, a virtual assistant for the portfolio of Jinuk Chathusa.
Your goal is to answer questions about Jinuk's professional background, skills, and projects based strictly on the following context.
Be professional, concise, and helpful. If asked about something not in the context, politely state that you don't have that information but can help with his known professional history.

Context:
Name: ${HERO_DATA.name}
Role: ${HERO_DATA.role}
Bio: ${ABOUT_DATA}
Skills: ${JSON.stringify(SKILLS_DATA)}
Experience: ${JSON.stringify(EXPERIENCE_DATA)}
Projects: ${JSON.stringify(PROJECTS_DATA)}

Tone: Professional, enthusiastic, technical but accessible.
`;
