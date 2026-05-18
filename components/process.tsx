"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Консультация",
    description: "Обсуждаем ваши пожелания, подбираем модель и рассчитываем стоимость.",
  },
  {
    number: "02",
    title: "Договор",
    description: "Заключаем договор, вносите предоплату 30%. Начинаем производство.",
  },
  {
    number: "03",
    title: "Производство",
    description: "Дом изготавливается 4-6 недель. Отправляем фото и видеоотчёты.",
  },
  {
    number: "04",
    title: "Доставка",
    description: "Доставляем до участка, устанавливаем и подключаем коммуникации.",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".step-item");
            elements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("animate-fade-up");
              }, i * 200);
            });
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
    <section id="process" ref={sectionRef} className="py-32 md:py-40">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
            Как это работает
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
            От первого звонка до ключей — простой и прозрачный процесс
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2 hidden md:block" />
          
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`step-item opacity-0 relative grid md:grid-cols-2 gap-8 md:gap-16 ${
                  index % 2 === 0 ? "" : "md:text-right"
                }`}
              >
                {/* Content */}
                <div className={`${index % 2 === 0 ? "md:pr-16" : "md:order-2 md:pl-16"}`}>
                  <div className={`${index % 2 === 1 ? "md:text-right" : ""}`}>
                    <span className="inline-block text-7xl md:text-8xl font-bold text-secondary mb-4">
                      {step.number}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Circle marker */}
                <div className="hidden md:flex absolute left-1/2 top-12 -translate-x-1/2 w-4 h-4 rounded-full bg-accent animate-pulse-glow" />

                {/* Spacer for grid alignment */}
                <div className={`hidden md:block ${index % 2 === 0 ? "md:order-2" : ""}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
