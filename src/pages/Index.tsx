
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ProcessSection from '../components/ProcessSection';
import FeaturedWorksSection from '../components/FeaturedWorksSection';
import ClientsSection from '../components/ClientsSection';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import IndustrySolutions from '../components/IndustrySolutions';
import HowItWorks from '../components/HowItWorks';
import FaqSection from '../components/FaqSection';
import PriceCalculator from '../components/PriceCalculator';
import PortfolioGallery from '../components/PortfolioGallery';
import DesignPreviewTool from '../components/DesignPreviewTool';
import CustomerReviews from '../components/CustomerReviews';
import { SEO, createOrganizationSchema, createWebsiteSchema } from '@/utils/seo';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Index = () => {
  const { i18n, t } = useTranslation(['home', 'common']);

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  // Create combined schema for better SEO
  const websiteSchema = createWebsiteSchema('Kalmar Studio', 'https://kalmarstudio.com');
  const organizationSchema = createOrganizationSchema({
    name: 'Kalmar Studio',
    url: 'https://kalmarstudio.com',
    logo: 'https://kalmarstudio.com/logo.png',
    description: t('seo.description'),
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
    <motion.div 
      className="min-h-screen flex flex-col"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <SEO 
        title={t('seo.title')}
        description={t('seo.description')}
        canonicalUrl="https://kalmarstudio.com"
        schema={[websiteSchema, organizationSchema]}
        lang={i18n.language}
      />
      <main>
        <HeroSection />
        <ProcessSection />
        <ServicesSection />
        <HowItWorks />
        <PortfolioGallery />
        <FeaturedWorksSection />
        <DesignPreviewTool />
        <IndustrySolutions />
        <PriceCalculator />
        <TestimonialsSection />
        <CustomerReviews />
        <FaqSection />
        <ClientsSection />
        <AboutSection />
        <CtaSection />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Index;
