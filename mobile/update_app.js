const fs = require('fs');
const path = require('path');

const filePath = "C:\\Users\\Dell\\Downloads\\dill's-ai-portfolio (1)\\App.tsx";
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Line 829 (1-based) is index 828.
// Line 1568 (1-based) is index 1567.
// We want to keep 0..827 (first 828 lines)
// And 1568..end (from index 1568 onwards)

const startKeep = lines.slice(0, 828);
const endKeep = lines.slice(1568);

const newBlock = `         {/* --- ADMIN PANEL 7.0 AI CORE --- */}
         {isAdminOpen && (
            <AdminPanel
               isOpen={isAdminOpen}
               onClose={() => setIsAdminOpen(false)}
               apiKey={apiKey}
               setApiKey={setApiKey}
               state={{
                  profile,
                  experience,
                  skills,
                  projects,
                  posts,
                  links,
                  videos,
                  music,
                  actions,
                  stack,
                  testimonials,
                  systemHealth,
                  stats,
                  theme,
                  design
               }}
               setState={(newState) => {
                  if (newState.profile) setProfile(prev => ({ ...prev, ...newState.profile }));
                  if (newState.experience) setExperience(newState.experience);
                  if (newState.skills) setSkills(newState.skills);
                  if (newState.projects) setProjects(newState.projects);
                  if (newState.posts) setPosts(newState.posts);
                  if (newState.links) setLinks(newState.links);
                  if (newState.videos) setVideos(newState.videos);
                  if (newState.music) setMusic(prev => ({...prev, ...newState.music}));
                  if (newState.actions) setActions(newState.actions);
                  if (newState.stack) setStack(newState.stack);
                  if (newState.testimonials) setTestimonials(newState.testimonials);
                  if (newState.systemHealth) setSystemHealth(prev => ({...prev, ...newState.systemHealth}));
                  if (newState.stats) setStats(newState.stats);
                  if (newState.theme) setTheme(prev => ({...prev, ...newState.theme}));
                  if (newState.design) setDesign(prev => ({...prev, ...newState.design}));
               }}
            />
         )}`;

const newContent = [...startKeep, newBlock, ...endKeep].join('\n');

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('App.tsx updated successfully.');
