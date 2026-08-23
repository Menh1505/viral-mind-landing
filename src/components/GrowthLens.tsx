import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PenTool, Globe, Users, ArrowUpRight, RotateCcw, Sparkles } from "lucide-react";

interface BentoItem {
  id: string;
  title: string;
  category: string;
  desc: string;
  icon: typeof Search;
}

const bentoCards: BentoItem[] = [
  {
    id: "research",
    category: "PHÂN TÍCH & ĐỊNH HƯỚNG",
    title: "Research & Strategy",
    desc: "Tự động phân tích đối thủ, thị trường ngách và xác định chân dung khách hàng chuẩn xác theo thời gian thực.",
    icon: Search,
  },
  {
    id: "content",
    category: "NỘI DUNG ĐA KÊNH",
    title: "Content Engine",
    desc: "Sản xuất và tối ưu hóa bài viết, video scripts, visual copy đồng bộ theo đúng giọng điệu thương hiệu.",
    icon: PenTool,
  },
  {
    id: "seo",
    category: "HIỆN DIỆN TÌM KIẾM AI",
    title: "SEO & AEO Authority",
    desc: "Tối ưu hóa khả năng xuất hiện top đầu trên Google Search và các công cụ trả lời AI (ChatGPT, Perplexity, Claude).",
    icon: Globe,
  },
  {
    id: "crm",
    category: "CHUYỂN HÓA & TĂNG TRƯỞNG",
    title: "CRM & Growth Loop",
    desc: "Tự động phân loại lead, may đo kịch bản nuôi dưỡng cá nhân hóa và theo dõi dòng doanh thu chính xác.",
    icon: Users,
  },
];

interface Particle {
  id: number;
  angle: number;
  distance: number;
  size: number;
  duration: number;
  delay: number;
}

const EMERALD_CUT_PATH =
  "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)";

/**
 * Apple/Stripe-grade Glassmorphism Card with Emerald Cut (Notched Corners) & Dynamic Spotlight
 */
