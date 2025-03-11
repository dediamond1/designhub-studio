
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO, createOrganizationSchema, createWebsiteSchema } from '@/utils/seo';

const Index = () => {
  const { i18n } = useTranslation();

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

  // Create combined schema for better SEO
  const websiteSchema = createWebsiteSchema('Kalmar Studio', 'https://kalmarstudio.com');
  const organizationSchema = createOrganizationSchema({
    name: 'Kalmar Studio',
    url: 'https://kalmarstudio.com',
    logo: 'https://kalmarstudio.com/logo.png',
    description: 'Custom printing solutions for businesses and individuals. High-quality prints, personalized service, and fast delivery.',
    address: 'Tryckvägen 123, 123 45 Kalmar, Sweden',
    phone: '+46 70 123 45 67',
    email: 'info@kalmarstudio.se',
    sameAs: [
      'https://facebook.com/kalmarstudio',
      'https://instagram.com/kalmarstudio',
      'https://twitter.com/kalmarstudio',
      'https://linkedin.com/company/kalmarstudio'
    ]
  });

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Kalmar Studio | Custom Printing Solutions"
        description="High-quality custom printing for t-shirts, business cards, decals and more. Fast delivery and personalized service for all your printing needs."
        canonicalUrl="https://kalmarstudio.com"
        schema={[websiteSchema, organizationSchema]}
        lang={i18n.language}
      />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
