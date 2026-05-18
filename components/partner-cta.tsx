"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

export function PartnerCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelector(".cta-content")?.classList.add("animate-fade-up");
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 md:py-40">
      <div className="container">
        <div className="cta-content opacity-0 relative bg-foreground text-background rounded-[2rem] overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3" />
          
          <div className="relative z-10 p-10 md:p-16 lg:p-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-accent text-sm font-medium tracking-wide mb-4">
                  Партнёрская программа
                </p>
                <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
                  Зарабатывайте
                  <br />
                  вместе с нами
                </h2>
                <p className="mt-6 text-lg text-background/70 leading-relaxed max-w-md">
                  Станьте агентом или дилером GALAXY HOUSE. 
                  Мы обеспечим обучение, материалы и поддержку.
                </p>
                <a href="#contact" className="btn btn-primary mt-8">
                  Стать партнёром
                  <ArrowRight size={18} />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background/10 backdrop-blur-sm p-6 rounded-2xl">
                  <p className="text-4xl md:text-5xl font-bold text-accent">5%</p>
                  <p className="text-sm text-background/60 mt-2">комиссия агентам</p>
                </div>
                <div className="bg-background/10 backdrop-blur-sm p-6 rounded-2xl">
                  <p className="text-4xl md:text-5xl font-bold text-accent">10%</p>
                  <p className="text-sm text-background/60 mt-2">комиссия дилерам</p>
                </div>
                <div className="bg-background/10 backdrop-blur-sm p-6 rounded-2xl col-span-2">
                  <p className="text-2xl font-semibold">Бесплатное обучение</p>
                  <p className="text-sm text-background/60 mt-2">
                    Все материалы, презентации и поддержка менеджера
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
