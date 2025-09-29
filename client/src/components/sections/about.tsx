import ekaterinaImage2 from "@assets/ekaterina-2_1759090209911.jpg";

export default function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gradient" data-testid="about-title">
              Обо мне
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p data-testid="about-paragraph-1">
                Я — практикующий гештальт-психолог с глубоким пониманием человеческой природы 
                и стремлением помочь людям найти гармонию с собой и окружающим миром.
              </p>
              <p data-testid="about-paragraph-2">
                Моя работа основана на принципах гештальт-терапии — подходе, который помогает 
                осознать и интегрировать различные аспекты личности, проработать незавершенные 
                ситуации и восстановить естественный поток жизненной энергии.
              </p>
              <p data-testid="about-paragraph-3">
                В своей практике я создаю безопасное пространство для исследования внутреннего 
                мира, где каждый может открыть свои истинные потребности и найти ресурсы для 
                позитивных изменений.
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="glass-dark p-6 rounded-xl glass-dark-hover" data-testid="about-education">
                <div className="flex items-center mb-4">
                  <i className="fas fa-graduation-cap text-2xl text-muted-foreground mr-3"></i>
                  <h3 className="font-semibold text-foreground">Образование</h3>
                </div>
                <p className="text-muted-foreground">Сертифицированный гештальт-психолог</p>
              </div>
              <div className="glass-dark p-6 rounded-xl glass-dark-hover" data-testid="about-experience">
                <div className="flex items-center mb-4">
                  <i className="fas fa-clock text-2xl text-muted-foreground mr-3"></i>
                  <h3 className="font-semibold text-foreground">Опыт</h3>
                </div>
                <p className="text-muted-foreground">Более 500 часов практики</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="glass rounded-3xl p-6 hover:scale-105 transition-transform duration-500 liquid-gradient">
                <img 
                  src={ekaterinaImage2}
                  alt="Екатерина Чубиряева в рабочей обстановке" 
                  className="w-80 h-96 object-cover rounded-2xl shadow-xl" 
                  data-testid="about-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}