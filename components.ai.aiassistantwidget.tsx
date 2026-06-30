// src/components/AI/AIAssistantWidget.tsx
import { useState } from 'react';
import { BrainCircuit, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AIAssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'أهلاً! أنا المساعد الذكي الخاص بخريطتك. يمكنك سؤالي عن أهم المهام، أو المشاريع المتأخرة، أو كيف ترتب أولوياتك اليوم.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if(!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    // Mock response based on the rules requested
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: 'بناءً على خريطتك الحالية، أهم شيء يجب التركيز عليه اليوم هو "إطلاق النسخة التجريبية" مع محمد أحمد نظراً لاقتراب الموعد النهائي (أولوية قصوى).' 
      }]);
    }, 1000);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 w-14 h-14 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:scale-110 transition-transform z-50 text-white"
      >
        <BrainCircuit size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-28 left-8 w-96 h-[500px] glass-panel rounded-2xl z-50 flex flex-col overflow-hidden border-white/20"
          >
            <div className="p-4 bg-dark-800/80 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BrainCircuit className="text-primary-400" />
                <h3 className="font-bold text-white">المساعد الاستراتيجي</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-primary-600 text-white rounded-tl-none' 
                      : 'bg-dark-700 text-gray-200 rounded-tr-none border border-white/5'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-white/10 bg-dark-900/50">
              <div className="flex gap-2 relative">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="اسألني عن خطتك..."
                  className="flex-1 bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary-500 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  className="w-12 bg-primary-600 hover:bg-primary-500 text-white rounded-xl flex items-center justify-center transition-colors"
                >
                  <Send size={18} className="rotate-180" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
