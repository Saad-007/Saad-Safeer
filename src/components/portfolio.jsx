import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiX } from 'react-icons/fi';
import image1 from "../assets/image/shopplus.png";
import image2 from "../assets/image/resume.png";
import image3 from "../assets/image/Teamsyn.png";
import ChatAssistant from './ChatAssistant'; // Adjust path if needed
// ---------------------------------------------------------
// ANIMATION VARIANTS (The Secret to Premium Feel)
// ---------------------------------------------------------
const customEase = [0.22, 1, 0.36, 1]; 

const textReveal = {
  hidden: { y: "100%" },
  visible: { y: "0%", transition: { duration: 1.2, ease: customEase } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: customEase } }
};

// ---------------------------------------------------------
// 1. HEADER / NAVBAR
// ---------------------------------------------------------
const Header = () => (
  <nav className="fixed top-0 w-full z-[100] px-6 py-5 bg-[#F2F2EC]/90 backdrop-blur-md border-b-2 border-[#111] flex justify-between items-center transition-all">
    <div className="font-serif italic text-2xl tracking-tight text-[#111] font-bold hover:scale-105 transition-transform cursor-pointer">Saad.</div>
    <div className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-[0.1em] text-[#111] font-bold">
      <a href="#projects" className="hover:bg-[#111] hover:text-[#F2F2EC] px-3 py-1 transition-colors">Index</a>
      <a href="#capabilities" className="hover:bg-[#111] hover:text-[#F2F2EC] px-3 py-1 transition-colors">Capabilities</a>
      <a href="#contact" className="hover:bg-[#111] hover:text-[#F2F2EC] px-3 py-1 transition-colors">Contact</a>
    </div>
  </nav>
);

// ---------------------------------------------------------
// 2. HERO SECTION
// ---------------------------------------------------------
const Hero = () => (
  <section id="home" className="min-h-screen flex flex-col justify-end px-6 md:px-12 max-w-7xl mx-auto pb-24 pt-32">
    <div className="font-mono text-xs uppercase tracking-widest border-2 border-[#111] inline-block px-4 py-2 mb-12 bg-[#111] text-[#F2F2EC] w-fit font-bold shadow-[4px_4px_0px_0px_rgba(17,17,17,0.3)]">
      [01] Overview
    </div>
    
    <div className="mb-12">
      <div className="overflow-hidden pb-2">
        <motion.h1 variants={textReveal} initial="hidden" animate="visible" className="text-[14vw] md:text-[11vw] font-serif leading-[0.8] tracking-tighter text-[#111] uppercase">
          Software
        </motion.h1>
      </div>
      <div className="overflow-hidden pb-2 flex gap-4 md:gap-8 items-center">
        <motion.div initial={{ width: 0 }} animate={{ width: "15vw" }} transition={{ duration: 1.2, ease: customEase, delay: 0.2 }} className="h-[2px] md:h-[6px] bg-[#111] mt-4" />
        <motion.h1 variants={textReveal} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="text-[14vw] md:text-[11vw] font-serif leading-[0.8] tracking-tighter text-[#111] uppercase italic">
          Architect.
        </motion.h1>
      </div>
    </div>

    <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.4 }} className="flex flex-col md:flex-row justify-between items-end border-t-2 border-[#111] pt-8 gap-6">
      <p className="max-w-xl text-[#111] text-lg md:text-2xl font-medium leading-snug">
        I engineer high-performance web ecosystems, specializing in MERN stack architecture, AI automation, and rigorous system design.
      </p>
      <div className="font-mono text-xs uppercase tracking-widest text-[#111] text-right font-bold">
        <p>Current Rank: 7th Sem BSCS</p>
        <p>Location: Karachi, PK</p>
      </div>
    </motion.div>
  </section>
);

// ---------------------------------------------------------
// INFINITE MARQUEE
// ---------------------------------------------------------
const Marquee = () => {
  const marqueeText = "MERN STACK • AI AUTOMATION • SYSTEM DESIGN • FULL-STACK DEV • ";
  return (
    <div className="border-y-2 border-[#111] bg-[#111] text-[#F2F2EC] overflow-hidden py-4 flex whitespace-nowrap">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }} 
        transition={{ repeat: Infinity, ease: "linear", duration: 15 }} 
        className="flex gap-4 text-2xl font-serif italic tracking-widest"
      >
        <span>{marqueeText}</span>
        <span>{marqueeText}</span>
        <span>{marqueeText}</span>
      </motion.div>
    </div>
  );
};

