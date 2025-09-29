export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h2
            className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-gradient"
            data-testid="services-title"
          >
            Услуги
          </h2>
          <p
            className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto"
            data-testid="services-description"
          >
            Индивидуальные консультации, адаптированные под ваши потребности и
            жизненную ситуацию
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* Online Consultations */}
          <div
            className="glass p-6 md:p-8 rounded-3xl hover:scale-105 transition-transform duration-300 glass-hover liquid-gradient"
            data-testid="service-online"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-video text-2xl text-primary-foreground"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                Онлайн консультации
              </h3>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <i className="fas fa-check-circle text-primary mr-3"></i>
                <span className="text-muted-foreground">
                  Удобство и комфорт дома
                </span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check-circle text-primary mr-3"></i>
                <span className="text-muted-foreground">Гибкое расписание</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check-circle text-primary mr-3"></i>
                <span className="text-muted-foreground">
                  Безопасная видеосвязь
                </span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check-circle text-primary mr-3"></i>
                <span className="text-muted-foreground">
                  Доступность из любой точки
                </span>
              </div>
            </div>

            <div className="text-center">
              <div
                className="text-2xl md:text-3xl font-bold text-foreground mb-2"
                data-testid="price-online"
              >
                4 500 ₽
              </div>
              <div className="text-muted-foreground mb-6">60 минут</div>
              <a
                href="#contact"
                className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-xl hover:bg-opacity-90 transition-colors inline-block font-medium"
                data-testid="button-book-online"
              >
                Записаться
              </a>
            </div>
          </div>

          {/* Offline Consultations */}
          <div
            className="glass p-6 md:p-8 rounded-3xl hover:scale-105 transition-transform duration-300 glass-hover liquid-gradient"
            data-testid="service-offline"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-map-marker-alt text-2xl text-primary-foreground"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                Встречи в Москве
              </h3>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <i className="fas fa-check-circle text-primary mr-3"></i>
                <span className="text-muted-foreground">Личный контакт</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check-circle text-primary mr-3"></i>
                <span className="text-muted-foreground">Уютная атмосфера</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check-circle text-primary mr-3"></i>
                <span className="text-muted-foreground">
                  Удобное расположение
                </span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check-circle text-primary mr-3"></i>
                <span className="text-muted-foreground">
                  По предварительной договоренности
                </span>
              </div>
            </div>

            <div className="text-center">
              <div
                className="text-2xl md:text-3xl font-bold text-foreground mb-2"
                data-testid="price-offline"
              >
                5 000 ₽
              </div>
              <div className="text-muted-foreground mb-6">60 минут</div>
              <a
                href="#contact"
                className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-xl hover:bg-opacity-90 transition-colors inline-block font-medium"
                data-testid="button-book-offline"
              >
                Записаться
              </a>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 md:mt-16 text-center">
          <div
            className="glass-dark p-6 md:p-8 rounded-2xl max-w-4xl mx-auto liquid-gradient-dark"
            data-testid="consultation-includes"
          >
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
              Что включает консультация
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-muted-foreground">
              <div className="text-center">
                <i className="fas fa-comments text-3xl text-primary mb-3"></i>
                <p>Глубокий диалог и исследование запроса</p>
              </div>
              <div className="text-center">
                <i className="fas fa-lightbulb text-3xl text-primary mb-3"></i>
                <p>Инсайты и новые перспективы</p>
              </div>
              <div className="text-center">
                <i className="fas fa-arrow-right text-3xl text-primary mb-3"></i>
                <p>Практические рекомендации</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
