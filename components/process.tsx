"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Консультация",
    description: "Обсуждаем ваши пожелания, подбираем оптимальную модель дома и рассчитываем полную стоимость с доставкой.",
    image: "/step-1-consultation.jpg",
  },
  {
    number: "02",
    title: "Договор и оплата",
    description: "Заключаем договор, вносите предоплату 30%. Оставшиеся 70% — после отгрузки с завода.",
    image: "/step-2-contract.jpg",
  },
  {
    number: "03",
    title: "Производство",
    description: "Дом изготавливается на заводе 4-6 недель. Отправляем фото и видеоотчёты о ходе работ.",
    image: "/step-3-production.jpg",
  },
  {
    number: "04",
    title: "Доставка и установка",
    description: "Доставляем дом до вашего участка, устанавливаем на фундамент и подключаем все коммуникации.",
    image: "/step-4-delivery.jpg",
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="py-32 md:py-40 bg-secondary/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-accent text-sm font-medium tracking-wide uppercase mb-4">Процесс</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
            Как получить дом
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
            От первого звонка до заселения — простой и прозрачный процесс. Срок от заказа до установки: 8-12 недель.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-24">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step-item opacity-0 grid md:grid-cols-2 gap-12 lg:gap-20 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-secondary">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Step number badge */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? "md:order-1 md:text-right" : ""}`}>
                <h3 className="text-3xl md:text-4xl font-semibold mb-6">
                  {step.title}
                </h3>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
