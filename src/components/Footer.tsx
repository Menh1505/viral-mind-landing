import { motion } from "framer-motion";
import { MessageSquare, Mail, ArrowUpRight, Facebook, Linkedin, Youtube } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Tổng quan", href: "#overview" },
    { label: "ViralMinds", href: "#what-is" },
    { label: "Giải pháp", href: "#solutions" },
    { label: "Cách hoạt động", href: "#how-it-works" },
    { label: "Đặt lịch tư vấn", href: "#contact" },
  ],
  resources: [
    { label: "Thiết kế Workforce", href: "#design" },
    { label: "Chi phí", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Blog (Sắp ra mắt)", href: "#" },
    { label: "Case Studies", href: "#" },
  ],
  company: [
    { label: "Về chúng tôi", href: "#" },
    { label: "Tuyển dụng", href: "#" },
    { label: "Đối tác", href: "#" },
    { label: "Chính sách bảo mật", href: "#" },
    { label: "Điều khoản sử dụng", href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-viral-border bg-viral-bg-secondary/50">
      <div className="absolute inset-0 grid-bg noise-bg opacity-30" aria-hidden="true" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12 md:mb-16">
          <motion.div className="lg:col-span-2 max-w-xs" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.svg" width="28" height="26" alt="" aria-hidden="true" />
              <span className="font-display text-heading-lg text-viral-text">ViralMinds</span>
            </div>
            <p className="font-body body-md text-viral-text-muted mb-6 leading-relaxed">
              AI Workforce cho Digital Marketing. Từ Website → SEO → AEO → Content → Ads → Analytics → CRM, ViralMinds giúp doanh nghiệp xây dựng một hệ thống Marketing có thể vận hành, mở rộng và thích nghi.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://zalo.me/0374149427" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 bg-viral-bg-tertiary border border-viral-border rounded-card-md text-viral-text-muted hover:text-viral-accent hover:border-viral-accent/50 transition-all duration-fast font-body body-sm">
                <MessageSquare className="w-4 h-4" aria-hidden="true" />
                <span>Zalo 0374 149 427</span>
              </a>
              <a href="mailto:contact@viralminds.vn" className="flex items-center gap-2 px-3 py-2 bg-viral-bg-tertiary border border-viral-border rounded-card-md text-viral-text-muted hover:text-viral-accent hover:border-viral-accent/50 transition-all duration-fast font-body body-sm">
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>contact@viralminds.vn</span>
              </a>
            </div>
          </motion.div>

          <motion.nav initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
            <h3 className="font-display heading-sm text-viral-text mb-4">Sản phẩm</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="font-body body-sm text-viral-text-muted hover:text-viral-accent transition-colors duration-fast">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.nav initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
            <h3 className="font-display heading-sm text-viral-text mb-4">Tài nguyên</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="font-body body-sm text-viral-text-muted hover:text-viral-accent transition-colors duration-fast">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.nav initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <h3 className="font-display heading-sm text-viral-text mb-4">Công ty</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="font-body body-sm text-viral-text-muted hover:text-viral-accent transition-colors duration-fast">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>

        <div className="pt-8 border-t border-viral-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <motion.p className="font-body body-sm text-viral-text-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              © {new Date().getFullYear()} ViralMinds. Mọi quyền được bảo lưu.
            </motion.p>

            <motion.div className="flex items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-viral-bg-tertiary border border-viral-border flex items-center justify-center text-viral-text-muted hover:text-viral-accent hover:border-viral-accent/50 hover:bg-viral-accent/10 transition-all duration-fast"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </motion.div>

            <motion.a
              href="#overview"
              className="flex items-center gap-1 font-mono label-sm text-viral-text-muted hover:text-viral-accent transition-colors duration-fast"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span>Về đầu trang</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
