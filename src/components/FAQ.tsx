import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Tôi có cần cài đặt gì không?",
    a: "Không. Đội ngũ ViralMinds sẽ hỗ trợ thiết lập hệ thống và cấu hình quy trình phù hợp với doanh nghiệp.",
  },
  {
    q: "Tôi cần cung cấp những gì?",
    a: "Thông tin về thương hiệu, sản phẩm, khách hàng, quy trình Marketing hiện tại và những dữ liệu cần thiết cho quá trình triển khai.",
  },
  {
    q: "Thời gian tư vấn/demo ban đầu bao lâu và mục tiêu của buổi này là gì?",
    a: "Buổi tư vấn/demo thường kéo dài khoảng 20–30 phút. Mục tiêu là tìm hiểu nhu cầu, quy trình Digital Marketing hiện tại, những vấn đề doanh nghiệp đang gặp phải và định hướng muốn cải thiện trong tương lai. Đồng thời, đội ngũ ViralMinds sẽ trực tiếp giới thiệu cách hệ thống hoạt động và giải đáp các thắc mắc.",
  },
  {
    q: "Sau buổi tư vấn/demo thì bước tiếp theo là gì?",
    a: "Sau buổi tư vấn, ViralMinds sẽ gửi doanh nghiệp đề xuất triển khai dựa trên nhu cầu thực tế, bao gồm phạm vi công việc, phương án vận hành và timeline dự kiến. Nếu hai bên thống nhất, ViralMinds sẽ tiến hành ký kết và thống nhất thời gian Setup.",
  },
  {
    q: "Mất bao lâu để triển khai?",
    a: "Thời gian triển khai phụ thuộc vào phạm vi và mức độ tùy chỉnh của AI Workforce. Sau buổi tư vấn, ViralMinds sẽ đề xuất timeline cụ thể dựa trên nhu cầu của doanh nghiệp.",
  },
  {
    q: "Tôi có thể kiểm soát nội dung trước khi đăng không?",
    a: "Có. Doanh nghiệp có thể xem xét, chỉnh sửa và phê duyệt trước các bước quan trọng theo cấu hình triển khai.",
  },
  {
    q: "Chi phí AI có nằm trong phí Setup không?",
    a: "Không. Chi phí sử dụng các mô hình AI được tách riêng và doanh nghiệp thanh toán theo mức sử dụng thực tế.",
  },
  {
    q: "Nếu doanh nghiệp chưa có website thì sao?",
    a: "ViralMinds có thể hỗ trợ xây dựng website hoặc landing page phù hợp với thương hiệu và mục tiêu kinh doanh, đồng thời có thể tiếp tục tối ưu nền tảng này cho SEO và AEO.",
  },
  {
    q: "SEO và AEO là gì? ViralMinds có hỗ trợ không?",
    a: "SEO (Search Engine Optimization) là quá trình tối ưu website và nội dung để tăng khả năng xuất hiện trên các công cụ tìm kiếm. AEO (Answer Engine Optimization) tập trung vào việc tối ưu thông tin và nội dung để các hệ thống AI và Answer Engine có thể hiểu, lựa chọn và đề cập đến thương hiệu khi trả lời câu hỏi của người dùng. ViralMinds có thể hỗ trợ doanh nghiệp ở cả hai hướng.",
  },
  {
    q: "Dữ liệu của doanh nghiệp được xử lý như thế nào?",
    a: "Dữ liệu được sử dụng phục vụ quá trình vận hành AI Workforce của doanh nghiệp và được phân quyền theo phạm vi truy cập được thống nhất trong quá trình triển khai.",
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <motion.div
      className="card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-viral-accent focus-visible:ring-offset-2 focus-visible:ring-offset-viral-bg-secondary rounded-card-md"
        aria-expanded={isOpen}
      >
        <HelpCircle className="w-5 h-5 text-viral-accent flex-shrink-0" aria-hidden="true" />
        <span className="font-display heading-sm text-viral-text flex-1 text-left pr-4">{faq.q}</span>
        <ChevronDown
          className={`w-5 h-5 text-viral-text-muted flex-shrink-0 transition-transform duration-fast ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0, paddingTop: isOpen ? '0.5rem' : 0, paddingBottom: isOpen ? '1.5rem' : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden px-4"
      >
        <p className="font-body body-md text-viral-text-muted border-t border-viral-border pt-4">{faq.a}</p>
      </motion.div>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative py-20 md:py-28 lg:py-32 bg-viral-bg-secondary">
      <div className="absolute inset-0 grid-bg noise-bg opacity-50" aria-hidden="true" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <span className="section-label">FAQ</span>
          <h2 className="section-title">Câu hỏi thường gặp</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={faq.q} faq={faq} index={index} />
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-body body-lg text-viral-text-muted mb-6 max-w-xl mx-auto">
            Chưa tìm thấy câu trả lời? Liên hệ trực tiếp với chúng tôi để được hỗ trợ chi tiết.
          </p>
          <a href="https://zalo.me/0374149427" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex items-center gap-2">
            <HelpCircle className="w-5 h-5" aria-hidden="true" />
            <span>Liên hệ Zalo</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}