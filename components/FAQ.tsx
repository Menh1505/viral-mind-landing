"use client";
import { useState, useEffect, useRef } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "Is the content quality actually good?",
    a: "Yes. AI researches real trending topics specific to your industry, generates brand-specific angles based on your onboarding profile, and you review before anything publishes. You're the editor — AI is the journalist and copywriter.",
  },
  {
    q: "Do I keep control of what gets published?",
    a: "Completely. Nothing publishes without your approval. You can approve, edit, or reject any piece of content. You can also turn on auto-publish for trusted content types once you trust the output.",
  },
  {
    q: "What social platforms are supported?",
    a: "TikTok, Instagram, LinkedIn, Facebook, and YouTube — all connected via OAuth. We use Zernio as the publishing layer, which handles the platform APIs and rate limits.",
  },
  {
    q: "What happens when the AI hits its monthly limit?",
    a: "You get an alert at 80% of your monthly research run cap. When the limit is reached, the research scheduler pauses until the next month resets automatically on the 1st. You can upgrade anytime for more runs.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. No contracts, no lock-in. Cancel before your next billing date and you won't be charged. Your data remains accessible for 30 days after cancellation.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
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
    <section ref={ref} className="py-32 bg-[#0d0d14] border-t border-[#1a1a2e]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="fade-up text-center mb-12">
          <div className="mono text-xs text-violet-400 tracking-[0.25em] mb-4">FAQ</div>
          <h2
            className="font-bold text-white"
            style={{ fontFamily: "Space Grotesk", fontSize: "clamp(28px, 3vw, 42px)" }}
          >
            Common questions
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="fade-up rounded-xl border border-[#1a1a2e] bg-[#05050a] overflow-hidden transition-all"
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left hover:bg-[#0d0d14] transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-medium text-white text-sm pr-4" style={{ fontFamily: "Space Grotesk" }}>
                  {faq.q}
                </span>
                <span className="text-violet-400 shrink-0">
                  {open === i ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              {open === i && (
                <div className="px-5 pb-5">
                  <p className="text-[#6b7280] text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
