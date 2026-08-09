import { motion } from "framer-motion";
import { ArrowDown, CheckCircle, Target, Zap, FileText, Globe, Search, BarChart, Users, Megaphone } from "lucide-react";

const pipelineSteps = [
  { label: "MỤC TIÊU", desc: '"Tôi muốn ra mắt một sản phẩm mới trong tháng này."', icon: Target, color: "viral-accent" },
  { label: "RESEARCH", desc: "Phân tích thị trường, khách hàng và đối thủ.", icon: Search, color: "viral-text-muted" },
  { label: "STRATEGY", desc: "Xác định thông điệp và kế hoạch triển khai.", icon: Zap, color: "viral-text-muted" },
  { label: "WEBSITE", desc: "Xây dựng hoặc tối ưu landing page cho sản phẩm.", icon: Globe, color: "viral-text-muted" },
  { label: "CONTENT", desc: "Xây dựng bài viết, hình ảnh và video.", icon: FileText, color: "viral-text-muted" },
  { label: "SEO & AEO", desc: "Tối ưu nội dung cho Search Engine và Answer Engine.", icon: Zap, color: "viral-text-muted" },
  { label: "DISTRIBUTION", desc: "Lập lịch và phân phối nội dung trên các nền tảng.", icon: Megaphone, color: "viral-text-muted" },
  { label: "ADS", desc: "Đề xuất phương án quảng cáo và phân bổ ngân sách.", icon: BarChart, color: "viral-text-muted" },
  { label: "ANALYTICS", desc: "Theo dõi KPI và đánh giá hiệu quả.", icon: BarChart, color: "viral-text-muted" },
  { label: "CRM", desc: "Hỗ trợ quản lý và chăm sóc khách hàng.", icon: Users, color: "viral-text-muted" },
];

export default function Demo() {
  return (
    <section id="demo" className="relative py-20 md:py-28 lg:py-32 bg-viral-bg-secondary">
      <div className="absolute inset-0 grid-bg noise-bg opacity-50" aria-hidden="true" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <span className="section-label">Demo thực tế</span>
          <h2 className="section-title">Bạn đưa ra một mục tiêu. ViralMinds hỗ trợ xây dựng toàn bộ quy trình phía sau.</h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="glass-panel rounded-card-xl p-6 md:p-8 overflow-hidden">
            <div className="flex items-center gap-2 mb-8">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-viral-alert" aria-hidden="true" />
                <div className="w-3 h-3 rounded-full bg-viral-accent" aria-hidden="true" />
                <div className="w-3 h-3 rounded-full bg-viral-ok" aria-hidden="true" />
              </div>
              <div className="font-mono label-sm text-viral-text-muted px-3 py-1 bg-viral-bg/50 rounded-card-sm">
                demo.pipeline.launch-product
              </div>
            </div>

            <div className="space-y-3">
              {pipelineSteps.map((step, index) => (
                <motion.div
                  key={step.label}
                  className="flex items-start gap-4 p-4 rounded-card-md bg-viral-bg/50 border border-viral-border/50 group relative overflow-hidden"
                  whileHover={{ x: 8 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-card-sm bg-viral-accent/10 border border-viral-accent/20 flex items-center justify-center relative">
                    <step.icon className="w-5 h-5" style={{ color: `var(--tw-text-opacity)` }} aria-hidden="true" />
                    {index > 0 && (
                      <div className="absolute -left-2 -top-2 w-6 h-6" aria-hidden="true">
                        <ArrowDown className="w-6 h-6 text-viral-border" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono label-sm text-viral-accent mb-1">{step.label}</div>
                    <div className="font-body body-sm text-viral-text-muted">{step.desc}</div>
                  </div>
                  {index === pipelineSteps.length - 1 && (
                    <div className="flex-shrink-0 flex items-center gap-2 text-viral-ok font-body body-sm">
                      <CheckCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Hoàn tất</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8 p-4 rounded-card-md bg-viral-accent/10 border border-viral-accent/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="font-display heading-sm text-viral-accent mb-2">Kết quả</div>
              <p className="font-body body-md text-viral-text-muted">
                Các hoạt động không còn được thực hiện như những tác vụ riêng lẻ mà được kết nối thành một quy trình thống nhất.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <a href="#contact" className="btn-primary inline-flex">
            <span>Xem Demo chi tiết</span>
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
