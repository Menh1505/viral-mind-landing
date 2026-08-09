import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, ArrowLeft, CheckCircle } from "lucide-react";

export default function Thanks() {
  return (
    <div className="min-h-screen bg-viral-bg text-viral-text font-body flex items-center justify-center px-4">
      <div className="absolute inset-0 grid-bg noise-bg opacity-50" aria-hidden="true" />
      
      <motion.div
        className="relative z-10 max-w-md w-full text-center glass-panel rounded-card-xl p-8 md:p-12"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="w-16 h-16 rounded-full bg-viral-ok/20 flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
        >
          <CheckCircle className="w-8 h-8 text-viral-ok" aria-hidden="true" />
        </motion.div>

        <motion.h1
          className="font-display text-display-sm text-viral-text mb-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Cảm ơn bạn đã đăng ký!
        </motion.h1>

        <motion.p
          className="font-body body-lg text-viral-text-muted mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Chúng tôi đã nhận thông tin và sẽ liên hệ lại trong vòng 24h để sắp xếp buổi tư vấn/demo phù hợp với doanh nghiệp của bạn.
        </motion.p>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            to="/"
            className="btn-primary w-full inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            <span>Quay lại trang chủ</span>
          </Link>
          <a
            href="https://zalo.me/0374149427"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full inline-flex items-center justify-center gap-2"
          >
            <Target className="w-5 h-5" aria-hidden="true" />
            <span>Liên hệ ngay qua Zalo</span>
          </a>
        </motion.div>

        <motion.p
          className="mt-8 font-body body-sm text-viral-text-subtle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          ViralMinds — AI Workforce cho Digital Marketing
        </motion.p>
      </motion.div>
    </div>
  );
}