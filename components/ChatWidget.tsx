import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, ArrowUp, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import ChatTogglerIcon from './ChatTogglerIcon';
import ProcessingIcon from './ProcessingIcon';
import BlurFade from './BlurFade';
import { parseCustomMarkdown } from '../utils/markdownParser';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Nexus Intelligence active. Ready for query.",
      timestamp: Date.now()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    const history = messages
        .filter(m => m.role !== 'system')
        .map(m => ({ role: m.role as 'user' | 'model', text: m.text }));

    const responseText = await sendMessageToGemini(history, userMsg.text);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans flex flex-col items-end">
      
      {/* Chat Window - Premium Glass Panel */}
      {isOpen && (
        <div className="mb-4 w-[340px] md:w-[380px] h-[500px] bg-[var(--brand-950)]/80 backdrop-blur-2xl border border-white/10 rounded-[28px] shadow-2xl flex flex-col overflow-hidden animate-slide-up origin-bottom-right transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
          
          {/* Header */}
          <div className="h-14 px-5 flex justify-between items-center border-b border-white/5 shrink-0">
             <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.7)]"></div>
                <span className="text-sm font-semibold text-[var(--foreground)]">Nexus</span>
             </div>
             <button 
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-white/[0.08] hover:bg-white/20 flex items-center justify-center text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-all cursor-none"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {messages.map((msg, idx) => (
              <BlurFade key={msg.id} delay={0.1 * idx} inView>
                <div 
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div 
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-lg' 
                        : 'bg-[var(--brand-600)] text-[var(--brand-100)] border border-white/10 rounded-bl-lg'
                    }`}
                    dangerouslySetInnerHTML={{ __html: msg.role === 'model' ? parseCustomMarkdown(msg.text) : msg.text }}
                  >
                  </div>
                </div>
              </BlurFade>
            ))}
            
            {isLoading && (
              <BlurFade delay={0.1} inView>
                 <div className="flex items-center gap-3 pl-2">
                    <div className="relative w-8 h-8 flex items-center justify-center">
                        <ProcessingIcon />
                    </div>
                    <span className="text-xs text-white/50 tracking-wide font-medium">Nexus is thinking...</span>
                 </div>
              </BlurFade>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/5 bg-[var(--brand-950)]/50">
            <div className="relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask Nexus..."
                className="w-full bg-[var(--brand-600)] border border-white/10 text-[var(--foreground)] text-sm rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-white/40 cursor-none"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputText.trim()}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 text-white rounded-lg transition-all flex items-center justify-center disabled:opacity-50 disabled:scale-90 enabled:hover:scale-105 enabled:active:scale-95 shadow-lg cursor-none"
              >
                <ArrowUp size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'} transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] w-16 h-16 rounded-full bg-[var(--brand-950)]/80 backdrop-blur-2xl border border-white/10 text-[var(--foreground)] shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center justify-center hover:scale-110 group cursor-none`}
      >
        <ChatTogglerIcon />
      </button>
    </div>
  );
};

export default ChatWidget;