// AI functionality removed — stub implementations below.
// These functions intentionally do not import any AI SDKs so the client
// bundle remains free of Node-only dependencies.

export const getGeminiResponse = async (
  message: string,
  context: string,
  customApiKey?: string
): Promise<string> => {
  return "AI functionality has been disabled.";
};

export const generateTailwindClasses = async (description: string, apiKey?: string): Promise<string> => {
  return "";
};

export const generateProjectSummary = async (
  projectDetails: { title: string; tags: string[]; currentSubtitle?: string },
  apiKey?: string
): Promise<string> => {
  return projectDetails.title || "";
};

export const generateBlogPost = async (
  topic: string,
  apiKey?: string,
  options?: { wordCount?: number; tone?: string; style?: string }
): Promise<{ title: string; readTime: string; date: string; contentSnippet: string; content: string } | string> => {
  return {
    title: topic,
    readTime: "1 min",
    date: new Date().toISOString().split('T')[0],
    contentSnippet: "AI generation disabled.",
    content: ""
  };
};

export const refineBio = async (
  currentBio: string,
  apiKey?: string,
  tone?: string
): Promise<string> => {
  return currentBio;
};

export const suggestSkills = async (currentSkills: string[], apiKey?: string): Promise<string[]> => {
  return currentSkills.slice(0, 5);
};

export const generateSVG = async (description: string, apiKey?: string): Promise<string> => {
  return "";
};

export const suggestIcon = async (linkTitle: string, apiKey?: string): Promise<string> => {
  return "Link";
};

