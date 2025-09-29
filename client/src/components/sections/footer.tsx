export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div data-testid="footer-info">
            <h3 className="text-xl font-bold mb-4">Екатерина Чубиряева</h3>
            <p className="text-primary-foreground/80">
              Гештальт-психолог<br />
              Индивидуальные консультации<br />
              Онлайн и оффлайн в Москве
            </p>
          </div>
          
          <div data-testid="footer-links">
            <h3 className="text-lg font-semibold mb-4">Быстрые ссылки</h3>
            <div className="space-y-2">
              <a 
                href="#about" 
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                data-testid="footer-link-about"
              >
                Обо мне
              </a>
              <a 
                href="#services" 
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                data-testid="footer-link-services"
              >
                Услуги
              </a>
              <a 
                href="#approach" 
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                data-testid="footer-link-approach"
              >
                Подход
              </a>
              <a 
                href="#contact" 
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                data-testid="footer-link-contact"
              >
                Контакты
              </a>
            </div>
          </div>
          
          <div data-testid="footer-contact">
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <div className="space-y-2 text-primary-foreground/80">
              <div>Telegram: @ekaterina_chubiryaeva</div>
              <div>Email: ek.chubiryaeva@gmail.com</div>
              <div>Москва</div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60" data-testid="footer-copyright">
          <p>&copy; 2024 Екатерина Чубиряева. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
