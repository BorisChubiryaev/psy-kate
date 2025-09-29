import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 glass transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-md bg-white/80' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <a 
                href="#" 
                className="text-xl font-semibold text-foreground hover:text-muted-foreground transition-colors"
                data-testid="navbar-logo"
              >
                Екатерина Чубиряева
              </a>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a 
                  href="#hero" 
                  className="text-foreground hover:text-muted-foreground transition-colors font-medium"
                  data-testid="nav-link-home"
                >
                  Главная
                </a>
                <a 
                  href="#about" 
                  className="text-foreground hover:text-muted-foreground transition-colors font-medium"
                  data-testid="nav-link-about"
                >
                  Обо мне
                </a>
                <a 
                  href="#services" 
                  className="text-foreground hover:text-muted-foreground transition-colors font-medium"
                  data-testid="nav-link-services"
                >
                  Услуги
                </a>
                <a 
                  href="#approach" 
                  className="text-foreground hover:text-muted-foreground transition-colors font-medium"
                  data-testid="nav-link-approach"
                >
                  Подход
                </a>
                <a 
                  href="#contact" 
                  className="text-foreground hover:text-muted-foreground transition-colors font-medium"
                  data-testid="nav-link-contact"
                >
                  Контакты
                </a>
              </div>
            </div>
            
            <div className="md:hidden">
              <button 
                onClick={handleMobileMenuToggle}
                className="text-foreground hover:text-muted-foreground transition-colors"
                data-testid="mobile-menu-button"
              >
                <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={handleMobileMenuToggle}
        ></div>
        
        {/* Menu Panel */}
        <div className={`absolute top-16 left-0 right-0 glass-dark border-t border-white/10 transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}>
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="space-y-4">
              <a 
                href="#hero" 
                onClick={handleMobileNavClick}
                className="block text-foreground hover:text-muted-foreground transition-colors font-medium py-3 px-4 rounded-lg hover:bg-white/5"
                data-testid="mobile-nav-link-home"
              >
                Главная
              </a>
              <a 
                href="#about" 
                onClick={handleMobileNavClick}
                className="block text-foreground hover:text-muted-foreground transition-colors font-medium py-3 px-4 rounded-lg hover:bg-white/5"
                data-testid="mobile-nav-link-about"
              >
                Обо мне
              </a>
              <a 
                href="#services" 
                onClick={handleMobileNavClick}
                className="block text-foreground hover:text-muted-foreground transition-colors font-medium py-3 px-4 rounded-lg hover:bg-white/5"
                data-testid="mobile-nav-link-services"
              >
                Услуги
              </a>
              <a 
                href="#approach" 
                onClick={handleMobileNavClick}
                className="block text-foreground hover:text-muted-foreground transition-colors font-medium py-3 px-4 rounded-lg hover:bg-white/5"
                data-testid="mobile-nav-link-approach"
              >
                Подход
              </a>
              <a 
                href="#contact" 
                onClick={handleMobileNavClick}
                className="block text-foreground hover:text-muted-foreground transition-colors font-medium py-3 px-4 rounded-lg hover:bg-white/5"
                data-testid="mobile-nav-link-contact"
              >
                Контакты
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
