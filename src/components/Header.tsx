import { motion } from "framer-motion";
import { Menu, X, ArrowRight, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Đội ngũ AI", href: "#capabilities" },
  { label: "Cách hoạt động", href: "#how-it-works" },
  { label: "Chi phí", href: "#pricing" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-normal ${scrolled ? 'bg-viral-bg/80 backdrop-blur-xl border-b border-white/10 shadow-card' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-4 md:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 flex items-center justify-center">
              <img src="/logo.svg" width="24" height="23" alt="" aria-hidden="true" />
            </span>
            <span className="font-display text-heading-lg text-viral-text tracking-tight">ViralMinds</span>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-body label-lg text-viral-text-muted hover:text-viral-text transition-colors duration-fast"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://zalo.me/0374149427"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono label-md text-viral-text-muted hover:text-viral-accent transition-colors duration-fast"
            >
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              <span className="hidden xl:inline">Zalo 0374 149 427</span>
            </a>
            <a href="#contact" className="btn-primary">
              <span>Đặt lịch tư vấn</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <button
            className="md:hidden p-2 text-viral-text hover:text-viral-accent transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <motion.div
          id="mobile-menu"
          className="md:hidden overflow-hidden bg-viral-bg-secondary border-t border-viral-border"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="py-6 space-y-4 px-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block font-body label-lg text-viral-text-muted hover:text-viral-text transition-colors duration-fast py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-viral-border space-y-3">
              <a
                href="https://zalo.me/0374149427"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body label-lg text-viral-text-muted hover:text-viral-accent transition-colors duration-fast py-2"
              >
                <MessageSquare className="w-5 h-5" aria-hidden="true" />
                <span>Zalo 0374 149 427</span>
              </a>
              <a href="#contact" className="btn-primary w-full justify-center" onClick={() => setIsOpen(false)}>
                <span>Đặt lịch tư vấn</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </nav>
    </header>
  );
}
