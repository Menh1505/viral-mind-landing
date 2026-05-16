"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Check } from "lucide-react";

const PLANS = [
  {
    name: "STARTER",
    price: { monthly: 49, annual: 39 },
    for: "Solo marketers and founders",
    features: [
      "1 brand",
      "60 research runs/month",
      "Content + Social + Analytics agents",
      "Weekly email digest",
      "5 social accounts connected",
      "Standard AI processing",
    ],
    cta: "Start Free Trial",
    highlight: false,
  },
  {
    name: "GROWTH",
    price: { monthly: 149, annual: 119 },
    for: "Marketing teams and growing brands",
    features: [
      "3 brands",
      "180 research runs/month",
      "All 5 agents (+ Email + SEO)",
      "Priority AI processing",
      "15 social accounts connected",
      "Advanced analytics + attribution",
    ],
    cta: "Start Free Trial",
    highlight: true,
    badge: "MOST POPULAR",
  },
  {
    name: "AGENCY",
    price: { monthly: 399, annual: 319 },
    for: "Agencies managing multiple clients",
    features: [
      "10 brands",
      "600 research runs/month",
      "White-label performance reports",
      "API access for integrations",
      "Unlimited social accounts",
      "Priority support",
    ],
    cta: "Contact Us",
    highlight: false,
  },
];

type Plan = (typeof PLANS)[number];

function PricingCard({ plan, annual }: { plan: Plan; annual: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
  }, []);

  const price = annual ? plan.price.annual : plan.price.monthly;

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setSpotlight((s) => ({ ...s, visible: false }))}
      className={`fade-up rounded-2xl border p-8 flex flex-col transition-all duration-300 relative overflow-hidden ${
        plan.highlight
          ? "border-violet-500/60 bg-[#0d0d14]"
          : "border-[#1a1a2e] bg-[#0d0d14] card-glow"
      }`}
      style={plan.highlight ? { boxShadow: "0 0 40px rgba(124,58,237,0.15)" } : undefined}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: spotlight.visible ? 1 : 0,
          background: `radial-gradient(200px circle at ${spotlight.x}px ${spotlight.y}px, rgba(124,58,237,0.1), transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex flex-col flex-1">
        {plan.badge && (
          <div className="mono text-[10px] text-violet-400 tracking-[0.2em] bg-violet-600/15 border border-violet-500/30 px-3 py-1 rounded-full self-start mb-4">
            {plan.badge}
          </div>
        )}

        <div className="mono text-xs text-[#6b7280] tracking-[0.2em] mb-2">{plan.name}</div>
        <div className="flex items-baseline gap-1 mb-1">
          <span
            className="font-bold text-white"
            style={{ fontFamily: "Space Grotesk", fontSize: "48px", lineHeight: 1 }}
          >
            ${price}
          </span>
          <span className="text-[#6b7280] text-sm">/mo</span>
        </div>
        <div className="text-[#6b7280] text-xs mb-6">{plan.for}</div>

        <ul className="flex flex-col gap-3 mb-8 flex-1">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-[#6b7280]">
              <Check size={14} className="text-violet-400 mt-0.5 shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <a
          href="https://app.viral-mind.online"
          className={`w-full text-center py-3.5 rounded-xl font-semibold text-sm mono tracking-widest transition-all block ${
            plan.highlight
              ? "text-white hover:opacity-90"
              : "border border-[#1a1a2e] text-[#6b7280] hover:text-white hover:border-violet-500"
          }`}
          style={
            plan.highlight
              ? { background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }
              : undefined
          }
        >
          {plan.cta.toUpperCase()}
        </a>
      </div>
    </div>
  );
}

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="pricing" className="py-32 max-w-7xl mx-auto px-6">
      <div className="fade-up text-center mb-12">
        <div className="mono text-xs text-violet-400 tracking-[0.25em] mb-4">PRICING</div>
        <h2
          className="font-bold text-white mb-4"
          style={{ fontFamily: "Space Grotesk", fontSize: "clamp(32px, 4vw, 52px)" }}
        >
          Less than your tool stack.
          <br />
          <span className="gradient-text">More than it can do.</span>
        </h2>

        <div className="flex items-center justify-center gap-4 mt-8">
          <span className={`mono text-xs tracking-widest ${!annual ? "text-white" : "text-[#6b7280]"}`}>MONTHLY</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative w-12 h-6 rounded-full transition-colors ${annual ? "bg-violet-600" : "bg-[#1a1a2e]"}`}
          >
            <div
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${annual ? "translate-x-7" : "translate-x-1"}`}
            />
          </button>
          <span className={`mono text-xs tracking-widest ${annual ? "text-white" : "text-[#6b7280]"}`}>
            ANNUAL <span className="text-green-400">-20%</span>
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {PLANS.map((plan) => (
          <PricingCard
            key={plan.name}
            plan={plan}
            annual={annual}
          />
        ))}
      </div>

      <div className="fade-up mt-12 text-center">
        <div className="inline-flex items-center gap-2 border border-[#1a1a2e] rounded-xl px-6 py-4 bg-[#0d0d14]">
          <span className="mono text-xs text-[#6b7280] tracking-widest">
            JASPER $49 + BUFFER $18 + HOOTSUITE $99 + SEMRUSH $89 + MAILCHIMP $20
          </span>
          <span className="text-[#3a3a4a]">→</span>
          <span className="mono text-xs text-red-400">$275/mo for 5 disconnected tools</span>
          <span className="text-[#3a3a4a]">vs</span>
          <span className="mono text-xs text-green-400">$149 Viral Mind</span>
        </div>
      </div>
    </section>
  );
}
