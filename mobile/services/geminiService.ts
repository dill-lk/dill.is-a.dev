import { GoogleGenerativeAI } from "@google/generative-ai";

const ENV_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const getGeminiResponse = async (
  message: string,
  context: string,
  customApiKey?: string
): Promise<string> => {
  const activeKey = customApiKey || ENV_API_KEY || "PLACEHOLDER_KEY";
  if (activeKey === "PLACEHOLDER_KEY" || !activeKey) {
    return "Please set your Gemini API Key in the Admin Panel > API System.";
  }

  try {
    const genAI = new GoogleGenerativeAI(activeKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(`You are an AI assistant for a portfolio. Context: ${context}\n\nVisitor: ${message}`);
    return result.response.text();
  } catch (error) {
    return "Sorry, I encountered an error. Please check your API Key.";
  }
};

export const generateTailwindClasses = async (description: string, apiKey?: string): Promise<string> => {
  const activeKey = apiKey || ENV_API_KEY;
  if (!activeKey || activeKey === "PLACEHOLDER_KEY") return "";

  try {
    const genAI = new GoogleGenerativeAI(activeKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(`Generate Tailwind classes for: "${description}"\nReturn ONLY class names.`);
    let text = result.response.text().trim();
    text = text.replace(/```/g, '').replace(/classes:/i, '').trim();
    return text.split('\n')[0] || text;
  } catch (error) {
    return "";
  }
};

export const generateProjectSummary = async (
  projectDetails: { title: string; tags: string[]; currentSubtitle?: string },
  apiKey?: string
): Promise<string> => {
  const activeKey = apiKey || ENV_API_KEY;
  if (!activeKey || activeKey === "PLACEHOLDER_KEY") return "API Key not set.";

  try {
    const genAI = new GoogleGenerativeAI(activeKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(`Create 1-line subtitle for project "${projectDetails.title}" with tags: ${projectDetails.tags.join(', ')}\nReturn ONLY the subtitle, max 60 chars.`);
    return result.response.text().trim().replace(/^["']|["']$/g, '').substring(0, 60);
  } catch (error) {
    return "Failed to generate";
  }
};

export const generateBlogPost = async (
  topic: string,
  apiKey?: string,
  options?: { wordCount?: number; tone?: string; style?: string }
): Promise<{ title: string; readTime: string; date: string; contentSnippet: string; content: string } | string> => {
  const activeKey = apiKey || ENV_API_KEY;
  if (!activeKey || activeKey === "PLACEHOLDER_KEY") return "API Key not set.";

  const wordCount = options?.wordCount || 1500;
  const tone = options?.tone || 'professional';
  const style = options?.style || 'informative';

  const prompt = `Write a ${wordCount}-word ${tone} ${style} tech blog post about: "${topic}"

CRITICAL FORMATTING REQUIREMENTS:
1. Start with ## Introduction (not #)
2. Use ## for main sections  
3. Use ### for subsections
4. Use **bold** for key terms
5. Use \`code\` for technical terms
6. Include bullet lists with - or *
7. Add code examples in \`\`\`language blocks if relevant
8. Write in clear paragraphs with line breaks between sections

Return ONLY this JSON (no extra text):
{
"title": "Compelling Title",
"readTime": "8 min",
"date": "2024-12-09",
"contentSnippet": "Short 2-sentence summary",
"content": "Full markdown blog post"
}`;

  try {
    const genAI = new GoogleGenerativeAI(activeKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return "AI didn't return valid JSON. Please try again.";

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      title: parsed.title || topic,
      readTime: parsed.readTime || `${Math.ceil(wordCount / 200)} min`,
      date: parsed.date || new Date().toISOString().split('T')[0],
      contentSnippet: parsed.contentSnippet || '',
      content: parsed.content || ''
    };
  } catch (error: any) {
    return `Generation failed: ${error.message}`;
  }
};

export const refineBio = async (
  currentBio: string,
  apiKey?: string,
  tone?: string
): Promise<string> => {
  const activeKey = apiKey || ENV_API_KEY;
  if (!activeKey || activeKey === "PLACEHOLDER_KEY") return currentBio;

  try {
    const genAI = new GoogleGenerativeAI(activeKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(`Make this bio more ${tone || 'professional'}: "${currentBio}"\nReturn ONLY the new bio.`);
    return result.response.text().trim();
  } catch (error) {
    return currentBio;
  }
};

export const suggestSkills = async (currentSkills: string[], apiKey?: string): Promise<string[]> => {
  const activeKey = apiKey || ENV_API_KEY;
  if (!activeKey || activeKey === "PLACEHOLDER_KEY") return [];

  try {
    const genAI = new GoogleGenerativeAI(activeKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(`Given: ${currentSkills.join(', ')}\nSuggest 5 skills.\nReturn ["skill1","skill2",...]`);
    let text = result.response.text().trim().replace(/```json\n?/g, '').replace(/```/g, '');
    return JSON.parse(text);
  } catch (error) {
    return [];
  }
};

export const generateSVG = async (description: string, apiKey?: string): Promise<string> => {
  const activeKey = apiKey || ENV_API_KEY;
  if (!activeKey || activeKey === "PLACEHOLDER_KEY") return "";

  try {
    const genAI = new GoogleGenerativeAI(activeKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(`SVG path for: "${description}"\nReturn ONLY path data.`);
    return result.response.text().trim().replace(/^d="/, '').replace(/"$/, '').replace(/```/g, '');
  } catch (error) {
    return "";
  }
};

export const suggestIcon = async (linkTitle: string, apiKey?: string): Promise<string> => {
  const activeKey = apiKey || ENV_API_KEY;
  if (!activeKey || activeKey === "PLACEHOLDER_KEY") return "Link";

  try {
    const genAI = new GoogleGenerativeAI(activeKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Suggest Lucide React icon for: "${linkTitle}"

VAST ICON LIBRARY:
Social: Github, Twitter, Linkedin, Instagram, Facebook, Youtube, Twitch, Reddit, Discord, Slack, Telegram
Communication: Mail, Phone, MessageCircle, Send, AtSign  
Media: Camera, Video, Music, Mic, Film, Image, Play
Tools: Code, Terminal, Database, Server, Cloud, Lock, Key, Shield
Business: Briefcase, Building, TrendingUp, DollarSign, CreditCard
Creative: Palette, Pen, Brush, Scissors, Wand
Documents: FileText, File, Folder, Book, Bookmark, Newspaper
Navigation: Home, Search, Settings, Menu, ArrowRight
Actions: Download, Upload, Share, Copy, Edit, Trash, Plus, Check
General: Globe, Link, Heart, Star, Bell, Zap, Sun, Moon

Examples:
TikTok → Video
Behance → Palette  
Medium → BookOpen
Dev.to → Code
Spotify → Music
Snapchat → Camera

Return ONLY the icon name (e.g., "Video"), nothing else.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim().replace(/^["']|["']$/g, '');
    return /^[A-Za-z0-9]+$/.test(text) ? text : "Link";
  } catch (error) {
    return "Link";
  }
};
