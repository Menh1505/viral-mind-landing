import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

type ComparisonStatus = boolean | "limited";

interface ComparisonRow {
  feature: string;
  tools: ComparisonStatus;
  freelancer: ComparisonStatus;
  viralminds: true;
  highlight?: boolean;
}

const comparisonData: ComparisonRow[] = [
  { feature: "Hỗ trợ từng tác vụ", tools: true, freelancer: true, viralminds: true },
  { feature: "Kết nối nhiều công đoạn", tools: false, freelancer: true, viralminds: true },
  { feature: "AI chuyên môn hóa", tools: true, freelancer: false, viralminds: true },
  { feature: "Tùy chỉnh theo doanh nghiệp", tools: "limited", freelancer: true, viralminds: true },
  { feature: "Phối hợp nhiều AI trong một quy trình", tools: false, freelancer: false, viralminds: true },
  { feature: "Tiết kiệm thời gian vận hành", tools: true, freelancer: false, viralminds: true, highlight: true },
  { feature: "Giảm nhu cầu nhân sự cho tác vụ lặp lại", tools: "limited", freelancer: false, viralminds: true, highlight: true },
  { feature: "Tối ưu chi phí vận hành Marketing", tools: "limited", freelancer: false, viralminds: true, highlight: true },
  { feature: "Chuẩn bị cho AI Search / AEO", tools: false, freelancer: "limited", viralminds: true, highlight: true },
];

const values = [
  { title: "Tiết kiệm chi phí", desc: "Giảm sự phụ thuộc vào nhiều công cụ và nguồn lực cho các tác vụ Marketing lặp lại, giúp doanh nghiệp tối ưu chi phí vận hành." },
  { title: "Tiết kiệm nhân sự", desc: "AI đảm nhận và phối hợp nhiều công việc chuyên môn, giúp đội ngũ hiện tại tập trung vào những công việc cần tư duy, sáng tạo và ra quyết định." },
  { title: "Tiết kiệm thời gian", desc: "Tự động hóa và kết nối các bước trong quy trình giúp giảm thời gian xử lý thủ công và chuyển đổi giữa nhiều công cụ." },
  { title: "Sẵn sàng cho tương lai", desc: "Không chỉ hỗ trợ SEO và Digital Marketing hiện tại, ViralMinds còn giúp doanh nghiệp chuẩn bị cho sự phát triển của AI Search và AEO." },
];

function ComparisonIcon({ status }: { status: ComparisonStatus }) {
  if (status === true) return <Check className="w-5 h-5 text-viral-ok" aria-hidden="true" />;
  if (status === "limited") return <Minus className="w-5 h-5 text-viral-text-subtle" aria-hidden="true" />;
  return <X className="w-5 h-5 text-viral-alert" aria-hidden="true" />;
}

export default function Compare() {
  return (
    <section id="compare" className="relative py-20 md:py-28 lg:py-32 bg-viral-bg-secondary">
      <div className="absolute inset-0 grid-bg noise-bg opacity-50" aria-hidden="true" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <span className="section-label">So sánh</span>
          <h2 className="section-title">ViralMinds khác gì?</h2>
          <p className="section-subtitle mt-4">
            Không chỉ thêm một công cụ AI vào quy trình hiện tại. ViralMinds tập trung vào việc tối ưu toàn bộ cách doanh nghiệp vận hành Digital Marketing.
          </p>
        </div>

        <div className="overflow-x-auto mb-16 md:mb-20">
          <table className="w-full min-w-[700px] text-left" role="table">
            <thead>
              <tr className="border-b border-viral-border">
                <th className="font-mono label-md text-viral-text-muted pb-4 pr-6">Tiêu chí</th>
                <th className="font-mono label-md text-viral-text-muted pb-4 pr-6 text-center">Công cụ AI</th>
                <th className="font-mono label-md text-viral-text-muted pb-4 pr-6 text-center">Freelancer / Agency</th>
                <th className="font-mono label-md text-viral-accent pb-4 text-center">ViralMinds</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <motion.tr
                  key={row.feature}
                  className={`border-b border-viral-border/50 ${row.highlight ? 'bg-viral-accent/5' : ''}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.4 }}
                >
                  <td className={`font-body body-md ${row.highlight ? 'text-viral-text font-medium' : 'text-viral-text-muted'} py-4 pr-6`}>
                    {row.feature}
                  </td>
                  <td className="py-4 pr-6 text-center">
                    <ComparisonIcon status={row.tools} />
                  </td>
                  <td className="py-4 pr-6 text-center">
                    <ComparisonIcon status={row.freelancer} />
                  </td>
                  <td className="py-4 text-center">
                    <ComparisonIcon status={row.viralminds} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.article
              key={value.title}
              className="card card-hover p-6"
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <h3 className="font-display heading-md text-viral-text mb-3">{value.title}</h3>
              <p className="font-body body-sm text-viral-text-muted">{value.desc}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mt-16 p-6 md:p-8 glass-panel rounded-card-xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-body body-lg text-viral-text-muted max-w-2xl mx-auto italic">
            "<strong className="text-viral-text not-italic">ViralMinds không thay thế hoàn toàn đội ngũ Marketing.</strong> ViralMinds giúp một đội ngũ hiện tại làm được nhiều hơn với cùng nguồn lực."
          </p>
        </motion.div>
      </div>
    </section>
  );
}