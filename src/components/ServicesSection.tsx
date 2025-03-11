
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../utils/animations';
import { ExternalLink, ShoppingBag, Image, FileImage, Palette, Globe } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);
  const { t } = useTranslation();

  const services = [
    {
      title: t('services.tshirts.title'),
      description: t('services.tshirts.description'),
      icon: <ShoppingBag className="h-6 w-6" />,
      link: '/services#t-shirts'
    },
    {
      title: t('services.businessCards.title'),
      description: t('services.businessCards.description'),
      icon: <FileImage className="h-6 w-6" />,
      link: '/services#business-cards'
    },
    {
      title: t('services.decals.title'),
      description: t('services.decals.description'),
      icon: <Image className="h-6 w-6" />,
      link: '/services#decals'
    },
    {
      title: t('services.graphicDesign.title'),
      description: t('services.graphicDesign.description'),
      icon: <Palette className="h-6 w-6" />,
      link: '/services#design'
    },
    {
      title: t('services.webSocial.title'),
      description: t('services.webSocial.description'),
      icon: <Globe className="h-6 w-6" />,
      link: '/services#web'
    }
  ];

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
            {t('services.title')}
          </span>
          <h2
            className={cn(
              "text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            {t('services.title')}
          </h2>
          <p
            className={cn(
              "text-foreground/70 text-lg max-w-2xl mx-auto transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            {t('services.description')}
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
                {t('common.readMore')}
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
            {t('services.exploreAll')}
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
