"use client";

import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-muted/50 rounded-full blur-3xl" />

      <div className="container relative z-10 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tagline */}
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-8">
            Премиальная архитектура
          </p>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1.1] tracking-tight text-balance mb-8">
            Современный дом
            <br />
            <span className="italic text-accent">мечты</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed text-pretty">
            Капсульные дома премиум-класса из Китая с полным циклом услуг:
            от консультации до установки на вашем участке.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#catalog" className="btn btn-primary text-base px-8 py-4">
              Смотреть каталог
              <ArrowRight size={18} />
            </a>
            <a href="#process" className="btn btn-outline text-base px-8 py-4">
              Как это работает
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-20 relative">
          <div className="aspect-[16/9] max-w-5xl mx-auto rounded-2xl overflow-hidden bg-muted">
            <img
              src="/images/hero-house.jpg"
              alt="Современный капсульный дом"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Floating Stats */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-4 md:gap-8">
            <div className="bg-card px-6 py-4 rounded-xl shadow-lg text-center">
              <p className="text-2xl md:text-3xl font-serif font-bold">5+</p>
              <p className="text-xs text-muted-foreground">лет опыта</p>
            </div>
            <div className="bg-card px-6 py-4 rounded-xl shadow-lg text-center">
              <p className="text-2xl md:text-3xl font-serif font-bold">200+</p>
              <p className="text-xs text-muted-foreground">домов</p>
            </div>
            <div className="bg-card px-6 py-4 rounded-xl shadow-lg text-center">
              <p className="text-2xl md:text-3xl font-serif font-bold">50+</p>
              <p className="text-xs text-muted-foreground">партнёров</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mt-24 flex flex-col sm:flex-row items-center justify-between max-w-3xl mx-auto">
          <a href="#about" className="group flex flex-col items-center gap-3 text-center">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Узнать больше
            </span>
            <span className="w-10 h-10 rounded-full border border-accent flex items-center justify-center group-hover:bg-accent transition-colors">
              <ArrowRight size={16} className="text-accent group-hover:text-accent-foreground transition-colors" />
            </span>
          </a>
          <a href="#catalog" className="group flex flex-col items-center gap-3 text-center mt-8 sm:mt-0">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Посмотреть дома
            </span>
            <span className="w-10 h-10 rounded-full border border-accent flex items-center justify-center group-hover:bg-accent transition-colors">
              <ArrowRight size={16} className="text-accent group-hover:text-accent-foreground transition-colors" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
