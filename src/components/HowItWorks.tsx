import { motion } from "framer-motion";
import { Building2, Target, Cpu, UserCheck, BarChart2, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Building2,
    title: "Hiểu doanh nghiệp",
    desc: "ViralMinds tiếp nhận thông tin về sản phẩm, thương hiệu, khách hàng, mục tiêu, dữ liệu và quy trình Marketing hiện tại.",
  },
  {
    number: "02",
    icon: Target,
    title: "Xác định công việc",
    desc: "Từ mục tiêu được giao, hệ thống xác định những công việc và chuyên môn cần tham gia.",
  },
  {
    number: "03",
    icon: Cpu,
    title: "Phối hợp các AI Specialist",
    desc: "Các AI chuyên môn thực hiện từng phần công việc và sử dụng kết quả từ những bước trước để tiếp tục xử lý.",
  },
  {
    number: "04",
    icon: UserCheck,
    title: "Doanh nghiệp kiểm soát",
    desc: "Doanh nghiệp có thể xem xét, điều chỉnh và phê duyệt trước những bước quan trọng như xuất bản nội dung hoặc triển khai quảng cáo.",
  },
  {
    number: "05",
    icon: BarChart2,
    title: "Đo lường & tối ưu",
    desc: "Dữ liệu từ quá trình vận hành được tổng hợp để đánh giá hiệu quả và hỗ trợ đưa ra quyết định cho các hoạt động tiếp theo.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 md:py-28 lg:py-32">
      <div className="absolute inset-0 grid-bg noise-bg opacity-50" aria-hidden="true" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <span className="section-label">Cách hoạt động</span>
          <h2 className="section-title">Từ mục tiêu kinh doanh đến một quy trình Marketing có thể vận hành</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-viral-border -translate-x-1/2" aria-hidden="true" />
          
          <div className="space-y-12 md:space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="relative flex lg:items-start gap-6 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-full border-2 border-viral-border flex items-center justify-center bg-viral-bg-secondary relative z-10 group-hover:border-viral-accent group-hover:bg-viral-accent/10 transition-all duration-300">
                  <span className="font-display text-heading-lg text-viral-accent font-bold">{step.number}</span>
                  <div className="absolute -inset-1 rounded-full border-2 border-viral-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                </div>
                
                <div className="flex-1 lg:w-1/2">
                  {index % 2 === 0 ? (
                    <div className="lg:text-right lg:pr-8 mb-4 lg:mb-0">
                      <h3 className="font-display heading-lg text-viral-text mb-2">{step.title}</h3>
                      <p className="font-body body-lg text-viral-text-muted">{step.desc}</p>
                    </div>
                  ) : (
                    <div className="lg:pl-8 mb-4 lg:mb-0">
                      <h3 className="font-display heading-lg text-viral-text mb-2">{step.title}</h3>
                      <p className="font-body body-lg text-viral-text-muted">{step.desc}</p>
                    </div>
                  )}
                </div>

                <div className="flex-1 lg:w-1/2 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-viral-accent/10 flex items-center justify-center group-hover:bg-viral-accent/20 transition-colors">
                    <ArrowRight className="w-5 h-5 text-viral-accent" aria-hidden="true" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-body body-lg text-viral-text-muted mb-6 max-w-2xl mx-auto">
            <strong className="text-viral-text">Con người vẫn kiểm soát.</strong> Chưa duyệt thì chưa đăng. Chưa duyệt thì chưa chi ads.
          </p>
          <a href="#contact" className="btn-primary inline-flex">
            <span>Đặt lịch demo 20 phút</span>
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}