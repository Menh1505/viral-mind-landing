"use client";
import { useState, useEffect, useRef } from "react";
import { X, ArrowRight, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ open, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setEmail("");
      setStatus("idle");
      setErrorMsg("");
    }, 400);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative z-10 w-full max-w-md animated-border rounded-2xl overflow-hidden"
            style={{ background: "#0d0d14" }}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#1a1a2e]">
              <div>
                <div className="mono text-[10px] text-violet-400 tracking-[0.2em] mb-1">EARLY ACCESS</div>
                <h2 className="font-bold text-white text-xl" style={{ fontFamily: "Space Grotesk" }}>
                  Join the waitlist
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="text-[#3a3a4a] hover:text-white transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-6">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-4 py-6 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                      <Check size={24} className="text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg mb-1" style={{ fontFamily: "Space Grotesk" }}>
                        You're on the list
                      </h3>
                      <p className="text-[#6b7280] text-sm">
                        We'll reach out as soon as your spot is ready.
                        <br />
                        We're onboarding in batches.
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="mono text-xs text-[#6b7280] hover:text-white transition-colors tracking-widest mt-2"
                    >
                      CLOSE
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                  >
                    <p className="text-[#6b7280] text-sm leading-relaxed">
                      Get first access when we open new slots. No spam — just one email when you're in.
                    </p>

                    <div className="flex flex-col gap-2">
                      <label className="mono text-[10px] text-[#3a3a4a] tracking-widest">
                        WORK EMAIL
                      </label>
                      <input
                        ref={inputRef}
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                        placeholder="you@company.com"
                        className="w-full bg-[#05050a] border border-[#1a1a2e] rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#3a3a4a] outline-none focus:border-violet-500/60 transition-colors"
                      />
                      {status === "error" && (
                        <span className="mono text-[10px] text-red-400 tracking-widest">{errorMsg}</span>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-white text-sm mono tracking-widest transition-all hover:opacity-90 disabled:opacity-60"
                      style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          RESERVING SPOT...
                        </>
                      ) : (
                        <>
                          REQUEST EARLY ACCESS
                          <ArrowRight size={15} />
                        </>
                      )}
                    </button>

                    <p className="mono text-[10px] text-[#3a3a4a] tracking-widest text-center">
                      NO CREDIT CARD · CANCEL ANYTIME · GDPR COMPLIANT
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