// ---------------------------------------------------------
// 3. PROJECTS SECTION
// ---------------------------------------------------------
const Projects = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="projects" className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="border-b-4 border-[#111] pb-6 mb-16 flex justify-between items-end">
        <h2 className="text-5xl md:text-7xl font-serif text-[#111] tracking-tighter uppercase">Selected Works</h2>
        <span className="font-mono text-sm font-bold">[02]</span>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <ProjectCard 
          title="TeamSync"
          description="Collaborative whiteboard with real-time video meetings, powered by OpenAI & Whisper for automated transcriptions."
          tags={['React', 'Socket.io', 'MongoDB', 'OpenAI']} link="#" image={image3} onImageClick={() => setSelectedImage(image3)}
        />
        <ProjectCard 
          title="ResumeAI"
          description="An AI-powered resume builder converting user prompts into formatted, downloadable PDFs in seconds."
          tags={['MERN Stack', 'Vite', 'OpenAI API']} link="#" image={image2} onImageClick={() => setSelectedImage(image2)}
        />
        <ProjectCard 
          title="ShopPlus"
          description="Full-stack e-commerce architecture with seamless checkout flows and dynamic inventory management."
          tags={['React', 'Node.js', 'Express']} link="#" image={image1} onImageClick={() => setSelectedImage(image1)}
        />
        
        {/* Archive Link */}
        <a href="https://github.com/Saad-007" className="group border-2 border-[#111] bg-[#111] text-[#F2F2EC] p-10 flex flex-col justify-between items-start hover:bg-[#F2F2EC] hover:text-[#111] transition-colors duration-500 min-h-[400px] shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] cursor-pointer">
           <div className="w-full flex justify-between items-center">
             <span className="font-mono text-xs uppercase tracking-widest">Directory</span>
             <FiArrowUpRight className="text-4xl group-hover:rotate-45 transition-transform duration-500" />
           </div>
           <div>
             <h3 className="text-6xl font-serif uppercase tracking-tighter mb-4">Archive.</h3>
             <p className="font-mono text-sm underline underline-offset-4">View Complete GitHub ↗</p>
           </div>
        </a>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)} className="fixed inset-0 z-[200] flex items-center justify-center bg-[#F2F2EC]/90 backdrop-blur-md p-4 md:p-12 cursor-zoom-out">
            <button className="absolute top-8 right-8 text-[#111] hover:rotate-90 transition-transform duration-500 bg-white border-2 border-[#111] p-2 shadow-[4px_4px_0px_0px_rgba(17,17,17,1)]" onClick={() => setSelectedImage(null)}>
              <FiX className="text-3xl" />
            </button>
            <motion.img initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} src={selectedImage} alt="Enlarged Project" className="max-w-full max-h-full object-contain border-4 border-[#111] shadow-[16px_16px_0px_0px_rgba(17,17,17,1)] bg-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// ---------------------------------------------------------
