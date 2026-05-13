"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav({ onOpenWaitlist }: { onOpenWaitlist?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md border-b border-[#1a1a2e] bg-[#05050a]/90"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="flex items-end gap-[2px] h-4">
            {[3, 5, 4, 5, 3].map((h, i) => (
              <div
                key={i}
                className="w-[3px] rounded-full bg-violet-500 group-hover:bg-cyan-400 transition-colors"
                style={{
                  height: `${h * 3}px`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
          <span
            className="text-white font-bold tracking-[0.08em] text-sm"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            VIRAL MIND
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {["Agents", "Pricing", "How It Works"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm text-[#6b7280] hover:text-white transition-colors mono tracking-widest"
            >
              {item.toUpperCase()}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#signup"
            className="text-sm text-[#6b7280] hover:text-white transition-colors px-4 py-2"
          >
            Sign in
          </a>
          <button
            onClick={onOpenWaitlist}
            className="gradient-border text-sm font-medium px-5 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}
          >
            START FREE
          </button>
        </div>

        <button
          className="md:hidden text-[#6b7280] hover:text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden bg-[#0d0d14] border-b border-[#1a1a2e] px-6 py-4 flex flex-col gap-4 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            {["Agents", "Pricing", "How It Works"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm text-[#6b7280] hover:text-white transition-colors mono tracking-widest"
                onClick={() => setOpen(false)}
              >
                {item.toUpperCase()}
              </a>
            ))}
            <button
              className="text-sm font-semibold text-center py-3 rounded-lg text-white"
              style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}
              onClick={() => { setOpen(false); onOpenWaitlist?.(); }}
            >
              START FREE TRIAL
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
