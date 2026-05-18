import { Shield, Truck, Clock, Award } from "lucide-react";

const advantages = [
  {
    icon: Shield,
    title: "Гарантия качества",
    description: "Все дома проходят строгий контроль качества на заводе и при приёмке в России",
  },
  {
    icon: Truck,
    title: "Доставка по всей России",
    description: "Организуем логистику из Китая до вашего участка в любом регионе страны",
  },
  {
    icon: Clock,
    title: "Быстрая сборка",
    description: "Модульная конструкция позволяет собрать дом за 1-3 дня на участке",
  },
  {
    icon: Award,
    title: "Современный дизайн",
    description: "Минималистичная архитектура с панорамными окнами и премиальной отделкой",
  },
];

export function Advantages() {
  return (
    <section id="advantages" className="py-24 md:py-32 bg-secondary/50">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text */}
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Почему мы
            </p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-8 text-balance">
              Преимущества работы
              <br />
              с <span className="italic text-accent">GALAXY HOUSE</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-pretty">
              Мы специализируемся на поставках современных капсульных домов из Китая. 
              За 5 лет работы мы выстроили надёжные партнёрские отношения с лучшими 
              производителями и отработали все процессы доставки и установки.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="text-4xl font-serif font-bold">200+</p>
                <p className="text-sm text-muted-foreground">домов доставлено</p>
              </div>
              <div>
                <p className="text-4xl font-serif font-bold">15+</p>
                <p className="text-sm text-muted-foreground">регионов России</p>
              </div>
            </div>
          </div>

          {/* Right Column - Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {advantages.map((item, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <item.icon size={24} className="text-accent" />
                </div>
                <h3 className="font-serif font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
