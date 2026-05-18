const gallery = [
  { src: "/about-photo-1.jpg", alt: "Интерьер капсульного дома" },
  { src: "/about-photo-2.jpg", alt: "Экстерьер капсульного дома" },
  { src: "/about-photo-3.jpg", alt: "Панорамные окна" },
  { src: "/about-photo-4.jpg", alt: "Современная кухня" },
  { src: "/about-photo-5.jpg", alt: "Спальная зона" },
  { src: "/about-photo-6.jpg", alt: "Терраса с видом" },
];

export function Gallery() {
  return (
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Галерея
          </p>
          <h2 className="text-4xl md:text-5xl font-serif leading-tight text-balance">
            Воплощение <span className="italic text-accent">мечты</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Реальные фотографии наших капсульных домов и их интерьеров
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {gallery.map((item, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl bg-muted ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div className={`${index === 0 ? "aspect-square" : "aspect-[4/3]"}`}>
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="absolute bottom-4 left-4 text-white text-sm font-medium">
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
