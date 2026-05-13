"use client";
import { useEffect, useRef } from "react";
import ScrambleText from "./ScrambleText";

const PAINS = [
  {
    icon: (
      <div className="relative w-16 h-16">
        {["jasper", "buffer", "hootsuite", "ahrefs", "mailchimp", "ga4"].map((t, i) => (
          <div
            key={t}
            className="absolute mono text-[8px] text-[#3a3a4a] border border-[#1a1a2e] px-1 py-0.5 rounded bg-[#0d0d14]"
            style={{
              top: `${(i % 3) * 22}px`,
              left: `${Math.floor(i / 3) * 36}px`,
              transform: `rotate(${(i - 3) * 3}deg)`,
            }}
          >
            {t}
          </div>
        ))}
      </div>
    ),
    label: "TOOL OVERLOAD",
    headline: "7 tools. Zero shared context.",
    body: "Research in one tab. Writing in another. Scheduling somewhere else. None of them know your brand. None of them talk to each other.",
    metric: "$144–617/month for fragmented output",
    color: "#ef4444",
  },
  {
    icon: (
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border-2 border-[#1a1a2e] flex items-center justify-center relative">
          <div
            className="absolute top-1/2 left-1/2 w-[2px] h-5 bg-red-400 origin-bottom"
            style={{ transform: "translateX(-50%) translateY(-100%) rotate(60deg)" }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-[2px] h-6 bg-[#6b7280] origin-bottom"
            style={{ transform: "translateX(-50%) translateY(-100%) rotate(160deg)" }}
          />
          <div className="w-2 h-2 rounded-full bg-[#6b7280]" />
        </div>
      </div>
    ),
    label: "TIME DRAIN",
    headline: "3–4 hours a day. Gone.",
    body: "Researching topics, writing captions, scheduling posts, compiling reports that nobody reads. Every single day. None of it moves the needle.",
    metric: "~20 hours/week of non-strategic work",
    color: "#f59e0b",
  },
  {
    icon: (
      <div className="relative w-16 h-10 flex items-end gap-1.5">
        {[
          { label: "AGENCY", h: 80, color: "#ef4444" },
          { label: "FREELANCER", h: 55, color: "#f59e0b" },
          { label: "VIRAL MIND", h: 20, color: "#10b981" },
        ].map((b) => (
          <div key={b.label} className="flex flex-col items-center gap-1 flex-1">
            <div
              className="w-full rounded-t"
              style={{ height: `${b.h}%`, background: b.color + "33", border: `1px solid ${b.color}40` }}
            />
            <span className="mono text-[6px] text-[#3a3a4a]">{b.label}</span>
          </div>
        ))}
      </div>
    ),
    label: "COST WALL",
    headline: "Can't afford an agency?",
    body: "Agencies start at $2,000/month. Freelancers need briefing anyway — and neither one knows your brand the way you do.",
    metric: "vs. $49/month for Viral Mind",
    color: "#10b981",
  },
];

export default function Pain() {
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="pain" className="py-32 max-w-7xl mx-auto px-6">
      <div className="fade-up text-center mb-16">
        <div className="mono text-xs text-[#6b7280] tracking-[0.25em] mb-4">BEFORE VIRAL MIND</div>
        <h2
          className="font-bold text-white"
          style={{ fontFamily: "Space Grotesk", fontSize: "clamp(32px, 4vw, 52px)" }}
        >
          <ScrambleText text="You're running a marketing team." watchViewport />
          <br />
          <span className="text-[#6b7280]"><ScrambleText text="Alone." delay={400} watchViewport /></span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {PAINS.map((p) => (
          <div
            key={p.label}
            className="fade-up card-glow rounded-2xl border border-[#1a1a2e] p-8 bg-[#0d0d14] relative overflow-hidden cursor-default"
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
              style={{ background: p.color }}
            />
            <div className="mb-6">{p.icon}</div>
            <div className="mono text-[10px] tracking-[0.2em] mb-2" style={{ color: p.color }}>
              {p.label}
            </div>
            <h3
              className="font-bold text-white text-xl mb-3"
              style={{ fontFamily: "Space Grotesk" }}
            >
              {p.headline}
            </h3>
            <p className="text-[#6b7280] text-sm leading-relaxed mb-6">{p.body}</p>
            <div
              className="mono text-xs border rounded-lg px-3 py-2 inline-block"
              style={{
                color: p.color,
                borderColor: p.color + "40",
                background: p.color + "10",
              }}
            >
              {p.metric}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
