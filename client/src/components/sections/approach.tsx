export default function Approach() {
  const principles = [
    {
      icon: "fas fa-eye",
      title: "Осознанность",
      description: "Развитие способности замечать свои чувства, мысли и реакции в настоящем моменте"
    },
    {
      icon: "fas fa-puzzle-piece",
      title: "Целостность",
      description: "Интеграция всех аспектов личности для достижения внутренней гармонии"
    },
    {
      icon: "fas fa-seedling",
      title: "Рост",
      description: "Поддержка естественной способности к развитию и самоактуализации"
    },
    {
      icon: "fas fa-heart",
      title: "Контакт",
      description: "Улучшение качества отношений с собой и окружающими людьми"
    },
    {
      icon: "fas fa-balance-scale",
      title: "Баланс",
      description: "Восстановление равновесия между различными сферами жизни"
    },
    {
      icon: "fas fa-key",
      title: "Ответственность",
      description: "Принятие ответственности за свои выборы и их последствия"
    }
  ];

  return (
    <section id="approach" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient" data-testid="approach-title">
            Гештальт-подход
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="approach-description">
            Целостный взгляд на человека и его жизненный опыт
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <div 
              key={index}
              className="glass-dark p-8 rounded-2xl text-center hover:scale-105 transition-transform duration-300 glass-dark-hover liquid-gradient-dark"
              data-testid={`principle-${index}`}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <i className={`${principle.icon} text-2xl text-primary-foreground`}></i>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">{principle.title}</h3>
              <p className="text-muted-foreground">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Quote Section */}
        <div className="mt-16">
          <div className="glass p-8 md:p-12 rounded-3xl max-w-4xl mx-auto text-center liquid-gradient" data-testid="approach-quote">
            <blockquote className="text-2xl md:text-3xl font-light text-foreground italic mb-6">
              "Человек не может изменить то, что с ним случилось, но он может изменить свое отношение к этому"
            </blockquote>
            <cite className="text-muted-foreground font-medium">— Принцип гештальт-терапии</cite>
          </div>
        </div>
      </div>
    </section>
  );
}