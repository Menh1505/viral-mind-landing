import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BarChart3, Check, CheckCircle2, CircleCheck, FileText, Globe2, Layers3, Megaphone, Search, Sparkles, Target, Users, X } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import GrowthLens from "@/components/GrowthLens";

const capabilities = [
  {
    slug: "research-strategy", title: "Research & Strategy", icon: Search, position: "cap-research",
    problems: ["Chưa hiểu rõ khách hàng.", "Thiếu dữ liệu để ra quyết định.", "Marketing chưa có định hướng thống nhất."],
    actions: ["Nghiên cứu thị trường và đối thủ.", "Phân tích khách hàng mục tiêu.", "Xác định thông điệp và hướng triển khai."],
  },
  {
    slug: "content", title: "Content", icon: FileText, position: "cap-content",
    problems: ["Khó duy trì nội dung đều đặn.", "Nội dung giữa các kênh thiếu nhất quán.", "Mất nhiều thời gian lên ý tưởng và sản xuất."],
    actions: ["Xây dựng kế hoạch nội dung.", "Hỗ trợ sản xuất nội dung đa kênh.", "Điều phối lịch đăng và phân phối nội dung."],
  },
  {
    slug: "website-conversion", title: "Website, SEO & AEO", icon: Globe2, position: "cap-website",
    problems: ["Website chưa hỗ trợ tốt cho chuyển đổi.", "Khách hàng khó tìm thấy doanh nghiệp.", "Nội dung chưa xuất hiện tốt trên Google và công cụ AI."],
    actions: ["Xây dựng và tối ưu website.", "Nghiên cứu từ khóa và cấu trúc nội dung.", "Tối ưu SEO và khả năng xuất hiện trong câu trả lời AI."],
  },
  {
    slug: "ads", title: "Ads", icon: Megaphone, position: "cap-ads",
    problems: ["Chi phí quảng cáo tăng nhưng hiệu quả không ổn định.", "Khó xác định mẫu quảng cáo và nhóm khách hàng hiệu quả.", "Theo dõi, thử nghiệm và tối ưu mất nhiều thời gian."],
    actions: ["Nghiên cứu đối tượng và xây dựng hướng quảng cáo.", "Hỗ trợ tạo nội dung và biến thể quảng cáo.", "Theo dõi kết quả, phát hiện bất thường và đề xuất tối ưu."],
  },
  {
    slug: "growth-analytics", title: "Growth & Analytics", icon: BarChart3, position: "cap-growth",
    problems: ["Không biết hoạt động nào thực sự tạo kết quả.", "Có nhiều dữ liệu nhưng chưa biết cách sử dụng.", "Các quyết định tối ưu chủ yếu dựa vào cảm tính."],
    actions: ["Tổng hợp và phân tích dữ liệu Marketing.", "Theo dõi hiệu quả theo kênh và hành trình khách hàng.", "Phát hiện điểm nghẽn và đề xuất thử nghiệm tăng trưởng."],
  },
  {
    slug: "crm", title: "CRM", icon: Users, position: "cap-crm",
    problems: ["Dữ liệu khách hàng nằm rải rác.", "Khách hàng tiềm năng chưa được phân loại.", "Việc chăm sóc chưa diễn ra đúng thời điểm."],
    actions: ["Tổng hợp và chuẩn hóa dữ liệu khách hàng.", "Phân loại khách hàng tiềm năng.", "Hỗ trợ tự động hóa quy trình chăm sóc và bán hàng."],
  },
];

const steps = ["Hiểu doanh nghiệp", "Thiết kế AI Workforce", "Cấu hình & kiểm thử", "Vận hành & tối ưu"];
const values = [
  ["Tiết kiệm thời gian", "Giảm chuyển đổi công cụ và công việc thủ công."],
  ["Tối ưu nguồn lực", "Để đội ngũ tập trung vào sáng tạo và quyết định."],
  ["Vận hành nhất quán", "Cùng dữ liệu, thông điệp và nguyên tắc thương hiệu."],
  ["Mở rộng linh hoạt", "Điều chỉnh quy trình khi doanh nghiệp phát triển."],
];

