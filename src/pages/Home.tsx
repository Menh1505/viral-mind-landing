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

const dashboardPresets = {
  sme: {
    name: "SME / Startup",
    badge: "TIẾT KIỆM TỐI ĐA",
    metrics: [
      {
        code: "01",
        label: "EXPECTED GROWTH",
        value: "2.8x",
        sub: "+180% ROI",
        desc: "Tăng trưởng chuyển đổi phễu ban đầu",
        sparkline: [20, 35, 45, 40, 60, 75, 90],
        log: "NODE 01: Thiết lập kênh chuyển đổi tự động & lead capture cơ bản.",
      },
      {
        code: "02",
        label: "LABOR & TIME SAVED",
        value: "-65%",
        sub: "180h/tháng",
        desc: "Tiết kiệm thời gian tạo nội dung & bài đăng",
        sparkline: [80, 70, 55, 45, 38, 30, 25],
        log: "NODE 02: Tự động hóa lịch đăng và phân phối nội dung đa kênh.",
      },
      {
        code: "03",
        label: "AUTONOMOUS OPERATION",
        value: "24/7",
        sub: "0 latency",
        desc: "AI Specialist phản hồi lead tức thì",
        sparkline: [95, 98, 97, 99, 98, 99, 100],
        log: "NODE 03: Phản hồi khách hàng & phân loại lead thời gian thực.",
      },
      {
        code: "04",
        label: "DATA INTEGRITY",
        value: "100%",
        sub: "3 Kênh cốt lõi",
        desc: "Đồng bộ Website, Fanpage & CRM",
        sparkline: [60, 75, 85, 90, 95, 98, 100],
        log: "NODE 04: Đồng bộ dữ liệu tập trung, hạn chế phân mảnh thông tin.",
      },
    ],
  },
  growth: {
    name: "Scale & Growth",
    badge: "TĂNG TỐC QUY MÔ",
    metrics: [
      {
        code: "01",
        label: "EXPECTED GROWTH",
        value: "3.5x",
        sub: "+340% ROI",
        desc: "Tăng trưởng hiệu suất chuyển đổi toàn phễu",
        sparkline: [25, 40, 55, 65, 80, 95, 115],
        log: "NODE 01: Tối ưu đa biến Ads + Phân tích hành vi sâu đa kênh.",
      },
      {
        code: "02",
        label: "LABOR & TIME SAVED",
        value: "-80%",
        sub: "420h/tháng",
        desc: "Tiết kiệm ngân sách nhân sự cồng kềnh",
        sparkline: [90, 75, 60, 45, 30, 22, 18],
        log: "NODE 02: Bàn giao dữ liệu tự động giữa SEO, Content & Ads.",
      },
      {
        code: "03",
        label: "AUTONOMOUS OPERATION",
        value: "24/7",
        sub: "0 latency",
        desc: "AI Specialist sản xuất & tối ưu liên tục",
        sparkline: [98, 99, 99, 100, 99, 100, 100],
        log: "NODE 03: Vận hành chiến dịch & A/B testing tự động 24/7.",
      },
      {
        code: "04",
        label: "DATA INTEGRITY",
        value: "100%",
        sub: "Omnichannel",
        desc: "Đồng nhất nhận diện Content, Ads & CRM",
        sparkline: [70, 80, 88, 94, 98, 100, 100],
        log: "NODE 04: Single Source of Truth toàn bộ điểm chạm số.",
      },
    ],
  },
  enterprise: {
    name: "Enterprise",
    badge: "ORCHESTRATION TOÀN DIỆN",
    metrics: [
      {
        code: "01",
        label: "EXPECTED GROWTH",
        value: "4.8x",
        sub: "+520% ROI",
        desc: "Đột phá quy mô doanh thu đa chi nhánh",
        sparkline: [35, 55, 75, 95, 120, 145, 175],
        log: "NODE 01: Điều phối ma trận AI chuyên sâu & phân tích dự đoán doanh thu.",
      },
      {
        code: "02",
        label: "LABOR & TIME SAVED",
        value: "-88%",
        sub: "1,200h/tháng",
        desc: "Tối ưu hóa toàn diện chi phí phòng ban",
        sparkline: [95, 80, 60, 40, 25, 15, 10],
        log: "NODE 02: Tự động hóa luồng phê duyệt & đồng bộ liên phòng ban.",
      },
      {
        code: "03",
        label: "AUTONOMOUS OPERATION",
        value: "99.9%",
        sub: "SLA Guaranteed",
        desc: "Hạ tầng AI Enterprise chịu tải lớn",
        sparkline: [99, 99.5, 99.8, 99.9, 99.9, 99.9, 100],
        log: "NODE 03: Hạ tầng phân tán, bảo mật & mã hóa cấp doanh nghiệp.",
      },
      {
        code: "04",
        label: "DATA INTEGRITY",
        value: "100%",
        sub: "Global API & ERP",
        desc: "Tích hợp ERP, Data Warehouse & CDP",
        sparkline: [85, 92, 96, 98, 100, 100, 100],
        log: "NODE 04: Tích hợp API hai chiều vào hệ thống ERP/CRM lõi.",
      },
    ],
  },
};

