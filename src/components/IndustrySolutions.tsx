
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../utils/animations';
import { cn } from '@/lib/utils';
import { ShoppingBag, Coffee, Calendar, Briefcase, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const IndustrySolutions = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);
  const { t } = useTranslation('common');

  const industries = [
    {
      icon: <ShoppingBag className="h-10 w-10 text-kalmar-500" />,
      title: t('industries.retail.title'),
      description: t('industries.retail.description'),
      link: '/services/retail'
    },
    {
      icon: <Coffee className="h-10 w-10 text-kalmar-500" />,
      title: t('industries.restaurants.title'),
      description: t('industries.restaurants.description'),
      link: '/services/restaurants'
    },
    {
      icon: <Calendar className="h-10 w-10 text-kalmar-500" />,
      title: t('industries.events.title'),
      description: t('industries.events.description'),
      link: '/services/events'
    },
    {
      icon: <Briefcase className="h-10 w-10 text-kalmar-500" />,
      title: t('industries.corporate.title'),
      description: t('industries.corporate.description'),
      link: '/services/corporate'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('industries.title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('industries.description')}
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-kalmar-500 to-kalmar-700 opacity-90"></div>
                <div className="relative h-full flex items-center justify-center p-8">
                  <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                    {industry.icon}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{industry.title}</h3>
                <p className="text-gray-600 mb-5">{industry.description}</p>
                <NavLink
                  to={industry.link}
                  className="inline-flex items-center text-kalmar-600 font-medium hover:text-kalmar-700 group-hover:underline"
                >
                  {t('buttons.learnMore')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </NavLink>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default IndustrySolutions;