// 4. CAPABILITIES (The Blueprint & Inverted Ticket Layout)
// ---------------------------------------------------------
const Capabilities = () => (
  <section id="capabilities" className="py-32 bg-[#111] text-[#F2F2EC] relative overflow-hidden border-y-2 border-[#111]">
    {/* Architectural Blueprint CSS Grid Background */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 pointer-events-none" />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="border-b-2 border-[#F2F2EC]/30 pb-6 mb-16 flex justify-between items-end">
        <h2 className="text-5xl md:text-7xl font-serif tracking-tighter uppercase">Capabilities</h2>
        <span className="font-mono text-sm font-bold bg-[#F2F2EC] text-[#111] px-2 py-1">[03]</span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        
        {/* Left Column: Tech Stack (Interactive Ledgers) */}
        <div className="md:col-span-7 space-y-0 border-t-2 border-[#F2F2EC]/30 bg-[#111]/80 backdrop-blur-sm">
          <LedgerRow title="Frontend Architecture" details="React, Next.js, Tailwind CSS, Framer Motion" />
          <LedgerRow title="Backend & DB Systems" details="Node.js, Express, MongoDB, Firebase" />
          <LedgerRow title="Artificial Intelligence" details="OpenAI API, Ollama, Whisper Integration" />
          <LedgerRow title="Computer Science Core" details="Compiler Construction, System Architecture" />
        </div>

        {/* Right Column: Experience (High-Contrast "Ticket") */}
        <div className="md:col-span-5 bg-[#F2F2EC] text-[#111] border-2 border-[#111] p-8 md:p-12 flex flex-col justify-between shadow-[12px_12px_0px_0px_rgba(242,242,236,0.15)] hover:shadow-[16px_16px_0px_0px_rgba(242,242,236,0.3)] transition-all duration-500">
          <div>
            <div className="flex justify-between items-center mb-10 border-b-2 border-[#111] pb-4">
               <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-[#111]">Professional Ledger</h3>
               <div className="w-2 h-2 rounded-full bg-[#111] animate-pulse" />
            </div>
            <ExperienceItem role="Web Dev Intern" company="DEN" date="2025" />
            <ExperienceItem role="Frontend Dev Intern" company="Ziauddin Hospital" date="2025." />
          </div>
          <div className="mt-16 font-serif italic text-2xl text-[#555] border-t-2 border-[#111] pt-6">
            "Bridging academic rigor with industry execution."
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ---------------------------------------------------------
// 5. CONTACT SECTION
// ---------------------------------------------------------
const Contact = () => (
  <section id="contact" className="py-40 px-6 max-w-7xl mx-auto">
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center flex flex-col items-center">
      <div className="font-mono text-xs uppercase tracking-widest border-2 border-[#111] px-4 py-2 mb-12 bg-white font-bold">
        [04] Final Operations
      </div>
      <h2 className="text-[12vw] md:text-[10vw] font-serif tracking-tighter text-[#111] uppercase leading-none hover:italic transition-all duration-500">
        Initiate.
      </h2>
      <a href="mailto:saadsafeer223@gmail.com" className="mt-12 text-2xl md:text-4xl font-serif italic text-[#111] border-b-4 border-[#111] pb-2 hover:bg-[#111] hover:text-[#F2F2EC] hover:px-8 hover:border-transparent transition-all duration-500">
        saadsafeer223@gmail.com ↗
      </a>
    </motion.div>
  </section>
);

// ---------------------------------------------------------
// HELPER UI COMPONENTS
// ---------------------------------------------------------

const ProjectCard = ({ title, description, tags, link, image, onImageClick }) => (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="group flex flex-col h-full bg-white border-2 border-[#111] hover:shadow-[12px_12px_0px_0px_rgba(17,17,17,1)] hover:-translate-y-2 hover:-translate-x-2 transition-all duration-300">
    {image && (
      <div onClick={onImageClick} className="h-80 w-full overflow-hidden relative border-b-2 border-[#111] cursor-zoom-in">
        <div className="absolute inset-0 bg-[#111]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
           <span className="font-mono text-xs uppercase tracking-widest border border-[#F2F2EC] text-[#F2F2EC] px-6 py-3 hover:bg-[#F2F2EC] hover:text-[#111] transition-colors">Expand Artifact</span>
        </div>
        <img src={image} alt={title} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" />
      </div>
    )}
    <div className="p-8 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-6 border-b-2 border-[#111] pb-4">
        <h3 className="text-4xl font-serif text-[#111] tracking-tighter uppercase">{title}</h3>
        <a href={link} className="text-[#111] hover:bg-[#111] hover:text-[#F2F2EC] p-3 border-2 border-[#111] transition-colors z-20 shadow-[4px_4px_0px_0px_rgba(17,17,17,1)]">
          <FiArrowUpRight className="text-xl" />
        </a>
      </div>
      <p className="text-[#111] text-lg mb-8 leading-relaxed flex-1 font-medium">{description}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map(tag => (
           <span key={tag} className="px-3 py-1 bg-[#111] text-[10px] font-mono text-[#F2F2EC] uppercase tracking-widest font-bold">{tag}</span>
        ))}
      </div>
    </div>
  </motion.div>
);

// UPGRADED LEDGER ROW: High-contrast hover inversion
const LedgerRow = ({ title, details }) => (
  <div className="group border-b-2 border-[#F2F2EC]/30 py-8 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:bg-[#F2F2EC] hover:text-[#111] transition-all duration-300 px-6 -mx-6 cursor-crosshair">
    <h4 className="text-2xl font-serif italic text-[#F2F2EC] group-hover:text-[#111] min-w-[250px] group-hover:translate-x-4 transition-transform duration-300">
      {title}
    </h4>
    <p className="text-[#F2F2EC]/70 group-hover:text-[#111] text-sm font-mono tracking-widest uppercase md:text-right leading-relaxed font-bold transition-colors duration-300">
      {details}
    </p>
  </div>
);

// UPGRADED EXPERIENCE ITEM: Adapted for the light "Ticket" background
const ExperienceItem = ({ role, company, date }) => (
  <div className="border-b-2 border-[#111]/10 pb-6 mb-6 last:border-0 last:pb-0 last:mb-0 group/exp">
    <h4 className="text-3xl font-serif tracking-tighter text-[#111] uppercase group-hover/exp:italic transition-all duration-300">{role}</h4>
    <div className="flex justify-between mt-3 font-mono text-xs uppercase tracking-widest text-[#555] font-bold">
      <span className="text-[#111] border border-[#111] px-2 py-1 bg-[#111] text-[#F2F2EC]">{company}</span>
      <span className="py-1">{date}</span>
    </div>
  </div>
);

// ---------------------------------------------------------
// MAIN EXPORT
// ---------------------------------------------------------
export default function Portfolio() {
  return (
    <div className="bg-[#F2F2EC] text-[#111] font-sans selection:bg-[#111] selection:text-[#F2F2EC] overflow-x-hidden min-h-screen scroll-smooth">
      <Header />
      <Hero />
      <Marquee />
      <Projects />
      <Capabilities />
      <Contact />
      <ChatAssistant />
    </div>
  );
}