
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../utils/animations';
import { ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const CtaSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);
  const { t } = useTranslation(['home', 'common']);

  return (
    <section ref={sectionRef} className="py-20 overflow-hidden">
      <div className="section-container">
        <div className="relative z-10 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-orange-500 z-0"></div>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent z-0"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <svg className="absolute text-white/10 w-40 h-40 -left-20 -top-20 rotate-12" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M42.7,-62.9C54.9,-51.2,64.2,-37.4,71.2,-21.7C78.2,-6.1,82.9,11.4,77.9,25.9C72.9,40.3,58.2,51.7,42.5,60.4C26.7,69.1,10,75,-6.4,73.6C-22.8,72.2,-38.9,63.5,-52.9,51.2C-66.9,38.9,-78.8,23,-81.2,5.6C-83.7,-11.9,-76.7,-31,-64.2,-44.6C-51.7,-58.2,-33.8,-66.2,-16.8,-69.3C0.2,-72.4,16.2,-70.5,30.5,-74.7C44.9,-78.9,57.6,-89.1,42.7,-62.9Z" transform="translate(100 100)" />
            </svg>
            
            <svg className="absolute text-white/10 w-32 h-32 right-10 bottom-10 rotate-45" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M37.9,-49.5C51.1,-38,65.2,-27.7,71.2,-13.2C77.3,1.3,75.3,20,67.1,35.9C58.9,51.8,44.4,65,27.8,70.7C11.2,76.4,-7.5,74.7,-22.9,67.4C-38.3,60.1,-50.3,47.1,-60.5,31.5C-70.7,15.9,-79,-2.4,-76.1,-19.2C-73.2,-35.9,-59.2,-51,-43.4,-62.7C-27.7,-74.4,-10.1,-82.6,1.7,-84.8C13.6,-87,27.1,-83.3,37.9,-49.5Z" transform="translate(100 100)" />
            </svg>
          </div>
          
          <div className="relative z-10 px-8 py-16 md:py-20 md:px-12 lg:px-16 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-8 md:mb-0 md:max-w-xl">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold mb-4 text-white"
              >
                {t('home:cta.title')}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-white/80 text-lg"
              >
                {t('home:cta.description')}
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <NavLink
                to="/design"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full bg-white text-purple-600 hover:bg-gray-50 transition-colors group"
              >
                {t('common:startDesigning')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </NavLink>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
