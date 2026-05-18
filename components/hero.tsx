"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = heroRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-background" />
      
      {/* Animated background orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl animate-float delay-500" />

      <div className="container relative z-10 pt-32 pb-20 text-center">
        {/* Tagline */}
        <p className="animate-on-scroll opacity-0 delay-100 text-sm font-medium text-accent tracking-wide mb-6">
          Революция в архитектуре
        </p>

        {/* Main Headline - Apple style big typography */}
        <h1 className="animate-on-scroll opacity-0 delay-200 text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-semibold leading-[1.05] tracking-tight text-balance max-w-4xl mx-auto">
          Дом мечты.
          <br />
          <span className="gradient-text">Уже сегодня.</span>
        </h1>

        {/* Subheadline */}
        <p className="animate-on-scroll opacity-0 delay-300 mt-8 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
          Капсульные дома премиум-класса с панорамным остеклением, 
          умным климатом и доставкой до вашего участка.
        </p>

        {/* CTA Buttons */}
        <div className="animate-on-scroll opacity-0 delay-400 mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#catalog" className="btn btn-primary px-8 py-4 text-lg">
            Смотреть модели
          </a>
          <a href="#process" className="btn btn-secondary px-8 py-4 text-lg group">
            Узнать больше
            <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Stats */}
        <div className="animate-on-scroll opacity-0 delay-500 mt-20 flex flex-wrap items-center justify-center gap-12 md:gap-20">
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-semibold">200+</p>
            <p className="text-sm text-muted-foreground mt-1">домов установлено</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-semibold">5 лет</p>
            <p className="text-sm text-muted-foreground mt-1">на рынке</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-semibold">15+</p>
            <p className="text-sm text-muted-foreground mt-1">регионов</p>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="animate-on-scroll opacity-0 delay-600 w-full max-w-6xl mx-auto px-6 mt-8">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="/images/hero-house.jpg"
            alt="Современный капсульный дом GALAXY HOUSE"
            className="w-full h-full object-cover"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown size={28} className="text-muted-foreground" />
      </div>
    </section>
  );
}
