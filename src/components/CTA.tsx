import { motion } from "framer-motion";
import { MessageSquare, Mail, ArrowRight, Target } from "lucide-react";
import { useState } from "react";

const formFields = [
  { name: "name", label: "Họ và tên", type: "text", placeholder: "Nguyễn Văn A", required: true },
  { name: "company", label: "Tên doanh nghiệp", type: "text", placeholder: "Công ty TNHH ABC", required: true },
  { name: "industry", label: "Ngành / lĩnh vực kinh doanh", type: "text", placeholder: "F&B / Spa / Shop / DTC / Khác", required: true },
  { name: "channels", label: "Kênh đang sử dụng", type: "text", placeholder: "Facebook, TikTok, Zalo, Website...", required: false },
];

const painOptions = [
  "Khó xây dựng nội dung",
  "Mất nhiều thời gian vận hành Marketing",
  "Quản lý nhiều công cụ rời rạc",
  "Chưa có website",
  "Website chưa có lượng truy cập tốt",
  "Quảng cáo chưa hiệu quả",
  "Khó theo dõi và phân tích dữ liệu",
  "Chăm sóc khách hàng chưa hiệu quả",
  "Khác",
];

export default function CTA() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    industry: "",
    channels: "",
    mainPain: "",
    goal: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    formFields.forEach(field => {
      if (field.required && !formData[field.name as keyof typeof formData]) {
        newErrors[field.name] = `${field.label} là bắt buộc`;
      }
    });
    if (!formData.mainPain) newErrors.mainPain = "Vui lòng chọn vấn đề chính";
    if (!formData.goal) newErrors.goal = "Vui lòng nhập mục tiêu";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitted(true);
    // TODO: Submit to backend / Supabase / CRM
    console.log("Form submitted:", formData);
  };

  if (submitted) {
    return (
      <section id="contact" className="relative py-20 md:py-28 lg:py-32">
        <div className="absolute inset-0 grid-bg noise-bg opacity-50" aria-hidden="true" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-2xl mx-auto text-center glass-panel rounded-card-xl p-12"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-16 h-16 rounded-full bg-viral-ok/20 flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-viral-ok" aria-hidden="true" />
            </div>
            <h2 className="font-display heading-lg text-viral-text mb-4">Cảm ơn bạn đã đăng ký!</h2>
            <p className="font-body body-lg text-viral-text-muted mb-8">
              Chúng tôi đã nhận thông tin và sẽ liên hệ lại trong vòng 24h để sắp xếp buổi tư vấn/demo phù hợp.
            </p>
            <a href="#" onClick={() => setSubmitted(false)} className="btn-primary inline-flex">
              <span>Quay lại trang chủ</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative py-20 md:py-28 lg:py-32">
      <div className="absolute inset-0 grid-bg noise-bg opacity-50" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-viral-bg-secondary/50 via-transparent to-transparent" aria-hidden="true" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <span className="section-label">CTA cuối</span>
          <h2 className="section-title">Marketing của bạn đang mất nhiều thời gian nhất ở đâu?</h2>
          <p className="section-subtitle mt-4">
            Hãy chia sẻ vấn đề doanh nghiệp đang gặp phải. ViralMinds sẽ cùng bạn xác định những công việc có thể ứng dụng AI và đề xuất cách xây dựng AI Workforce phù hợp.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="glass-panel rounded-card-xl p-6 md:p-8 space-y-6" noValidate>
            <div className="grid md:grid-cols-2 gap-6">
              {formFields.map((field) => (
                <div key={field.name} className={field.name === "channels" ? "md:col-span-2" : ""}>
                  <label htmlFor={field.name} className="block font-mono label-sm text-viral-text-muted mb-2">
                    {field.label} {field.required && <span className="text-viral-alert" aria-hidden="true">*</span>}
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={`w-full px-4 py-3 rounded-card-md bg-viral-bg/50 border ${errors[field.name] ? 'border-viral-alert' : 'border-viral-border'} focus:border-viral-accent focus:ring-2 focus:ring-viral-accent/20 focus:bg-viral-bg transition-all duration-fast font-body body-md text-viral-text placeholder-viral-text-subtle`}
                    aria-invalid={errors[field.name] ? "true" : "false"}
                    aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                  />
                  {errors[field.name] && (
                    <p id={`${field.name}-error`} className="mt-1 font-body body-sm text-viral-alert" role="alert">{errors[field.name]}</p>
                  )}
                </div>
              ))}
            </div>

            <div>
              <label className="block font-mono label-sm text-viral-text-muted mb-2">
                Vấn đề doanh nghiệp đang gặp phải <span className="text-viral-alert" aria-hidden="true">*</span>
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {painOptions.map((pain) => (
                  <label key={pain} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="mainPain"
                      value={pain}
                      checked={formData.mainPain === pain}
                      onChange={handleChange}
                      className="w-4 h-4 rounded border-viral-border bg-viral-bg text-viral-accent focus:ring-2 focus:ring-viral-accent/20 accent-viral-accent"
                    />
                    <span className="font-body body-sm text-viral-text-muted group-hover:text-viral-text transition-colors">{pain}</span>
                  </label>
                ))}
              </div>
              {errors.mainPain && <p className="mt-1 font-body body-sm text-viral-alert" role="alert">{errors.mainPain}</p>}
            </div>

            <div>
              <label htmlFor="goal" className="block font-mono label-sm text-viral-text-muted mb-2">
                Mục tiêu muốn cải thiện <span className="text-viral-alert" aria-hidden="true">*</span>
              </label>
              <textarea
                id="goal"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                placeholder="Ví dụ: Muốn tăng 30% lead trong 3 tháng, tự động hóa quy trình content..."
                rows={3}
                className={`w-full px-4 py-3 rounded-card-md bg-viral-bg/50 border ${errors.goal ? 'border-viral-alert' : 'border-viral-border'} focus:border-viral-accent focus:ring-2 focus:ring-viral-accent/20 focus:bg-viral-bg transition-all duration-fast font-body body-md text-viral-text placeholder-viral-text-subtle resize-none`}
                aria-invalid={errors.goal ? "true" : "false"}
              />
              {errors.goal && <p className="mt-1 font-body body-sm text-viral-alert" role="alert">{errors.goal}</p>}
            </div>

            <button type="submit" className="btn-primary w-full md:w-auto group">
              <span>Đăng ký tư vấn / Demo</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <motion.div
            className="mt-10 pt-10 border-t border-viral-border text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-body body-md text-viral-text-muted mb-4">Hoặc liên hệ trực tiếp:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://zalo.me/0374149427"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2 w-full sm:w-auto"
              >
                <MessageSquare className="w-5 h-5" aria-hidden="true" />
                <span>Zalo: 0374 149 427</span>
              </a>
              <a
                href="mailto:contact@viralminds.vn"
                className="btn-secondary flex items-center gap-2 w-full sm:w-auto"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
                <span>Email: contact@viralminds.vn</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
