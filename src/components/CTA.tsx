import { motion } from "framer-motion";
import { MessageSquare, Mail, ArrowRight, Target } from "lucide-react";
import { useState } from "react";

const formFields = [
  { name: "name", label: "Tên của bạn", type: "text", placeholder: "Nguyễn Văn A", required: true },
  { name: "contact", label: "Số điện thoại / Zalo", type: "text", placeholder: "0xxx xxx xxx", required: true },
  { name: "company", label: "Doanh nghiệp", type: "text", placeholder: "Tên công ty", required: true },
  { name: "industry", label: "Ngành / sản phẩm", type: "text", placeholder: "F&B, spa, giáo dục...", required: true },
];

const painOptions = [
  "Nội dung",
  "Website / SEO",
  "Quảng cáo",
  "Dữ liệu / CRM",
  "Chưa rõ",
];

export default function CTA() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    company: "",
    industry: "",
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
    if (!formData.mainPain) newErrors.mainPain = "Vui lòng chọn nhu cầu chính";
    if (!formData.goal) newErrors.goal = "Vui lòng nhập mục tiêu chính";

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
              Chúng tôi đã nhận thông tin và sẽ liên hệ lại để sắp xếp lịch tư vấn phù hợp.
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
    <section id="contact" className="relative scroll-mt-20 py-14 sm:py-20 lg:py-24">
      <div className="absolute inset-0 grid-bg noise-bg opacity-50" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-viral-bg-secondary/50 via-transparent to-transparent" aria-hidden="true" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-7 sm:mb-10">
          <span className="section-label">Liên hệ tư vấn</span>
          <h2 className="section-title">Trao đổi nhanh với ViralMinds</h2>
          <p className="text-sm sm:text-base md:text-body-lg text-viral-text-muted mt-3 sm:mt-4 max-w-2xl mx-auto leading-relaxed">
            Chọn Zalo/email để trao đổi ngay, hoặc gửi form ngắn để ViralMinds nắm nhu cầu và tư vấn hướng triển khai phù hợp.
          </p>
        </div>

        <motion.div
          className="mx-auto mb-5 sm:mb-6 grid w-full max-w-[560px] grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <a
            href="https://zalo.me/0374149427"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary min-h-[48px] sm:min-h-[52px] w-full gap-2 px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider justify-center"
          >
            <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            <span>Nhắn Zalo Ngay</span>
          </a>
          <a
            href="mailto:viralminds.admin@gmail.com"
            className="btn-secondary min-h-[48px] sm:min-h-[52px] w-full gap-2 px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider justify-center"
          >
            <Mail className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            <span>Gửi Email Trực Tiếp</span>
          </a>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="glass-panel mx-auto max-w-4xl rounded-2xl sm:rounded-card-xl p-4 sm:p-6 lg:p-8"
          noValidate
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          <div className="mb-4 sm:mb-5">
            <span className="font-mono text-label-sm uppercase text-viral-accent">Form ngắn</span>
            <h3 className="mt-1.5 font-display text-lg sm:text-heading-xl text-viral-text font-bold">Gửi thông tin tư vấn</h3>
            <p className="mt-1 font-body text-xs sm:text-body-sm text-viral-text-muted">
              ViralMinds sẽ nắm nhu cầu và phản hồi hướng triển khai phù hợp.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              {formFields.map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="block font-mono text-xs sm:label-sm text-viral-text-muted mb-1.5 sm:mb-2">
                    {field.label} {field.required && <span className="text-viral-alert" aria-hidden="true">*</span>}
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-card-md bg-viral-bg/60 border ${errors[field.name] ? 'border-viral-alert' : 'border-viral-border'} focus:border-viral-accent focus:ring-2 focus:ring-viral-accent/20 focus:bg-viral-bg transition-all duration-fast font-body text-xs sm:text-sm text-viral-text placeholder-viral-text-subtle`}
                    aria-invalid={errors[field.name] ? "true" : "false"}
                    aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                  />
                  {errors[field.name] && (
                    <p id={`${field.name}-error`} className="mt-1 font-body text-xs text-viral-alert" role="alert">{errors[field.name]}</p>
                  )}
                </div>
              ))}
            </div>

            <div>
              <label className="block font-mono text-xs sm:label-sm text-viral-text-muted mb-2 sm:mb-3">
                Bạn muốn cải thiện phần nào? <span className="text-viral-alert" aria-hidden="true">*</span>
              </label>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {painOptions.map((pain) => (
                  <label key={pain} className={`cursor-pointer rounded-full border px-3 sm:px-4 py-1.5 sm:py-2 transition-all text-xs sm:text-sm ${formData.mainPain === pain ? 'border-viral-accent bg-viral-accent/15 text-viral-text' : 'border-viral-border text-viral-text-muted hover:border-viral-border-hover'}`}>
                    <input
                      type="radio"
                      name="mainPain"
                      value={pain}
                      checked={formData.mainPain === pain}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="font-body">{pain}</span>
                  </label>
                ))}
              </div>
              {errors.mainPain && <p className="mt-1 font-body text-xs text-viral-alert" role="alert">{errors.mainPain}</p>}
            </div>

            <div>
              <label htmlFor="goal" className="block font-mono text-xs sm:label-sm text-viral-text-muted mb-1.5 sm:mb-2">
                Mục tiêu chính <span className="text-viral-alert" aria-hidden="true">*</span>
              </label>
              <textarea
                id="goal"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                placeholder="Ví dụ: tăng lead, giảm thời gian làm content..."
                rows={3}
                className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-card-md bg-viral-bg/60 border ${errors.goal ? 'border-viral-alert' : 'border-viral-border'} focus:border-viral-accent focus:ring-2 focus:ring-viral-accent/20 focus:bg-viral-bg transition-all duration-fast font-body text-xs sm:text-sm text-viral-text placeholder-viral-text-subtle resize-none`}
                aria-invalid={errors.goal ? "true" : "false"}
              />
              {errors.goal && <p className="mt-1 font-body text-xs text-viral-alert" role="alert">{errors.goal}</p>}
            </div>

            <button type="submit" className="btn-primary w-full py-3.5 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider group shadow-accent">
              <span>Gửi yêu cầu tư vấn</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
