"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Phone, Mail, MapPin, CheckCircle } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelector(".contact-left")?.classList.add("animate-slide-left");
            entry.target.querySelector(".contact-right")?.classList.add("animate-slide-right");
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", phone: "", city: "", message: "" });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-32 md:py-40 bg-foreground text-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Info */}
          <div className="contact-left opacity-0">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
              Готовы начать?
            </h2>
            <p className="mt-6 text-xl text-background/70 leading-relaxed">
              Оставьте заявку, и мы свяжемся с вами в течение часа.
              Ответим на все вопросы и поможем выбрать идеальный дом.
            </p>

            {/* Contact Info */}
            <div className="mt-12 space-y-6">
              <a href="tel:+78008888888" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                  <Phone size={20} className="text-accent group-hover:text-background transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-background/50">Телефон</p>
                  <p className="font-medium">+7 (800) 888-88-88</p>
                </div>
              </a>
              <a href="mailto:info@galaxyhouse.ru" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                  <Mail size={20} className="text-accent group-hover:text-background transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-background/50">Email</p>
                  <p className="font-medium">info@galaxyhouse.ru</p>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center">
                  <MapPin size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-background/50">Офис</p>
                  <p className="font-medium">г. Уссурийск</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="contact-right opacity-0">
            <div className="bg-background text-foreground p-8 md:p-10 rounded-3xl">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Заявка отправлена!</h3>
                  <p className="text-muted-foreground">
                    Мы свяжемся с вами в ближайшее время.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ваше имя</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      placeholder="Как к вам обращаться?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Телефон</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Город</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      placeholder="Для расчёта доставки"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Сообщение</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                      placeholder="Расскажите о ваших пожеланиях..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn btn-primary py-4 text-base disabled:opacity-70"
                  >
                    {isSubmitting ? "Отправка..." : "Отправить заявку"}
                    <Send size={18} />
                  </button>
                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