export default function Home() {
  const [active, setActive] = useState<number | null>(null);
  const selected = active === null ? null : capabilities[active];

  useEffect(() => {
    if (active === null) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setActive(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [active]);

  return <div className="min-h-screen bg-viral-bg text-viral-text font-body">
    <Header />
    <main id="main-content">
      <section id="overview" className="relative min-h-[90vh] overflow-hidden pt-28 pb-20 flex items-center">
        {/* Velvety ambient glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[350px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" aria-hidden="true" />
        
        <div className="container relative z-10 grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-14 items-center">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
            <span className="section-label">
              <Sparkles className="w-3.5 h-3.5 mr-2 text-amber-300" />
              HỆ THỐNG ĐỘI NGŨ AI TINH GỌN CHO CHIẾN LƯỢC DIGITAL MARKETING
            </span>
            <h1 className="font-display text-display-xl mt-5 mb-6 text-white leading-[1.08] tracking-tight">
              KIẾN TẠO TĂNG TRƯỞNG VƯỢT BẬC <span className="text-gradient-accent">VỚI SỨC MẠNH AI CHUYÊN BIỆT.</span>
            </h1>
            <p className="text-body-lg text-purple-100/80 max-w-xl mb-8 font-light text-lg">
              ViralMinds - Tinh gọn nhân sự, tối ưu thời gian, nhân đôi hiệu quả.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href="#capabilities" className="btn-primary group">
                Khám phá đội ngũ AI <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="btn-secondary">
                Đặt lịch tư vấn
              </a>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-body-sm text-purple-200/70">
              {["Tập trung vào chuyển hóa & ROI", "Duyệt trước khi xuất bản", "May đo theo doanh nghiệp"].map(x => (
                <span key={x} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  {x}
                </span>
              ))}
            </div>
          </motion.div>
          
          {/* Sophisticated Growth Lens Visual with Particle Morphing */}
          <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .25, duration: .9 }} className="relative w-full">
            <GrowthLens />
          </motion.div>
        </div>
      </section>

      <section id="capabilities" className="py-20 relative scroll-mt-16">
        <div id="problem" className="absolute top-0" /><div id="solutions" className="absolute top-0" />
        <div className="container"><div className="max-w-3xl mx-auto text-center mb-12"><span className="section-label">ViralMinds giúp bạn làm những gì?</span><h2 className="section-title">Mỗi bài toán Marketing được phụ trách bởi một nhóm AI Specialist phù hợp.</h2></div>
          <div className="capability-system glass-panel rounded-card-xl relative max-w-5xl mx-auto">
            <div className="capability-map grid-bg" role="group" aria-label="Các nhóm AI Specialist">
              <div className="capability-ring" aria-hidden="true" /><div className="capability-pulse" aria-hidden="true" />
              <div className="capability-core"><span>AI WORKFORCE</span><strong>ViralMinds</strong><small>Phối hợp vận hành</small></div>
              {capabilities.map((item, i) => <button key={item.slug} type="button" aria-haspopup="dialog" onClick={() => setActive(i)} className={`capability-node ${item.position}`}><item.icon /><span>{item.title}</span></button>)}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>{selected && <motion.div className="capability-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setActive(null)}>
        <motion.div role="dialog" aria-modal="true" aria-labelledby="capability-modal-title" className="capability-modal" initial={{ opacity: 0, scale: .94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .96, y: 12 }} transition={{ duration: .22 }} onMouseDown={event => event.stopPropagation()}>
          <button type="button" className="capability-modal-close" onClick={() => setActive(null)} aria-label="Đóng nội dung"><X /></button>
          <div className="flex items-center gap-3 mb-7 pr-12"><span className="font-mono text-viral-accent">0{(active ?? 0) + 1}</span><h3 id="capability-modal-title" className="font-display text-display-xs">{selected.title}</h3></div>
          <div className="grid md:grid-cols-2 gap-8"><div><h4 className="detail-kicker text-viral-alert">Vấn đề thường gặp</h4><ul className="space-y-3 mt-4">{selected.problems.map(x => <li key={x} className="flex gap-3 text-viral-text-muted"><span className="issue-dot" />{x}</li>)}</ul></div><div><h4 className="detail-kicker text-viral-ok">ViralMinds thực hiện</h4><ul className="space-y-3 mt-4">{selected.actions.map(x => <li key={x} className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-viral-ok shrink-0 mt-0.5" />{x}</li>)}</ul></div></div>
          <Link to={`/details/${selected.slug}`} className="btn-secondary mt-8">Xem chi tiết {selected.title}<ArrowRight className="w-4 h-4" /></Link>
        </motion.div>
      </motion.div>}</AnimatePresence>

      <section id="how-it-works" className="py-20 bg-viral-bg-secondary/60"><div className="container text-center"><span className="section-label">Cách đội ngũ AI phối hợp</span><h2 className="section-title">Bắt đầu từ mục tiêu, không bắt đầu từ công cụ</h2><p className="section-subtitle mx-auto mt-4">Các AI Specialist chia sẻ dữ liệu, chuyển giao công việc và phối hợp trong cùng một quy trình.</p><div className="grid md:grid-cols-4 gap-5 mt-12">{steps.map((step, i) => <div key={step} className="relative glass-panel p-7"><div className="w-12 h-12 mx-auto rounded-full bg-viral-accent/15 border border-viral-accent/40 flex items-center justify-center text-viral-accent font-mono font-bold">{i + 1}</div><h3 className="font-display heading-md mt-5">{step}</h3>{i < 3 && <div className="hidden md:block absolute top-12 -right-4 w-8 optical-line" />}</div>)}</div><Link to="/details/process" className="btn-secondary mt-9">Xem quy trình chi tiết <ArrowRight className="w-4 h-4" /></Link></div></section>

      <section id="value" className="py-20 relative overflow-hidden"><div className="absolute inset-0 aurora-bg opacity-30" /><div className="container relative z-10"><div className="max-w-3xl text-center mx-auto"><span className="section-label">Giá trị thực tế</span><h2 className="section-title">Giúp đội ngũ hiện tại làm được nhiều hơn với cùng nguồn lực</h2></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">{values.map((x, i) => <motion.article key={x[0]} whileHover={{ y: -6 }} className="card"><span className="font-mono text-label-sm text-viral-accent">0{i + 1}</span><h3 className="font-display heading-lg mt-4">{x[0]}</h3><p className="text-body-sm text-viral-text-muted mt-3">{x[1]}</p></motion.article>)}</div><p className="text-center text-body-lg text-viral-text-muted mt-10"><strong className="text-viral-text">ViralMinds không thay thế hoàn toàn đội ngũ Marketing.</strong> ViralMinds giúp đội ngũ hiện tại vận hành hiệu quả hơn.</p></div></section>

      <section id="pricing" className="py-20"><div className="container"><div className="glass-panel rounded-card-xl p-8 md:p-12 grid lg:grid-cols-[1fr_auto] gap-8 items-center"><div><span className="section-label">Mô hình triển khai</span><h2 className="section-title">Chi phí được xác định theo phạm vi triển khai thực tế</h2><p className="section-subtitle mt-4">Sau khi tìm hiểu mục tiêu, dữ liệu và quy trình hiện tại, ViralMinds sẽ đề xuất cấu trúc AI Workforce, thời gian và chi phí phù hợp.</p><div className="flex flex-wrap gap-4 mt-6 text-body-sm text-viral-text-muted"><span className="flex gap-2"><CircleCheck className="w-5 h-5 text-viral-ok" />Tư vấn, thiết kế & triển khai</span><span className="flex gap-2"><Layers3 className="w-5 h-5 text-viral-accent" />Chi phí AI theo sử dụng</span><span className="flex gap-2"><Target className="w-5 h-5 text-viral-accent" />Theo mục tiêu</span></div></div><div className="flex flex-col gap-3"><a href="#contact" className="btn-primary">Đặt lịch tư vấn <ArrowRight className="w-5 h-5" /></a><Link to="/details/pricing" className="text-center text-body-sm text-viral-text-muted hover:text-viral-accent">Xem mô hình chi phí</Link></div></div></div></section>
      <CTA />
    </main><Footer />
  </div>;
}
