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

export const SOCIAL_LINKS = {
  github: "https://github.com/dill-lk",
  tiktok: "https://www.tiktok.com/@dill_ruzzz",
  whatsapp: "https://wa.me/94771396311",
  x: "https://x.com/Dill_Ruzz"
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "p1",
    title: "Corporate Intranet Redesign",
    description: "Architected a high-performance intranet portal serving 500+ employees. Implemented a custom caching layer using Redis to reduce API latency by 60% and integrated multi-tenant authentication via SharePoint API.",
    tags: ["React", "Redis", "SharePoint API", "Tailwind CSS"],
    github: SOCIAL_LINKS.github,
    link: "/project/p1",
    image: "/assets/1.jpeg"
  },
  {
    id: "p2",
    title: "Inventory Management System",
    description: "Developed a full-stack inventory tracking system with real-time stock synchronization. Leveraged PostgreSQL with Prisma ORM for type-safe database operations and optimized complex join queries.",
    tags: ["Next.js", "PostgreSQL", "Prisma", "WebSockets"],
    github: SOCIAL_LINKS.github,
    link: "/project/p2",
    image: "/assets/2.jpeg"
  },
  {
    id: "p3",
    title: "Personal Portfolio Website",
    description: "A premium, performant portfolio built with Vite and React. Features an integrated AI assistant powered by Google Gemini and a specialized 'Titanium OS' mobile view.",
    tags: ["Vite", "React", "Gemini AI", "Framer Motion"],
    github: SOCIAL_LINKS.github,
    link: "/project/p3",
    image: "/assets/3.jpeg"
  }
];

export const ARTICLES_DATA = [
  {
    id: "loading-spinner",
    year: "2024",
    category: "Engineering",
    title: "The Death of the Loading Spinner: Optimistic UI Patterns",
    link: "/article/loading-spinner",
    date: "March 12, 2024",
    content: `
      <p>Optimistic UI is a pattern where the interface responds to user actions immediately. Below is a high-grade implementation example using React and a custom hook:</p>
      <pre><code>
const useOptimisticUpdate = (mutationFn) => {
  const [state, setState] = useState('idle');
  
  const execute = async (data) => {
    // 1. Update UI immediately
    updateLocalCache(data); 
    
    try {
      await mutationFn(data);
      setState('success');
    } catch (err) {
      // 2. Rollback on failure
      rollbackCache();
      setState('error');
    }
  };
  
  return { execute, state };
};
      </code></pre>
      <h2>Why it matters</h2>
      <p>Reduced perceived latency leads to higher user retention and a 'premium' feel that standard spinners can't provide.</p>
    `
  },
  {
    id: "scaling-migration",
    year: "2024",
    category: "System Design",
    title: "Architecting for Scale: Lessons from a 100k User Migration",
    link: "/article/scaling-migration",
    date: "January 25, 2024",
    content: `
      <p>Migrating a database under load requires zero-downtime strategies. Here is how we handled the throughput throttling:</p>
      <pre><code>
// Throttled batch migration script
async function migrateBatch(records) {
  const BATCH_SIZE = 500;
  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    await db.target.insertMany(batch);
    
    // Controlled delay to prevent CPU spikes
    await new Promise(resolve => setTimeout(resolve, 100)); 
  }
}
      </code></pre>
      <h2>The Result</h2>
      <p>We achieved a 99.9% success rate during the transition with zero impact on the end-user experience.</p>
    `
  },
  {
    id: "tailwind-war",
    year: "2023",
    category: "Opinion",
    title: "Why Tailwind CSS Won the War",
    link: "/article/tailwind-war",
    date: "November 10, 2023",
    content: `
      <p>The developer velocity provided by utility-first CSS is undeniable. Look at the clarity of this complex card component:</p>
      <pre><code>
&lt;div className="group relative rounded-3xl bg-white/5 p-8 backdrop-blur-xl border border-white/10 hover:scale-[1.02] transition-all duration-500"&gt;
  &lt;div className="flex justify-between items-center"&gt;
    &lt;h3 className="text-2xl font-bold tracking-tight text-white"&gt;High-Speed Dev&lt;/h3&gt;
    &lt;span className="px-3 py-1 bg-blue-500 rounded-full text-[10px] uppercase font-black"&gt;New&lt;/span&gt;
  &lt;/div&gt;
&lt;/div&gt;
      </code></pre>
    `
  },
  {
    id: "design-systems-react",
    year: "2023",
    category: "Frontend",
    title: "Bridging the Gap: Design Systems in React",
    link: "/article/design-systems-react",
    date: "September 05, 2023",
    content: `
      <p>A true design system is about composition. In React, we use the 'Compound Component' pattern to provide flexibility:</p>
      <pre><code>
const Card = ({ children }) => &lt;div className="card"&gt;{children}&lt;/div&gt;;
Card.Header = ({ title }) => &lt;h2&gt;{title}&lt;/h2&gt;;
Card.Body = ({ content }) => &lt;p&gt;{content}&lt;/p&gt;;

// Usage:
&lt;Card&gt;
  &lt;Card.Header title="Pro Architecture" /&gt;
  &lt;Card.Body content="Seamless scalability." /&gt;
&lt;/Card&gt;
      </code></pre>
    `
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
Social Links: ${JSON.stringify(SOCIAL_LINKS)}
Contact Email: dill.ruzz.official@gmail.com
WhatsApp: https://wa.me/94771396311

Tone: Professional, enthusiastic, technical but accessible.
`;
