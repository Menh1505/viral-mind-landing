import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, BarChart3, Check, CheckCircle2, CircleCheck, Clock, Compass, Cpu, FileText, Globe2, Layers3, Megaphone, Search, ShieldCheck, SlidersHorizontal, Sparkles, Target, TrendingUp, Users, X, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import GrowthLens from "@/components/GrowthLens";
import EtherealGoldenDust from "@/components/EtherealGoldenDust";
import ScrambleText from "@/components/ScrambleText";

const EMERALD_CUT_PATH =
  "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)";

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

const pipelineSteps = [
  {
    step: "01",
    title: "Hiểu doanh nghiệp",
    tagline: "AUDIT & DISCOVERY",
    desc: "Khảo sát chuyên sâu mô hình kinh doanh, cấu trúc dữ liệu và điểm nghẽn chuyển đổi để định hình chiến lược AI.",
    icon: Compass,
  },
  {
    step: "02",
    title: "Thiết kế AI Workforce",
    tagline: "ROLE MATRIX & ARCHITECTURE",
    desc: "May đo đội ngũ AI Specialist chuyên trách (Content, SEO, Ads, CRM) kết nối liền mạch vào workflow sẵn có.",
    icon: Cpu,
  },
  {
    step: "03",
    title: "Cấu hình & Kiểm thử",
    tagline: "PROMPT LOGIC & INTEGRATION",
    desc: "Tích hợp API, huấn luyện logic theo chuẩn thương hiệu và chạy thử nghiệm đa biến để kiểm soát chất lượng đầu ra.",
    icon: SlidersHorizontal,
  },
  {
    step: "04",
    title: "Vận hành & Tối ưu",
    tagline: "AUTONOMOUS SCALE & ROI",
    desc: "Tự động hóa phối hợp liên kênh, theo dõi đo lường hiệu suất thời gian thực và liên tục tinh chỉnh thuật toán.",
    icon: Sparkles,
  },
];

const valuePillars = [
  {
    metric: "70%",
    metricLabel: "Thời gian thủ công",
    title: "Tiết kiệm thời gian",
    tagline: "VELOCITY & EFFICIENCY",
    desc: "Cắt giảm 80% thời gian chuyển đổi giữa các công cụ rời rạc, tự động hóa luồng chuyển giao dữ liệu tức thì.",
    icon: Clock,
  },
  {
    metric: "3.5x",
    metricLabel: "Năng suất mỗi nhân sự",
    title: "Tối ưu nguồn lực",
    tagline: "HIGH-LEVERAGE TALENT",
    desc: "Giải phóng nhân sự khỏi tác vụ lặp lại để tập trung vào chiến lược sáng tạo và các quyết định tăng trưởng then chốt.",
    icon: Zap,
  },
  {
    metric: "100%",
    metricLabel: "Đồng bộ nhận diện",
    title: "Vận hành nhất quán",
    tagline: "DATA & BRAND INTEGRITY",
    desc: "Một nguồn dữ liệu trung tâm (Single Source of Truth), đảm bảo đúng thông điệp và nguyên tắc thương hiệu trên mọi kênh.",
    icon: ShieldCheck,
  },
  {
    metric: "10x",
    metricLabel: "Tốc độ mở rộng",
    title: "Mở rộng linh hoạt",
    tagline: "EXPONENTIAL SCALE",
    desc: "Dễ dàng kích hoạt thêm Specialist mới và mở rộng công suất thực thi ngay lập tức mà không phải phình to bộ máy.",
    icon: TrendingUp,
  },
];

