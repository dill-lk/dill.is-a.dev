
import React, { useState, useRef, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { INITIAL_PROFILE, INITIAL_PROJECTS, INITIAL_STACK } from '../constants';

interface ChatWidgetProps {
  apiKey?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ apiKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: "Hello! I'm the AI assistant for this portfolio. Ask me anything about Dill's work or tech stack." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    // Build context
    const context = `
      Profile: ${JSON.stringify(INITIAL_PROFILE)}
      Projects: ${JSON.stringify(INITIAL_PROJECTS)}
      Tech Stack: ${JSON.stringify(INITIAL_STACK)}
    `;

    try {
      const response = await getGeminiResponse(userMessage, context, apiKey);
      setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] h-[500px] bg-[#1C1C1E]/90 backdrop-blur-xl border border-white/10 rounded-[24px] shadow-2xl flex flex-col overflow-hidden animate-slide-up origin-bottom-right transition-all">
          {/* Header */}
          <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-bold text-white text-sm">Titanium AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
              <LucideIcons.X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white/10 text-white/90 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                  <div className="bg-white/10 text-white/90 p-3 rounded-2xl rounded-bl-none flex gap-1">
                    <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce delay-100" />
                    <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce delay-200" />
                  </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-white/5 bg-black/20">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Dill..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-3 text-sm text-white focus:border-blue-500/50 outline-none transition-colors"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-2 p-1.5 text-blue-400 hover:text-white disabled:opacity-30 disabled:hover:text-blue-400 transition-colors"
              >
                <LucideIcons.Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full shadow-lg shadow-blue-900/40 border border-white/10 hover:scale-110 transition-transform active:scale-95"
      >
        {isOpen ? <LucideIcons.ChevronDown size={24} className="text-white" /> : <LucideIcons.MessageSquare size={24} className="text-white" />}
        
        {/* Notification Dot (optional logic) */}
        {!isOpen && messages.length > 1 && (
           <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-[#1C1C1E]" />
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
