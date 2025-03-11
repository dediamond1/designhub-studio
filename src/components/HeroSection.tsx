
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
      title: t('home:hero.features.printing.title'),
      description: t('home:hero.features.printing.description')
    },
    {
      icon: <LayoutGrid className="h-5 w-5 text-orange-500" />,
      title: t('home:hero.features.design.title'),
      description: t('home:hero.features.design.description')
    },
    {
      icon: <Palette className="h-5 w-5 text-purple-500" />,
      title: t('home:hero.features.materials.title'),
      description: t('home:hero.features.materials.description')
    }
  ];

  return (
    <section 
      ref={heroRef} 
      className="pt-28 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-white via-purple-50 to-orange-50 overflow-hidden"
    >
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-orange-100 border border-purple-200">
                <span className="block w-2 h-2 rounded-full bg-purple-500"></span>
                <span className="text-xs font-medium tracking-wider text-purple-700">
                  {t('home:hero.tagline')}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                {t('home:hero.title')}{" "}
                <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
                  {t('home:hero.subtitle')}
                </span>
              </h1>

              <p className="text-lg text-gray-700 max-w-lg">
                {t('home:hero.description')}
              </p>

              <div className="pt-4 space-y-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <NavLink
                    to="/design"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-gradient-to-r from-purple-600 to-orange-500 text-white font-medium transition-all duration-300 hover:from-purple-700 hover:to-orange-600 group"
                  >
                    {t('common:buttons.getStarted')}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </NavLink>
                  
                  <NavLink
                    to="/contact"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg border border-purple-200 bg-white text-purple-700 font-medium transition-all duration-300 hover:bg-purple-50 hover:border-purple-300"
                  >
                    {t('common:getQuote')}
                  </NavLink>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-purple-100">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mt-1 mr-3 p-1.5 rounded-full bg-gradient-to-br from-purple-100 to-orange-100">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-6 order-1 lg:order-2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10"
            >
              <div className="relative rounded-2xl overflow-hidden bg-white border border-purple-100">
                <div className="aspect-[4/3]">
                  <img 
                    src="https://images.unsplash.com/photo-1613618557061-2c5823a24dfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80" 
                    alt={t('home:hero.imageAlt')} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-purple-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-orange-500 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm font-medium text-gray-800">
                        "Outstanding quality and service!"
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-purple-700">98%</p>
                      <p className="text-xs text-gray-600">{t('home:hero.stats.description')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-purple-100 to-orange-100 border border-purple-200 rounded-lg p-4 w-48">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-xs font-medium text-purple-700">{t('home:hero.stats.title')}</span>
                </div>
                <div className="mt-2 text-2xl font-bold text-purple-800">24h</div>
                <div className="text-xs text-gray-700">{t('home:hero.stats.fastDelivery')}</div>
              </div>
            </motion.div>
            
            {/* Background Effects */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-200/50 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-200/50 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-0 w-full overflow-hidden">
        <svg className="absolute text-purple-100/30 w-40 h-40 -left-20 rotate-12" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M42.7,-62.9C54.9,-51.2,64.2,-37.4,71.2,-21.7C78.2,-6.1,82.9,11.4,77.9,25.9C72.9,40.3,58.2,51.7,42.5,60.4C26.7,69.1,10,75,-6.4,73.6C-22.8,72.2,-38.9,63.5,-52.9,51.2C-66.9,38.9,-78.8,23,-81.2,5.6C-83.7,-11.9,-76.7,-31,-64.2,-44.6C-51.7,-58.2,-33.8,-66.2,-16.8,-69.3C0.2,-72.4,16.2,-70.5,30.5,-74.7C44.9,-78.9,57.6,-89.1,42.7,-62.9Z" transform="translate(100 100)" />
        </svg>
        
        <svg className="absolute text-orange-100/30 w-32 h-32 right-10 top-40 rotate-45" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M37.9,-49.5C51.1,-38,65.2,-27.7,71.2,-13.2C77.3,1.3,75.3,20,67.1,35.9C58.9,51.8,44.4,65,27.8,70.7C11.2,76.4,-7.5,74.7,-22.9,67.4C-38.3,60.1,-50.3,47.1,-60.5,31.5C-70.7,15.9,-79,-2.4,-76.1,-19.2C-73.2,-35.9,-59.2,-51,-43.4,-62.7C-27.7,-74.4,-10.1,-82.6,1.7,-84.8C13.6,-87,27.1,-83.3,37.9,-49.5Z" transform="translate(100 100)" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
