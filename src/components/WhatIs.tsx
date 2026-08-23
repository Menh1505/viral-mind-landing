import { motion } from "framer-motion";
import { Bot, Brain, Cpu, Layers, Network, Zap } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Specialist chuyên môn",
    desc: "Mỗi AI đảm nhận một nhóm chuyên môn: Research, Content, SEO, AEO, Ads, Analytics, CRM...",
  },
  {
    icon: Network,
    title: "Phối hợp đa AI",
    desc: "Các AI Specialist trao đổi kết quả, dùng đầu ra của bước trước làm đầu vào cho bước sau.",
  },
  {
    icon: Layers,
    title: "Quy trình thống nhất",
    desc: "Từ mục tiêu kinh doanh đến lịch đăng, bài viết, ads, báo cáo - tất cả trong một pipeline.",
  },
  {
    icon: Cpu,
    title: "Tùy chỉnh theo doanh nghiệp",
    desc: "Học brand knowledge, khu vực, giọng điệu, lịch sử cái gì ra đơn - không dùng cấu hình chung.",
  },
  {
    icon: Bot,
    title: "Con người vẫn kiểm soát",
    desc: "Chưa duyệt thì chưa đăng. Chưa duyệt thì chưa chi ads. Bạn quyết định, AI thực hiện.",
  },
  {
    icon: Zap,
    title: "Không cần cài đặt, không cần học",
    desc: "ViralMinds thiết lập hệ thống, bạn chỉ cần phê duyệt. Tập trung vào kinh doanh, không vào công cụ.",
  },
];

export default function WhatIs() {
  return (
    <section id="what-is" className="relative py-20 md:py-28 lg:py-32">
      <div className="absolute inset-0 grid-bg noise-bg opacity-50" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-viral-accent/5 via-transparent to-transparent" aria-hidden="true" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="section-label">ViralMinds là gì?</span>
            <h2 className="section-title mt-2">Một AI Workforce được thiết kế cho cách doanh nghiệp của bạn vận hành</h2>
            <p className="section-subtitle mt-6">
              ViralMinds không phải một chatbot và cũng không chỉ là một công cụ tạo nội dung.
            </p>
            <p className="font-body body-lg text-viral-text-muted mt-4">
              ViralMinds kết hợp nhiều <strong className="text-viral-text">AI Specialist</strong>, mỗi AI đảm nhận một nhóm chuyên môn trong Digital Marketing và được phối hợp thông qua một hệ thống thống nhất.
            </p>
            <p className="font-body body-lg text-viral-text-muted mt-4">
              Thay vì sử dụng nhiều AI riêng lẻ cho từng công việc, doanh nghiệp có thể giao mục tiêu và để ViralMinds hỗ trợ điều phối những công việc cần thiết để hoàn thành mục tiêu đó.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-viral-bg-tertiary border border-viral-border rounded-card-md font-mono label-sm text-viral-text-muted">
                Một hệ thống
              </span>
              <span className="px-3 py-1.5 bg-viral-bg-tertiary border border-viral-border rounded-card-md font-mono label-sm text-viral-text-muted">
                Nhiều chuyên môn
              </span>
              <span className="px-3 py-1.5 bg-viral-accent/20 border border-viral-accent/30 rounded-card-md font-mono label-sm text-viral-accent">
                Một quy trình thống nhất
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.article
                key={feature.title}
                className="card card-hover p-6"
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
              >
                <div className="w-10 h-10 rounded-card-md bg-viral-bg-tertiary flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-viral-accent" aria-hidden="true" />
                </div>
                <h3 className="font-display heading-sm text-viral-text mb-2">{feature.title}</h3>
                <p className="font-body body-sm text-viral-text-muted">{feature.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}