import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    format: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.format) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    // Success message
    toast({
      title: "Заявка отправлена!",
      description: "Спасибо за заявку! Я свяжусь с вами в ближайшее время.",
    });

    // Reset form
    setFormData({
      name: "",
      phone: "",
      format: "",
      message: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient" data-testid="contact-title">
            Связаться со мной
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="contact-description">
            Готовы начать путь к изменениям? Свяжитесь для записи на консультацию
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass p-8 rounded-2xl liquid-gradient" data-testid="contact-info">
              <h3 className="text-2xl font-bold text-foreground mb-6">Контактная информация</h3>
              
              <div className="space-y-6">
                <div className="flex items-center" data-testid="contact-telegram">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                    <i className="fab fa-telegram text-xl text-primary-foreground"></i>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Telegram</div>
                    <div className="text-muted-foreground">@ekaterina_chubiryaeva</div>
                  </div>
                </div>
                
                <div className="flex items-center" data-testid="contact-whatsapp">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                    <i className="fab fa-whatsapp text-xl text-primary-foreground"></i>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">WhatsApp</div>
                    <div className="text-muted-foreground">+7 (903) 456-78-90</div>
                  </div>
                </div>
                
                <div className="flex items-center" data-testid="contact-email">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-envelope text-xl text-primary-foreground"></i>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Email</div>
                    <div className="text-muted-foreground">ek.chubiryaeva@gmail.com</div>
                  </div>
                </div>
                
                <div className="flex items-center" data-testid="contact-location">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-map-marker-alt text-xl text-primary-foreground"></i>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Офлайн встречи</div>
                    <div className="text-muted-foreground">Москва, по договоренности</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Working Hours */}
            <div className="glass p-8 rounded-2xl liquid-gradient" data-testid="working-hours">
              <h3 className="text-xl font-bold text-foreground mb-4">Часы работы</h3>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Понедельник - Пятница</span>
                  <span>10:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Суббота</span>
                  <span>10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Воскресенье</span>
                  <span>Выходной</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="glass p-8 rounded-2xl liquid-gradient" data-testid="contact-form">
            <h3 className="text-2xl font-bold text-foreground mb-6">Записаться на консультацию</h3>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Имя *
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                  placeholder="Ваше имя"
                  data-testid="input-name"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Телефон *
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                  placeholder="+7 (XXX) XXX-XX-XX"
                  data-testid="input-phone"
                />
              </div>
              
              <div>
                <label htmlFor="format" className="block text-sm font-medium text-foreground mb-2">
                  Формат консультации *
                </label>
                <select 
                  id="format" 
                  name="format"
                  value={formData.format}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                  data-testid="select-format"
                >
                  <option value="">Выберите формат</option>
                  <option value="online">Онлайн консультация</option>
                  <option value="offline">Встреча в Москве</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Сообщение
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-colors resize-none"
                  placeholder="Расскажите кратко о вашем запросе..."
                  data-testid="textarea-message"
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-300 hover:scale-105 font-medium"
                data-testid="button-submit"
              >
                Отправить заявку
              </button>
            </form>
            
            <div className="mt-6 text-sm text-muted-foreground text-center">
              Отправляя заявку, вы соглашаетесь с обработкой персональных данных
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}