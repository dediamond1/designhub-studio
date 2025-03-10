
import React, { useRef } from 'react';
import { useScrollReveal } from '../utils/animations';
import { ExternalLink, ShoppingBag, Image, FileImage, Palette, Globe } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

const services = [
  {
    title: 'T-shirts & Kläder',
    description: 'Skapa personliga t-shirts och kläder med din egen design. Perfekt för event, företag eller personligt bruk.',
    icon: <ShoppingBag className="h-6 w-6" />,
    link: '/services#t-shirts'
  },
  {
    title: 'Visitkort & Trycksaker',
    description: 'Professionella visitkort och trycksaker som gör intryck och stärker ditt varumärke.',
    icon: <FileImage className="h-6 w-6" />,
    link: '/services#business-cards'
  },
  {
    title: 'Dekaler & Klistermärken',
    description: 'Högkvalitativa dekaler och klistermärken i olika former och storlekar för alla ändamål.',
    icon: <Image className="h-6 w-6" />,
    link: '/services#decals'
  },
  {
    title: 'Grafisk Design',
    description: 'Låt våra designers hjälpa dig skapa unika och professionella designlösningar för ditt varumärke.',
    icon: <Palette className="h-6 w-6" />,
    link: '/services#design'
  },
  {
    title: 'Webb & Sociala Medier',
    description: 'Designlösningar för dina digitala kanaler, från webbplatser till sociala medier.',
    icon: <Globe className="h-6 w-6" />,
    link: '/services#web'
  }
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-secondary/50">
      <div className="section-container">
        <div className="text-center mb-16">
          <span
            className={cn(
              "inline-block py-1 px-3 mb-6 text-xs font-medium tracking-wider border border-primary/30 rounded-full bg-primary/5 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            VÅRA TJÄNSTER
          </span>
          <h2
            className={cn(
              "text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Upptäck vårt utbud av trycktjänster
          </h2>
          <p
            className={cn(
              "text-foreground/70 text-lg max-w-2xl mx-auto transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Vi erbjuder högkvalitativa tryck- och designlösningar för alla behov, från företag till privatpersoner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={cn(
                "group p-8 bg-background rounded-xl border border-border shadow-subtle hover:shadow-elevated transition-all duration-500 relative overflow-hidden",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{
                transitionDelay: isVisible ? `${300 + index * 100}ms` : "0ms",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-kalmar-50/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="p-3 bg-kalmar-100/50 rounded-lg inline-block mb-5">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-3">
                {service.title}
              </h3>
              
              <p className="text-foreground/70 mb-6">
                {service.description}
              </p>
              
              <NavLink
                to={service.link}
                className="flex items-center text-kalmar-600 font-medium hover:text-kalmar-700 transition-colors group-hover:underline"
              >
                Läs mer
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </NavLink>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <NavLink
            to="/services"
            className={cn(
              "button-primary",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
            style={{
              transitionDelay: isVisible ? "900ms" : "0ms",
              transitionProperty: "all",
              transitionDuration: "700ms",
            }}
          >
            Utforska alla tjänster
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
