
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../utils/animations';
import { ArrowRight, Printer, LayoutGrid, Palette } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(heroRef, 0.1);
  const { t } = useTranslation(['home', 'common']);

  const features = [
    {
      icon: <Printer className="h-5 w-5 text-purple-500" />,
      title: t('hero.features.printing.title', 'Professional Printing'),
      description: t('hero.features.printing.description', 'High-quality printing for all your needs')
    },
    {
      icon: <LayoutGrid className="h-5 w-5 text-orange-500" />,
      title: t('hero.features.design.title', 'Custom Design'),
      description: t('hero.features.design.description', 'Unique designs tailored to your brand')
    },
    {
      icon: <Palette className="h-5 w-5 text-purple-500" />,
      title: t('hero.features.materials.title', 'Premium Materials'),
      description: t('hero.features.materials.description', 'Eco-friendly materials with stunning results')
    }
  ];

  return (
    <section 
      ref={heroRef} 
      className="pt-28 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-white via-purple-50 to-orange-50"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="inline-block py-1 px-3 text-xs font-medium tracking-wider rounded-full bg-purple-100 text-purple-600 border border-purple-200">
                {t('hero.tagline', 'Premium Print Solutions')}
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {t('hero.title', 'Bring Your Ideas to')}
                {" "}
                <span className="text-gradient-mixed">{t('hero.subtitle', 'Life')}</span>
              </h1>

              <p className="text-lg text-gray-700 max-w-lg">
                {t('hero.description', 'We transform your creative concepts into stunning prints with cutting-edge technology and exceptional craftsmanship.')}
              </p>

              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <NavLink
                    to="/design"
                    className="button-primary group"
                  >
                    {t('buttons.getStarted', 'Start Your Project')}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className="button-outline"
                  >
                    {t('common.getQuote', 'Get a Quote')}
                  </NavLink>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mt-1 mr-3">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">{feature.title}</h3>
                        <p className="text-xs text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="order-1 md:order-2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10"
            >
              <div className="relative rounded-2xl overflow-hidden bg-white border border-purple-100">
                <div className="aspect-[4/3]">
                  <img 
                    src="https://images.unsplash.com/photo-1595246007497-68986932fb03?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80" 
                    alt="Modern printing process" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-orange-50 border border-orange-200 rounded-lg p-4 w-48">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-xs font-medium">{t('hero.stats.title', 'Customer Satisfaction')}</span>
                </div>
                <div className="mt-2 text-2xl font-bold">98%</div>
                <div className="text-xs text-gray-500">{t('hero.stats.description', 'Based on 2000+ reviews')}</div>
              </div>
            </motion.div>
            
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/50 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-200/50 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