function LuxurySpotlightCard({ card, index }: { card: BentoItem; index: number }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = card.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative p-[1px] transition-all duration-500"
      style={{
        clipPath: EMERALD_CUT_PATH,
        WebkitClipPath: EMERALD_CUT_PATH,
        background: isHovered
          ? `radial-gradient(360px circle at ${mousePos.x}px ${mousePos.y}px, rgba(251, 191, 36, 0.55), rgba(255, 255, 255, 0.12) 40%, rgba(255, 255, 255, 0.05) 100%)`
          : "rgba(255, 255, 255, 0.08)",
        filter: isHovered
          ? "drop-shadow(0 16px 36px rgba(245, 158, 11, 0.15)) drop-shadow(0 4px 12px rgba(0,0,0,0.8))"
          : "drop-shadow(0 14px 30px rgba(0, 0, 0, 0.7))",
      }}
    >
      {/* Inner Pure Glass Body with matching Emerald Cut clip-path */}
      <div
        className="relative w-full h-full p-6 sm:p-7 flex flex-col justify-between overflow-hidden transition-colors duration-500"
        style={{
          clipPath: EMERALD_CUT_PATH,
          WebkitClipPath: EMERALD_CUT_PATH,
          background: "rgba(11, 9, 20, 0.72)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
        }}
      >
        {/* Dynamic Cursor Spotlight Radial Glow */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.14), rgba(217, 119, 6, 0.03) 45%, transparent 80%)`,
          }}
        />

        {/* Emerald Facet Reflection Lines at Top-Left and Bottom-Right notches */}
        <div className="pointer-events-none absolute top-0 left-0 w-6 h-6 border-t border-l border-amber-300/30 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-6 h-6 border-b border-r border-amber-300/30 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Card Content with refined hierarchy & airy spacing */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono tracking-[0.2em] text-zinc-400/75 uppercase font-medium">
              {card.category}
            </span>
            <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 group-hover:text-amber-300 group-hover:border-amber-400/30 group-hover:bg-amber-500/10 transition-all duration-300">
              <Icon className="w-3.5 h-3.5" />
            </div>
          </div>

          <h4 className="text-base sm:text-[1.12rem] font-medium text-white tracking-tight flex items-center justify-between group-hover:text-amber-100 transition-colors duration-300">
            <span>{card.title}</span>
            <ArrowUpRight className="w-4 h-4 text-zinc-500 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-amber-300 transition-all duration-300" />
          </h4>

          <p className="text-xs sm:text-[0.83rem] text-zinc-400 font-light leading-[1.7] mt-3 tracking-normal">
            {card.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function GrowthLens() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDissolving, setIsDissolving] = useState(false);

  // Generate deterministic particles for the dissolve burst
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 32 }, (_, i) => {
      const angle = (i / 32) * Math.PI * 2 + (Math.random() * 0.4 - 0.2);
      const distance = 140 + Math.random() * 180;
      const size = 3 + Math.random() * 6;
      const duration = 0.65 + Math.random() * 0.4;
      const delay = Math.random() * 0.12;
      return { id: i, angle, distance, size, duration, delay };
    });
  }, []);

  const handleOrbClick = () => {
    if (isExpanded) return;
    setIsDissolving(true);
    setTimeout(() => {
      setIsExpanded(true);
      setIsDissolving(false);
    }, 450);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  return (
    <div className="relative w-full max-w-[660px] mx-auto min-h-[460px] flex items-center justify-center">
      {/* Background ambient gold/amber aura */}
      <div
        className={`absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-purple-600/15 to-amber-400/5 blur-[90px] rounded-full pointer-events-none transition-all duration-1000 ${
          isExpanded ? "scale-125 opacity-90" : "scale-90 opacity-60"
        }`}
      />

      <AnimatePresence mode="wait">
        {!isExpanded ? (
          /* ========================================================================= */
          /* INITIAL STATE: AMBER-GOLD FROSTED 3D GLASS ORB WITH "AGENT" GLOW          */
          /* ========================================================================= */
          <motion.div
            key="orb-stage"
            className="relative flex flex-col items-center justify-center select-none cursor-pointer py-10"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleOrbClick}
            role="button"
            tabIndex={0}
            aria-label="Kích hoạt phân rã Agent sang 4 module Bento"
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleOrbClick()}
          >
            {/* Rotating optical dashed rings */}
            <div className="relative flex items-center justify-center">
              {/* Outer Dashed Orbit */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 32, ease: "linear", repeat: Infinity }}
                className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-dashed border-amber-400/25 pointer-events-none"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_12px_#f59e0b]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_#c084fc]" />
              </motion.div>

              {/* Middle Counter-Rotating Orbit */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 24, ease: "linear", repeat: Infinity }}
                className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-dashed border-amber-300/35 pointer-events-none"
              >
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-200 shadow-[0_0_10px_#fde68a]" />
              </motion.div>

              {/* Glowing Pulse Wave */}
              <motion.div
                animate={{ scale: [1, 1.22, 1], opacity: [0.35, 0.05, 0.35] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-56 h-56 rounded-full bg-amber-500/20 blur-xl pointer-events-none"
              />

              {/* ---------------- 3D AMBER GOLD FROSTED GLASS SPHERE ---------------- */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="relative group w-52 h-52 sm:w-60 sm:h-60 rounded-full flex flex-col items-center justify-center p-6 text-center transition-all duration-500"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, rgba(255, 235, 180, 0.85) 0%, rgba(245, 158, 11, 0.7) 35%, rgba(180, 83, 9, 0.8) 65%, rgba(45, 18, 60, 0.95) 100%)",
                  boxShadow:
                    "inset -10px -15px 35px rgba(15, 7, 24, 0.85), inset 6px 8px 20px rgba(255, 255, 255, 0.6), 0 20px 60px -15px rgba(245, 158, 11, 0.5), 0 0 45px rgba(217, 119, 6, 0.3)",
                  border: "1.5px solid rgba(255, 237, 190, 0.65)",
                  backdropFilter: "blur(16px)",
                }}
              >
                {/* Specular Highlight Sheen */}
                <div className="absolute top-4 left-6 w-20 h-10 rounded-full bg-gradient-to-b from-white/70 to-transparent rotate-[-28deg] blur-[2px] pointer-events-none" />

                {/* Inner Core Content */}
                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-amber-200/40 backdrop-blur-md mb-2 shadow-inner"
                  >
                    <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest text-amber-200 uppercase font-semibold">
                      AI WORKFORCE
                    </span>
                  </motion.div>

                  <h3 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] flex items-center gap-1">
                    Agent
                  </h3>

                  <p className="text-[11px] text-amber-100/90 font-mono tracking-wider mt-1 drop-shadow">
                    AUTONOMOUS CORE
                  </p>
                </div>
              </motion.div>

              {/* Particle Dissolve Burst Effect */}
              {isDissolving && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                  {particles.map((p) => {
                    const targetX = Math.cos(p.angle) * p.distance;
                    const targetY = Math.sin(p.angle) * p.distance;
                    return (
                      <motion.span
                        key={p.id}
                        initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                        animate={{
                          x: targetX,
                          y: targetY,
                          scale: [1, 1.4, 0],
                          opacity: [1, 0.8, 0],
                        }}
                        transition={{
                          duration: p.duration,
                          delay: p.delay,
                          ease: [0.12, 0.8, 0.32, 1],
                        }}
                        className="absolute rounded-full bg-gradient-to-r from-amber-200 to-amber-400 shadow-[0_0_8px_#f59e0b]"
                        style={{
                          width: `${p.size}px`,
                          height: `${p.size}px`,
                        }}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          /* ========================================================================= */
          /* EXPANDED STATE: APPLE / STRIPE LUXURY GLASSMORPHISM BENTO GRID            */
          /* ========================================================================= */
          <motion.div
            key="bento-stage"
            className="w-full relative z-20 py-3"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 8 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header & Controls Bar */}
            <div className="flex items-center justify-between mb-4 px-1.5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-pulse" />
                <span className="text-[11px] font-mono text-zinc-400 font-medium tracking-[0.14em] uppercase">
                  VIRALMINDS WORKFORCE MODULES
                </span>
              </div>

              {/* Collapse Button to revert back to Orb */}
              <button
                type="button"
                onClick={handleCollapse}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-amber-500/15 border border-white/[0.08] hover:border-amber-400/30 text-[11px] font-mono text-zinc-400 hover:text-amber-200 backdrop-blur-xl transition-all shadow-sm active:scale-95 cursor-pointer"
                aria-label="Thu gọn về khối cầu Agent"
              >
                <RotateCcw className="w-3 h-3 group-hover:-rotate-90 transition-transform duration-300 text-amber-400/80" />
                <span>Thu gọn</span>
              </button>
            </div>

            {/* 4-Card Luxury Bento Grid with Cursor Spotlight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {bentoCards.map((card, idx) => (
                <LuxurySpotlightCard key={card.id} card={card} index={idx} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
