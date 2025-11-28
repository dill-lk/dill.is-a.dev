export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image: string; // URL
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export enum Section {
  HERO = 'hero',
  ABOUT = 'about',
  SKILLS = 'skills',
  EXPERIENCE = 'experience',
  PROJECTS = 'projects',
  CONTACT = 'contact'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: number;
}
