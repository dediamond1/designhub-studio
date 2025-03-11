
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../utils/animations';
import { cn } from '@/lib/utils';
import { Lightbulb, MessageSquare, Printer, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);
  const { t } = useTranslation('common');

  const steps = [
    {
      icon: <Lightbulb className="h-10 w-10 text-kalmar-500" />,
      title: t('howItWorks.steps.step1.title'),
      description: t('howItWorks.steps.step1.description'),
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-kalmar-500" />,
      title: t('howItWorks.steps.step2.title'),
      description: t('howItWorks.steps.step2.description'),
    },
    {
      icon: <Printer className="h-10 w-10 text-kalmar-500" />,
      title: t('howItWorks.steps.step3.title'),
      description: t('howItWorks.steps.step3.description'),
    },
    {
      icon: <Truck className="h-10 w-10 text-kalmar-500" />,
      title: t('howItWorks.steps.step4.title'),
      description: t('howItWorks.steps.step4.description'),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
            {t('howItWorks.title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('howItWorks.description')}
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="relative"
        >
          {/* Timeline connector */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-kalmar-400 to-kalmar-600 transform -translate-x-1/2"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={cn(
                "flex flex-col md:flex-row items-center mb-16 last:mb-0 relative",
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              )}
            >
              {/* Timeline dot */}
              <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-10 w-16 h-16 rounded-full bg-white border-4 border-kalmar-500 items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-kalmar-600">{index + 1}</span>
              </div>
              
              <div 
                className={cn(
                  "w-full md:w-1/2 p-6 md:p-12",
                  index % 2 === 0 ? "md:text-right md:pr-20" : "md:text-left md:pl-20"
                )}
              >
                <div className="md:hidden flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-kalmar-100 text-kalmar-600">
                  {step.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              <div 
                className={cn(
                  "hidden md:block w-full md:w-1/2 p-6 md:p-12",
                  index % 2 === 0 ? "md:pl-20" : "md:pr-20"
                )}
              >
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-kalmar-100 shadow-md mx-auto md:mx-0">
                  {step.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
