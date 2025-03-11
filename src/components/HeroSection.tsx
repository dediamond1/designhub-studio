
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal, useImageLoad } from '../utils/animations';
import { ArrowRight, MousePointer, ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(heroRef, 0.1);
  const { loaded, handleImageLoaded } = useImageLoad();
  const { t } = useTranslation(['home', 'common']);
  const [activeTab, setActiveTab] = useState(0);

  const serviceCategories = [
    {
      title: t('navigation.clothes', 'Clothing'),
      description: t('hero.categories.clothing', 'Custom apparel for brands, events, and teams'),
      link: '/design/clothes'
    },
    {
      title: t('navigation.print', 'Print Services'),
      description: t('hero.categories.print', 'Business cards, brochures, and marketing materials'),
      link: '/design/print'
    },
    {
      title: t('navigation.stickers', 'Stickers'),
      description: t('hero.categories.stickers', 'Custom stickers and decals for any surface'),
      link: '/design/stickers'
    }
  ];

  const tabVariants = {
    inactive: { opacity: 0.6, y: 10 },
    active: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const contentVariants = {
    inactive: { opacity: 0, x: -20 },
    active: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center py-20 overflow-hidden"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
          alt="Modern printing facility"
          className={cn(
            "w-full h-full object-cover transition-opacity duration-1000",
            loaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={handleImageLoaded}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/10" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block py-1 px-3 mb-6 text-xs font-medium tracking-wider border border-primary/30 rounded-full bg-primary/5">
              {t('hero.tagline')}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t('hero.title')}{" "}
              <span className="text-kalmar-600">{t('hero.subtitle')}</span>
            </h1>

            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-lg">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 mb-12">
              <NavLink
                to="/design"
                className="button-primary group w-full sm:w-auto"
              >
                {t('buttons.getStarted')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </NavLink>
              <NavLink
                to="/contact"
                className="button-outline w-full sm:w-auto"
              >
                {t('common.getQuote')}
              </NavLink>
            </div>

            <div className="hidden md:flex items-center text-foreground/60 text-sm">
              <MousePointer className="h-4 w-4 mr-2" />
              <span>{t('hero.scrollDown', 'Scroll down to explore our services')}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-card"
          >
            <h3 className="text-xl font-semibold mb-6">{t('hero.popularServices', 'Popular Services')}</h3>
            
            <div className="flex border-b border-border mb-6">
              {serviceCategories.map((category, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-3 text-sm font-medium relative ${
                    activeTab === index ? 'text-kalmar-600' : 'text-foreground/60'
                  }`}
                  variants={tabVariants}
                  initial="inactive"
                  animate={activeTab === index ? "active" : "inactive"}
                >
                  {category.title}
                  {activeTab === index && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-kalmar-600"
                      layoutId="activeTab"
                    />
                  )}
                </motion.button>
              ))}
            </div>
            
            <div className="min-h-[160px]">
              {serviceCategories.map((category, index) => (
                <motion.div
                  key={index}
                  className="space-y-4"
                  variants={contentVariants}
                  initial="inactive"
                  animate={activeTab === index ? "active" : "inactive"}
                  style={{ display: activeTab === index ? 'block' : 'none' }}
                >
                  <p className="text-foreground/70">{category.description}</p>
                  
                  <div className="space-y-3">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-kalmar-600 mr-2" />
                        <span className="text-sm">
                          {t(`hero.categories.${index}.features.${item}`, `Feature ${item} for ${category.title}`)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <NavLink
                    to={category.link}
                    className="inline-flex items-center text-sm text-kalmar-600 font-medium hover:text-kalmar-700 transition-colors mt-2"
                  >
                    {t('buttons.learnMore')}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
