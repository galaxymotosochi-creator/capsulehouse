"use client";

import { useEffect, useRef } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".animate-on-scroll");
            elements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("animate-fade-up");
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-house.jpg')" }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] animate-float delay-500" />

      <div className="container relative z-10 pt-24 pb-32 text-center">
        {/* Tagline */}
        <p className="animate-on-scroll opacity-0 text-white/80 text-sm font-medium tracking-[0.3em] uppercase mb-8">
          888.ESTATE представляет
        </p>

        {/* Main Headline */}
        <h1 className="animate-on-scroll opacity-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] tracking-tight text-white max-w-5xl mx-auto">
          GALAXY HOUSE
        </h1>
        
        <p className="animate-on-scroll opacity-0 mt-6 text-2xl md:text-3xl lg:text-4xl text-white/90 font-light">
          Капсульные дома из Китая
        </p>

        {/* Subheadline */}
        <p className="animate-on-scroll opacity-0 mt-8 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          Современные модульные решения для комфортной жизни. 
          Доставка и установка под ключ по всей России.
        </p>

        {/* CTA Buttons */}
        <div className="animate-on-scroll opacity-0 mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#catalog" 
            className="group inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-white/90 transition-all duration-300 hover:scale-105"
          >
            Смотреть каталог
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 border border-white/40 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 transition-all duration-300"
          >
            Получить консультацию
          </a>
        </div>

        {/* Stats */}
        <div className="animate-on-scroll opacity-0 mt-24 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {[
            { value: "5+", label: "Лет на рынке" },
            { value: "200+", label: "Доставленных домов" },
            { value: "50+", label: "Партнёров" },
            { value: "15+", label: "Регионов РФ" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl md:text-5xl font-semibold text-white">{stat.value}</p>
              <p className="text-sm text-white/60 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#catalog" className="flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
          <span className="text-xs uppercase tracking-widest">Листайте</span>
          <ChevronDown size={28} />
        </a>
      </div>
    </section>
  );
}
