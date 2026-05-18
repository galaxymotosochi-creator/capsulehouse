const steps = [
  {
    number: "01",
    title: "Консультация",
    description: "Обсуждаем ваши пожелания, подбираем оптимальную модель дома и рассчитываем стоимость с доставкой",
    image: "/step-1-consultation.jpg",
  },
  {
    number: "02",
    title: "Договор и оплата",
    description: "Заключаем договор, вы вносите предоплату, и мы начинаем производство вашего дома",
    image: "/step-2-contract.jpg",
  },
  {
    number: "03",
    title: "Производство",
    description: "Дом изготавливается на заводе в Китае под вашим контролем через фото- и видеоотчёты",
    image: "/step-3-production.jpg",
  },
  {
    number: "04",
    title: "Доставка и установка",
    description: "Доставляем дом до вашего участка и помогаем с установкой и подключением коммуникаций",
    image: "/step-4-delivery.jpg",
  },
];

export function Process() {
  return (
    <section id="process" className="py-24 md:py-32">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Процесс
          </p>
          <h2 className="text-4xl md:text-5xl font-serif leading-tight text-balance">
            Как мы <span className="italic text-accent">работаем</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="space-y-16 md:space-y-24">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <span className="text-6xl md:text-8xl font-serif font-bold text-muted/50">
                  {step.number}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-semibold mt-4 mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
