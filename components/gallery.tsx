"use client";

import { useEffect, useRef } from "react";

const gallery = [
  { src: "/about-photo-1.jpg", alt: "Интерьер капсульного дома", span: "col-span-2 row-span-2" },
  { src: "/about-photo-2.jpg", alt: "Экстерьер на природе", span: "" },
  { src: "/about-photo-3.jpg", alt: "Панорамные окна", span: "" },
  { src: "/about-photo-4.jpg", alt: "Современная кухня", span: "col-span-2" },
  { src: "/about-photo-5.jpg", alt: "Уютная спальня", span: "" },
  { src: "/about-photo-6.jpg", alt: "Терраса с видом", span: "" },
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
    <section ref={sectionRef} className="py-32 md:py-40 bg-secondary/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
            Галерея
          </h2>
          <p className="mt-6 text-xl text-muted-foreground">
            Реальные фотографии наших домов
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map((item, index) => (
            <div
              key={index}
              className={`gallery-item opacity-0 group relative overflow-hidden rounded-2xl bg-muted cursor-pointer ${item.span}`}
            >
              <div className="aspect-square">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium">
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
