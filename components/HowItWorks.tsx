"use client";
import { useEffect, useRef } from "react";

const STEPS = [
  {
    num: "01",
    title: "Set up your brand in 5 minutes",
    desc: "Answer 8 questions about your brand, audience, tone, and goals. AI drafts your complete brand profile — strategy, content pillars, messaging.",
    detail: "Quick Intake → AI Draft → 3-tab Review",
    mockup: (
      <div className="bg-[#05050a] rounded-xl border border-[#1a1a2e] p-4 mt-4">
        <div className="mono text-[9px] text-[#3a3a4a] tracking-widest mb-3">BRAND INTAKE</div>
        {["Industry", "Target audience", "Brand tone", "Content goals"].map((field, i) => (
          <div key={field} className="flex items-center gap-3 mb-2">
            <span className="mono text-[10px] text-[#3a3a4a] w-28 shrink-0">{field}</span>
            <div className="flex-1 h-6 bg-[#0d0d14] rounded border border-[#1a1a2e] overflow-hidden">
              <div
                className="h-full bg-violet-600/20 rounded"
                style={{
                  width: i < 2 ? "100%" : i === 2 ? "70%" : "0%",
                  transition: "width 1s ease",
                }}
              />
            </div>
            {i < 2 && <span className="text-green-400 text-xs">✓</span>}
          </div>
        ))}
      </div>
    ),
  },
  {
    num: "02",
    title: "Agents deploy in background",
    desc: "Research Agent scans your industry. Brief Agent generates content angles. All five agents initialize in parallel — no input needed from you.",
    detail: "0–24 hours to first results",
    mockup: (
      <div className="bg-[#05050a] rounded-xl border border-[#1a1a2e] p-4 mt-4">
        <div className="mono text-[9px] text-[#3a3a4a] tracking-widest mb-3">AGENT STATUS</div>
        {[
          { name: "RESEARCH", pct: 80, color: "#06b6d4" },
          { name: "BRIEF", pct: 60, color: "#7c3aed" },
          { name: "SOCIAL", pct: 40, color: "#7c3aed" },
          { name: "EMAIL", pct: 20, color: "#7c3aed" },
          { name: "SEO", pct: 10, color: "#7c3aed" },
        ].map((a) => (
          <div key={a.name} className="flex items-center gap-2 mb-2">
            <span className="mono text-[9px] text-[#3a3a4a] w-16 shrink-0">{a.name}</span>
            <div className="flex-1 h-1.5 bg-[#1a1a2e] rounded-full">
              <div
                className="h-full rounded-full"
                style={{ width: `${a.pct}%`, background: a.color }}
              />
            </div>
            <span className="mono text-[9px] text-cyan-400">RUN</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: "03",
    title: "You review and approve",
    desc: "Batched content review. Approve 30 posts at once — or reject with one click. Approved content publishes automatically at optimal times.",
    detail: "~10 minutes per week",
    mockup: (
      <div className="bg-[#05050a] rounded-xl border border-[#1a1a2e] p-4 mt-4">
        <div className="mono text-[9px] text-[#3a3a4a] tracking-widest mb-3">3 PENDING REVIEW</div>
        {["LinkedIn · Long-form", "Instagram · Caption", "TikTok · Script"].map((item, i) => (
          <div key={item} className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#6b7280]">{item}</span>
            <div className="flex gap-1">
              <button className="mono text-[9px] text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded">
                APPROVE
              </button>
              <button className="mono text-[9px] text-[#3a3a4a] border border-[#1a1a2e] px-2 py-0.5 rounded">
                EDIT
              </button>
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

export default function HowItWorks() {
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
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="how-it-works" className="py-32 bg-[#0d0d14] border-y border-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="fade-up text-center mb-16">
          <div className="mono text-xs text-violet-400 tracking-[0.25em] mb-4">MISSION BRIEFING</div>
          <h2
            className="font-bold text-white mb-4"
            style={{ fontFamily: "Space Grotesk", fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            From setup to autopilot
            <br />
            <span className="gradient-text">in 24 hours.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-[1px] border-t border-dashed border-[#1a1a2e]" />

          {STEPS.map((step) => (
            <div key={step.num} className="fade-up flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-10 h-10 rounded-full border border-violet-500/40 flex items-center justify-center shrink-0"
                  style={{ background: "rgba(124,58,237,0.1)" }}
                >
                  <span className="mono text-xs text-violet-400 font-bold">{step.num}</span>
                </div>
                <div className="h-[1px] flex-1 bg-[#1a1a2e] md:hidden" />
              </div>
              <h3
                className="font-bold text-white text-xl mb-2"
                style={{ fontFamily: "Space Grotesk" }}
              >
                {step.title}
              </h3>
              <p className="text-[#6b7280] text-sm leading-relaxed mb-2">{step.desc}</p>
              <div className="mono text-[10px] text-cyan-400 tracking-widest">{step.detail}</div>
              {step.mockup}
            </div>
          ))}
        </div>

        <div className="fade-up mt-12 text-center">
          <p className="mono text-xs text-[#3a3a4a] tracking-widest">
            // Most users see their first AI-researched insight within 24h of signup
          </p>
        </div>
      </div>
    </section>
  );
}
