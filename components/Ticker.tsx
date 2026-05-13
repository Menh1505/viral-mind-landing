"use client";

const ITEMS = [
  { text: "RESEARCH AGENT FOUND 23 TRENDS", color: "#7c3aed" },
  { text: "PUBLISHED: LINKEDIN POST — 412 IMPRESSIONS", color: "#10b981" },
  { text: "EMAIL DIGEST SENT: 847 SUBSCRIBERS", color: "#06b6d4" },
  { text: "SEO RANK: 'AI TOOLS FOR SMB' → #4", color: "#10b981" },
  { text: "BRIEF GENERATED IN 18s", color: "#7c3aed" },
  { text: "SOCIAL SCHEDULED: TUE 7PM — TIKTOK", color: "#06b6d4" },
  { text: "INSIGHT: COMPETITOR MOVE DETECTED", color: "#f59e0b" },
  { text: "CONTENT APPROVED: INSTAGRAM REEL", color: "#10b981" },
  { text: "RANK CHANGE: +14 POSITIONS THIS WEEK", color: "#10b981" },
  { text: "TREND MEMORY: 'AI AUTOMATION' RISING 340%", color: "#7c3aed" },
  { text: "ASSET GENERATED: CAROUSEL — 7 SLIDES", color: "#06b6d4" },
  { text: "BRIEF BUNDLE READY: 4 FORMAT VARIANTS", color: "#7c3aed" },
];

const repeated = [...ITEMS, ...ITEMS];

export default function Ticker() {
  return (
    <div className="border-y border-[#1a1a2e] bg-[#0d0d14] py-2.5 overflow-hidden">
      <div className="flex items-center gap-4 w-full overflow-hidden">
        <div className="flex items-center gap-2 shrink-0 pl-6">
          <span className="mono text-[10px] text-violet-400 tracking-widest border border-violet-500/30 px-2 py-0.5 rounded bg-violet-600/10 shrink-0">
            LIVE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 dot-pulse shrink-0" />
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="ticker-track flex gap-10 items-center">
            {repeated.map((item, i) => (
              <span
                key={i}
                className="mono text-[11px] tracking-widest shrink-0 flex items-center gap-2.5"
              >
                <span
                  className="w-1 h-1 rounded-full shrink-0"
                  style={{ background: item.color }}
                />
                <span style={{ color: item.color === "#f59e0b" ? "#f59e0b" : "#6b7280" }}>
                  {item.text}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
