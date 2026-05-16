"use client";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="signup" className="py-40 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(ellipse, #7c3aed, transparent)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full opacity-8 blur-3xl"
          style={{ background: "radial-gradient(ellipse, #06b6d4, transparent)" }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="fade-up mono text-xs text-violet-400 tracking-[0.25em] mb-6">
          GET STARTED
        </div>

        <h2
          className="fade-up font-bold text-white mb-6 leading-tight"
          style={{ fontFamily: "Space Grotesk", fontSize: "clamp(36px, 5vw, 64px)" }}
        >
          Stop managing tools.
          <br />
          <span className="gradient-text">Start getting results.</span>
        </h2>

        <p className="fade-up text-[#6b7280] text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Join marketers who built their AI marketing team for under $50/month.
          Research, content, social, email, SEO — all running in the background.
        </p>

        <div className="fade-up flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href="https://app.viral-mind.online"
            className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-sm mono tracking-widest transition-all hover:scale-105 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              boxShadow: "0 0 30px rgba(124,58,237,0.3)",
            }}
          >
            LAUNCH YOUR AGENTS — FREE
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="fade-up mono text-xs text-[#3a3a4a] tracking-widest">
          // No credit card required · Setup in 5 minutes · Cancel anytime
        </div>
      </div>
    </section>
  );
}
