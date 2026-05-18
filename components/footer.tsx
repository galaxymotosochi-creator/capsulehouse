import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-serif font-bold tracking-tight">
              <span className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                GALAXY HOUSE
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-sm leading-relaxed">
              Современные капсульные дома премиум-класса из Китая с полным циклом услуг 
              от консультации до установки.
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
                Как мы работаем
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
              <p>г. Уссурийск, ул. Главная, 1</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GALAXY HOUSE. Все права защищены.
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
