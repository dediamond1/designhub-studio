
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // Add scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealOnScroll = () => {
      for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          revealElements[i].classList.add('revealed');
        }
      }
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
        
        {/* Dashboard Link (temporary for development) */}
        <div className="fixed bottom-5 right-5 z-50">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center justify-center rounded-full w-12 h-12 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
            title="Admin Dashboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="7" height="9" x="3" y="3" rx="1" />
              <rect width="7" height="5" x="14" y="3" rx="1" />
              <rect width="7" height="9" x="14" y="12" rx="1" />
              <rect width="7" height="5" x="3" y="16" rx="1" />
            </svg>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
