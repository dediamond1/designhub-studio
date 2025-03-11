
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../utils/animations';
import { cn } from '@/lib/utils';
import { Eye, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const PortfolioGallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);
  const { t } = useTranslation('common');
  const [activeFilter, setActiveFilter] = useState('all');

  // Sample portfolio items - in a real app, these would come from an API or CMS
  const portfolioItems = [
    {
      id: 1,
      title: 'Corporate Identity Package',
      category: 'business',
      image: 'https://images.unsplash.com/photo-1586892477838-2b96e85e0f96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '#'
    },
    {
      id: 2,
      title: 'Festival Merchandise',
      category: 'events',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '#'
    },
    {
      id: 3,
      title: 'Product Packaging Redesign',
      category: 'retail',
      image: 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '#'
    },
    {
      id: 4,
      title: 'Restaurant Menu Collection',
      category: 'retail',
      image: 'https://images.unsplash.com/photo-1599458252573-56ae36120de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '#'
    },
    {
      id: 5,
      title: 'Tech Conference Branding',
      category: 'events',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '#'
    },
    {
      id: 6,
      title: 'Fashion Brand Identity',
      category: 'branding',
      image: 'https://images.unsplash.com/photo-1583744946564-b52d01a7f637?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '#'
    }
  ];

  const filters = [
    { id: 'all', label: t('portfolio.filters.all') },
    { id: 'business', label: t('portfolio.filters.business') },
    { id: 'events', label: t('portfolio.filters.events') },
    { id: 'retail', label: t('portfolio.filters.retail') },
    { id: 'branding', label: t('portfolio.filters.branding') }
  ];

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

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
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('portfolio.title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('portfolio.description')}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "px-4 py-2 rounded-full transition-all text-sm font-medium",
                activeFilter === filter.id
                  ? "bg-kalmar-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl shadow-md bg-white"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl font-bold mb-1">{item.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">
                      {filters.find(f => f.id === item.category)?.label}
                    </span>
                    <div className="flex gap-2">
                      <button 
                        className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        aria-label="Quick view"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <a 
                        href={item.link} 
                        className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        aria-label="View project"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <NavLink
            to="/portfolio"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
          >
            {t('buttons.viewAll')}
            <ExternalLink className="ml-2 h-4 w-4" />
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default PortfolioGallery;
