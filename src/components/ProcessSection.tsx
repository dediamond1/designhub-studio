
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../utils/animations';
import { Palette, Printer, Package, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const ProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);
  const { t } = useTranslation();

  const processes = [
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: t('process.consultation.title', 'Consultation'),
      description: t('process.consultation.description', 'We start with understanding your needs and vision to create the perfect print solution.')
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: t('process.design.title', 'Design'),
      description: t('process.design.description', 'Our expert designers create stunning visuals tailored to your brand and specifications.')
    },
    {
      icon: <Printer className="h-6 w-6" />,
      title: t('process.printing.title', 'Printing'),
      description: t('process.printing.description', 'Using cutting-edge technology, we bring your designs to life with premium quality printing.')
    },
    {
      icon: <Package className="h-6 w-6" />,
      title: t('process.delivery.title', 'Delivery'),
      description: t('process.delivery.description', 'We ensure your finished products are delivered on time and in perfect condition.')
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-block py-1 px-3 mb-6 text-xs font-medium tracking-wider border border-primary/30 rounded-full bg-primary/5"
          >
            {t('process.tagline', 'HOW WE WORK')}
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {t('process.title', 'Our Simple Process')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-foreground/70 text-lg max-w-2xl mx-auto"
          >
            {t('process.description', 'From concept to delivery, we make custom printing easy and hassle-free.')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processes.map((process, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="text-center"
            >
              <div className="relative mb-6 mx-auto">
                <div className="w-16 h-16 bg-kalmar-100 rounded-full flex items-center justify-center mx-auto">
                  <div className="text-kalmar-600">{process.icon}</div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-kalmar-600 rounded-full text-white flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{process.title}</h3>
              
              <p className="text-foreground/70">
                {process.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
