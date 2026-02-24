import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "SYSTEM ONLINE. I am Saad's AI. Ask about his MERN stack architecture, technical experience, or projects." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
      
      const data = await response.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      }
    } catch (error) {
      console.error("Network Error Details:", error);
      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        content: `SYS_ERR: ${error.message}. Check browser console (F12) for detailed logs.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[300] font-sans cursor-auto flex items-end justify-end gap-4">
      
      {/* -------------------------------------------------- */}
      {/* DIGITAL TWIN STATUS BADGE (Only shows when closed) */}
      {/* -------------------------------------------------- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ delay: 1.5, duration: 0.5, type: "spring" }} 
            className="mb-4 mr-2 hidden md:flex items-center cursor-pointer group"
            onClick={() => setIsOpen(true)} // User can click the text to open chat
          >
            {/* The Badge Container */}
            <div className="bg-[#F2F2EC] border-2 border-[#111] px-5 py-3 shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] flex items-center gap-4 relative hover:-translate-y-1 transition-transform duration-300">
              
              {/* Decorative Arrow pointing to button */}
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#F2F2EC] border-t-2 border-r-2 border-[#111] rotate-45 transform"></div>

              {/* Status Indicator (Pulsing Radar) */}
              <div className="relative flex h-3 w-3 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600 border border-[#111]"></span>
              </div>

              {/* Text Content */}
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-[#111] leading-none">
                  Digital Twin // Online
                </span>
                <span className="font-serif italic text-sm text-[#333] leading-none whitespace-nowrap">
                  I hold my entire professional memory.
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -------------------------------------------------- */}
      {/* MAIN CHAT WINDOW                                   */}
      {/* -------------------------------------------------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-[#F2F2EC] border-4 border-[#111] shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#111] text-[#F2F2EC] p-4 flex justify-between items-center border-b-4 border-[#111]">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <span className="font-mono text-xs uppercase tracking-widest font-bold">Saad.AI // Terminal</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform duration-300">
                <FiX className="text-2xl" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiMzMzMiIGZpbGwtb3BhY2l0eT0iLjEiLz48L3N2Zz4=')]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#555] mb-1">
                    {msg.role === 'user' ? 'GUEST_USER' : 'SYSTEM_AI'}
                  </span>
                  <div className={`p-4 text-sm font-medium border-2 border-[#111] leading-relaxed shadow-[4px_4px_0px_0px_rgba(17,17,17,0.2)] ${
                    msg.role === 'user' 
                      ? 'bg-[#111] text-[#F2F2EC] rounded-tl-xl rounded-bl-xl rounded-br-xl' 
                      : 'bg-white text-[#111] rounded-tr-xl rounded-bl-xl rounded-br-xl'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 p-4 bg-white border-2 border-[#111] rounded-tr-xl rounded-bl-xl rounded-br-xl w-fit shadow-[4px_4px_0px_0px_rgba(17,17,17,0.2)]">
                  <div className="w-2 h-2 bg-[#111] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#111] rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-[#111] rounded-full animate-bounce delay-150"></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 bg-white border-t-4 border-[#111] flex gap-3">
              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                placeholder="QUERY DATABASE..." 
                className="flex-1 bg-transparent border-b-2 border-[#111] font-mono text-sm px-2 py-2 focus:outline-none focus:bg-[#F2F2EC] transition-colors uppercase placeholder:text-[#888]"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()} 
                className="bg-[#111] text-[#F2F2EC] p-3 border-2 border-[#111] hover:bg-white hover:text-[#111] transition-colors disabled:opacity-50 shadow-[2px_2px_0px_0px_rgba(17,17,17,1)]"
              >
                <FiSend />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button 
        onClick={() => setIsOpen(!isOpen)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-16 h-16 rounded-full border-4 border-[#111] shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] flex items-center justify-center transition-colors duration-300 z-[300] relative overflow-hidden ${isOpen ? 'bg-white text-[#111]' : 'bg-[#111] text-[#F2F2EC]'}`}
      >
        {isOpen ? <FiX className="text-3xl relative z-10" /> : <FiMessageSquare className="text-3xl relative z-10" />}
      </motion.button>
    </div>
  );
};

export default ChatAssistant;