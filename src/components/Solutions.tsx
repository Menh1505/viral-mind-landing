import { motion } from "framer-motion";
import { Search, FileText, Globe, BarChart, Megaphone, Users, Target, Zap } from "lucide-react";

const solutions = [
  {
    number: "01",
    icon: Search,
    title: "Research & Strategy",
    desc: "Nghiên cứu thị trường, khách hàng, đối thủ và xu hướng để xác định cơ hội và xây dựng định hướng phù hợp với mục tiêu kinh doanh.",
    color: "viral-accent",
  },
  {
    number: "02",
    icon: FileText,
    title: "Content Creation",
    desc: "Hỗ trợ xây dựng bài viết, hình ảnh, video, kịch bản và nội dung đa nền tảng theo định hướng và nhận diện thương hiệu.",
    color: "viral-text",
  },
  {
    number: "03",
    icon: Globe,
    title: "Website & Landing Page",
    desc: "Nếu doanh nghiệp chưa có website, ViralMinds hỗ trợ xây dựng website hoặc landing page phù hợp với thương hiệu, sản phẩm và mục tiêu kinh doanh.",
    color: "viral-ok",
  },
  {
    number: "04",
    icon: Target,
    title: "SEO",
    desc: "Hỗ trợ tối ưu website, cấu trúc nội dung và hệ thống từ khóa để tăng khả năng xuất hiện trên các công cụ tìm kiếm và tiếp cận khách hàng tự nhiên.",
    color: "viral-accent",
  },
  {
    number: "05",
    icon: Zap,
    title: "AEO",
    desc: "Answer Engine Optimization — tối ưu thông tin và nội dung để thương hiệu dễ được các hệ thống AI và Answer Engine hiểu, lựa chọn và đề cập.",
    color: "viral-text",
  },
  {
    number: "06",
    icon: Megaphone,
    title: "Distribution",
    desc: "Lập kế hoạch, quản lý lịch và hỗ trợ phân phối nội dung trên các nền tảng phù hợp.",
    color: "viral-ok",
  },
  {
    number: "07",
    icon: BarChart,
    title: "Paid Ads",
    desc: "Hỗ trợ xây dựng kế hoạch quảng cáo, phân bổ ngân sách, phát triển creative và theo dõi hiệu quả chiến dịch.",
    color: "viral-accent",
  },
  {
    number: "08",
    icon: BarChart,
    title: "Analytics",
    desc: "Tổng hợp dữ liệu, theo dõi KPI và đưa ra đề xuất để cải thiện hiệu quả Marketing.",
    color: "viral-text",
  },
  {
    number: "09",
    icon: Users,
    title: "Community & CRM",
    desc: "Hỗ trợ quản lý tương tác, phản hồi khách hàng, thu thập dữ liệu và xây dựng quy trình chăm sóc khách hàng.",
    color: "viral-ok",
  },
];

export default function Solutions() {
  return (
    <section id="solutions" className="relative py-20 md:py-28 lg:py-32">
      <div className="absolute inset-0 grid-bg noise-bg opacity-50" aria-hidden="true" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <span className="section-label">Giải pháp</span>
          <h2 className="section-title">Từ xây dựng nền tảng đến vận hành và tối ưu Digital Marketing</h2>
          <p className="section-subtitle mt-4">
            ViralMinds hỗ trợ toàn bộ vòng đời Digital Marketing — từ research, content, website, SEO, AEO, distribution, ads, analytics đến CRM.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <motion.article
              key={solution.title}
              className="card card-hover group relative overflow-hidden"
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.5 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-viral-border group-hover:bg-viral-accent transition-colors duration-300" />
              
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-display text-heading-lg text-viral-text-subtle font-bold">{solution.number}</span>
                <div className="w-10 h-10 rounded-card-md bg-viral-accent/10 border border-viral-accent/20 flex items-center justify-center">
                  <solution.icon className="w-5 h-5 text-viral-accent" aria-hidden="true" />
                </div>
              </div>
              
              <h3 className="font-display heading-md text-viral-text mb-3">{solution.title}</h3>
              <p className="font-body body-md text-viral-text-muted">{solution.desc}</p>
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
          <a href="#contact" className="btn-primary inline-flex">
            <span>Chọn 1 việc muốn bỏ khỏi đầu</span>
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
