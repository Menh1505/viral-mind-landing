import { motion } from "framer-motion";
import { CreditCard, Cpu, Clock, CheckCircle } from "lucide-react";

const pricingItems = [
  {
    title: "Phí Consulting & Setup",
    desc: "Chi phí cho quá trình tư vấn, thiết kế AI Workforce, cấu hình hệ thống, kết nối dữ liệu, kiểm thử và chuyển giao.",
    icon: CreditCard,
    features: [
      "Tư vấn chiến lược Digital Marketing",
      "Thiết kế AI Workforce tùy chỉnh",
      "Cấu hình Specialist & quy trình",
      "Kết nối dữ liệu & kiểm thử",
      "Chuyển giao & đào tạo team",
    ],
  },
  {
    title: "Chi phí sử dụng AI",
    desc: "Chi phí sử dụng các mô hình AI được tách riêng và do doanh nghiệp chủ động thanh toán theo nhu cầu thực tế.",
    icon: Cpu,
    features: [
      "Doanh nghiệp tự chọn mô hình AI",
      "Thanh toán theo mức sử dụng thực tế",
      "Không bị gói cước cố định",
      "Linh hoạt tăng/giảm theo nhu cầu",
      "Minh bạch 100% chi phí token",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-20 md:py-28 lg:py-32">
      <div className="absolute inset-0 grid-bg noise-bg opacity-50" aria-hidden="true" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <span className="section-label">Chi phí</span>
          <h2 className="section-title">Minh bạch và linh hoạt theo nhu cầu sử dụng</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16 md:mb-20 max-w-5xl mx-auto">
          {pricingItems.map((item, index) => (
            <motion.article
              key={item.title}
              className="card card-hover p-8 h-full"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-card-md bg-viral-bg-tertiary flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-viral-accent" aria-hidden="true" />
                </div>
                <h3 className="font-display heading-lg text-viral-text">{item.title}</h3>
              </div>
              <p className="font-body body-md text-viral-text-muted mb-6">{item.desc}</p>
              <ul className="space-y-3" role="list">
                {item.features.map((feature, fIndex) => (
                  <motion.li
                    key={feature}
                    className="flex items-start gap-3 font-body body-sm text-viral-text-muted"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + fIndex * 0.05, duration: 0.3 }}
                  >
                    <CheckCircle className="w-5 h-5 text-viral-ok flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="glass-panel rounded-card-xl p-6 md:p-8 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-6 h-6 text-viral-accent" aria-hidden="true" />
            <span className="font-display heading-md text-viral-text">ViralMinds tập trung vào giá trị cốt lõi</span>
          </div>
          <p className="font-body body-lg text-viral-text-muted mb-6">
            Thiết kế, triển khai và tối ưu AI Workforce cho doanh nghiệp. Chi phí AI tách biệt, bạn chủ động kiểm soát.
          </p>
          <a href="#contact" className="btn-primary inline-flex">
            <span>Đăng ký tư vấn để nhận đề xuất triển khai</span>
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}