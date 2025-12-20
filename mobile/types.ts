export interface Profile {
  name: string;
  handle: string;
  title: string;
  bio: string;
  avatar: string;
  banner: string;
  isVerified: boolean;
  status: string;
  availability: string;
}

export interface LinkItem {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  iconKey: string;
  verified: boolean;
  variant: string;
  customStyleClasses?: string;
  // Button Customization
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  size?: 'sm' | 'md' | 'lg';
  roundness?: 'square' | 'rounded' | 'pill';
  shadow?: boolean;
  gradient?: boolean;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  iconKey: string;
  tags: string[];
}

export interface Video {
  id: string;
  title: string;
  views: string;
  thumbnail: string;
  url: string;
}

export interface Post {
  id: string;
  title: string;
  date: string;
  readTime: string;
  url: string;
  content: string;
  contentSnippet?: string;
}

export interface Music {
  title: string;
  artist: string;
  cover: string;
  isPlaying: boolean;
  url: string;
}

export interface Action {
  id: string;
  label: string;
  url: string;
  style: string;
  icon: string;
  color: string;
  customClasses?: string;
  // Optional presentation fields used by the admin/config
  rounded?: string;
  size?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  date: string;
  description: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  avatar: string;
}

export interface SystemHealth {
  status: string;
  uptime: string;
  geminiApiStatus: string;
  lastUpdate: string;
}

export interface Design {
  radius: string;
  blur: string;
  border: string;
  cardStyle: string;
}

export interface Theme {
  accentColor: string;
  backgroundStyle: string;
}

export interface StackItem {
  id: string;
  name: string;
  iconKey: string;
}

export interface AppState {
  profile: Profile;
  links: LinkItem[];
  projects: Project[];
  videos: Video[];
  posts: Post[];
  music: Music;
  actions: Action[];
  experience: Experience[];
  stats: Stat[];
  skills: Skill[];
  testimonials: Testimonial[];
  systemHealth: SystemHealth;
  design: Design;
  theme: Theme;
  stack: StackItem[];
}