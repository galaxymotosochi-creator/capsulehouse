"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#catalog", label: "Каталог" },
    { href: "#advantages", label: "Преимущества" },
    { href: "#process", label: "Процесс" },
    { href: "#contact", label: "Контакты" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-border/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className={`flex flex-col transition-colors duration-300 ${
              isScrolled ? "text-foreground" : "text-white"
            }`}
          >
            <span className="text-xl font-semibold tracking-tight">GALAXY HOUSE</span>
            <span className="text-[10px] tracking-[0.2em] opacity-70">888.ESTATE</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 hover:opacity-70 ${
                  isScrolled ? "text-foreground" : "text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="tel:+78008888888" 
              className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              <Phone size={16} />
              <span>+7 (800) 888-88-88</span>
            </a>
            <a
              href="#contact"
              className={`btn text-sm px-5 py-2 ${
                isScrolled 
                  ? "bg-accent text-white hover:bg-accent/90" 
                  : "bg-white text-black hover:bg-white/90"
              }`}
            >
              Заказать
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-full transition-colors ${
              isScrolled 
                ? "hover:bg-secondary text-foreground" 
                : "hover:bg-white/10 text-white"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-border/50 overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="p-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-lg py-2 text-foreground hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a 
              href="tel:+78008888888" 
              className="flex items-center gap-2 text-foreground py-2"
            >
              <Phone size={18} />
              <span>+7 (800) 888-88-88</span>
            </a>
            <a
              href="#contact"
              className="btn btn-primary text-center mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Заказать
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
