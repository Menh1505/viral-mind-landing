"use client";
import { useRef, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ScrambleText from "./ScrambleText";
import MagneticButton from "./MagneticButton";

const TABS = ["OVERVIEW", "CONTENT", "SOCIAL", "EMAIL", "SEO"];

const AGENTS = [
  { name: "RESEARCH AGENT", pct: 80, status: "RUNNING" },
  { name: "BRIEF AGENT", pct: 100, status: "DONE" },
  { name: "SOCIAL AGENT", pct: 0, status: "QUEUED" },
  { name: "EMAIL AGENT", pct: 100, status: "DONE" },
  { name: "SEO AGENT", pct: 50, status: "RUNNING" },
];

const CHART_BARS = [40, 65, 50, 80, 70, 90, 75];

function CandlestickChart({ color }: { color: string }) {
  const candles = [
    { o: 55, c: 70, h: 75, l: 50 },
    { o: 70, c: 58, h: 72, l: 54 },
    { o: 58, c: 75, h: 78, l: 56 },
    { o: 75, c: 68, h: 80, l: 65 },
    { o: 68, c: 85, h: 88, l: 66 },
    { o: 85, c: 78, h: 90, l: 74 },
    { o: 78, c: 92, h: 95, l: 76 },
  ];
  const maxH = 95;
  return (
    <svg viewBox="0 0 56 20" className="w-full mt-1" style={{ height: 18 }}>
      {candles.map((c, i) => {
        const x = i * 8 + 4;
        const bullish = c.c >= c.o;
        const top = ((maxH - Math.max(c.o, c.c)) / maxH) * 20;
        const bot = ((maxH - Math.min(c.o, c.c)) / maxH) * 20;
        const hi = ((maxH - c.h) / maxH) * 20;
        const lo = ((maxH - c.l) / maxH) * 20;
        return (
          <g key={i}>
            <line x1={x} y1={hi} x2={x} y2={lo} stroke={bullish ? color : "#ef4444"} strokeWidth="0.8" opacity="0.7" />
            <rect x={x - 1.8} y={top} width={3.6} height={Math.max(bot - top, 0.8)} fill={bullish ? color : "#ef4444"} opacity="0.9" rx="0.3" />
          </g>
        );
      })}
    </svg>
  );
}

function AreaChart({ color }: { color: string }) {
  const pts = [40, 55, 45, 68, 60, 78, 72, 88, 82, 95];
  const max = 95; const w = 56; const h = 18;
  const xs = pts.map((_, i) => (i / (pts.length - 1)) * w);
  const ys = pts.map((v) => h - (v / max) * h);
  const line = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i]!.toFixed(1)}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full mt-1" style={{ height: 18 }}>
      <defs>
        <linearGradient id={`ag-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#ag-${color.replace("#","")})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={xs[xs.length-1]!} cy={ys[ys.length-1]!} r="1.5" fill={color} />
    </svg>
  );
}

function StepLineChart({ color }: { color: string }) {
  const pts = [30, 30, 55, 55, 42, 42, 70, 70, 65, 65, 85, 85, 90];
  const max = 90; const w = 56; const h = 18;
  const xs = pts.map((_, i) => (i / (pts.length - 1)) * w);
  const ys = pts.map((v) => h - (v / max) * h);
  const d = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i]!.toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full mt-1" style={{ height: 18 }}>
      {[0,1,2].map((i) => (
        <line key={i} x1={0} y1={h - (i * 30 / max) * h + 0.5} x2={w} y2={h - (i * 30 / max) * h + 0.5}
          stroke={color} strokeWidth="0.3" strokeDasharray="2 2" opacity="0.2" />
      ))}
      <path d={d} fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round" opacity="0.9" />
      {[2,6,10,12].map((i) => (
        <circle key={i} cx={xs[i]!} cy={ys[i]!} r="1.2" fill={color} opacity="0.8" />
      ))}
    </svg>
  );
}

function VolumeChart({ color }: { color: string }) {
  const vols = [30, 55, 42, 80, 60, 95, 70];
  const max = 95;
  return (
    <svg viewBox="0 0 56 18" className="w-full mt-1" style={{ height: 18 }}>
      {vols.map((v, i) => {
        const barH = (v / max) * 16;
        const x = i * 8 + 1;
        const isHigh = v > 70;
        return (
          <g key={i}>
            <rect x={x} y={18 - barH} width={5.5} height={barH} rx="1"
              fill={isHigh ? color : color} opacity={isHigh ? 1 : 0.35} />
            {isHigh && (
              <rect x={x} y={18 - barH} width={5.5} height={2} rx="1" fill={color} opacity="0.9" />
            )}
          </g>
        );
      })}
    </svg>
  );
}

const TAB_CONTENT: Record<string, React.ReactNode> = {
  OVERVIEW: (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "CONTENT QUEUED", value: "12", color: "#7c3aed", chart: "candlestick", delta: "+3" },
          { label: "PUBLISHED TODAY", value: "4", color: "#10b981", chart: "area", delta: "+2" },
          { label: "AVG ENGAGEMENT", value: "8.3%", color: "#06b6d4", chart: "stepline", delta: "+1.2%" },
          { label: "RANK CHANGE", value: "+14", color: "#10b981", chart: "volume", delta: "↑" },
        ].map((s) => (
          <div key={s.label} className="bg-[#05050a] rounded-lg p-3 border border-[#1a1a2e]">
            <div className="mono text-[9px] text-[#3a3a4a] tracking-widest mb-1">{s.label}</div>
            <div className="flex items-baseline gap-1.5">
              <div className="font-bold text-lg" style={{ fontFamily: "Space Grotesk", color: s.color }}>{s.value}</div>
              <span className="mono text-[8px]" style={{ color: s.color, opacity: 0.7 }}>{s.delta}</span>
            </div>
            {s.chart === "candlestick" && <CandlestickChart color={s.color} />}
            {s.chart === "area" && <AreaChart color={s.color} />}
            {s.chart === "stepline" && <StepLineChart color={s.color} />}
            {s.chart === "volume" && <VolumeChart color={s.color} />}
          </div>
        ))}
      </div>
      <div className="mono text-[10px] text-[#6b7280] tracking-widest mt-1 mb-1">AGENT STATUS</div>
      {AGENTS.map((agent) => (
        <div key={agent.name} className="flex items-center gap-3">
          <div className="mono text-[9px] text-[#3a3a4a] tracking-widest w-28 shrink-0">{agent.name}</div>
          <div className="flex-1 h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{
              width: `${agent.pct}%`,
              background: agent.pct === 100 ? "#10b981" : agent.pct === 0 ? "transparent" : "linear-gradient(90deg,#7c3aed,#06b6d4)",
              transition: "width 0.8s ease",
            }} />
          </div>
          <span className={`mono text-[9px] tracking-widest flex items-center gap-1 ${agent.status === "RUNNING" ? "text-cyan-400" : agent.status === "DONE" ? "text-green-400" : "text-[#3a3a4a]"}`}>
            {agent.status === "RUNNING" && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 dot-pulse inline-block" />}
            {agent.status === "DONE" && <span>✓</span>}
            {agent.status}
          </span>
        </div>
      ))}
    </div>
  ),
  CONTENT: (
    <div className="flex flex-col gap-2">
      <div className="mono text-[10px] text-violet-400 tracking-widest mb-1">3 BRIEFS READY FOR REVIEW</div>
      {[
        {
          title: "Why AI automation is changing SMB marketing",
          urgency: "HIGH",
          platform: "LINKEDIN",
          video: "/videos/d1.mp4",
          format: "🎬 Short Video",
          formatColor: "#06b6d4",
        },
        {
          title: "The content calendar myth — debunked",
          urgency: "MED",
          platform: "INSTAGRAM",
          video: "/videos/d2.mp4",
          format: "🎠 Carousel",
          formatColor: "#7c3aed",
        },
        {
          title: "5 ways to repurpose one blog post into 10 pieces",
          urgency: "LOW",
          platform: "TIKTOK",
          video: "/videos/d3.mp4",
          format: "🖼 Short Post",
          formatColor: "#10b981",
        },
      ].map((item) => (
        <div key={item.title} className="bg-[#05050a] rounded-lg border border-[#1a1a2e] overflow-hidden">
          <div className="relative w-full" style={{ paddingBottom: "33%" }}>
            <video
              src={item.video}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.7) saturate(1.2)" }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(5,5,10,0.9) 100%)" }}
            />
            <div className="absolute bottom-1.5 left-2 flex items-center gap-1.5">
              <span
                className="mono text-[8px] px-1.5 py-0.5 rounded"
                style={{ background: item.formatColor + "25", color: item.formatColor, border: `1px solid ${item.formatColor}40` }}
              >
                {item.format}
              </span>
              <span className="mono text-[8px] text-[#6b7280]">{item.platform}</span>
            </div>
            <div className="absolute top-1.5 right-1.5">
              <span className={`mono text-[8px] px-1.5 py-0.5 rounded ${item.urgency === "HIGH" ? "bg-red-500/20 text-red-400" : item.urgency === "MED" ? "bg-yellow-500/20 text-yellow-400" : "bg-[#1a1a2e] text-[#3a3a4a]"}`}>
                {item.urgency}
              </span>
            </div>
          </div>
          <div className="px-3 py-2">
            <div className="text-xs text-white leading-snug">{item.title}</div>
          </div>
        </div>
      ))}
      <div className="flex gap-2 mt-1">
        <button className="mono text-[10px] text-white bg-violet-600 px-3 py-1.5 rounded-lg hover:bg-violet-500 transition-colors">APPROVE ALL</button>
        <button className="mono text-[10px] text-[#6b7280] border border-[#1a1a2e] px-3 py-1.5 rounded-lg hover:border-violet-500 transition-colors">VIEW PIPELINE</button>
      </div>
    </div>
  ),
  SOCIAL: (() => {
    const PLATFORM_ICONS: Record<string, React.ReactNode> = {
      LINKEDIN: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      INSTAGRAM: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      ),
      TIKTOK: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.26 8.26 0 004.84 1.55V6.85a4.85 4.85 0 01-1.07-.16z"/>
        </svg>
      ),
      FACEBOOK: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      YOUTUBE: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
          <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
        </svg>
      ),
    };

    const PLATFORM_COLOR: Record<string, string> = {
      LINKEDIN: "#0077b5",
      INSTAGRAM: "#e1306c",
      TIKTOK: "#ffffff",
      FACEBOOK: "#1877f2",
      YOUTUBE: "#ff0000",
    };

    const DAYS = [
       {
         day: "MON", date: "12",
         posts: [
           { platform: "LINKEDIN", time: "8:00 AM", title: "AI automation is changing SMB marketing", status: "PUBLISHED" },
           { platform: "FACEBOOK", time: "10:00 AM", title: "How AI writes your weekly report", status: "PUBLISHED" },
           { platform: "YOUTUBE", time: "2:00 PM", title: "Viral Mind — product walkthrough", status: "SCHEDULED" },
         ],
       },
       {
         day: "TUE", date: "13",
         posts: [
           { platform: "INSTAGRAM", time: "7:00 PM", title: "The content calendar myth", status: "SCHEDULED" },
           { platform: "TIKTOK", time: "7:30 PM", title: "5 ways to repurpose one blog post", status: "SCHEDULED" },
           { platform: "LINKEDIN", time: "9:00 AM", title: "Why AI agents beat tool stacks", status: "SCHEDULED" },
         ],
       },
       {
         day: "WED", date: "14",
         posts: [
           { platform: "LINKEDIN", time: "9:00 AM", title: "Why most marketers fail at SEO", status: "SCHEDULED" },
           { platform: "FACEBOOK", time: "12:00 PM", title: "Tool stack vs AI agent — cost breakdown", status: "PENDING" },
           { platform: "INSTAGRAM", time: "5:00 PM", title: "3 signs your content strategy is broken", status: "PENDING" },
         ],
       },
       {
         day: "THU", date: "15",
         posts: [
           { platform: "INSTAGRAM", time: "6:00 PM", title: "Your competitor just automated their content", status: "SCHEDULED" },
           { platform: "YOUTUBE", time: "10:00 AM", title: "Viral Mind walkthrough — full demo", status: "PENDING" },
           { platform: "TIKTOK", time: "8:00 PM", title: "Watch AI write a LinkedIn post in 12s", status: "SCHEDULED" },
         ],
       },
       {
         day: "FRI", date: "16",
         posts: [
           { platform: "TIKTOK", time: "5:00 PM", title: "30s: what one AI brief generates", status: "SCHEDULED" },
           { platform: "LINKEDIN", time: "8:30 AM", title: "Friday insight: your reach this week", status: "SCHEDULED" },
           { platform: "FACEBOOK", time: "3:00 PM", title: "Weekend reading: top AI tools 2026", status: "PENDING" },
         ],
       },
     ];

    const statusColor: Record<string, string> = {
      PUBLISHED: "#10b981",
      SCHEDULED: "#7c3aed",
      PENDING: "#3a3a4a",
    };

    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between mb-1">
          <div className="mono text-[10px] text-cyan-400 tracking-widest">WEEK OF MAY 12</div>
          <div className="mono text-[9px] text-[#3a3a4a]">15 POSTS QUEUED</div>
        </div>

        <div className="grid grid-cols-5 gap-1">
          {DAYS.map((d) => (
            <div key={d.day} className="flex flex-col gap-1">
              <div className="text-center pb-1 border-b border-[#1a1a2e]">
                <div className="mono text-[8px] text-[#3a3a4a] tracking-widest">{d.day}</div>
                <div className="font-bold text-sm text-white" style={{ fontFamily: "Space Grotesk" }}>{d.date}</div>
              </div>
              <div className="flex flex-col gap-1">
                {d.posts.map((p, pi) => (
                  <div
                    key={pi}
                    className="rounded-md border p-1.5 flex flex-col gap-1"
                    style={{
                      background: PLATFORM_COLOR[p.platform] + "10",
                      borderColor: PLATFORM_COLOR[p.platform] + "30",
                    }}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span style={{ color: PLATFORM_COLOR[p.platform] }}>
                        {PLATFORM_ICONS[p.platform]}
                      </span>
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: statusColor[p.status] }}
                      />
                    </div>
                    <div className="mono text-[7px] text-white leading-tight line-clamp-2 opacity-80">
                      {p.title}
                    </div>
                    <div className="mono text-[7px] text-[#3a3a4a]">{p.time}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-1">
          {[
            { label: "PUBLISHED", color: "#10b981" },
            { label: "SCHEDULED", color: "#7c3aed" },
            { label: "PENDING", color: "#3a3a4a" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
              <span className="mono text-[8px] text-[#3a3a4a]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  })(),
  EMAIL: (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between mb-1">
        <div className="mono text-[10px] text-green-400 tracking-widest">EMAIL DIGEST</div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 dot-pulse" />
          <span className="mono text-[9px] text-green-400">READY TO SEND</span>
        </div>
      </div>

      <div className="bg-[#05050a] rounded-xl border border-[#1a1a2e] overflow-hidden">
        <div className="px-3 py-2 border-b border-[#1a1a2e] flex items-center justify-between">
          <div className="mono text-[8px] text-[#3a3a4a] tracking-widest">FROM</div>
          <div className="mono text-[9px] text-[#6b7280]">agents@viralmind.ai</div>
        </div>
        <div className="px-3 py-2 border-b border-[#1a1a2e] flex items-center justify-between">
          <div className="mono text-[8px] text-[#3a3a4a] tracking-widest">TO</div>
          <div className="mono text-[9px] text-[#6b7280]">847 subscribers</div>
        </div>
        <div className="px-3 py-2.5">
          <div className="mono text-[8px] text-[#3a3a4a] tracking-widest mb-1.5">SUBJECT</div>
          <div className="text-xs text-white leading-snug">Your AI agents found 23 insights this week 🔥</div>
        </div>
        <div className="px-3 py-2 bg-[#030307] border-t border-[#1a1a2e]">
          <div className="mono text-[8px] text-[#3a3a4a] tracking-widest mb-2">PREVIEW</div>
          <div className="space-y-1">
            {["→ AI automation is changing SMB marketing (HIGH signal)", "→ New Instagram algorithm shift detected", "→ Competitor X launched scheduling tool"].map((line) => (
              <div key={line} className="mono text-[7px] text-[#6b7280] leading-relaxed">{line}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "SUBSCRIBERS", value: "847", delta: "+23", color: "#10b981" },
          { label: "OPEN RATE", value: "34%", delta: "+4%", color: "#06b6d4" },
          { label: "CLICKS", value: "128", delta: "+31", color: "#7c3aed" },
        ].map((s) => (
          <div key={s.label} className="bg-[#05050a] rounded-lg p-2 border border-[#1a1a2e]">
            <div className="font-bold text-white text-sm" style={{ fontFamily: "Space Grotesk" }}>{s.value}</div>
            <div className="flex items-center justify-between mt-0.5">
              <div className="mono text-[7px] text-[#3a3a4a]">{s.label}</div>
              <div className="mono text-[7px]" style={{ color: s.color }}>{s.delta}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          className="flex-1 mono text-[10px] text-white py-2 rounded-lg transition-colors"
          style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}
        >
          SEND NOW →
        </button>
        <button className="mono text-[10px] text-[#6b7280] border border-[#1a1a2e] px-3 py-2 rounded-lg hover:border-green-500/50 transition-colors">
          PREVIEW
        </button>
      </div>
    </div>
  ),
  SEO: (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between mb-1">
        <div className="mono text-[10px] text-violet-400 tracking-widest">RANK TRACKER</div>
        <div className="mono text-[9px] text-[#3a3a4a]">WEEK OF MAY 12</div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-1">
        {[
          { label: "KEYWORDS", value: "12", color: "#7c3aed" },
          { label: "AVG POSITION", value: "#8", color: "#06b6d4" },
          { label: "TOP 10", value: "5", color: "#10b981" },
        ].map((s) => (
          <div key={s.label} className="bg-[#05050a] rounded-lg p-2 border border-[#1a1a2e] text-center">
            <div className="font-bold text-sm" style={{ fontFamily: "Space Grotesk", color: s.color }}>{s.value}</div>
            <div className="mono text-[7px] text-[#3a3a4a] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {[
        { keyword: "AI tools for SMB", prev: 18, curr: 4, vol: "2.4K" },
        { keyword: "content automation", prev: 7, curr: 3, vol: "1.8K" },
        { keyword: "marketing AI platform", prev: 32, curr: 21, vol: "890" },
        { keyword: "social media scheduler", prev: 45, curr: 29, vol: "3.1K" },
      ].map((kw) => {
        const delta = kw.prev - kw.curr;
        const pct = Math.round((kw.curr / kw.prev) * 100);
        return (
          <div key={kw.keyword} className="bg-[#05050a] rounded-lg border border-[#1a1a2e] px-3 py-2">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="text-xs text-white leading-snug flex-1 min-w-0 truncate">{kw.keyword}</div>
              <span className="mono text-[9px] text-green-400 bg-green-400/10 border border-green-400/20 px-1.5 py-0.5 rounded shrink-0">↑{delta}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-[#1a1a2e] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{
                  width: `${pct}%`,
                  background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
                }} />
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="mono text-[8px] text-[#3a3a4a] line-through">#{kw.prev}</span>
                <span className="mono text-[9px] font-bold text-white">#{kw.curr}</span>
                <span className="mono text-[7px] text-[#3a3a4a]">{kw.vol}/mo</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ),
};

export default function Hero({ onOpenWaitlist }: { onOpenWaitlist?: () => void }) {
  const [activeTab, setActiveTab] = useState("OVERVIEW");
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const mockupRotate = useTransform(scrollYProgress, [0, 1], [0, 3]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
        <source src="/videos/hero-bg.webm" type="video/webm" />
      </video>

      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: "linear-gradient(to bottom, rgba(5,5,10,0.82) 0%, rgba(5,5,10,0.72) 50%, rgba(5,5,10,0.92) 100%)",
        }}
      />

      <div className="scan-line" style={{ zIndex: 2 }} />

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ zIndex: 2 }}
      >
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{
            background: "radial-gradient(circle, #7c3aed, transparent)",
            animation: "float-blob 12s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl"
          style={{
            background: "radial-gradient(circle, #06b6d4, transparent)",
            animation: "float-blob 16s ease-in-out infinite reverse",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center py-20 relative" style={{ zIndex: 3 }}>
        <motion.div className="fade-up visible" style={{ y: copyY }}>
          <div className="mono text-cyan-400 text-xs tracking-[0.2em] mb-6 flex items-center gap-2">
            <span>VIRAL_MIND.exe</span>
            <span className="text-[#6b7280]">&gt; INITIALIZING AGENTS</span>
            <span className="cursor-blink">▌</span>
          </div>

          <h1
            className="font-bold leading-[1.05] mb-6 text-white"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "clamp(40px, 5vw, 68px)",
            }}
          >
            <ScrambleText text="Your marketing team" delay={200} />
            <br />
            <span className="gradient-text">
              <ScrambleText text="is already running." delay={600} />
            </span>
            <br />
            <ScrambleText text="You just approve." delay={1000} />
          </h1>

          <p className="text-[#6b7280] text-lg leading-relaxed mb-10 max-w-lg">
            Five AI agents handle research, content, scheduling, analytics and
            SEO — across every channel — automatically.
            <br />
            <span className="text-white font-medium">
              One person. The output of a team of ten.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <MagneticButton
              href="#"
              onClick={(e: React.MouseEvent) => { e.preventDefault(); onOpenWaitlist?.(); }}
              className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-white text-sm"
              style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}
            >
              LAUNCH YOUR AGENTS
              <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton
              href="#how-it-works"
              className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-[#1a1a2e] text-[#6b7280] hover:text-white hover:border-violet-500 transition-colors text-sm"
            >
              <Play size={14} className="text-violet-400" />
              WATCH IT RUN
            </MagneticButton>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="mono text-[#6b7280] text-xs tracking-widest">REPLACES</span>
            {["JASPER", "BUFFER", "HOOTSUITE", "SEMRUSH", "MAILCHIMP"].map((t) => (
              <span
                key={t}
                className="mono text-xs text-[#3a3a4a] line-through tracking-widest"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative fade-up visible"
          style={{ y: mockupY, rotateX: mockupRotate, transformPerspective: 1200 }}
        >
          <div
            className="animated-border rounded-2xl overflow-hidden"
            style={{ background: "#0d0d14", boxShadow: "0 0 60px rgba(124,58,237,0.12)" }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a1a2e]">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="mono text-[#3a3a4a] text-xs ml-2 tracking-widest">
                VIRAL_MIND / DASHBOARD
              </span>
            </div>

            <div className="flex gap-1 px-4 pt-3 border-b border-[#1a1a2e] overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`mono text-[10px] px-3 py-1.5 rounded-t tracking-widest transition-all whitespace-nowrap border-b-2 ${
                    activeTab === tab
                      ? "bg-violet-600/20 text-violet-400 border-violet-500"
                      : "text-[#3a3a4a] hover:text-[#6b7280] border-transparent"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-4 min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  {TAB_CONTENT[activeTab]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div
            className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full opacity-20 blur-2xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