export default function Home() {
  const [active, setActive] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [dashboardScale, setDashboardScale] = useState<"sme" | "growth" | "enterprise">("growth");
  const [activeInspector, setActiveInspector] = useState<number>(0);
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
      <section id="overview" className="relative min-h-[85vh] sm:min-h-[90vh] overflow-hidden pt-24 sm:pt-28 pb-14 sm:pb-20 flex items-center">
        {/* Velvety ambient glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[350px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" aria-hidden="true" />

        {/* Lightweight 60fps Ethereal Golden Dust Particles (replaces 2.54MB video) */}
        <EtherealGoldenDust particleCount={70} interactive={true} />

        <div className="container relative z-10 grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 items-center">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
            <span className="section-label inline-flex items-center text-xs sm:text-sm">
              <Sparkles className="w-3.5 h-3.5 mr-2 text-amber-300 shrink-0" />
              HỆ THỐNG ĐỘI NGŨ AI TINH GỌN CHO CHIẾN LƯỢC DIGITAL MARKETING
            </span>
            <h1 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl lg:text-display-xl mt-4 sm:mt-5 mb-5 sm:mb-6 text-white leading-[1.18] sm:leading-[1.12] lg:leading-[1.08] tracking-tight">
              <ScrambleText text="KIẾN TẠO TĂNG TRƯỞNG VƯỢT BẬC " delay={150} duration={1100} />
              <ScrambleText text="VỚI SỨC MẠNH AI CHUYÊN BIỆT." className="text-gradient-accent inline" delay={650} duration={1200} />
            </h1>
            <p className="text-body-md sm:text-body-lg text-purple-100/80 max-w-xl mb-6 sm:mb-8 font-light text-base sm:text-lg min-h-[2.5rem] sm:min-h-[3.5rem]">
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
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
            <span className="section-label">ViralMinds giúp bạn làm những gì?</span>
            <h2 className="section-title">Mỗi bài toán Marketing được phụ trách bởi một nhóm AI Specialist phù hợp.</h2>
          </div>

          {/* Desktop View: Orbital Planetary System */}
          <div className="hidden lg:block capability-system relative max-w-5xl mx-auto border-0 shadow-none overflow-visible">
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

          {/* Mobile & Tablet View: Dedicated AI Command Center Grid */}
          <div className="lg:hidden space-y-4 max-w-2xl mx-auto">
            {/* AI Orchestration Central Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/15 via-purple-950/40 to-[#0d0b1c]/90 p-5 text-center shadow-[0_0_35px_rgba(245,158,11,0.12)] backdrop-blur-xl"
            >
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-amber-500/20 blur-2xl rounded-full pointer-events-none" />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-[10px] font-mono font-semibold tracking-wider uppercase mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                HỆ THỐNG ĐIỀU PHỐI AI TẬP TRUNG
              </div>
              <h3 className="font-display text-xl font-bold text-white tracking-tight">
                ViralMinds AI Workforce
              </h3>
              <p className="text-xs text-purple-200/80 mt-1.5 max-w-md mx-auto leading-relaxed">
                6 nhóm AI Specialist phối hợp liền mạch. Chạm vào từng bộ phận để khám phá bài toán & phương án xử lý.
              </p>
            </motion.div>

            {/* 6 AI Specialists Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {capabilities.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.slug}
                    type="button"
                    onClick={() => setActive(i)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                    className="group relative flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-gradient-to-r from-purple-950/40 to-slate-950/70 backdrop-blur-md text-left transition-all duration-300 active:scale-[0.98] hover:border-amber-400/40 hover:from-amber-500/10 shadow-lg"
                  >
                    <div className="flex items-center gap-3.5 min-w-0 pr-2">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-[0_0_16px_rgba(245,158,11,0.2)] shrink-0 group-hover:scale-105 group-hover:bg-amber-500/20 transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono text-amber-400/90 font-bold uppercase tracking-wider">
                            Specialist 0{i + 1}
                          </span>
                        </div>
                        <h4 className="font-display text-sm font-bold text-white group-hover:text-amber-200 transition-colors truncate">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400 truncate mt-0.5 max-w-[190px] sm:max-w-[200px]">
                          {item.actions[0]}
                        </p>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-amber-300 group-hover:border-amber-400/40 group-hover:bg-amber-500/15 transition-all shrink-0">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
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
                      {/* Sunken Large Watermark Numeral in Background - Shifted left to avoid cut corner */}
                      <span
                        className="absolute bottom-1 right-8 sm:right-10 text-7xl sm:text-8xl font-mono font-black pointer-events-none select-none tracking-tighter transition-all duration-500 text-orange-500/[0.1] group-hover:text-orange-400/[0.28] group-hover:-translate-x-1 group-hover:-translate-y-1"
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
                      {/* Sunken Large Watermark Numeral in Background - Shifted left to avoid cut corner */}
                      <span
                        className="absolute bottom-1 right-8 sm:right-10 text-7xl sm:text-8xl font-mono font-black pointer-events-none select-none tracking-tighter transition-all duration-500 text-amber-500/[0.08] group-hover:text-amber-400/[0.24] group-hover:-translate-x-1 group-hover:-translate-y-1"
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

      {/* Premium Tech Grid: Deployment Model & Pricing */}
      <section id="pricing" className="py-16 sm:py-24 lg:py-28 relative overflow-hidden max-w-full">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[400px] bg-purple-900/15 blur-[150px] rounded-full pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" aria-hidden="true" />

        <div className="container relative z-10 max-w-full overflow-hidden sm:overflow-visible">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* 1. Left Column (Text & Minimalist Glass Feature Cards) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col justify-center min-w-0"
            >
              {/* Tier 1: Sub-heading / Eyebrow (Small, Amber-Gold) */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase font-semibold text-amber-300 bg-amber-500/10 border border-amber-400/30 shadow-[0_0_16px_rgba(245,158,11,0.2)] mb-4 sm:mb-5 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_#f59e0b]" />
                MÔ HÌNH TRIỂN KHAI & CHI PHÍ
              </div>

              {/* Tier 2: Main Heading (Large, Bold, High Aesthetic Hierarchy) */}
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-[1.2] sm:leading-[1.18]">
                May đo theo quy mô, <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-amber-200 via-orange-300 to-amber-400 bg-clip-text text-transparent">
                  tối ưu theo kết quả thực tế
                </span>
              </h2>

              {/* Tier 3: Description Paragraph */}
              <p className="text-zinc-300/90 text-sm sm:text-base leading-relaxed mt-4 sm:mt-5 max-w-xl">
                Không áp đặt các gói cố định cồng kềnh. Sau khi khảo sát mục tiêu và luồng dữ liệu, ViralMinds thiết kế cấu trúc AI Workforce tinh gọn với ngân sách tối ưu hóa theo giá trị doanh thu thực tế.
              </p>

              {/* 3 Synchronized Emerald Cut Minimalist Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5 mt-6 sm:mt-8">
                {[
                  {
                    step: "01",
                    title: "Tư vấn & May đo",
                    desc: "Thiết kế kiến trúc AI chuẩn theo luồng nghiệp vụ riêng.",
                    icon: SlidersHorizontal,
                  },
                  {
                    step: "02",
                    title: "Pay-as-you-go AI",
                    desc: "Chi phí hạ tầng AI linh hoạt theo mức độ sử dụng thực tế.",
                    icon: Cpu,
                  },
                  {
                    step: "03",
                    title: "Cam kết mục tiêu",
                    desc: "Gắn liền kết quả bàn giao với KPI tăng trưởng doanh thu.",
                    icon: Target,
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.step} className="group relative transition-all duration-300 hover:scale-[1.02] min-w-0">
                      {/* Outer Emerald Cut Border */}
                      <div
                        className="p-[1px] h-full transition-all duration-500 relative bg-gradient-to-br from-amber-500/30 via-zinc-700/40 to-purple-900/30 group-hover:from-amber-400 group-hover:via-amber-500 group-hover:to-orange-500 group-hover:shadow-[0_16px_35px_-10px_rgba(245,158,11,0.4)]"
                        style={{ clipPath: EMERALD_CUT_PATH }}
                      >
                        {/* Top-Left Steel Armor Bracket */}
                        <div className="absolute top-0 left-0 w-6 h-6 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
                          <svg className="w-6 h-6" viewBox="0 0 32 32">
                            <polygon points="0,16 16,0 20,0 0,20" fill="#2d1b38" stroke="#f59e0b" strokeWidth="0.75" />
                            <line x1="0" y1="16" x2="16" y2="0" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                            <circle cx="8.5" cy="8.5" r="1.5" fill="#fef08a" stroke="#d97706" strokeWidth="0.75" />
                          </svg>
                        </div>

                        {/* Bottom-Right Steel Armor Bracket */}
                        <div className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
                          <svg className="w-6 h-6" viewBox="0 0 32 32">
                            <polygon points="32,16 16,32 12,32 32,12" fill="#2d1b38" stroke="#f59e0b" strokeWidth="0.75" />
                            <line x1="32" y1="16" x2="16" y2="32" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                            <circle cx="23.5" cy="23.5" r="1.5" fill="#fef08a" stroke="#d97706" strokeWidth="0.75" />
                          </svg>
                        </div>

                        {/* Inner Body */}
                        <div
                          className="relative p-4 sm:p-5 h-full flex flex-col justify-between bg-[rgba(16,11,24,0.92)] backdrop-blur-2xl overflow-hidden min-h-[135px] sm:min-h-[160px]"
                          style={{ clipPath: EMERALD_CUT_PATH }}
                        >
                          {/* Sunken Large Watermark */}
                          <span
                            className="absolute bottom-0 right-4 sm:right-5 text-4xl sm:text-5xl font-mono font-black pointer-events-none select-none tracking-tighter transition-all duration-300 text-amber-500/[0.08] group-hover:text-amber-400/[0.2]"
                            aria-hidden="true"
                          >
                            {item.step}
                          </span>

                          <div className="relative z-10">
                            {/* Seamless Large Monoline Icon */}
                            <div className="text-amber-400 group-hover:text-amber-300 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_14px_rgba(245,158,11,0.7)] mb-2.5 sm:mb-3">
                              <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.25]" />
                            </div>

                            <h4 className="font-display text-sm font-bold text-white group-hover:text-amber-200 transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-[11px] text-zinc-400 leading-snug mt-1 sm:mt-1.5">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA Action Area */}
              <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-5">
                <a
                  href="#contact"
                  className="relative group w-full sm:w-auto px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 font-display text-xs sm:text-sm font-bold text-black tracking-wide uppercase transition-all duration-300 hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-3 border border-amber-300/40"
                >
                  <span className="relative z-10">ĐẶT LỊCH TƯ VẤN</span>
                  <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <Link
                  to="/details/pricing"
                  className="font-mono text-xs tracking-wider uppercase text-zinc-400 hover:text-amber-300 transition-colors flex items-center justify-center sm:justify-start gap-1.5 py-1"
                >
                  <span>Xem mô hình chi phí chi tiết</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                </Link>
              </div>
            </motion.div>

            {/* 2. Right Column (Fully Interactive Emerald Cut Dashboard Mockup) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative mt-4 lg:mt-0 w-full max-w-full overflow-hidden"
            >
              {/* Dashboard Outer Luxury Aura */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-purple-600/20 rounded-[28px] blur-xl opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Dashboard Outer Emerald Cut Layer */}
              <div
                className="p-[1px] relative bg-gradient-to-br from-amber-500/40 via-zinc-700/50 to-purple-900/40 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95),0_0_50px_rgba(245,158,11,0.15)] w-full max-w-full"
                style={{ clipPath: EMERALD_CUT_PATH }}
              >
                {/* Top-Left Main Steel Armor Bracket */}
                <div className="absolute top-0 left-0 w-7 h-7 sm:w-8 sm:h-8 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32">
                    <polygon points="0,16 16,0 20,0 0,20" fill="#2d1b38" stroke="#f59e0b" strokeWidth="0.75" />
                    <line x1="0" y1="16" x2="16" y2="0" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" className="drop-shadow-[0_0_6px_rgba(245,158,11,0.9)]" />
                    <circle cx="8.5" cy="8.5" r="1.5" fill="#fef08a" stroke="#d97706" strokeWidth="0.75" />
                  </svg>
                </div>

                {/* Bottom-Right Main Steel Armor Bracket */}
                <div className="absolute bottom-0 right-0 w-7 h-7 sm:w-8 sm:h-8 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32">
                    <polygon points="32,16 16,32 12,32 32,12" fill="#2d1b38" stroke="#f59e0b" strokeWidth="0.75" />
                    <line x1="32" y1="16" x2="16" y2="32" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" className="drop-shadow-[0_0_6px_rgba(245,158,11,0.9)]" />
                    <circle cx="23.5" cy="23.5" r="1.5" fill="#fef08a" stroke="#d97706" strokeWidth="0.75" />
                  </svg>
                </div>

                {/* Dashboard Inner Body */}
                <div
                  className="relative bg-[rgba(15,10,24,0.94)] backdrop-blur-2xl p-3.5 sm:p-6 lg:p-7 overflow-hidden w-full max-w-full"
                  style={{ clipPath: EMERALD_CUT_PATH }}
                >
                  {/* Subtle Grid Background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b08_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                  {/* Header Bar */}
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-3 sm:pb-5 mb-3 sm:mb-5 border-b border-white/10">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                      <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                      <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                      <span className="ml-1 font-mono text-[9px] sm:text-[11px] text-zinc-400 tracking-wider">
                        AI_SIMULATOR_v2.4
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[8.5px] sm:text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10b981]" />
                      LIVE TELEMETRY
                    </div>
                  </div>

                  {/* Interactive Scale Segmented Tabs */}
                  <div className="relative z-10 mb-3 sm:mb-5 p-1 rounded-xl bg-black/50 border border-white/10 flex items-center gap-1">
                    {(["sme", "growth", "enterprise"] as const).map((scaleKey) => {
                      const isActive = dashboardScale === scaleKey;
                      const preset = dashboardPresets[scaleKey];
                      return (
                        <button
                          key={scaleKey}
                          onClick={() => setDashboardScale(scaleKey)}
                          className={`flex-1 py-1.5 sm:py-2 px-1 sm:px-2.5 rounded-lg text-[9.5px] sm:text-xs font-mono font-medium transition-all duration-300 relative text-center flex items-center justify-center gap-1 ${
                            isActive
                              ? "text-black font-bold shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                              : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                          }`}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="activeScaleTab"
                              className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400"
                              transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                          )}
                          <span className="relative z-10 tracking-wider truncate">
                            {preset.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Dashboard Metrics Grid (2x2 Interactive Emerald Cut Widgets) */}
                  <div className="relative z-10 grid grid-cols-2 gap-2 sm:gap-3.5 mb-3 sm:mb-4">
                    {dashboardPresets[dashboardScale].metrics.map((metric, idx) => {
                      const isInspected = activeInspector === idx;
                      return (
                        <div
                          key={metric.code}
                          onClick={() => setActiveInspector(idx)}
                          onMouseEnter={() => setActiveInspector(idx)}
                          className={`p-[1px] relative cursor-pointer transition-all duration-300 min-w-0 ${
                            isInspected
                              ? "bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 shadow-[0_12px_30px_-8px_rgba(245,158,11,0.45)] scale-[1.02] z-20"
                              : "bg-gradient-to-br from-amber-500/20 via-zinc-800/40 to-purple-900/20 opacity-85 hover:opacity-100 z-10"
                          }`}
                          style={{ clipPath: EMERALD_CUT_PATH }}
                        >
                          <div
                            className={`p-2.5 sm:p-4 lg:p-5 relative overflow-hidden h-full flex flex-col justify-between transition-colors duration-300 min-h-[130px] sm:min-h-[155px] ${
                              isInspected
                                ? "bg-[rgba(24,15,36,0.96)] backdrop-blur-2xl"
                                : "bg-[rgba(18,12,28,0.92)] backdrop-blur-xl"
                            }`}
                            style={{ clipPath: EMERALD_CUT_PATH }}
                          >
                            {/* Sunken Watermark */}
                            <span className="absolute bottom-1 right-2 sm:right-5 text-2xl sm:text-4xl font-mono font-black text-amber-500/[0.07] pointer-events-none select-none">
                              {metric.code}
                            </span>

                            <div className="relative z-10 min-w-0">
                              <div className="flex items-center justify-between mb-1 gap-1">
                                <span className="font-mono text-[8px] sm:text-[10px] text-amber-400/90 uppercase tracking-wider truncate">
                                  {metric.label}
                                </span>
                                {isInspected && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping shrink-0" />
                                )}
                              </div>

                              <AnimatePresence mode="wait">
                                <motion.div
                                  key={metric.value + dashboardScale}
                                  initial={{ opacity: 0, y: 4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -4 }}
                                  transition={{ duration: 0.2 }}
                                  className="font-mono text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white flex flex-wrap items-baseline gap-1"
                                >
                                  <span className="bg-gradient-to-r from-amber-200 via-orange-300 to-amber-400 bg-clip-text text-transparent">
                                    {metric.value}
                                  </span>
                                  <span className="text-[8.5px] sm:text-[10px] font-mono text-emerald-400 font-semibold">
                                    {metric.sub}
                                  </span>
                                </motion.div>
                              </AnimatePresence>

                              <p className="text-[9px] sm:text-[11px] text-zinc-400 mt-1 sm:mt-2 leading-relaxed line-clamp-2">
                                {metric.desc}
                              </p>
                            </div>

                            {/* Mini Reactive Sparkline Waveform */}
                            <div className="mt-2 pt-1 border-t border-white/5 flex items-center justify-between gap-1">
                              <span className="text-[8px] sm:text-[9px] font-mono text-zinc-500 uppercase tracking-widest truncate">
                                NODE_{metric.code}
                              </span>
                              <svg className="w-9 sm:w-14 h-3 sm:h-4 overflow-hidden shrink-0" viewBox="0 0 60 16">
                                <polyline
                                  fill="none"
                                  stroke={isInspected ? "#f59e0b" : "rgba(245,158,11,0.4)"}
                                  strokeWidth={isInspected ? "2" : "1.25"}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  points="0,12 10,8 20,13 30,5 40,9 50,3 60,7"
                                />
                                {isInspected && (
                                  <circle cx="60" cy="7" r="2" fill="#fef08a" className="animate-pulse" />
                                )}
                              </svg>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Live Interactive Diagnostic Terminal Bar */}
                  <div className="relative z-10 p-2 sm:p-3 rounded-xl bg-black/60 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 font-mono text-[9.5px] sm:text-xs text-zinc-400 min-w-0 max-w-full">
                    <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden min-w-0 flex-1">
                      <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] shrink-0" />
                      <span className="text-amber-300 font-semibold text-[9.5px] sm:text-[11px] shrink-0">DIAGNOSTIC:</span>
                      <div className="min-w-0 flex-1 overflow-hidden">
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={dashboardPresets[dashboardScale].metrics[activeInspector]?.log}
                            initial={{ opacity: 0, y: 3 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -3 }}
                            transition={{ duration: 0.15 }}
                            className="text-zinc-300 text-[9.5px] sm:text-[11px] truncate block"
                          >
                            {dashboardPresets[dashboardScale].metrics[activeInspector]?.log}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                    </div>
                    <span className="text-[8.5px] sm:text-[10px] text-zinc-500 shrink-0 uppercase tracking-widest hidden md:inline">
                      {dashboardPresets[dashboardScale].badge}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <CTA />
    </main><Footer />
  </div>;
}
