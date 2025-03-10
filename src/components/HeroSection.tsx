
import React, { useRef } from 'react';
import { useScrollReveal, useImageLoad } from '../utils/animations';
import { ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(heroRef, 0.1);
  const { loaded, handleImageLoaded } = useImageLoad();

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1534531173927-aeb928d54385?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80"
          alt="Printing studio showcase"
          className={cn(
            "w-full h-full object-cover transition-opacity duration-1000",
            loaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={handleImageLoaded}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className={cn(
              "transition-all duration-700 delay-300 transform",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <span className="inline-block py-1 px-3 mb-6 text-xs font-medium tracking-wider border border-primary/30 rounded-full bg-primary/5">
              PRINTING EXCELLENCE
            </span>
          </div>

          <h1
            className={cn(
              "text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight transition-all duration-700 delay-500",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            Design, Print, Deliver{" "}
            <span className="block mt-2">Tailored to Your Needs</span>
          </h1>

          <p
            className={cn(
              "text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl mx-auto transition-all duration-700 delay-700",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            Custom designs for T-shirts, Business Cards, Decals, and more – Made just for you with premium quality and personalized service.
          </p>

          <div
            className={cn(
              "flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-1000",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <NavLink
              to="/design"
              className="button-primary group w-full sm:w-auto"
            >
              Start Designing
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </NavLink>
            <NavLink
              to="/contact"
              className="button-outline w-full sm:w-auto"
            >
              Get a Quote
            </NavLink>
          </div>
        </div>

        {/* Social proof logos */}
        <div 
          className={cn(
            "mt-24 flex flex-wrap justify-center items-center gap-8 md:gap-12 transition-all duration-700 delay-1200",
            isVisible
              ? "opacity-70 translate-y-0"
              : "opacity-0 translate-y-10"
          )}
        >
          {['Company 1', 'Company 2', 'Company 3', 'Company 4', 'Company 5'].map((company, index) => (
            <div key={index} className="h-8 text-foreground/40 font-display font-medium">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
