"use client";

import { ArrowRight } from "lucide-react";

const houses = [
  {
    id: 1,
    name: "Capsule S",
    area: "25 м²",
    price: "от 1 200 000 ₽",
    image: "/about-photo-1.jpg",
    description: "Компактный дом для одного или пары",
  },
  {
    id: 2,
    name: "Capsule M",
    area: "40 м²",
    price: "от 1 800 000 ₽",
    image: "/about-photo-2.jpg",
    description: "Оптимальный выбор для небольшой семьи",
  },
  {
    id: 3,
    name: "Capsule L",
    area: "60 м²",
    price: "от 2 500 000 ₽",
    image: "/about-photo-3.jpg",
    description: "Просторный дом с двумя спальнями",
  },
];

export function Catalog() {
  return (
    <section id="catalog" className="py-24 md:py-32">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Каталог
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-balance">
            Выберите свой
            <br />
            <span className="italic text-accent">идеальный дом</span>
          </h2>
        </div>

        {/* Houses Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {houses.map((house) => (
            <article
              key={house.id}
              className="group bg-card rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={house.image}
                  alt={house.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-serif font-semibold">{house.name}</h3>
                    <p className="text-sm text-muted-foreground">{house.area}</p>
                  </div>
                  <p className="text-sm font-medium text-accent">{house.price}</p>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  {house.description}
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-accent transition-colors"
                >
                  Подробнее
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <a href="#contact" className="btn btn-outline">
            Смотреть все модели
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
