import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import Portfolio from './components/portfolio';
function App() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Smooth Mouse Follower Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics makes the glow feel "heavy" and premium
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 150); // Offset by half of glow width
      mouseY.set(e.clientY - 150);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative bg-[#0a0a0a] min-h-screen cursor-none">
      
      {/* 1. The "Aura" Glow (Follows Mouse) */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
        }}
        className="fixed top-0 left-0 w-[300px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none z-50"
      />

      {/* 2. Custom Magnetic Cursor Dot */}
      <motion.div
        style={{
          translateX: useSpring(mouseX, { damping: 40, stiffness: 400 }),
          translateY: useSpring(mouseY, { damping: 40, stiffness: 400 }),
          left: 145, // Centering the dot
          top: 145
        }}
        className="fixed w-3 h-3 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference"
      />

      {/* 3. The Main Content */}
      <Portfolio />

      {/* 4. Global Footer/Aura Note */}
      <footer className="max-w-7xl mx-auto p-12 text-center">
        <p className="text-gray-600 font-mono text-xs uppercase tracking-[0.3em]">
          Designed by Saad • © 2026 SS
        </p>
      </footer>
    </div>
  );
}

export default App;