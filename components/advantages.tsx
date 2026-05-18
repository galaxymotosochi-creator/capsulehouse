"use client";

import { useEffect, useRef } from "react";
import { Shield, Truck, Zap, Sparkles } from "lucide-react";

const advantages = [
  {
    icon: Shield,
    title: "Гарантия 5 лет",
    description: "Полная гарантия на конструкцию и материалы. Сервисная поддержка 24/7.",
  },
  {
    icon: Truck,
    title: "Доставка по России",
    description: "Логистика из Китая до вашего участка. Установка за 1-3 дня.",
  },
  {
    icon: Zap,
    title: "Умный дом",
    description: "Климат-контроль, освещение и безопасность управляются со смартфона.",
  },
  {
    icon: Sparkles,
    title: "Премиум качество",
    description: "Панорамные окна, теплоизоляция и отделка европейского уровня.",
  },
];

export function Advantages() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const left = entry.target.querySelector(".animate-left");
            const right = entry.target.querySelector(".animate-right");
            left?.classList.add("animate-slide-left");
            right?.classList.add("animate-slide-right");
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

  return (
    <section id="advantages" ref={sectionRef} className="py-32 md:py-40 bg-secondary/50">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Text */}
          <div className="animate-left opacity-0">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
              Почему
              <br />
              <span className="gradient-text">GALAXY HOUSE?</span>
            </h2>
            <p className="mt-8 text-xl text-muted-foreground leading-relaxed">
              За 5 лет мы доставили более 200 домов по всей России. 
              Наши клиенты ценят качество, прозрачность и сервис.
            </p>
            
            {/* Mini stats */}
            <div className="mt-12 flex gap-12">
              <div>
                <p className="text-5xl font-semibold">98%</p>
                <p className="text-muted-foreground mt-1">довольных клиентов</p>
              </div>
              <div>
                <p className="text-5xl font-semibold">50+</p>
                <p className="text-muted-foreground mt-1">партнёров</p>
              </div>
            </div>
          </div>

          {/* Right Column - Cards */}
          <div className="animate-right opacity-0 grid sm:grid-cols-2 gap-4">
            {advantages.map((item, index) => (
              <div
                key={index}
                className="group bg-background p-6 rounded-2xl hover:shadow-lg transition-all duration-500 border border-transparent hover:border-border"
              >
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon size={24} className="text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
