
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../utils/animations';
import { cn } from '@/lib/utils';
import { Star, StarHalf, User, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CustomerReviews = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);
  const { t } = useTranslation('common');
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Sample review data
  const reviews = [
    {
      id: 1,
      name: "Emma Johnson",
      company: "Fashion Boutique",
      rating: 5,
      comment: "The quality of our t-shirts and promotional materials exceeded our expectations. Kalmar Studio delivered everything on time for our store launch. Highly recommend their services!",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      name: "Marcus Peterson",
      company: "Tech Startup",
      rating: 4.5,
      comment: "Great experience working with Kalmar Studio for our conference materials. The team was professional and responsive throughout the entire process. The only minor issue was a slight delay with delivery.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      name: "Sofia Lindqvist",
      company: "Local Restaurant",
      rating: 5,
      comment: "Our menus and signage look fantastic! The design team took our vague ideas and transformed them into exactly what we needed. Will definitely use their services again for future projects.",
      image: "https://randomuser.me/api/portraits/women/67.jpg"
    },
    {
      id: 4,
      name: "Alex Bergman",
      company: "Event Planning",
      rating: 4,
      comment: "Kalmar Studio helped us create memorable branding for our annual charity event. The quality was excellent, though I wish there were more customization options for some items.",
      image: "https://randomuser.me/api/portraits/men/11.jpg"
    }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-kalmar-800 text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Large decorative quote icon */}
        <div className="absolute top-0 right-0 opacity-5">
          <Quote className="h-64 w-64 rotate-180" />
        </div>
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('reviews.title')}
          </h2>
          <p className="text-gray-300 text-lg">
            {t('reviews.description')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Review Carousel */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-kalmar-700/50 rounded-2xl p-8 md:p-10 backdrop-blur-sm">
                    <div className="flex items-center mb-6">
                      <div className="mr-4">
                        <img 
                          src={review.image} 
                          alt={review.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-kalmar-500" 
                        />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold">{review.name}</h4>
                        <p className="text-kalmar-300">{review.company}</p>
                        <div className="flex mt-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                    </div>
                    
                    <blockquote className="text-gray-200 text-lg italic leading-relaxed">
                      "{review.comment}"
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex justify-between mt-8">
            <div className="flex space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all",
                    activeSlide === index
                      ? "bg-kalmar-400 w-6"
                      : "bg-kalmar-600 hover:bg-kalmar-500"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-kalmar-700 hover:bg-kalmar-600 transition-colors"
                aria-label="Previous review"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-kalmar-700 hover:bg-kalmar-600 transition-colors"
                aria-label="Next review"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
