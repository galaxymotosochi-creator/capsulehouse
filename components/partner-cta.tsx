"use client";

import { ArrowRight } from "lucide-react";

export function PartnerCTA() {
  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="relative bg-gradient-to-br from-foreground to-foreground/90 text-primary-foreground rounded-3xl overflow-hidden p-8 md:p-16">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary-foreground/60 mb-4">
                Партнёрская программа
              </p>
              <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-6 text-balance">
                Станьте нашим
                <br />
                <span className="italic text-accent">партнёром</span>
              </h2>
              <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8">
                Зарабатывайте на продаже капсульных домов. Агентам комиссия до 5%, 
                дилерам до 10% от стоимости каждого дома.
              </p>
              <a href="#contact" className="btn bg-accent text-accent-foreground hover:opacity-90">
                Стать партнёром
                <ArrowRight size={18} />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-xl">
                <p className="text-4xl font-serif font-bold text-accent">5%</p>
                <p className="text-sm text-primary-foreground/60 mt-2">комиссия для агентов</p>
                <p className="text-xs text-primary-foreground/40 mt-1">физические лица</p>
              </div>
              <div className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-xl">
                <p className="text-4xl font-serif font-bold text-accent">10%</p>
                <p className="text-sm text-primary-foreground/60 mt-2">комиссия для дилеров</p>
                <p className="text-xs text-primary-foreground/40 mt-1">юридические лица</p>
              </div>
              <div className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-xl col-span-2">
                <p className="text-2xl font-serif font-bold">Бесплатное обучение</p>
                <p className="text-sm text-primary-foreground/60 mt-2">
                  Предоставляем все материалы и поддержку для успешных продаж
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
