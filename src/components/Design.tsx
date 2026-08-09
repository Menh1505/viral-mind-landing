import { motion } from "framer-motion";
import { Palette, Users, Settings, Database, Shield, Sparkles } from "lucide-react";

const designPillars = [
  {
    icon: Palette,
    title: "Thương hiệu",
    desc: "Giọng điệu, hình ảnh, thông điệp và nguyên tắc thương hiệu.",
  },
  {
    icon: Users,
    title: "Sản phẩm & khách hàng",
    desc: "Sản phẩm, dịch vụ, nhóm khách hàng và thị trường mục tiêu.",
  },
  {
    icon: Settings,
    title: "Quy trình vận hành",
    desc: "Cách doanh nghiệp đang triển khai Marketing và bán hàng.",
  },
  {
    icon: Database,
    title: "Dữ liệu doanh nghiệp",
    desc: "Tài liệu, nội dung, dữ liệu và những thông tin cần thiết cho quá trình vận hành.",
  },
];

const benefits = [
  { icon: Shield, title: "Bảo mật dữ liệu", desc: "Dữ liệu chỉ phục vụ AI Workforce của bạn, phân quyền theo phạm vi truy cập thống nhất." },
  { icon: Sparkles, title: "Học liên tục", desc: "Hệ thống học từ lịch sử cái gì ra đơn, giọng điệu, hiệu quả để ngày càng chính xác hơn." },
  { icon: Settings, title: "Mở rộng linh hoạt", desc: "Thêm Specialist mới, điều chỉnh quy trình khi nhu cầu kinh doanh thay đổi." },
];

export default function Design() {
  return (
    <section id="design" className="relative py-20 md:py-28 lg:py-32">
      <div className="absolute inset-0 grid-bg noise-bg opacity-50" aria-hidden="true" />
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-viral-accent/5 via-transparent to-transparent" aria-hidden="true" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <span className="section-label">Thiết kế Workforce</span>
          <h2 className="section-title">Mỗi doanh nghiệp có một AI Workforce khác nhau</h2>
          <p className="section-subtitle mt-4">
            Không có một quy trình Digital Marketing phù hợp cho tất cả doanh nghiệp. ViralMinds được thiết kế dựa trên 4 trụ cột cốt lõi:
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 md:mb-20">
          {designPillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              className="card card-hover text-center p-6"
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <div className="w-14 h-14 rounded-card-md bg-viral-bg-tertiary flex items-center justify-center mx-auto mb-4 group-hover:bg-viral-accent/20 transition-colors">
                <pillar.icon className="w-7 h-7 text-viral-accent" aria-hidden="true" />
              </div>
              <h3 className="font-display heading-md text-viral-text mb-2">{pillar.title}</h3>
              <p className="font-body body-sm text-viral-text-muted">{pillar.desc}</p>
            </motion.article>
          ))}
        </div>

        <div className="glass-panel rounded-card-xl p-6 md:p-8">
          <div className="text-center mb-8">
            <h3 className="font-display heading-lg text-viral-text">Từ đó, ViralMinds xây dựng một AI Workforce phù hợp với chính doanh nghiệp của bạn.</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="text-center p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
              >
                <div className="w-12 h-12 rounded-card-md bg-viral-bg-tertiary flex items-center justify-center mx-auto mb-3">
                  <benefit.icon className="w-6 h-6 text-viral-accent" aria-hidden="true" />
                </div>
                <h4 className="font-display heading-sm text-viral-text mb-2">{benefit.title}</h4>
                <p className="font-body body-sm text-viral-text-muted">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}