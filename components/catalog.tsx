"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const houses = [
  {
    id: 1,
    name: "Capsule S",
    area: "25 м²",
    price: "от 1.2 млн ₽",
    image: "/about-photo-1.jpg",
    description: "Компактный дом для минималиста",
    features: ["Спальня", "Кухня-гостиная", "Санузел"],
  },
  {
    id: 2,
    name: "Capsule M",
    area: "40 м²",
    price: "от 1.8 млн ₽",
    image: "/about-photo-2.jpg",
    description: "Идеальный баланс пространства",
    features: ["2 комнаты", "Терраса", "Панорамные окна"],
  },
  {
    id: 3,
    name: "Capsule L",
    area: "60 м²",
    price: "от 2.5 млн ₽",
    image: "/about-photo-3.jpg",
    description: "Просторный семейный дом",
    features: ["3 комнаты", "2 санузла", "Умный дом"],
  },
];

export function Catalog() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".animate-on-scroll");
            elements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("animate-scale-in");
              }, i * 150);
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
    <section id="catalog" ref={sectionRef} className="py-32 md:py-40">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance">
            Выберите свой дом
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
            Три модели для любого стиля жизни. Каждая с премиальной отделкой и умными технологиями.
          </p>
        </div>

        {/* Houses Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {houses.map((house) => (
            <article
              key={house.id}
              className="animate-on-scroll opacity-0 group bg-card rounded-3xl overflow-hidden border border-transparent hover:border-border transition-all duration-500 hover:shadow-xl"
            >
              <div className="aspect-[4/3] overflow-hidden bg-secondary">
                <img
                  src={house.image}
                  alt={house.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold">{house.name}</h3>
                    <p className="text-muted-foreground">{house.area}</p>
                  </div>
                  <p className="text-accent font-semibold">{house.price}</p>
                </div>
                <p className="text-muted-foreground mb-6">{house.description}</p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {house.features.map((feature, i) => (
                    <span key={i} className="px-3 py-1 bg-secondary rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-accent font-medium hover:gap-4 transition-all duration-300"
                >
                  Подробнее
                  <ArrowRight size={18} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
