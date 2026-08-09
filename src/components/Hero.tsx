import { motion, type Variants } from "framer-motion";
import { ArrowRight, Play, CheckCircle, Zap, Search, FileText, BarChart3, Users } from "lucide-react";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
    },
  };

  return (
    <section id="overview" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      <div className="absolute inset-0 grid-bg noise-bg" aria-hidden="true" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-viral-bg/40 via-viral-bg/80 to-viral-bg-secondary" aria-hidden="true" />
      <div className="absolute inset-0 aurora-bg" aria-hidden="true" />
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-viral-accent/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-viral-ok/10 rounded-full blur-3xl" aria-hidden="true" />

      <motion.div 
        className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 py-16 md:py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div variants={itemVariants} className="mb-6">
            <span className="section-label">AI Workforce cho Digital Marketing</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="font-display text-display-xl text-viral-text mb-6 max-w-5xl mx-auto">
            Biến mục tiêu tăng trưởng thành <span className="text-gradient-accent">một hệ thống marketing vận hành.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="font-body text-body-lg text-viral-text-muted max-w-3xl mx-auto mb-10 leading-relaxed">
            ViralMinds phối hợp các AI Specialist từ research, content, website, SEO, ads đến CRM — trong một quy trình thống nhất, có con người kiểm soát.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#contact" className="btn-primary w-full sm:w-auto group">
              <span>Đăng ký tư vấn / Demo</span>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </motion.div>
            </a>
            <a href="#demo" className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2 group">
              <Play className="w-5 h-5" aria-hidden="true" />
              <span>Xem ViralMinds hoạt động</span>
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-6 text-viral-text-muted font-body body-sm">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-viral-ok" aria-hidden="true" />
              Doanh nghiệp luôn kiểm soát
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-viral-ok" aria-hidden="true" />
              Phê duyệt trước khi xuất bản
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-viral-ok" aria-hidden="true" />
              Không cần cài đặt, không cần học
            </span>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mt-20 relative" style={{ perspective: "1000px" }}>
          <div className="relative max-w-5xl mx-auto">
            <div className="glass-panel rounded-card-xl p-5 md:p-8 overflow-hidden border-white/20">
              <div className="absolute inset-x-12 -top-px optical-line opacity-80" aria-hidden="true" />
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-viral-alert" aria-hidden="true" />
                  <div className="w-3 h-3 rounded-full bg-viral-accent" aria-hidden="true" />
                  <div className="w-3 h-3 rounded-full bg-viral-ok" aria-hidden="true" />
                </div>
                <div className="font-mono label-sm text-viral-text-muted px-3 py-1 bg-viral-bg/50 rounded-card-sm">
                  workflow.pipeline.viralminds
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: "MỤC TIÊU", desc: "Ra mắt sản phẩm mới trong tháng này", icon: Zap },
                  { label: "RESEARCH", desc: "Phân tích thị trường, khách hàng, đối thủ", icon: Search },
                  { label: "CONTENT", desc: "Thông điệp, bài viết và tài sản đa kênh", icon: FileText },
                  { label: "GROWTH", desc: "SEO, Ads, phân phối và tối ưu chuyển đổi", icon: BarChart3 },
                  { label: "CRM", desc: "Theo dõi lead và chăm sóc khách hàng", icon: Users },
                ].map((step) => (
                  <motion.div
                    key={step.label}
                    className="flex items-center gap-4 p-3 rounded-card-md bg-viral-bg/50 border border-viral-border/50 group"
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-10 h-10 rounded-card-sm bg-gradient-to-br from-viral-accent/25 to-purple-500/10 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-5 h-5 text-viral-accent" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-mono label-sm text-viral-accent">{step.label}</div>
                      <div className="font-body body-sm text-viral-text-muted truncate">{step.desc}</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-viral-text-subtle group-hover:text-viral-accent transition-colors" />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 w-24 h-24 md:w-32 md:h-32 bg-viral-accent/20 rounded-full blur-2xl" aria-hidden="true" />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-viral-text-subtle font-body body-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="font-mono label-sm">Cuộn để khám phá</span>
        <motion.div
          className="w-1 h-6 bg-viral-border relative overflow-hidden"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-1/3 bg-viral-accent"
            animate={{ y: [0, 18] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
