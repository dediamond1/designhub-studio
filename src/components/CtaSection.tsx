
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
          <div className="absolute inset-0 bg-gradient-to-r from-kalmar-600 to-kalmar-500 z-0"></div>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent z-0"></div>
          
          <div className="relative z-10 px-8 py-16 md:py-20 md:px-12 lg:px-16 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-8 md:mb-0 md:max-w-xl">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold mb-4 text-white"
              >
                {t('cta.title')}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-white/80 text-lg"
              >
                {t('cta.description')}
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <NavLink
                to="/design"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full bg-white text-kalmar-600 shadow-xl hover:bg-gray-50 transition-colors group"
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
