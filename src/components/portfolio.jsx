import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FiArrowUpRight, FiX, FiMenu } from 'react-icons/fi';
// Make sure these paths match your actual files
import imageBodyMax from "../assets/image/bodymax.png";
import imageSocial from "../assets/image/social-genius.png";
import imageTeamSync from "../assets/image/Teamsyn.png";
import imageResume from "../assets/image/resume.png";
import imageShopPlus from "../assets/image/shopplus.png";
import imageApplyMax from "../assets/image/applymax.png";
import ChatAssistant from './ChatAssistant';
import imageSuperSit from "../assets/image/supersit.png"; // ADD THIS LINE
// ---------------------------------------------------------
// ANIMATION VARIANTS
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
// PROJECT DATA (All projects included)
// ---------------------------------------------------------
const portfolioProjects = [
  {
  id: 0,
  title: "SuperSit",
  description: "A live, revenue-generating SaaS product — a cross-platform desktop app that detects poor posture in real-time using on-device AI vision. Engineered the full stack: auth, subscription billing, and an automated CI/CD pipeline shipping signed installers with silent auto-updates.",
  tags: ['Electron.js', 'React', 'MediaPipe AI', 'Supabase'],
  link: "https://www.supersit.app/", // TODO: add live/download link
  image: imageSuperSit
},
  {
    id: 1,
    title: "Social Genius",
    description: "A dedicated iOS application engineered to streamline social features and client engagement.",
    tags: ['iOS', 'React Native'],
    link: "https://apps.apple.com/us/app/social-genius-text-analyzer/id6776793403", // TODO: replace with real live link
    image: imageSocial
  },
  {
    id: 2,
    title: "ApplyMax",
    description: "AI career copilot that reads your resume and a target job listing, flags mismatches, scores ATS compatibility, and generates an improved resume and cover letter.",
    tags: ['MERN Stack', 'OpenAI API', 'NLP'],
    link: "https://www.applymax.online/", // TODO: replace with real live link
    image: imageApplyMax
  },
  {
    id: 3,
    title: "BodyMax",
    description: "AI-powered physique assessment web application utilizing vision models for personalized fitness tracking.",
    tags: ['React', 'Vision AI', 'Node.js'],
    link: "https://bodymaxx.online/", // TODO: replace with real live link
    image: imageBodyMax
  },
  {
    id: 4,
    title: "TeamSync",
    description: "Collaborative whiteboard with real-time video meetings, powered by OpenAI & Whisper for automated transcriptions.",
    tags: ['React', 'Socket.io', 'OpenAI'],
    link: "#",
    image: imageTeamSync
  },
  {
    id: 5,
    title: "ResumeAI",
    description: "An AI-powered resume builder converting user prompts into formatted, downloadable PDFs in seconds.",
    tags: ['MERN Stack', 'Vite', 'OpenAI API'],
    link: "#",
    image: imageResume
  },
  {
    id: 6,
    title: "ShopPlus",
    description: "Full-stack e-commerce architecture with seamless checkout flows and dynamic inventory management.",
    tags: ['React', 'Node.js', 'Express'],
    link: "#",
    image: imageShopPlus
  }
];
// ---------------------------------------------------------
// METRICS DATA (Real, from shipped work — no inflated numbers)
// ---------------------------------------------------------
const metrics = [
  { value: "6", label: "Products shipped & deployed", context: "1 iOS app, 2 web apps, 3 websites" },
  { value: "35%", label: "ATS keyword-match improvement", context: "ResumeAI, beta testing" },
  { value: "6", label: "Person remote Agile team", context: "Digital Empowerment Network internship" },
  { value: "60+", label: "Resumes generated in week 1", context: "ResumeAI post-launch" },
];
// ---------------------------------------------------------
// NAV CONFIG + ACTIVE SECTION TRACKER
// ---------------------------------------------------------
const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Index' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'contact', label: 'Contact' },
];

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]";

function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return activeId;
}

