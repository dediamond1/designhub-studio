
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../utils/animations';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const ClientsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);
  const { t } = useTranslation('home');

  // Client logos - in a real implementation these would be actual client logos
  const clients = [
    { name: 'Tech Innovators', logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=200&h=100&fit=crop&auto=format' },
    { name: 'Global Retail', logo: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=200&h=100&fit=crop&auto=format' },
    { name: 'Eco Solutions', logo: 'https://images.unsplash.com/photo-1516876437184-593fda40c7ce?w=200&h=100&fit=crop&auto=format' },
    { name: 'Urban Events', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop&auto=format' },
    { name: 'Creative Studios', logo: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=200&h=100&fit=crop&auto=format' },
    { name: 'Nordic Design', logo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=200&h=100&fit=crop&auto=format' },
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
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {t('clients.title')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-foreground/70 text-lg max-w-2xl mx-auto"
          >
            {t('clients.description')}
          </motion.p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
        >
          {clients.map((client, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={cn(
                "flex items-center justify-center p-6 bg-secondary/30 rounded-lg transition-all duration-300 hover:shadow-md",
                isVisible ? "opacity-100" : "opacity-0"
              )}
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className="max-h-12 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsSection;
