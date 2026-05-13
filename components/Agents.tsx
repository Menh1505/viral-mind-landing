"use client";
import { useEffect, useRef, useState } from "react";

const AGENTS = [
  {
    code: "AGENT-01",
    name: "Content Research",
    role: "Finds what's worth writing about — before competitors do",
    capabilities: [
      "Scans news and trends daily using 6-stage AI pipeline",
      "Scores each signal: relevance, urgency, audience fit",
      "Detects rising topics before they peak — suggests timing",
    ],
    stat: { label: "TRENDS FOUND TODAY", value: "23" },
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="20" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="24" y1="4" x2="24" y2="24" stroke="#06b6d4" strokeWidth="1.5">
          <animateTransform attributeName="transform" type="rotate" from="0 24 24" to="360 24 24" dur="4s" repeatCount="indefinite" />
        </line>
        <circle cx="24" cy="24" r="3" fill="#7c3aed" />
        <circle cx="24" cy="8" r="2" fill="#06b6d4" opacity="0.6" />
      </svg>
    ),
  },
  {
    code: "AGENT-02",
    name: "Brief & Content Studio",
    role: "Writes content your audience actually wants to read",
    capabilities: [
      "Generates angles and hooks tailored to your brand voice",
      "Creates platform-specific copy for TikTok, LinkedIn, Instagram",
      "Human-in-the-loop: you approve before anything publishes",
    ],
    stat: { label: "BRIEFS GENERATED", value: "8" },
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="8" y="6" width="32" height="36" rx="3" stroke="#7c3aed" strokeWidth="1.5" />
        <line x1="14" y1="16" x2="34" y2="16" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round">
          <animate attributeName="x2" values="14;34;14" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="14" y1="22" x2="28" y2="22" stroke="#3a3a4a" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="14" y1="28" x2="30" y2="28" stroke="#3a3a4a" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="14" y1="34" x2="24" y2="34" stroke="#3a3a4a" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    code: "AGENT-03",
    name: "Social Scheduler",
    role: "Fills your content calendar — automatically",
    capabilities: [
      "Schedules to TikTok, Instagram, LinkedIn, Facebook, YouTube",
      "99%+ publish reliability with automatic retry on API failure",
      "Shows reach and engagement per post in unified view",
    ],
    stat: { label: "POSTS THIS WEEK", value: "12" },
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="6" y="10" width="36" height="30" rx="3" stroke="#7c3aed" strokeWidth="1.5" />
        <line x1="6" y1="18" x2="42" y2="18" stroke="#1a1a2e" strokeWidth="1" />
        <line x1="18" y1="6" x2="18" y2="14" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="30" y1="6" x2="30" y2="14" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" />
        {[[14,24],[22,24],[30,24],[38,24],[14,32],[22,32],[30,32]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="2.5" fill={i<3?"#7c3aed":"#1a1a2e"} opacity={i<3?0.8:1}>
            {i<3 && <animate attributeName="opacity" values="0.4;1;0.4" dur={`${1.5+i*0.3}s`} repeatCount="indefinite" />}
          </circle>
        ))}
      </svg>
    ),
  },
  {
    code: "AGENT-04",
    name: "Analytics & Email",
    role: "Reports what happened — and why — in plain English",
    capabilities: [
      "AI-written weekly narrative: no spreadsheets required",
      "Auto-converts published content into newsletter for subscribers",
      "Anomaly detection alerts when engagement spikes or drops",
    ],
    stat: { label: "SUBSCRIBERS", value: "847" },
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        {[6,10,7,14,9,12,8].map((h,i)=>(
          <rect
            key={i}
            x={8+i*5} y={38-h*2} width="3.5" height={h*2}
            rx="1"
            fill={i===3?"#7c3aed":"#1a1a2e"}
            stroke={i===3?"#7c3aed":"#3a3a4a"}
            strokeWidth="0.5"
          >
            <animate attributeName="height" values={`${h}px;${h*2}px;${h}px`} dur={`${2+i*0.2}s`} repeatCount="indefinite" />
          </rect>
        ))}
        <line x1="6" y1="38" x2="42" y2="38" stroke="#3a3a4a" strokeWidth="1" />
      </svg>
    ),
  },
  {
    code: "AGENT-05",
    name: "SEO Intelligence",
    role: "Makes every piece of content findable",
    capabilities: [
      "Keyword research matched to your audience's search intent",
      "SEO-structured brief before writing begins",
      "Weekly rank tracking for all target keywords",
    ],
    stat: { label: "AVG RANK GAIN", value: "+11" },
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="20" cy="20" r="12" stroke="#7c3aed" strokeWidth="1.5" />
        <line x1="29" y1="29" x2="42" y2="42" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="20" r="4" fill="#7c3aed" opacity="0.3" />
        <line x1="20" y1="12" x2="20" y2="14" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="20" y1="26" x2="20" y2="28" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="12" y1="20" x2="14" y2="20" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="26" y1="20" x2="28" y2="20" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

function AgentCard({ agent, index }: { agent: (typeof AGENTS)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`fade-up card-glow rounded-2xl border border-[#1a1a2e] bg-[#05050a] flex flex-col gap-5 cursor-default relative overflow-hidden transition-all duration-300 ${
        index === 4 ? "md:col-span-2 lg:col-span-1" : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="p-7 flex flex-col gap-5 flex-1">
        <div className="flex items-start justify-between">
          <div>{agent.icon}</div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 dot-pulse" />
            <span className="mono text-[9px] text-green-400 tracking-widest">ACTIVE</span>
          </div>
        </div>

        <div>
          <div className="mono text-[10px] text-violet-400 tracking-[0.2em] mb-1">{agent.code}</div>
          <h3 className="font-bold text-white text-lg mb-2" style={{ fontFamily: "Space Grotesk" }}>
            {agent.name}
          </h3>
          <p className="text-[#6b7280] text-sm leading-relaxed">{agent.role}</p>
        </div>

        <ul className="flex flex-col gap-2">
          {agent.capabilities.map((c) => (
            <li key={c} className="flex items-start gap-2 text-sm text-[#6b7280]">
              <span className="text-violet-400 mt-0.5 shrink-0">›</span>
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 bg-[#0d0d14] border-t border-violet-500/30 px-7 py-4 flex items-center justify-between transition-transform duration-300 ease-out"
        style={{ transform: hovered ? "translateY(0)" : "translateY(100%)" }}
      >
        <div>
          <div className="mono text-[9px] text-[#3a3a4a] tracking-widest mb-0.5">{agent.stat.label}</div>
          <div className="font-bold text-white text-xl" style={{ fontFamily: "Space Grotesk" }}>
            {agent.stat.value}
          </div>
        </div>
        <div
          className="mono text-[10px] text-violet-400 border border-violet-500/30 px-3 py-1.5 rounded-lg"
          style={{ background: "rgba(124,58,237,0.08)" }}
        >
          VIEW DETAILS →
        </div>
      </div>
    </div>
  );
}

export default function Agents() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
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
    <section ref={ref} id="agents" className="py-32 bg-[#0d0d14] border-y border-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="fade-up text-center mb-16">
          <div className="mono text-xs text-violet-400 tracking-[0.25em] mb-4">VIRAL MIND AGENTS</div>
          <h2
            className="font-bold text-white mb-4"
            style={{ fontFamily: "Space Grotesk", fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            Not a tool.{" "}
            <span className="gradient-text">A team.</span>
          </h2>
          <p className="text-[#6b7280] max-w-xl mx-auto">
            Five specialized agents running in parallel. Each one an expert in its domain.
            All sharing the same brand context.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {AGENTS.map((agent, i) => (
            <AgentCard key={agent.code} agent={agent} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
