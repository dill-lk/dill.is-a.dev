export const parseCustomMarkdown = (text: string): string => {
  let html = text;

  // Bold (*text*)
  html = html.replace(/\*(.*?)\*/g, '<strong>$1</strong>');

  // Italic (_text_)
  html = html.replace(/_(.*?)_/g, '<em>$1</em>');

  // Strikethrough (~text~)
  html = html.replace(/~(.*?)~/g, '<del>$1</del>');

  // Monospace (```text```) - for inline code
  html = html.replace(/```(.*?)```/g, '<code>$1</code>');

  // Simple Code Block (```\ncode\n```) - for multiline
  html = html.replace(/```\n(.*?)\n```/gs, '<pre><code>$1</code></pre>');

  return html;
};
