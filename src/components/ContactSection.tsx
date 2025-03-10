
import React, { useRef, useState } from 'react';
import { useScrollReveal } from '../utils/animations';
import { cn } from '@/lib/utils';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Tack för ditt meddelande! Vi återkommer så snart som möjligt.");
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };
  
  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5" />,
      title: 'Telefon',
      info: '+46 70 123 45 67',
      link: 'tel:+46701234567'
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: 'E-post',
      info: 'info@kalmarstudio.se',
      link: 'mailto:info@kalmarstudio.se'
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: 'Adress',
      info: 'Tryckvägen 123, 123 45 Kalmar',
      link: 'https://maps.google.com'
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-kalmar-50">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div
              className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              <span className="inline-block py-1 px-3 mb-6 text-xs font-medium tracking-wider border border-primary/30 rounded-full bg-primary/5">
                KONTAKTA OSS
              </span>
            </div>
            
            <h2
              className={cn(
                "text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 delay-100",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              Låt oss diskutera ditt projekt
            </h2>
            
            <p
              className={cn(
                "text-foreground/70 text-lg max-w-2xl mx-auto transition-all duration-700 delay-200",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              Har du frågor eller behöver hjälp med ett projekt? Fyll i formuläret nedan eller kontakta oss direkt.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className={cn(
                  "flex flex-col items-center text-center p-6 bg-background rounded-xl border border-border shadow-subtle hover:shadow-elevated transition-all duration-500",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                )}
                style={{
                  transitionDelay: isVisible ? `${300 + index * 100}ms` : "0ms",
                }}
              >
                <div className="p-3 bg-kalmar-100 rounded-full mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-foreground/70">{item.info}</p>
              </a>
            ))}
          </div>
          
          <div 
            className={cn(
              "bg-background rounded-2xl shadow-card border border-border p-8 transition-all duration-700 delay-600",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Namn
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-kalmar-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    E-post
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-kalmar-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-kalmar-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Ämne
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-kalmar-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Välj ämne</option>
                    <option value="quote">Offertförfrågan</option>
                    <option value="info">Produktinformation</option>
                    <option value="support">Support</option>
                    <option value="other">Annat</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Meddelande
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-kalmar-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="button-primary group"
              >
                Skicka meddelande
                <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
