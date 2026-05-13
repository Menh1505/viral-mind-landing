import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-8 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #7c3aed, transparent)" }}
      />

      <div className="relative z-10 text-center max-w-lg">
        <div className="mono text-[10px] text-violet-400 tracking-[0.3em] mb-6">ERROR 404</div>

        <div
          className="font-bold text-white mb-4 leading-none"
          style={{ fontFamily: "Space Grotesk", fontSize: "clamp(80px, 15vw, 140px)" }}
        >
          <span className="gradient-text">404</span>
        </div>

        <h1 className="font-bold text-white text-2xl mb-3" style={{ fontFamily: "Space Grotesk" }}>
          Agent lost in the network
        </h1>

        <p className="text-[#6b7280] text-sm mb-10 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
          Our agents are everywhere — just not here.
        </p>

        <div className="bg-[#0d0d14] border border-[#1a1a2e] rounded-xl p-4 mb-8 text-left">
          <div className="mono text-[10px] text-[#3a3a4a] tracking-widest mb-2">SYSTEM LOG</div>
          {[
            { t: "00:00:01", msg: "ROUTING_AGENT: Path not found", color: "#ef4444" },
            { t: "00:00:01", msg: "FALLBACK_AGENT: Serving 404", color: "#f59e0b" },
            { t: "00:00:02", msg: "SUGGESTION: Return to home", color: "#10b981" },
          ].map((line, i) => (
            <div key={i} className="flex gap-3 text-xs mb-1">
              <span className="mono text-[#3a3a4a]">[{line.t}]</span>
              <span className="mono" style={{ color: line.color }}>{line.msg}</span>
            </div>
          ))}
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm mono tracking-widest transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}
        >
          ← RETURN HOME
        </Link>
      </div>
    </div>
  );
}
