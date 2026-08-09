import { motion } from "framer-motion";
import { AlertCircle, Clock, Puzzle, Users, Target } from "lucide-react";

const problems = [
  {
    icon: Puzzle,
    title: "Công cụ rời rạc",
    desc: "Research xong chuyển sang Content. Content xong lên lịch đăng. Website, SEO, Ads ở hệ thống khác. Dữ liệu khách ở nơi khác.",
    pain: "Không có quy trình thống nhất",
  },
  {
    icon: Users,
    title: "Thiếu người điều phối",
    desc: "Cuối cùng doanh nghiệp vẫn cần con người đứng giữa để kết nối và điều phối toàn bộ quy trình marketing.",
    pain: "Phụ thuộc vào nhân sự vận hành",
  },
  {
    icon: Clock,
    title: "Mất thời gian chuyển đổi",
    desc: "Chuyển đổi giữa nhiều công cụ, copy-paste dữ liệu, theo dõi thủ công khiến team mất focus vào việc sáng tạo và quyết định.",
    pain: "Hiệu suất thấp, chi phí cao",
  },
  {
    icon: Target,
    title: "Khó đo lường thực tế",
    desc: "Dữ liệu phân tán trên nhiều nền tảng khiến việc theo dõi KPI, phân tích ROI và ra quyết định dựa trên dữ liệu trở nên khó khăn.",
    pain: "Quyết định dựa trên cảm tính",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="relative py-20 md:py-28 lg:py-32">
      <div className="absolute inset-0 grid-bg noise-bg opacity-50" aria-hidden="true" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <span className="section-label">Vấn đề cốt lõi</span>
          <h2 className="section-title">Doanh nghiệp không thiếu AI. Vấn đề là những AI đó chưa làm việc cùng nhau.</h2>
          <p className="section-subtitle mt-4">
            Ngày nay, doanh nghiệp có thể sử dụng rất nhiều công cụ AI để viết nội dung, tạo hình ảnh, làm video, phân tích dữ liệu, quản lý quảng cáo hay chăm sóc khách hàng. Nhưng mỗi công cụ thường chỉ giải quyết một phần công việc.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.article
              key={problem.title}
              className="card card-hover group"
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-card-md bg-viral-bg-tertiary flex items-center justify-center mb-4 group-hover:bg-viral-accent/20 transition-colors">
                <problem.icon className="w-6 h-6 text-viral-accent" aria-hidden="true" />
              </div>
              <h3 className="font-display heading-md text-viral-text mb-2">{problem.title}</h3>
              <p className="font-body body-md text-viral-text-muted mb-4">{problem.desc}</p>
              <div className="flex items-center gap-2 font-mono label-sm text-viral-alert">
                <AlertCircle className="w-4 h-4" aria-hidden="true" />
                <span>{problem.pain}</span>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-body text-body-lg text-viral-text-muted max-w-2xl mx-auto">
            <strong className="text-viral-text">ViralMinds được xây dựng để giải quyết chính khoảng trống đó.</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
