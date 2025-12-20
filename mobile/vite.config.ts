import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const saveConstantsPlugin = () => ({
  name: 'save-constants',
  configureServer(server) {
    server.middlewares.use('/api/save-constants', async (req, res, next) => {
      if (req.method === 'POST') {
        const chunks = [];
        req.on('data', chunk => chunks.push(chunk));
        req.on('end', () => {
          try {
            const body = JSON.parse(Buffer.concat(chunks).toString());
            const fileContent = `
import * as LucideIcons from 'lucide-react';

export const INITIAL_DESIGN = ${JSON.stringify(body.design, null, 2)};
export const INITIAL_EXPERIENCE = ${JSON.stringify(body.experience, null, 2)};
export const INITIAL_STATS = ${JSON.stringify(body.stats, null, 2)};
export const INITIAL_SKILLS = ${JSON.stringify(body.skills, null, 2)};
export const INITIAL_TESTIMONIALS = ${JSON.stringify(body.testimonials, null, 2)};
export const INITIAL_SYSTEM_HEALTH = ${JSON.stringify(body.systemHealth, null, 2)};
export const INITIAL_ACTIONS = ${JSON.stringify(body.actions, null, 2)};
export const INITIAL_PROFILE = ${JSON.stringify(body.profile, null, 2)};
export const INITIAL_MUSIC = ${JSON.stringify(body.music, null, 2)};
export const INITIAL_THEME = ${JSON.stringify(body.theme, null, 2)};
export const INITIAL_STACK = ${JSON.stringify(body.stack, null, 2)};
export const INITIAL_LINKS = ${JSON.stringify(body.links, null, 2)};
export const INITIAL_PROJECTS = ${JSON.stringify(body.projects, null, 2)};
export const INITIAL_VIDEOS = ${JSON.stringify(body.videos, null, 2)};
export const INITIAL_POSTS = ${JSON.stringify(body.posts, null, 2)};
            `;
            fs.writeFileSync(path.resolve(__dirname, 'constants.ts'), fileContent);
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true }));
          } catch (error) {
            console.error('Error saving constants:', error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to save' }));
          }
        });
      } else {
        next();
      }
    });
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react(), saveConstantsPlugin()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
