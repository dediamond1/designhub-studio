
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../utils/animations';
import { Quote, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);
  const { t } = useTranslation('home');

  const testimonials = t('testimonials.items', { returnObjects: true }) as Array<{
    quote: string;
    author: string;
    company: string;
  }>;

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-gradient-to-br from-purple-50 to-orange-50">
      <div className="section-container">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-block py-1 px-3 mb-6 text-xs font-medium tracking-wider border border-primary/30 rounded-full bg-primary/5"
          >
            {t('testimonials.title')}
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {t('testimonials.title')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-foreground/70 text-lg max-w-2xl mx-auto"
          >
            {t('testimonials.description')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-white p-8 rounded-xl border border-purple-100 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 to-orange-50/0 group-hover:from-purple-50/100 group-hover:to-orange-50/60 transition-all duration-700"></div>
              
              <div className="absolute top-6 right-6 text-orange-200 group-hover:text-orange-300 transition-colors duration-700">
                <Quote size={48} />
              </div>
              
              <p className="text-lg mb-6 relative z-10">"{testimonial.quote}"</p>
              
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              
              <div className="relative z-10">
                <h4 className="font-semibold text-gray-800">{testimonial.author}</h4>
                <p className="text-sm text-foreground/60">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
