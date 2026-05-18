"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const houses = [
  {
    id: 1,
    name: "Капсула-20",
    slug: "capsule-20",
    area: "20 м²",
    price: "890 000 ₽",
    image: "/about-photo-1.jpg",
    description: "Компактный дом для одного или пары. Идеален как гостевой домик или офис.",
    features: ["1 комната", "Санузел", "Мини-кухня", "Панорамные окна"],
  },
  {
    id: 2,
    name: "Капсула-30",
    slug: "capsule-30",
    area: "30 м²",
    price: "1 290 000 ₽",
    image: "/about-photo-2.jpg",
    description: "Оптимальный размер для комфортной жизни. Полноценная кухня и спальня.",
    features: ["Спальня", "Гостиная", "Кухня", "Терраса"],
  },
  {
    id: 3,
    name: "Капсула-40",
    slug: "capsule-40",
    area: "40 м²",
    price: "1 690 000 ₽",
    image: "/about-photo-3.jpg",
    description: "Просторный дом для семьи. Две спальни и большая гостиная.",
    features: ["2 спальни", "Гостиная", "Кухня", "2 санузла"],
  },
  {
    id: 4,
    name: "Капсула-50",
    slug: "capsule-50",
    area: "50 м²",
    price: "2 190 000 ₽",
    image: "/about-photo-4.jpg",
    description: "Премиум модель с максимальным комфортом и умным домом.",
    features: ["3 комнаты", "Умный дом", "Климат-контроль", "Панорамное остекление"],
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
          <p className="text-accent text-sm font-medium tracking-wide uppercase mb-4">Каталог</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance">
            Выберите свой дом
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
            Четыре модели капсульных домов для любого стиля жизни. Прямые поставки из Китая с гарантией качества.
          </p>
        </div>

        {/* Houses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold">{house.name}</h3>
                    <p className="text-muted-foreground text-sm">{house.area}</p>
                  </div>
                </div>
                <p className="text-2xl font-semibold text-accent mb-4">{house.price}</p>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{house.description}</p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {house.features.slice(0, 3).map((feature, i) => (
                    <span key={i} className="px-2.5 py-1 bg-secondary rounded-full text-xs">
                      {feature}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-accent font-medium text-sm hover:gap-3 transition-all duration-300"
                >
                  Заказать
                  <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Price Note */}
        <p className="text-center text-muted-foreground text-sm mt-12">
          * Указана стоимость дома на заводе в Китае. Доставка и таможенные расходы рассчитываются отдельно.
        </p>
      </div>
    </section>
  );
}
