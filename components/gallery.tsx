"use client";

import { useEffect, useRef } from "react";

const gallery = [
  { src: "/about-photo-1.jpg", alt: "Капсульный дом на природе", span: "md:col-span-2 md:row-span-2" },
  { src: "/about-photo-2.jpg", alt: "Интерьер гостиной", span: "" },
  { src: "/about-photo-3.jpg", alt: "Панорамные окна с видом", span: "" },
  { src: "/about-photo-4.jpg", alt: "Современная кухня", span: "md:col-span-2" },
  { src: "/about-photo-5.jpg", alt: "Уютная спальня", span: "" },
  { src: "/about-photo-6.jpg", alt: "Терраса с видом на горы", span: "" },
];

export function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".gallery-item");
            elements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("animate-scale-in");
              }, i * 100);
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
    <section ref={sectionRef} className="py-32 md:py-40">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-wide uppercase mb-4">Галерея</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
            Реальные фото
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-xl mx-auto">
            Наши дома в реальных условиях. Посмотрите, как они выглядят изнутри и снаружи.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {gallery.map((item, index) => (
            <div
              key={index}
              className={`gallery-item opacity-0 group relative overflow-hidden rounded-2xl md:rounded-3xl bg-secondary cursor-pointer ${item.span}`}
            >
              <div className={`${item.span.includes("row-span-2") ? "aspect-square" : "aspect-[4/3]"}`}>
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6">
                <p className="text-white text-sm md:text-base font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {item.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