export default function Home() {
  const [active, setActive] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
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

        {/* Lightweight 60fps Ethereal Golden Dust Particles (replaces 2.54MB video) */}
        <EtherealGoldenDust particleCount={70} interactive={true} />

        <div className="container relative z-10 grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-14 items-center">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
            <span className="section-label">
              <Sparkles className="w-3.5 h-3.5 mr-2 text-amber-300" />
              HỆ THỐNG ĐỘI NGŨ AI TINH GỌN CHO CHIẾN LƯỢC DIGITAL MARKETING
            </span>
            <h1 className="font-display text-display-xl mt-5 mb-6 text-white leading-[1.08] tracking-tight">
              <ScrambleText text="KIẾN TẠO TĂNG TRƯỞNG VƯỢT BẬC " delay={150} duration={1100} />
              <ScrambleText text="VỚI SỨC MẠNH AI CHUYÊN BIỆT." className="text-gradient-accent inline" delay={650} duration={1200} />
            </h1>
            <p className="text-body-lg text-purple-100/80 max-w-xl mb-8 font-light text-lg min-h-[3.5rem]">
              <ScrambleText text="ViralMinds - Tinh gọn nhân sự, tối ưu thời gian, nhân đôi hiệu quả." delay={1100} duration={1300} as="span" />
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

      <section id="capabilities" className="py-24 relative scroll-mt-16 overflow-hidden">
        <div id="problem" className="absolute top-0" /><div id="solutions" className="absolute top-0" />

        {/* Cinematic Background Artwork */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden" aria-hidden="true">
          <img
            src="/backgrounds/Gemini_Generated_Image_llq8q9llq8q9llq8.png"
            alt="ViralMinds AI Background"
            className="w-full h-full object-cover object-center opacity-85"
          />
          {/* Subtle top & bottom edge transition */}
          <div className="absolute inset-0 bg-gradient-to-b from-viral-bg/90 via-transparent to-viral-bg/95" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="section-label">ViralMinds giúp bạn làm những gì?</span>
            <h2 className="section-title">Mỗi bài toán Marketing được phụ trách bởi một nhóm AI Specialist phù hợp.</h2>
          </div>
          <div className="capability-system relative max-w-5xl mx-auto border-0 shadow-none overflow-visible">
            <div className="capability-map border-0 overflow-visible" role="group" aria-label="Các nhóm AI Specialist">
              {/* Expansive Ambient Halo Aura */}
              <div className="capability-aura" aria-hidden="true" />
              <div className="capability-ring-outer" aria-hidden="true" />
              <div className="capability-ring" aria-hidden="true" />
              <div className="capability-pulse" aria-hidden="true" />
              <div className="capability-pulse capability-pulse-delayed" aria-hidden="true" />

              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="capability-core"
              >
                <span>AI WORKFORCE</span>
                <strong>ViralMinds</strong>
                <small>Phối hợp vận hành</small>
              </motion.div>

              {capabilities.map((item, i) => {
                const Icon = item.icon;
                const isLeft = i % 2 === 0; // 0, 2, 4 are left side (Research, Website, Growth); 1, 3, 5 are right side (Content, Ads, CRM)
                return (
                  <motion.button
                    key={item.slug}
                    type="button"
                    aria-haspopup="dialog"
                    onClick={() => setActive(i)}
                    initial={{ opacity: 0, x: isLeft ? -90 : 90, scale: 0.92 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{
                      duration: 0.85,
                      delay: 0.15 + (Math.floor(i / 2) * 0.14),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`capability-node ${item.position} group`}
                  >
                    <div className="capability-node-icon">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col items-start min-w-0 pr-1">
                      <span className="capability-node-title truncate">{item.title}</span>
                      <span className="capability-node-sub">Specialist 0{i + 1}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-amber-400 transition-all duration-200 shrink-0" />
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="capability-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onMouseDown={() => setActive(null)}
          >
            <motion.div
              className="capability-modal-wrapper"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              {/* 2 Stacked Card Layers for Physical Overlap Depth */}
              <div className="capability-modal-stack-2" aria-hidden="true" />
              <div className="capability-modal-stack-1" aria-hidden="true" />

              {/* Main Modal Card */}
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="capability-modal-title"
                className="capability-modal"
              >
                {/* Luminous Bottom Edge Contrasting Glow Line */}
                <div className="capability-modal-bottom-glow" aria-hidden="true" />

                {/* Close Button */}
                <button
                  type="button"
                  className="capability-modal-close"
                  onClick={() => setActive(null)}
                  aria-label="Đóng nội dung"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Modal Header */}
                <div className="flex items-center gap-3.5 mb-6 pr-10">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-[0_0_24px_rgba(245,158,11,0.25)] shrink-0">
                    <selected.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                      <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase font-semibold">
                        AI WORKFORCE MODULE 0{(active ?? 0) + 1}
                      </span>
                    </div>
                    <h3 id="capability-modal-title" className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                      {selected.title}
                    </h3>
                  </div>
                </div>

                {/* Comparison Dual Cards */}
                <div className="grid md:grid-cols-2 gap-4 sm:gap-5 mt-6">
                  {/* Problem Card */}
                  <div className="rounded-2xl p-5 sm:p-6 bg-rose-950/20 border border-rose-500/20 backdrop-blur-md flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-rose-500/15">
                        <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse shadow-[0_0_8px_#f43f5e]" />
                        <h4 className="text-xs font-mono font-semibold tracking-wider text-rose-300 uppercase">
                          Thách Thức Hiện Tại
                        </h4>
                      </div>
                      <ul className="space-y-3">
                        {selected.problems.map((x) => (
                          <li key={x} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300/90 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400/80 mt-2 shrink-0 shadow-[0_0_6px_#f43f5e]" />
                            <span>{x}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Solution Card */}
                  <div className="rounded-2xl p-5 sm:p-6 bg-amber-950/20 border border-amber-500/30 backdrop-blur-md flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-amber-500/20">
                        <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                        <h4 className="text-xs font-mono font-semibold tracking-wider text-amber-300 uppercase">
                          ViralMinds Triển Khai
                        </h4>
                      </div>
                      <ul className="space-y-3">
                        {selected.actions.map((x) => (
                          <li key={x} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-100 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <span>{x}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="mt-7 pt-5 border-t border-white/10 flex items-center justify-end">
                  <Link
                    to={`/details/${selected.slug}`}
                    className="btn-primary w-full sm:w-auto text-xs sm:text-sm py-3 px-6 shadow-accent group"
                  >
                    <span>Khám phá quy trình {selected.title}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Luxury SaaS Pipeline Section */}
      <section id="how-it-works" className="py-24 relative overflow-hidden">
        {/* Cinematic Pipeline Background Artwork */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden" aria-hidden="true">
          <img
            src="/backgrounds/pipeline-bg.jpg"
            alt="ViralMinds Pipeline Background"
            className="w-full h-full object-cover object-center opacity-75 scale-105"
          />
          {/* Top & Bottom Smooth Gradient Blending */}
          <div className="absolute inset-0 bg-gradient-to-b from-viral-bg/95 via-transparent to-viral-bg/95" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Warm Orange Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-gradient-to-r from-orange-600/20 via-amber-600/15 to-orange-900/20 blur-[140px] rounded-full pointer-events-none" aria-hidden="true" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[250px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" aria-hidden="true" />

        <div className="container relative z-10 text-center">
          <div className="max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase font-semibold text-orange-300 bg-orange-500/10 border border-orange-400/30 shadow-[0_0_16px_rgba(234,97,19,0.2)] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse shadow-[0_0_6px_#ea6113]" />
              Quy trình triển khai 4 bước
            </span>
            <h2 className="section-title">Bắt đầu từ mục tiêu, chuyển hóa thành hệ thống AI tự vận hành</h2>
            <p className="section-subtitle mx-auto mt-4">
              Mỗi mắt xích trong quy trình được thiết kế chuẩn xác để kết nối và tự động hóa toàn bộ phễu tăng trưởng của doanh nghiệp.
            </p>
          </div>

          {/* 4-Step Emerald Cut Pipeline Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {pipelineSteps.map((step, i) => {
              const Icon = step.icon;
              const isHovered = hoveredStep === i;
              const isDimmed = hoveredStep !== null && !isHovered;

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.75, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHoveredStep(i)}
                  onMouseLeave={() => setHoveredStep(null)}
                  className={`relative group transition-all duration-300 ${isDimmed ? "opacity-35 scale-[0.98]" : "opacity-100"
                    } ${isHovered ? "scale-[1.03] z-20" : "z-10"}`}
                >
                  {/* Outer Border Layer with Emerald Cut */}
                  <div
                    className={`p-[1px] h-full transition-all duration-500 relative ${isHovered
                        ? "bg-gradient-to-br from-orange-400 via-orange-500 to-amber-500 shadow-[0_20px_50px_-10px_rgba(234,97,19,0.55)]"
                        : "bg-gradient-to-br from-orange-500/35 via-zinc-700/40 to-orange-900/30 shadow-[0_16px_35px_-20px_rgba(0,0,0,0.85)]"
                      }`}
                    style={{ clipPath: EMERALD_CUT_PATH }}
                  >
                    {/* Top-Left Reinforced Steel Armor Bracket */}
                    <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none z-30 overflow-visible" aria-hidden="true">
                      <svg className="w-8 h-8 overflow-visible" viewBox="0 0 32 32">
                        {/* Metallic Chamfer Armor Plate */}
                        <polygon points="0,16 16,0 20,0 0,20" fill="#2d1b38" stroke="#f97316" strokeWidth="0.75" />
                        <line x1="0" y1="16" x2="16" y2="0" stroke="#fb923c" strokeWidth="2.5" strokeLinecap="round" className="drop-shadow-[0_0_6px_rgba(249,115,22,0.9)]" />
                        {/* Micro Rivet Bolt */}
                        <circle cx="8.5" cy="8.5" r="1.5" fill="#fed7aa" stroke="#c2410c" strokeWidth="0.75" />
                      </svg>
                    </div>

                    {/* Bottom-Right Reinforced Steel Armor Bracket */}
                    <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none z-30 overflow-visible" aria-hidden="true">
                      <svg className="w-8 h-8 overflow-visible" viewBox="0 0 32 32">
                        {/* Metallic Chamfer Armor Plate */}
                        <polygon points="32,16 16,32 12,32 32,12" fill="#2d1b38" stroke="#f97316" strokeWidth="0.75" />
                        <line x1="32" y1="16" x2="16" y2="32" stroke="#fb923c" strokeWidth="2.5" strokeLinecap="round" className="drop-shadow-[0_0_6px_rgba(249,115,22,0.9)]" />
                        {/* Micro Rivet Bolt */}
                        <circle cx="23.5" cy="23.5" r="1.5" fill="#fed7aa" stroke="#c2410c" strokeWidth="0.75" />
                      </svg>
                    </div>

                    {/* Inner Glassmorphism Body with Emerald Cut */}
                    <div
                      className="relative p-7 sm:p-8 h-full flex flex-col justify-between bg-[rgba(16,11,22,0.94)] backdrop-blur-2xl overflow-hidden min-h-[365px]"
                      style={{ clipPath: EMERALD_CUT_PATH }}
                    >
                      {/* Sunken Large Watermark Numeral in Background */}
                      <span
                        className="absolute bottom-1 right-2 text-7xl sm:text-8xl font-mono font-black pointer-events-none select-none tracking-tighter transition-all duration-500 text-orange-500/[0.1] group-hover:text-orange-400/[0.28] group-hover:-translate-x-1 group-hover:-translate-y-1"
                        aria-hidden="true"
                      >
                        {step.step}
                      </span>

                      {/* Top Content: Monoline Icon, Titles & Balanced Status Divider */}
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                          {/* Large Seamless Monoline Luxury Icon */}
                          <div className="text-orange-400 group-hover:text-orange-300 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_18px_rgba(234,97,19,0.75)]">
                            <Icon className="w-9 h-9 sm:w-10 sm:h-10 stroke-[1.25]" />
                          </div>

                          <span className="font-mono text-[11px] text-orange-300 tracking-wider uppercase font-semibold px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-400/30 shadow-[0_0_10px_rgba(234,97,19,0.2)]">
                            PHASE {step.step}
                          </span>
                        </div>

                        <span className="text-[10px] font-mono tracking-widest text-orange-400/80 uppercase font-semibold block mb-1">
                          {step.tagline}
                        </span>
                        <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-orange-200 transition-colors">
                          {step.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-zinc-300/85 leading-relaxed mt-3">
                          {step.desc}
                        </p>

                        {/* Balanced Status Bar & Divider with Orange Glow */}
                        <div className="mt-7 pt-3.5 border-t border-orange-500/15 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-orange-200">
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_8px_#ea6113]" />
                            Pipeline Active
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-orange-400 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200" />
                        </div>
                      </div>

                      {/* Clean balanced bottom buffer region for Watermark */}
                      <div className="h-6 sm:h-7" aria-hidden="true" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link to="/details/process" className="btn-primary">
              <span>Xem chi tiết quy trình tích hợp</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Real Value & Impact Section */}
      <section id="value" className="py-24 relative overflow-hidden">
        {/* Cinematic Golden Vortex Background Artwork */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden" aria-hidden="true">
          <img
            src="/backgrounds/value-bg.jpg"
            alt="ViralMinds Real Value Background"
            className="w-full h-full object-cover object-center opacity-75 scale-105"
          />
          {/* Seamless Edge Blending */}
          <div className="absolute inset-0 bg-gradient-to-b from-viral-bg/95 via-transparent to-viral-bg/95" />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* Velvety Ambient Lights */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[650px] h-[380px] bg-purple-900/15 blur-[140px] rounded-full pointer-events-none" aria-hidden="true" />
        <div className="absolute top-1/3 left-10 w-[450px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />

        <div className="container relative z-10">
          <div className="max-w-3xl text-center mx-auto mb-16">
            <span className="section-label">Giá trị thực tế</span>
            <h2 className="section-title">Giúp đội ngũ hiện tại làm được nhiều hơn với cùng nguồn lực</h2>
            <p className="section-subtitle mx-auto mt-4">
              Không chỉ là công cụ hỗ trợ - ViralMinds là đòn bẩy công nghệ nhân bản hiệu suất của toàn bộ phòng Marketing.
            </p>
          </div>

          {/* 4 Emerald Cut Luxury Impact Value Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {valuePillars.map((pillar, i) => {
              const Icon = pillar.icon;
              const isHovered = hoveredValue === i;
              const isDimmed = hoveredValue !== null && !isHovered;

              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.75, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHoveredValue(i)}
                  onMouseLeave={() => setHoveredValue(null)}
                  className={`relative group transition-all duration-300 ${
                    isDimmed ? "opacity-35 scale-[0.98]" : "opacity-100"
                  } ${isHovered ? "scale-[1.03] z-20" : "z-10"}`}
                >
                  {/* Outer Border Layer with Emerald Cut */}
                  <div
                    className={`p-[1px] h-full transition-all duration-500 relative ${
                      isHovered
                        ? "bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 shadow-[0_20px_50px_-10px_rgba(245,158,11,0.55)]"
                        : "bg-gradient-to-br from-amber-500/30 via-zinc-700/40 to-purple-900/30 shadow-[0_16px_35px_-20px_rgba(0,0,0,0.85)]"
                    }`}
                    style={{ clipPath: EMERALD_CUT_PATH }}
                  >
                    {/* Top-Left Reinforced Steel Armor Bracket */}
                    <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none z-30 overflow-visible" aria-hidden="true">
                      <svg className="w-8 h-8 overflow-visible" viewBox="0 0 32 32">
                        {/* Metallic Chamfer Armor Plate */}
                        <polygon points="0,16 16,0 20,0 0,20" fill="#2d1b38" stroke="#f59e0b" strokeWidth="0.75" />
                        <line x1="0" y1="16" x2="16" y2="0" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" className="drop-shadow-[0_0_6px_rgba(245,158,11,0.9)]" />
                        {/* Micro Rivet Bolt */}
                        <circle cx="8.5" cy="8.5" r="1.5" fill="#fef08a" stroke="#d97706" strokeWidth="0.75" />
                      </svg>
                    </div>

                    {/* Bottom-Right Reinforced Steel Armor Bracket */}
                    <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none z-30 overflow-visible" aria-hidden="true">
                      <svg className="w-8 h-8 overflow-visible" viewBox="0 0 32 32">
                        {/* Metallic Chamfer Armor Plate */}
                        <polygon points="32,16 16,32 12,32 32,12" fill="#2d1b38" stroke="#f59e0b" strokeWidth="0.75" />
                        <line x1="32" y1="16" x2="16" y2="32" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" className="drop-shadow-[0_0_6px_rgba(245,158,11,0.9)]" />
                        {/* Micro Rivet Bolt */}
                        <circle cx="23.5" cy="23.5" r="1.5" fill="#fef08a" stroke="#d97706" strokeWidth="0.75" />
                      </svg>
                    </div>

                    {/* Inner Glassmorphism Body with Emerald Cut */}
                    <div
                      className="relative p-7 sm:p-8 h-full flex flex-col justify-between bg-[rgba(16,11,24,0.94)] backdrop-blur-2xl overflow-hidden min-h-[365px]"
                      style={{ clipPath: EMERALD_CUT_PATH }}
                    >
                      {/* Sunken Large Watermark Numeral in Background */}
                      <span
                        className="absolute bottom-1 right-2 text-7xl sm:text-8xl font-mono font-black pointer-events-none select-none tracking-tighter transition-all duration-500 text-amber-500/[0.08] group-hover:text-amber-400/[0.24] group-hover:-translate-x-1 group-hover:-translate-y-1"
                        aria-hidden="true"
                      >
                        0{i + 1}
                      </span>

                      {/* Top Content: Monoline Icon, Metric & Titles */}
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-5">
                          {/* Large Seamless Monoline Luxury Icon */}
                          <div className="text-amber-400 group-hover:text-amber-300 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_18px_rgba(245,158,11,0.75)]">
                            <Icon className="w-9 h-9 sm:w-10 sm:h-10 stroke-[1.25]" />
                          </div>

                          <span className="font-mono text-[11px] text-amber-300 tracking-wider uppercase font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                            PILLAR 0{i + 1}
                          </span>
                        </div>

                        {/* Massive Radiant Metric */}
                        <div className="my-3">
                          <div className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-amber-200 via-orange-300 to-amber-400 bg-clip-text text-transparent group-hover:scale-[1.02] origin-left transition-transform duration-300">
                            {pillar.metric}
                          </div>
                          <span className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase block mt-1">
                            {pillar.metricLabel}
                          </span>
                        </div>

                        <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-amber-200 transition-colors mt-3">
                          {pillar.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-zinc-300/85 leading-relaxed mt-2.5">
                          {pillar.desc}
                        </p>

                        {/* Balanced Status Bar & Divider */}
                        <div className="mt-6 pt-3.5 border-t border-amber-500/15 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-amber-200">
                          <span className="text-[10px] tracking-wider text-amber-400/80 uppercase">
                            {pillar.tagline}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-amber-400 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200" />
                        </div>
                      </div>

                      {/* Clean balanced bottom buffer region for Watermark */}
                      <div className="h-6 sm:h-7" aria-hidden="true" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Luxury Bottom Trust Statement Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-14 max-w-4xl mx-auto p-6 sm:p-7 rounded-[22px] bg-gradient-to-r from-purple-950/30 via-[rgba(20,15,34,0.8)] to-amber-950/20 border border-white/10 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] text-center flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0 shadow-[0_0_16px_rgba(245,158,11,0.25)]">
              <Sparkles className="w-5 h-5" />
            </div>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              <strong className="text-white font-semibold">ViralMinds không thay thế đội ngũ Marketing của bạn.</strong> Chúng tôi trang bị cho họ một lực lượng AI Specialist đồng hành để bứt phá giới hạn tăng trưởng.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="pricing" className="py-20"><div className="container"><div className="glass-panel rounded-card-xl p-8 md:p-12 grid lg:grid-cols-[1fr_auto] gap-8 items-center"><div><span className="section-label">Mô hình triển khai</span><h2 className="section-title">Chi phí được xác định theo phạm vi triển khai thực tế</h2><p className="section-subtitle mt-4">Sau khi tìm hiểu mục tiêu, dữ liệu và quy trình hiện tại, ViralMinds sẽ đề xuất cấu trúc AI Workforce, thời gian và chi phí phù hợp.</p><div className="flex flex-wrap gap-4 mt-6 text-body-sm text-viral-text-muted"><span className="flex gap-2"><CircleCheck className="w-5 h-5 text-viral-ok" />Tư vấn, thiết kế & triển khai</span><span className="flex gap-2"><Layers3 className="w-5 h-5 text-viral-accent" />Chi phí AI theo sử dụng</span><span className="flex gap-2"><Target className="w-5 h-5 text-viral-accent" />Theo mục tiêu</span></div></div><div className="flex flex-col gap-3"><a href="#contact" className="btn-primary">Đặt lịch tư vấn <ArrowRight className="w-5 h-5" /></a><Link to="/details/pricing" className="text-center text-body-sm text-viral-text-muted hover:text-viral-accent">Xem mô hình chi phí</Link></div></div></div></section>
      <CTA />
    </main><Footer />
  </div>;
}