// ---------------------------------------------------------
// 1. HEADER / NAVBAR (with a working mobile menu)
// ---------------------------------------------------------
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeId = useActiveSection(NAV_LINKS.map((link) => link.id));

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] px-6 py-5 bg-[#F2F2EC]/90 backdrop-blur-md border-b-2 border-[#111] flex justify-between items-center transition-all">
        <a href="#home" className={`font-serif italic text-2xl tracking-tight text-[#111] font-bold hover:scale-105 transition-transform ${FOCUS_RING}`}>
          Saad.
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-[0.1em] text-[#111] font-bold">
          {NAV_LINKS.map(({ id, label }) => (
            
             <a key={id}
              href={`#${id}`}
              aria-current={activeId === id ? "true" : undefined}
              className={`px-3 py-1 transition-colors ${FOCUS_RING} ${
                activeId === id ? "bg-[#111] text-[#F2F2EC]" : "hover:bg-[#111] hover:text-[#F2F2EC]"
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className={`md:hidden border-2 border-[#111] p-2 text-[#111] ${FOCUS_RING}`}
        >
          {isMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-[#111] flex flex-col justify-center items-center gap-10 md:hidden"
          >
            {NAV_LINKS.map(({ id, label }, index) => (
              <motion.a
                key={id}
                href={`#${id}`}
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4, ease: customEase }}
                className={`font-serif italic text-5xl text-[#F2F2EC] uppercase tracking-tight ${FOCUS_RING}`}
              >
                {label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ---------------------------------------------------------
// 2. HERO SECTION
// ---------------------------------------------------------
const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="home" className="min-h-screen flex flex-col justify-end px-6 md:px-12 max-w-7xl mx-auto pb-24 pt-32">
      <div className="font-mono text-xs uppercase tracking-widest border-2 border-[#111] inline-block px-4 py-2 mb-12 bg-[#111] text-[#F2F2EC] w-fit font-bold shadow-[4px_4px_0px_0px_rgba(17,17,17,0.3)]">
        [01] Overview
      </div>

      <div className="mb-12">
        <div className="overflow-hidden pb-2">
          <motion.h1
            variants={textReveal}
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate="visible"
            className="text-[clamp(3rem,14vw,9rem)] font-serif leading-[0.8] tracking-tighter text-[#111] uppercase"
          >
            Software
          </motion.h1>
        </div>
        <div className="overflow-hidden pb-2 flex gap-4 md:gap-8 items-center">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "15vw" }}
            transition={{ duration: 1.2, ease: customEase, delay: 0.2 }}
            className="h-[2px] md:h-[6px] bg-[#111] mt-4 hidden sm:block"
          />
          <motion.h1
            variants={textReveal}
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-[clamp(3rem,14vw,9rem)] font-serif leading-[0.8] tracking-tighter text-[#111] uppercase italic"
          >
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
};

// ---------------------------------------------------------
// 3. ABOUT / ETHOS SECTION (NEW)
// ---------------------------------------------------------
const About = () => (
  <section id="about" className="py-32 px-6 max-w-7xl mx-auto border-t-2 border-[#111]">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUp}
      className="border-b-4 border-[#111] pb-6 mb-16 flex justify-between items-end"
    >
      <h2 className="text-5xl md:text-7xl font-serif text-[#111] tracking-tighter uppercase">Approach</h2>
      <span className="font-mono text-sm font-bold">[02]</span>
    </motion.div>
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="md:col-span-7"
      >
        <p className="text-2xl md:text-4xl font-serif leading-tight text-[#111] mb-8">
          I work across the full stack — frontend, backend, and increasingly, the AI
          layer in between.
        </p>
        <p className="text-base md:text-lg text-[#555] leading-relaxed max-w-2xl font-medium">
          Most of my recent work involves integrating AI into products where it
          genuinely improves the outcome: emotional-risk analysis in a mobile
          messaging app, resume scoring against real job descriptions, image
          analysis for fitness tracking. I care about the parts that don't show
          up in a demo — authentication, error handling, deployment, and whether
          the thing still works after a week of real use. I'm currently finishing
          my degree in Computer Science, and I take on freelance and agency work
          alongside it.
        </p>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ delay: 0.15 }}
        className="md:col-span-5 border-2 border-[#111] p-8 bg-[#111] text-[#F2F2EC] shadow-[8px_8px_0px_0px_rgba(17,17,17,0.15)]"
      >
        <h3 className="font-mono text-xs uppercase tracking-widest font-bold mb-8 border-b-2 border-[#F2F2EC]/30 pb-4">
          How I Work
        </h3>
        <ul className="space-y-6 font-serif text-xl italic">
          <li className="border-b border-[#F2F2EC]/10 pb-4">01. Ship working software, not demos.</li>
          <li className="border-b border-[#F2F2EC]/10 pb-4">02. Use AI where it solves a real problem — not by default.</li>
          <li>03. Keep data on-device when a client's use case calls for it.</li>
        </ul>
      </motion.div>
    </div>
  </section>
);
// ---------------------------------------------------------
// INFINITE MARQUEE
// ---------------------------------------------------------
const Marquee = () => {
  const shouldReduceMotion = useReducedMotion();
  const marqueeText = "MERN STACK • AI AUTOMATION • SYSTEM DESIGN • FULL-STACK DEV • ";

  return (
    <div className="border-y-2 border-[#111] bg-[#111] text-[#F2F2EC] overflow-hidden py-4 flex whitespace-nowrap">
      <motion.div
        animate={shouldReduceMotion ? {} : { x: ["0%", "-50%"] }}
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
// 4. PROJECTS SECTION (With 'See More' Logic)
// ---------------------------------------------------------
const Projects = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const closeButtonRef = useRef(null);

  // If showAll is false, show only the top 2 projects. Otherwise, show all.
  const displayedProjects = showAll ? portfolioProjects : portfolioProjects.slice(0, 2);

  useEffect(() => {
    if (!selectedImage) return;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <section id="projects" className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="border-b-4 border-[#111] pb-6 mb-16 flex justify-between items-end">
        <h2 className="text-5xl md:text-7xl font-serif text-[#111] tracking-tighter uppercase">Selected Works</h2>
        <span className="font-mono text-sm font-bold">[03]</span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

        {/* Dynamic Project Mapping */}
        {displayedProjects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            tags={project.tags}
            link={project.link}
            image={project.image}
            onImageClick={() => setSelectedImage(project.image)}
          />
        ))}

        {/* Archive Box - Shows only when 'See More' is clicked to complete the grid */}
        {showAll && (
          <motion.a
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            href="https://github.com/Saad-007" target="_blank" rel="noopener noreferrer"
            className={`group border-2 border-[#111] bg-[#111] text-[#F2F2EC] p-10 flex flex-col justify-between items-start hover:bg-[#F2F2EC] hover:text-[#111] transition-colors duration-500 min-h-[400px] shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] cursor-pointer ${FOCUS_RING}`}
          >
             <div className="w-full flex justify-between items-center">
               <span className="font-mono text-xs uppercase tracking-widest">Directory</span>
               <FiArrowUpRight className="text-4xl group-hover:rotate-45 transition-transform duration-500" />
             </div>
             <div>
               <h3 className="text-6xl font-serif uppercase tracking-tighter mb-4">Archive.</h3>
               <p className="font-mono text-sm underline underline-offset-4">View Complete GitHub ↗</p>
             </div>
          </motion.a>
        )}
      </div>

      {/* Button & Text Link Area */}
      <div className="mt-20 flex flex-col items-center justify-center">
        {!showAll ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(true)}
            aria-expanded={showAll}
            className={`border-2 border-[#111] bg-white px-8 py-4 uppercase font-mono text-sm tracking-widest font-bold hover:bg-[#111] hover:text-[#F2F2EC] transition-colors shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] cursor-pointer ${FOCUS_RING}`}
          >
            See More Projects ↓
          </motion.button>
        ) : (
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            href="https://github.com/Saad-007" target="_blank" rel="noopener noreferrer"
            className={`font-mono text-xs uppercase tracking-widest text-[#111] border-b-2 border-[#111] pb-1 hover:text-gray-500 hover:border-gray-500 transition-all cursor-pointer ${FOCUS_RING}`}
          >
            Explore all open-source repositories on GitHub ↗
          </motion.a>
        )}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Project image preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#F2F2EC]/90 backdrop-blur-md p-4 md:p-12 cursor-zoom-out"
          >
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close image preview"
              onClick={() => setSelectedImage(null)}
              className={`absolute top-8 right-8 text-[#111] hover:rotate-90 transition-transform duration-500 bg-white border-2 border-[#111] p-2 shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] ${FOCUS_RING}`}
            >
              <FiX className="text-3xl" />
            </button>
            <motion.img
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              src={selectedImage}
              alt="Enlarged project screenshot"
              onClick={(event) => event.stopPropagation()}
              className="max-w-full max-h-full object-contain border-4 border-[#111] shadow-[16px_16px_0px_0px_rgba(17,17,17,1)] bg-white"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// ---------------------------------------------------------
// 5. METRICS SECTION (NEW — real, quantified proof)
// ---------------------------------------------------------
const Metrics = () => (
  <section className="py-24 bg-[#111] text-[#F2F2EC] border-y-2 border-[#111]">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mb-16 flex justify-between items-end border-b-2 border-[#F2F2EC]/30 pb-6"
      >
        <h2 className="text-4xl md:text-6xl font-serif tracking-tighter uppercase">By the Numbers</h2>
        <span className="font-mono text-sm font-bold bg-[#F2F2EC] text-[#111] px-2 py-1">[04]</span>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: i * 0.1 }}
            className="border-2 border-[#F2F2EC]/20 p-6 md:p-8 hover:border-[#F2F2EC] hover:bg-[#F2F2EC]/5 transition-colors duration-300"
          >
            <p className="text-4xl md:text-5xl font-serif italic mb-4">{m.value}</p>
            <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-[#F2F2EC]/70 leading-relaxed mb-3">
              {m.label}
            </p>
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#F2F2EC]/40 border-t border-[#F2F2EC]/10 pt-3">
              {m.context}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ---------------------------------------------------------
// 6. CAPABILITIES (Blueprint & Inverted Ticket Layout)
// ---------------------------------------------------------
const Capabilities = () => (
  <section id="capabilities" className="py-32 bg-[#111] text-[#F2F2EC] relative overflow-hidden border-y-2 border-[#111]">
    {/* Architectural Blueprint CSS Grid Background */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 pointer-events-none" />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="border-b-2 border-[#F2F2EC]/30 pb-6 mb-16 flex justify-between items-end">
        <h2 className="text-5xl md:text-7xl font-serif tracking-tighter uppercase">Capabilities</h2>
        <span className="font-mono text-sm font-bold bg-[#F2F2EC] text-[#111] px-2 py-1">[05]</span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

        {/* Left Column: Tech Stack (Interactive Ledgers) */}
        <div className="md:col-span-7 space-y-0 border-t-2 border-[#F2F2EC]/30 bg-[#111]/80 backdrop-blur-sm">
          <LedgerRow title="Frontend Architecture" details="React, React Native, Tailwind CSS, Framer Motion" />
          <LedgerRow title="Backend & DB Systems" details="Node.js, Express, MongoDB, Firebase, Supabase, MySQL" />
          <LedgerRow title="AI Systems Engineering" details="OpenAI GPT-4, Vision Models, Whisper STT, Ollama (Mistral)" />
          <LedgerRow title="Real-Time & Media" details="Socket.io, Agora SDK, WebSockets" />
          <LedgerRow title="DevOps & Deployment" details="Vercel, Railway, Render, EAS, Git/GitHub, CI/CD" />
          <LedgerRow title="Agency Operations" details="Startup Scaling, Video Editing, Automation" />
        </div>

        {/* Right Column: Experience (High-Contrast "Ticket") */}
        <div className="md:col-span-5 bg-[#F2F2EC] text-[#111] border-2 border-[#111] p-8 md:p-12 flex flex-col justify-between shadow-[12px_12px_0px_0px_rgba(242,242,236,0.15)] hover:shadow-[16px_16px_0px_0px_rgba(242,242,236,0.3)] transition-all duration-500">
          <div>
            <div className="flex justify-between items-center mb-10 border-b-2 border-[#111] pb-4">
               <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-[#111]">Professional Ledger</h3>
               <div className="w-2 h-2 rounded-full bg-[#111] animate-pulse" />
            </div>

            <ExperienceItem role="Founder & Director" company="Syntaq Systems" date="Present" />
            <ExperienceItem role="Web Dev Intern" company="DEN" date="2025" />
            <ExperienceItem role="Frontend Dev Intern" company="Ziauddin Hospital" date="2025" />
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
// 7. CONTACT SECTION
// ---------------------------------------------------------
const Contact = () => (
  <section id="contact" className="py-40 px-6 max-w-7xl mx-auto">
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center flex flex-col items-center">
      <div className="font-mono text-xs uppercase tracking-widest border-2 border-[#111] px-4 py-2 mb-12 bg-white font-bold">
        [06] Final Operations
      </div>
      <h2 className="text-[clamp(3rem,12vw,8rem)] font-serif tracking-tighter text-[#111] uppercase leading-none hover:italic transition-all duration-500">
        Initiate.
      </h2>
      <a href="mailto:saadsafeer223@gmail.com" className={`mt-12 text-2xl md:text-4xl font-serif italic text-[#111] border-b-4 border-[#111] pb-2 hover:bg-[#111] hover:text-[#F2F2EC] hover:px-8 hover:border-transparent transition-all duration-500 ${FOCUS_RING}`}>
        saadsafeer223@gmail.com ↗
      </a>
    </motion.div>
  </section>
);

// ---------------------------------------------------------
// 8. FOOTER
// ---------------------------------------------------------
const Footer = () => (
  <footer className="border-t-2 border-[#111] px-6 py-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs uppercase tracking-widest text-[#111] font-bold">
    <p>© {new Date().getFullYear()} Saad. All rights reserved.</p>
    <a href="#home" className={`hover:bg-[#111] hover:text-[#F2F2EC] px-3 py-1 transition-colors ${FOCUS_RING}`}>
      Back to top ↑
    </a>
  </footer>
);

// ---------------------------------------------------------
// HELPER UI COMPONENTS
// ---------------------------------------------------------

const ProjectCard = ({ title, description, tags, link, image, onImageClick }) => (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="group flex flex-col h-full bg-white border-2 border-[#111] hover:shadow-[12px_12px_0px_0px_rgba(17,17,17,1)] hover:-translate-y-2 hover:-translate-x-2 transition-all duration-300">
    {image && (
      <button
        type="button"
        onClick={onImageClick}
        aria-label={`Expand ${title} screenshot`}
        className={`h-80 w-full overflow-hidden relative border-b-2 border-[#111] cursor-zoom-in block text-left ${FOCUS_RING}`}
      >
        <div className="absolute inset-0 bg-[#111]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
           <span className="font-mono text-xs uppercase tracking-widest border border-[#F2F2EC] text-[#F2F2EC] px-6 py-3">Expand Artifact</span>
        </div>
        <img src={image} alt={`${title} project screenshot`} loading="lazy" decoding="async" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" />
      </button>
    )}
    <div className="p-8 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-6 border-b-2 border-[#111] pb-4">
        <h3 className="text-4xl font-serif text-[#111] tracking-tighter uppercase">{title}</h3>
        <a href={link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${title} project`} className={`text-[#111] hover:bg-[#111] hover:text-[#F2F2EC] p-3 border-2 border-[#111] transition-colors z-20 shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] ${FOCUS_RING}`}>
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
      <main>
        <Hero />
        <About />
        <Marquee />
        <Projects />
        <Metrics />
        <Capabilities />
        <Contact />
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
}