
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../utils/animations';
import { NavLink } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);
  const { t } = useTranslation();

  const highlights = t('about.highlights', {
    returnObjects: true,
    defaultValue: [
      'High-quality printing solutions',
      'Personal service',
      'Fast deliveries',
      'Environmentally friendly materials',
      'Award-winning design',
      'Customer-focused process'
    ]
  }) as string[];

  return (
    <section ref={sectionRef} className="py-20 md:py-32">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div
              className={cn(
                "relative z-10 rounded-2xl overflow-hidden shadow-card transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              <img 
                src="https://images.unsplash.com/photo-1572943681383-65cc7fb3a911?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                alt="Printing studio"
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>
            <div 
              className={cn(
                "absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 -z-10 w-64 h-64 bg-kalmar-100 rounded-full transition-all duration-700 delay-200",
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
              )}
            />
            <div 
              className={cn(
                "absolute top-0 left-0 -translate-y-1/4 -translate-x-1/4 -z-10 w-40 h-40 bg-kalmar-200 rounded-full transition-all duration-700 delay-300",
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
              )}
            />
          </div>

          <div>
            <div
              className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              <span className="inline-block py-1 px-3 mb-6 text-xs font-medium tracking-wider border border-primary/30 rounded-full bg-primary/5">
                {t('about.tagline')}
              </span>
            </div>

            <h2
              className={cn(
                "text-3xl md:text-4xl font-bold mb-6 transition-all duration-700 delay-100",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              {t('about.title')}
            </h2>

            <p
              className={cn(
                "text-foreground/70 mb-6 transition-all duration-700 delay-200",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              {t('about.historyText1')}
            </p>

            <p
              className={cn(
                "text-foreground/70 mb-8 transition-all duration-700 delay-300",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              {t('about.historyText2')}
            </p>

            <div
              className={cn(
                "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 transition-all duration-700 delay-400",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-kalmar-600 mr-2 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <NavLink
              to="/about"
              className={cn(
                "button-primary group transition-all duration-700 delay-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              {t('common.learnMore')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
