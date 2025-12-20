
import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as LucideIcons from 'lucide-react';

interface Command {
  id: string;
  label: string;
  icon: string;
  action: () => void;
  keywords?: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  commands: Command[];
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, commands }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCommands, setFilteredCommands] = useState<Command[]>(commands);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter commands based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredCommands(commands);
    } else {
      const lowerCaseSearch = searchTerm.toLowerCase();
      setFilteredCommands(
        commands.filter(cmd => 
          cmd.label.toLowerCase().includes(lowerCaseSearch) ||
          (cmd.keywords && cmd.keywords.some(kw => kw.toLowerCase().includes(lowerCaseSearch)))
        )
      );
    }
    setSelectedIndex(0); // Reset selection on search
  }, [searchTerm, commands]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      listRef.current?.children[selectedIndex]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      listRef.current?.children[selectedIndex]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [filteredCommands, selectedIndex, onClose]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      inputRef.current?.focus();
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const DynamicIcon = ({ name, size = 20, className = "" }: { name: string, size?: number, className?: string }) => {
    const IconComponent = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
    return <IconComponent size={size} className={className} />;
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-[#1C1C1E]/90 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-xl overflow-hidden animate-scale-in">
        <div className="flex items-center p-3 border-b border-white/10">
          <LucideIcons.Search size={20} className="text-white/50 ml-2" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent border-none text-white text-base pl-4 py-2 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="text-xs text-white/40 border border-white/20 px-2 py-1 rounded-md mr-2">ESC</span>
        </div>

        <div ref={listRef} className="max-h-[400px] overflow-y-auto custom-scrollbar">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((command, index) => (
              <button
                key={command.id}
                onClick={() => { command.action(); onClose(); }}
                className={`flex items-center w-full px-5 py-3 gap-3 text-white transition-colors 
                  ${index === selectedIndex ? 'bg-blue-600/30 text-white' : 'hover:bg-white/5'}`}
              >
                <DynamicIcon name={command.icon} size={18} className="text-white/70" />
                <span className="text-sm font-medium">{command.label}</span>
              </button>
            ))
          ) : (
            <div className="p-5 text-center text-white/50">No commands found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
