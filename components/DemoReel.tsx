"use client";
import { useState, useEffect, useRef } from "react";
import LazyVideo from "./LazyVideo";

const SCENES = [
  {
    label: "RESEARCH PIPELINE COMPLETE",
    tab: "RESEARCH",
    content: (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between mb-2">
          <span className="mono text-xs text-cyan-400 tracking-widest">23 SIGNALS FOUND TODAY</span>
          <span className="mono text-[10px] text-[#3a3a4a]">COMPLETED IN 2m 14s</span>
        </div>
        {[
          { title: "AI automation adoption hits 61% among marketers", urgency: "HIGH", why: "Search volume +340% in 7 days" },
          { title: "Competitor X launches content scheduling tool", urgency: "HIGH", why: "Competitor move — act fast" },
          { title: "New Instagram algorithm favors carousel posts", urgency: "MED", why: "Platform shift detected" },
        ].map((item) => (
          <div key={item.title} className="bg-[#05050a] rounded-lg p-3 border border-[#1a1a2e]">
            <div className="flex items-start justify-between gap-2 mb-1">
              <span className="text-xs text-white leading-snug">{item.title}</span>
              <span className={`mono text-[9px] shrink-0 px-1.5 py-0.5 rounded ${
                item.urgency === "HIGH" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"
              }`}>{item.urgency}</span>
            </div>
            <span className="mono text-[9px] text-[#3a3a4a]">WHY NOW: {item.why}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    label: "BRIEF GENERATED",
    tab: "CONTENT",
    content: (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="mono text-[10px] text-violet-400 tracking-widest">ANGLE SELECTED:</span>
          <span className="mono text-[10px] text-white bg-violet-600/20 px-2 py-0.5 rounded border border-violet-500/30">CONTRARIAN</span>
        </div>
        <div className="bg-[#05050a] rounded-lg p-3 border border-[#1a1a2e]">
          <div className="mono text-[9px] text-[#3a3a4a] mb-2">BRAND CONTEXT</div>
          <div className="flex flex-col gap-1">
            {[["TONE", "Authoritative but approachable"], ["AUDIENCE", "Marketing managers, SMB"], ["GOAL", "Thought leadership"]].map(([k,v])=>(
              <div key={k} className="flex gap-2 text-xs">
                <span className="mono text-[#3a3a4a] w-20 shrink-0">{k}:</span>
                <span className="text-[#6b7280]">{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#05050a] rounded-lg p-3 border border-[#1a1a2e]">
          <div className="mono text-[9px] text-[#3a3a4a] mb-2">OUTLINE</div>
          {["H1: Why most AI marketing tools fail", "H2: The tool overload problem", "H2: What 'integration' actually means", "CTA: See how agents work together"].map((h,i)=>(
            <div key={i} className="text-xs text-[#6b7280] py-0.5 border-l-2 border-[#1a1a2e] pl-2 mb-1">{h}</div>
          ))}
        </div>
        <button className="self-start mono text-xs bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-500 transition-colors">
          APPROVE BRIEF →
        </button>
      </div>
    ),
  },
  {
    label: "CONTENT APPROVED & QUEUED",
    tab: "SOCIAL",
    content: (
      <div className="flex flex-col gap-3">
        <div className="mono text-[10px] text-[#6b7280] tracking-widest mb-1">3 ASSETS READY FOR REVIEW</div>
        {[
          { platform: "LINKEDIN", type: "Long-form Post", status: "APPROVE", color: "#7c3aed" },
          { platform: "INSTAGRAM", type: "Caption + Hashtags", status: "APPROVE", color: "#06b6d4" },
          { platform: "TIKTOK", type: "Script + Hook", status: "REVIEW", color: "#f59e0b" },
        ].map((item) => (
          <div key={item.platform} className="bg-[#05050a] rounded-lg p-3 border border-[#1a1a2e] flex items-center justify-between">
            <div>
              <div className="mono text-[10px] tracking-widest mb-0.5" style={{ color: item.color }}>{item.platform}</div>
              <div className="text-xs text-[#6b7280]">{item.type}</div>
            </div>
            <button
              className="mono text-[10px] px-3 py-1.5 rounded-lg border transition-colors"
              style={{ borderColor: item.color + "60", color: item.color, background: item.color + "15" }}
            >
              {item.status}
            </button>
          </div>
        ))}
        <div className="mono text-[10px] text-[#3a3a4a] tracking-widest mt-1">
          SCHEDULED: TUESDAY · 7:04 PM · OPTIMAL TIME
        </div>
      </div>
    ),
  },
  {
    label: "ANALYTICS DASHBOARD",
    tab: "ANALYTICS",
    content: (
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 mb-1">
          {["+23%", "6 posts", "412%", "847"].map((v,i)=>(
            <div key={i} className="flex-1 bg-[#05050a] rounded-lg p-2 border border-[#1a1a2e] text-center">
              <div className="font-bold text-white text-sm" style={{fontFamily:"Space Grotesk"}}>{v}</div>
              <div className="mono text-[8px] text-[#3a3a4a] mt-0.5">{["VS LWK","PUBLISHED","TOP REACH","SUBSCRIBERS"][i]}</div>
            </div>
          ))}
        </div>
        <div className="bg-[#05050a] rounded-lg p-3 border border-[#1a1a2e]">
          <div className="flex items-end gap-1 h-12 mb-2">
            {[40,65,50,80,70,90,75].map((h,i)=>(
              <div key={i} className="flex-1 rounded-t" style={{
                height:`${h}%`,
                background: i===5 ? "linear-gradient(180deg,#7c3aed,#06b6d4)" : "#1a1a2e"
              }} />
            ))}
          </div>
          <div className="mono text-[8px] text-[#3a3a4a] text-center tracking-widest">LAST 7 DAYS</div>
        </div>
        <div className="bg-violet-600/10 border border-violet-500/20 rounded-lg p-3">
          <div className="mono text-[9px] text-violet-400 tracking-widest mb-1">AI INSIGHT</div>
          <p className="text-xs text-[#6b7280] leading-relaxed">
            Top post drove 412% more reach than average. Suggest continuing{" "}
            <span className="text-white">&apos;AI automation&apos;</span> topic series next week.
          </p>
        </div>
      </div>
    ),
  },
  {
    label: "SEO RANK REPORT",
    tab: "SEO",
    content: (
      <div className="flex flex-col gap-3">
        <div className="mono text-[10px] text-[#6b7280] tracking-widest mb-1">WEEKLY SNAPSHOT · MAY 12 2026</div>
        {[
          { keyword: "AI tools for SMB", prev: 18, curr: 4, delta: +14 },
          { keyword: "content marketing automation", prev: 7, curr: 3, delta: +4 },
          { keyword: "marketing AI platform", prev: 32, curr: 21, delta: +11 },
          { keyword: "social media automation", prev: 15, curr: 9, delta: +6 },
        ].map((kw) => (
          <div key={kw.keyword} className="bg-[#05050a] rounded-lg p-2.5 border border-[#1a1a2e] flex items-center justify-between">
            <div>
              <div className="text-xs text-white mb-0.5">{kw.keyword}</div>
              <div className="mono text-[9px] text-[#3a3a4a]">was #{kw.prev}</div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-white" style={{fontFamily:"Space Grotesk"}}>#{kw.curr}</span>
              <span className="mono text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded">+{kw.delta} &#8593;</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

const VIDEOS = ["/videos/d1.mp4", "/videos/d2.mp4", "/videos/d3.mp4", "/videos/d4.mp4"];

export default function DemoReel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [videoIndex, setVideoIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const prevVideo = () => setVideoIndex((i) => (i - 1 + VIDEOS.length) % VIDEOS.length);
  const nextVideo = () => setVideoIndex((i) => (i + 1) % VIDEOS.length);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActive((a) => (a + 1) % SCENES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [paused]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { setActive((a) => (a + 1) % SCENES.length); setPaused(true); }
      if (e.key === "ArrowLeft") { setActive((a) => (a - 1 + SCENES.length) % SCENES.length); setPaused(true); }
      if (e.key === " ") { setPaused((p) => !p); e.preventDefault(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
    <section ref={ref} id="demo" className="py-32 max-w-7xl mx-auto px-6">
      <div className="fade-up text-center mb-16">
        <div className="mono text-xs text-cyan-400 tracking-[0.25em] mb-4">LIVE SYSTEM</div>
        <h2
          className="font-bold text-white"
          style={{ fontFamily: "Space Grotesk", fontSize: "clamp(32px, 4vw, 52px)" }}
        >
          Watch it{" "}
          <span className="gradient-text">run.</span>
        </h2>
      </div>

      <div className="fade-up grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div
          className="rounded-2xl border border-[#1a1a2e] overflow-hidden"
          style={{ background: "#0d0d14", boxShadow: "0 0 60px rgba(124,58,237,0.08)" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#1a1a2e]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="mono text-[10px] text-[#3a3a4a] tracking-widest truncate mx-2">
              {SCENES[active].label}
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 dot-pulse" />
              <span className="mono text-[9px] text-green-400">LIVE</span>
            </div>
          </div>

          <div className="flex border-b border-[#1a1a2e] overflow-x-auto">
            {SCENES.map((s, i) => (
              <button
                key={s.tab}
                onClick={() => { setActive(i); setPaused(true); }}
                className={`mono text-[10px] px-4 py-3 tracking-widest whitespace-nowrap transition-colors border-b-2 ${
                  i === active
                    ? "text-violet-400 border-violet-500 bg-violet-600/10"
                    : "text-[#3a3a4a] border-transparent hover:text-[#6b7280]"
                }`}
              >
                {s.tab}
              </button>
            ))}
          </div>

          <div className="p-5 min-h-[280px]">
            <div key={active} className="animate-in fade-in duration-300">
              {SCENES[active].content}
            </div>
          </div>

          <div className="flex justify-center gap-2 py-4 border-t border-[#1a1a2e]">
            {SCENES.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActive(i); setPaused(true); }}
                aria-label={`Go to scene ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === active ? "w-6 h-1.5 bg-violet-500" : "w-1.5 h-1.5 bg-[#1a1a2e] hover:bg-[#3a3a4a]"
                }`}
              />
            ))}
          </div>

          <div className="hidden md:flex items-center justify-center gap-3 pb-3">
            <span className="mono text-[9px] text-[#3a3a4a] tracking-widest">KEYBOARD:</span>
            {[["←", "prev"], ["→", "next"], ["space", "pause"]].map(([key, label]) => (
              <span key={key} className="flex items-center gap-1">
                <span className="mono text-[9px] text-[#3a3a4a] border border-[#1a1a2e] px-1.5 py-0.5 rounded">{key}</span>
                <span className="mono text-[9px] text-[#3a3a4a]">{label}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div
            className="rounded-2xl border border-[#1a1a2e] overflow-hidden"
            style={{ background: "#0d0d14", boxShadow: "0 0 60px rgba(6,182,212,0.06)" }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#1a1a2e]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="mono text-[10px] text-[#3a3a4a] tracking-widest">PRODUCT DEMO</span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 dot-pulse" />
                <span className="mono text-[9px] text-cyan-400">VIDEO</span>
              </div>
            </div>

            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <LazyVideo src={VIDEOS[videoIndex]} rootMargin="400px" />

              <button
                onClick={prevVideo}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(13,13,20,0.75)", border: "1px solid rgba(255,255,255,0.12)" }}
                aria-label="Previous video"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2L4 7L9 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <button
                onClick={nextVideo}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(13,13,20,0.75)", border: "1px solid rgba(255,255,255,0.12)" }}
                aria-label="Next video"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 2L10 7L5 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {VIDEOS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setVideoIndex(i)}
                    aria-label={`Video ${i + 1}`}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === videoIndex ? "20px" : "6px",
                      height: "6px",
                      background: i === videoIndex ? "#06b6d4" : "rgba(255,255,255,0.3)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "TIME SAVED", value: "40h", sub: "per week" },
              { label: "CONTENT OUT", value: "5×", sub: "more output" },
              { label: "TOOL COST", value: "−64%", sub: "vs stack" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-[#1a1a2e] p-3 text-center"
                style={{ background: "#0d0d14" }}
              >
                <div
                  className="font-bold text-white mb-0.5"
                  style={{ fontFamily: "Space Grotesk", fontSize: "22px" }}
                >
                  {stat.value}
                </div>
                <div className="mono text-[8px] text-[#3a3a4a] tracking-widest leading-tight">
                  {stat.label}
                </div>
                <div className="mono text-[9px] text-violet-400 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>

          <div
            className="rounded-xl border border-violet-500/20 p-4"
            style={{ background: "rgba(124,58,237,0.06)" }}
          >
            <div className="mono text-[9px] text-violet-400 tracking-widest mb-2">AGENT LOG · LIVE</div>
            <div className="flex flex-col gap-1.5">
              {[
                { time: "07:04", msg: "LinkedIn post published — 412 impressions", color: "#10b981" },
                { time: "07:06", msg: "SEO brief generated for 'AI automation'", color: "#7c3aed" },
                { time: "07:09", msg: "Instagram reel queued — Tue 7PM", color: "#06b6d4" },
                { time: "07:11", msg: "Weekly digest sent — 847 subscribers", color: "#10b981" },
              ].map((log) => (
                <div key={log.time} className="flex items-start gap-2">
                  <span className="mono text-[9px] text-[#3a3a4a] shrink-0 pt-0.5">{log.time}</span>
                  <span className="mono text-[10px] leading-relaxed" style={{ color: log.color }}>
                    {log.msg}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
