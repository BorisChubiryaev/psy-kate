import ekaterinaImage1 from "@assets/ekaterina-1_1759090209905.jpg";

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center hero-bg relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-white to-transparent rounded-full opacity-10 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-black to-transparent rounded-full opacity-5 animate-float" style={{animationDelay: '-3s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient" data-testid="hero-title">
              Екатерина<br />
              <span className="font-light">Чубиряева</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light" data-testid="hero-subtitle">
              Гештальт-психолог
            </p>
            <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto lg:mx-0" data-testid="hero-description">
              Индивидуальные консультации для тех, кто готов к изменениям. 
              Онлайн и оффлайн сессии в Москве.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="#contact" 
                className="glass px-8 py-4 rounded-xl hover:bg-opacity-90 transition-all duration-300 hover:scale-105 font-medium glass-hover"
                data-testid="button-consultation"
              >
                Записаться на консультацию
              </a>
              <a 
                href="#about" 
                className="glass-dark px-8 py-4 rounded-xl hover:bg-opacity-20 transition-all duration-300 hover:scale-105 font-medium glass-dark-hover"
                data-testid="button-learn-more"
              >
                Узнать больше
              </a>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="glass rounded-3xl p-8 hover:scale-105 transition-transform duration-500 animate-glow liquid-gradient">
                <img 
                  src={ekaterinaImage1}
                  alt="Екатерина Чубиряева - Гештальт-психолог" 
                  className="w-80 h-96 object-cover rounded-2xl shadow-2xl" 
                  data-testid="hero-image"
                />
              </div>
              <div className="absolute -z-10 top-8 left-8 w-full h-full bg-gradient-to-br from-black to-transparent rounded-3xl opacity-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}