import * as LucideIcons from 'lucide-react';

export const APP_VERSION = "5.1.0"; 

export const INITIAL_DESIGN = {
  "radius": "lg",
  "blur": "2xl",
  "border": "thin",
  "cardStyle": "glass"
};

export const INITIAL_EXPERIENCE = [
  {
    "id": "1",
    "role": "Senior Full Stack Engineer",
    "company": "TechNova Solutions",
    "date": "2021 - Present",
    "description": "Architected a high-performance intranet portal with Redis caching and multi-tenant authentication. Optimized database throughput and mentored engineering teams."
  },
  {
    "id": "2",
    "role": "Frontend Developer",
    "company": "Creative Pulse Studio",
    "date": "2019 - 2021",
    "description": "Implemented pixel-perfect UI/UX for international clients. Specialized in high-performance React animations and design systems."
  }
];

export const INITIAL_STATS = [
  { "id": "st1", "label": "Years Exp", "value": "4+" },
  { "id": "st2", "label": "Projects", "value": "25+" },
  { "id": "st3", "label": "Commits", "value": "4.2k" },
  { "id": "st4", "label": "Clients", "value": "12" }
];

export const INITIAL_SKILLS = [
  { id: "sk1", name: "React", level: 95, category: "framework" },
  { id: "sk2", name: "TypeScript", level: 90, category: "language" },
  { id: "sk3", name: "Node.js", level: 88, category: "backend" },
  { id: "sk4", name: "Next.js", level: 92, category: "framework" },
  { id: "sk5", name: "Tailwind CSS", level: 95, category: "styling" }
];

export const INITIAL_TESTIMONIALS = [
  {
    "id": "t1",
    "quote": "Jinuk's architectural insights transformed our entire system. Truly a visionary!",
    "author": "Alex J.",
    "title": "CTO, Global Innovations",
    "avatar": "https://api.dicebear.com/9.x/notionists/svg?seed=Alex&backgroundColor=0a0a0a"
  }
];

export const INITIAL_SYSTEM_HEALTH = {
  "status": "Operational",
  "uptime": "99.99%",
  "geminiApiStatus": "Online",
  "lastUpdate": "Just now"
};

export const INITIAL_ACTIONS = [
  {
    "id": "a1",
    "label": "Download CV",
    "url": "/cv.html",
    "style": "solid",
    "icon": "Download",
    "color": "white",
    "customClasses": "bg-white text-black font-semibold px-8 py-4 rounded-lg shadow-lg transition-colors",
    "rounded": "full",
    "size": "medium"
  },
  {
    "id": "a2",
    "label": "WhatsApp",
    "url": "https://wa.me/94771396311",
    "style": "outline",
    "icon": "MessageCircle",
    "color": "white",
    "rounded": "full"
  }
];

export const INITIAL_PROFILE = {
  "name": "Jinuk Chathusa",
  "handle": "@jinuk_builds",
  "title": "Full Stack Software Engineer",
  "bio": "I am a passionate Full Stack Software Engineer specialized in building scalable architectures and premium digital experiences. Expert in React, Node.js, and Cloud Infrastructure.",
  "avatar": "https://api.dicebear.com/9.x/lorelei/svg?seed=Mason&backgroundColor=0a0a0a",
  "banner": "",
  "isVerified": true,
  "status": "Available for new opportunities",
  "availability": "available"
};

export const INITIAL_MUSIC = {
  "title": "Midnight City",
  "artist": "M83",
  "cover": "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop",
  "isPlaying": true,
  "url": "#"
};

export const INITIAL_THEME = {
  "accentColor": "red",
  "backgroundStyle": "aurora"
};

export const INITIAL_STACK = [
  { "id": "s1", "name": "React", "iconKey": "Atom" },
  { "id": "s2", "name": "TypeScript", "iconKey": "FileCode" },
  { "id": "s3", "name": "Node.js", "iconKey": "Server" },
  { "id": "s4", "name": "Tailwind", "iconKey": "Palette" }
];

export const INITIAL_LINKS = [
  {
    "id": "l1",
    "title": "YouTube Channel",
    "subtitle": "Tech & Lifestyle",
    "url": "https://youtube.com/@dill_ruzzz",
    "iconKey": "Youtube",
    "verified": true,
    "variant": "glass"
  },
  {
    "id": "l2",
    "title": "Twitter / X",
    "subtitle": "Thoughts on Systems",
    "url": "https://x.com/Dill_Ruzz",
    "iconKey": "Twitter",
    "verified": true,
    "variant": "glass"
  },
  {
    "id": "l3",
    "title": "Discord Community",
    "subtitle": "Join the server",
    "url": "https://discord.gg/yourlink",
    "iconKey": "Gamepad2",
    "verified": true,
    "variant": "glass"
  },
  {
    "id": "l4",
    "title": "LinkedIn",
    "subtitle": "Professional Network",
    "url": "https://linkedin.com/in/jinuk-chathusa",
    "iconKey": "Linkedin",
    "verified": true,
    "variant": "glass"
  },
  {
    "id": "l5",
    "title": "GitHub",
    "subtitle": "Source Code",
    "url": "https://github.com/dill-lk",
    "iconKey": "Github",
    "verified": true,
    "variant": "glass"
  }
];

export const INITIAL_PROJECTS = [
  {
    "id": "p1",
    "title": "Corporate Intranet Redesign",
    "subtitle": "Architected a high-performance intranet portal with Redis caching and multi-tenant authentication.",
    "url": "/project/p1",
    "iconKey": "Zap",
    "tags": ["React", "Redis", "SharePoint API", "Tailwind CSS"]
  },
  {
    "id": "p2",
    "title": "Inventory Management System",
    "subtitle": "Full-stack inventory tracking system with real-time stock synchronization and PostgreSQL.",
    "url": "/project/p2",
    "iconKey": "Zap",
    "tags": ["Next.js", "PostgreSQL", "Prisma", "WebSockets"]
  },
  {
    "id": "p3",
    "title": "Personal Portfolio Website",
    "subtitle": "A premium, performant portfolio with integrated AI assistant and specialized mobile view.",
    "url": "/project/p3",
    "iconKey": "Zap",
    "tags": ["Vite", "React", "Gemini AI", "Framer Motion"]
  }
];

export const INITIAL_VIDEOS = [];
export const INITIAL_POSTS = [
  {
    "id": "loading-spinner",
    "title": "The Death of the Loading Spinner: Optimistic UI Patterns",
    "date": "March 12, 2024",
    "readTime": "10 min",
    "url": "/article/loading-spinner",
    "content": "Optimistic UI is a pattern where the interface responds to user actions immediately..."
  },
  {
    "id": "scaling-migration",
    "title": "Architecting for Scale: Lessons from a 100k User Migration",
    "date": "January 25, 2024",
    "readTime": "12 min",
    "url": "/article/scaling-migration",
    "content": "Migrating a system while it's under load is like changing the engines on a plane mid-flight..."
  }
];