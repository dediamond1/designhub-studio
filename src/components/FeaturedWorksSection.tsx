
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal, useImageLoad } from '../utils/animations';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const FeaturedWorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);
  const { loaded: loaded1, handleImageLoaded: handleImageLoaded1 } = useImageLoad();
  const { loaded: loaded2, handleImageLoaded: handleImageLoaded2 } = useImageLoad();
  const { loaded: loaded3, handleImageLoaded: handleImageLoaded3 } = useImageLoad();
  const { loaded: loaded4, handleImageLoaded: handleImageLoaded4 } = useImageLoad();
  const { t } = useTranslation(['home', 'common']);

  const projects = [
    {
      title: t('recentProjects.project1.title'),
      category: t('recentProjects.project1.category'),
      image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      loaded: loaded1,
      handleImageLoaded: handleImageLoaded1
    },
    {
      title: t('recentProjects.project2.title'),
      category: t('recentProjects.project2.category'),
      image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      loaded: loaded2,
      handleImageLoaded: handleImageLoaded2
    },
    {
      title: t('recentProjects.project3.title'),
      category: t('recentProjects.project3.category'),
      image: 'https://images.unsplash.com/photo-1621331938577-3056e20fecfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      loaded: loaded3,
      handleImageLoaded: handleImageLoaded3
    },
    {
      title: t('recentProjects.project4.title'),
      category: t('recentProjects.project4.category'),
      image: 'https://images.unsplash.com/photo-1589384267710-7a170981ca78?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      loaded: loaded4,
      handleImageLoaded: handleImageLoaded4
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-32">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="inline-block py-1 px-3 mb-6 text-xs font-medium tracking-wider border border-primary/30 rounded-full bg-primary/5"
            >
              {t('recentProjects.tagline')}
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              {t('recentProjects.title')}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-foreground/70 text-lg max-w-2xl"
            >
              {t('recentProjects.description')}
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 md:mt-0"
          >
            <NavLink to="/services" className="button-outline group">
              {t('buttons.viewAll')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </NavLink>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="group overflow-hidden rounded-xl shadow-card bg-white hover:shadow-xl transition-shadow duration-500"
            >
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src={project.image}
                  alt={project.title}
                  className={cn(
                    "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105",
                    project.loaded ? "opacity-100" : "opacity-0"
                  )}
                  onLoad={project.handleImageLoaded}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <NavLink
                      to="/services"
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-kalmar-600 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </NavLink>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-sm text-kalmar-600 font-medium mb-2">{project.category}</p>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-kalmar-600 transition-colors">
                  {project.title}
                </h3>
                <NavLink
                  to="/services"
                  className="flex items-center text-sm text-kalmar-600 font-medium hover:text-kalmar-700 transition-colors group-hover:underline"
                >
                  {t('buttons.readMore')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </NavLink>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorksSection;
