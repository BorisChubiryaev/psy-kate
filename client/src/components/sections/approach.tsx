export default function Approach() {
  const principles = [
    {
      icon: "fas fa-eye",
      title: "Осознанность",
      description:
        "Развитие способности замечать свои чувства, мысли и реакции в настоящем моменте",
    },
    {
      icon: "fas fa-puzzle-piece",
      title: "Целостность",
      description:
        "Интеграция всех аспектов личности для достижения внутренней гармонии",
    },
    {
      icon: "fas fa-seedling",
      title: "Рост",
      description:
        "Поддержка естественной способности к развитию и самоактуализации",
    },
    {
      icon: "fas fa-heart",
      title: "Контакт",
      description: "Улучшение качества отношений с собой и окружающими людьми",
    },
    {
      icon: "fas fa-balance-scale",
      title: "Баланс",
      description: "Восстановление равновесия между различными сферами жизни",
    },
    {
      icon: "fas fa-key",
      title: "Ответственность",
      description: "Принятие ответственности за свои выборы и их последствия",
    },
  ];

  return (
    <section id="approach" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h2
            className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-gradient"
            data-testid="approach-title"
          >
            Гештальт-подход
          </h2>
          <p
            className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto"
            data-testid="approach-description"
          >
            Целостный взгляд на человека и его жизненный опыт
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="glass-dark p-6 md:p-8 rounded-2xl text-center hover:scale-105 transition-transform duration-300 glass-dark-hover liquid-gradient-dark"
              data-testid={`principle-${index}`}
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary to-muted rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <i
                  className={`${principle.icon} text-xl md:text-2xl text-primary-foreground`}
                ></i>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 md:mb-4">
                {principle.title}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quote Section */}
        <div className="mt-12 md:mt-16">
          <div
            className="glass p-6 md:p-8 lg:p-12 rounded-3xl max-w-4xl mx-auto text-center liquid-gradient"
            data-testid="approach-quote"
          >
            <blockquote className="text-xl md:text-2xl lg:text-3xl font-light text-foreground italic mb-4 md:mb-6">
              "Человек не может изменить то, что с ним случилось, но он может
              изменить свое отношение к этому"
            </blockquote>
            <cite className="text-muted-foreground font-medium text-sm md:text-base">
              — Принцип гештальт-терапии
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
}
