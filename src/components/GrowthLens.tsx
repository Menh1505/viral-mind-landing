import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PenTool, Globe, Users, ArrowUpRight, RotateCcw, Sparkles, Cpu, Layers } from "lucide-react";

interface BentoItem {
  id: string;
  title: string;
  category: string;
  desc: string;
  icon: typeof Search;
  tag: string;
  metric: string;
  metricLabel: string;
  colSpan: string;
}

const bentoCards: BentoItem[] = [
  {
    id: "research",
    category: "PHÂN TÍCH & ĐỊNH HƯỚNG",
    title: "Research & Strategy",
    desc: "Tự động phân tích đối thủ, thị trường ngách và xác định chân dung khách hàng chuẩn xác theo thời gian thực.",
    icon: Search,
    tag: "Deep Market Intelligence",
    metric: "10x",
    metricLabel: "Tốc độ nghiên cứu",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-1",
  },
  {
    id: "content",
    category: "NỘI DUNG ĐA KÊNH",
    title: "Content Engine",
    desc: "Sản xuất và tối ưu hóa bài viết, video scripts, visual copy đồng bộ theo đúng giọng điệu thương hiệu.",
    icon: PenTool,
    tag: "Multi-Format AI Studio",
    metric: "300+",
    metricLabel: "Ấn phẩm đa kênh / tuần",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-1",
  },
  {
    id: "seo",
    category: "HIỆN DIỆN TÌM KIẾM AI",
    title: "SEO & AEO Authority",
    desc: "Tối ưu hóa khả năng xuất hiện top đầu trên Google Search và các công cụ trả lời AI (ChatGPT, Perplexity, Claude).",
    icon: Globe,
    tag: "AI Engine Optimization",
    metric: "94%",
    metricLabel: "Tỉ lệ đề xuất bởi AI",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-1",
  },
  {
    id: "crm",
    category: "CHUYỂN HÓA & TĂNG TRƯỞNG",
    title: "CRM & Growth Loop",
    desc: "Tự động phân loại lead, may đo kịch bản nuôi dưỡng cá nhân hóa và theo dõi dòng doanh thu chính xác.",
    icon: Users,
    tag: "Predictive Lead Scoring",
    metric: "+85%",
    metricLabel: "Hiệu suất chuyển đổi",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-1",
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
        className={`absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-purple-600/15 to-amber-400/5 blur-[90px] rounded-full pointer-events-none transition-all duration-1000 ${isExpanded ? "scale-125 opacity-90" : "scale-90 opacity-60"
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

                  <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] flex items-center gap-1">
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
          /* EXPANDED STATE: 4 BENTO CARDS WITH GLASSMORPHISM & REFINED SANS-SERIF      */
          /* ========================================================================= */
          <motion.div
            key="bento-stage"
            className="w-full relative z-20 py-4"
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header & Controls Bar */}
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-pulse" />
                <span className="text-xs font-mono text-amber-300 font-semibold tracking-wider uppercase">
                  ViralMinds AI Workforce • 4 Chuyên Gia Hoạt Động
                </span>
              </div>

              {/* Collapse Button to revert back to Orb */}
              <button
                type="button"
                onClick={handleCollapse}
                className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-amber-500/20 border border-white/10 hover:border-amber-400/40 text-xs font-mono text-zinc-300 hover:text-amber-200 backdrop-blur-md transition-all shadow-md active:scale-95 cursor-pointer"
                aria-label="Thu gọn về khối cầu Agent"
              >
                <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-90 transition-transform duration-300 text-amber-400" />
                <span>Thu gọn</span>
              </button>
            </div>

            {/* 4-Card Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {bentoCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: idx * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -4, borderColor: "rgba(245, 158, 11, 0.4)" }}
                    className="group relative rounded-2xl p-5 sm:p-6 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(22, 17, 34, 0.82) 0%, rgba(10, 8, 18, 0.92) 100%)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      boxShadow: "0 18px 45px -15px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255,255,255,0.06)",
                    }}
                  >
                    {/* Top Highlight Sheen on Hover */}
                    <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-400/20 transition-all duration-500 pointer-events-none" />

                    {/* Card Header */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                          {card.category}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-amber-300 group-hover:bg-amber-500/20 group-hover:border-amber-400/40 group-hover:text-amber-200 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>

                      <h4 className="text-base sm:text-lg font-display font-semibold text-white group-hover:text-amber-200 transition-colors flex items-center gap-1.5">
                        {card.title}
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-amber-400" />
                      </h4>

                      <p className="text-xs text-zinc-300/80 font-body leading-relaxed mt-2 line-clamp-2">
                        {card.desc}
                      </p>
                    </div>

                    {/* Card Footer / Metrics */}
                    <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-amber-300/90 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                        {card.tag}
                      </span>
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-white block">
                          {card.metric}
                        </span>
                        <span className="text-[9px] text-zinc-400 block font-body">
                          {card.metricLabel}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Status Ribbon */}
            <div className="mt-3.5 px-3 py-2 rounded-xl bg-purple-950/40 border border-purple-800/30 flex items-center justify-between text-xs text-purple-200/80">
              <span className="flex items-center gap-2 font-mono text-[11px]">
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                Vận hành liên tục 24/7 • Đồng bộ dữ liệu tập trung
              </span>
              <a
                href="#capabilities"
                className="text-[11px] font-mono text-amber-300 hover:text-amber-200 underline underline-offset-2 flex items-center gap-1"
              >
                Khám phá chi tiết <Layers className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
