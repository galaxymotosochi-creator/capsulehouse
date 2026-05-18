import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              GALAXY HOUSE
            </Link>
            <p className="mt-4 text-muted-foreground max-w-sm leading-relaxed">
              Капсульные дома премиум-класса с доставкой по всей России.
              Современный дизайн, умные технологии, честный сервис.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <nav className="flex flex-col gap-3">
              <a href="#catalog" className="text-muted-foreground hover:text-foreground transition-colors">
                Каталог
              </a>
              <a href="#advantages" className="text-muted-foreground hover:text-foreground transition-colors">
                Преимущества
              </a>
              <a href="#process" className="text-muted-foreground hover:text-foreground transition-colors">
                Как это работает
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Контакты
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="flex flex-col gap-3 text-muted-foreground">
              <a href="tel:+78008888888" className="hover:text-foreground transition-colors">
                +7 (800) 888-88-88
              </a>
              <a href="mailto:info@galaxyhouse.ru" className="hover:text-foreground transition-colors">
                info@galaxyhouse.ru
              </a>
              <p>г. Уссурийск</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} GALAXY HOUSE. Все права защищены.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Публичная оферта
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
