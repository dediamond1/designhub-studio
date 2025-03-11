
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '@/utils/animations';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SEO, createWebsiteSchema } from '@/utils/seo';
import { ArrowRight, ExternalLink, Users, BarChart, Globe, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Define benefit types to ensure proper array typing
interface BenefitItem {
  benefits: string[];
}

const Ads = () => {
  const { t, i18n } = useTranslation(['ads', 'common']);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);

  // SEO schema
  const schema = createWebsiteSchema(
    t('seo.title'),
    'https://kalmarstudio.com/ads'
  );

  // Explicitly cast benefit arrays to ensure they're treated as arrays
  const bronzeBenefits = t('sponsorships.levels.bronze.benefits', { returnObjects: true }) as string[];
  const silverBenefits = t('sponsorships.levels.silver.benefits', { returnObjects: true }) as string[];
  const goldBenefits = t('sponsorships.levels.gold.benefits', { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={t('seo.title')}
        description={t('seo.description')}
        canonicalUrl="https://kalmarstudio.com/ads"
        schema={schema}
        lang={i18n.language}
      />
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-background via-background/95 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block py-1 px-3 mb-6 text-xs font-medium tracking-wider border border-primary/30 rounded-full bg-primary/5">
                {t('title')}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {t('hero.heading')}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {t('hero.subheading')}
              </p>
              <Button size="lg" className="rounded-full px-8">
                {t('contact.cta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Ad Placements */}
        <section ref={sectionRef} className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">{t('adPlacements.title')}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('adPlacements.description')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div 
                className={cn(
                  "bg-card border rounded-xl p-8 hover:shadow-md transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: "100ms" }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('adPlacements.options.website.title')}</h3>
                <p className="text-muted-foreground">{t('adPlacements.options.website.description')}</p>
              </div>
              
              <div 
                className={cn(
                  "bg-card border rounded-xl p-8 hover:shadow-md transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('adPlacements.options.newsletter.title')}</h3>
                <p className="text-muted-foreground">{t('adPlacements.options.newsletter.description')}</p>
              </div>
              
              <div 
                className={cn(
                  "bg-card border rounded-xl p-8 hover:shadow-md transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: "300ms" }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('adPlacements.options.content.title')}</h3>
                <p className="text-muted-foreground">{t('adPlacements.options.content.description')}</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Sponsorship Packages */}
        <section className="py-16 md:py-24 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">{t('sponsorships.title')}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('sponsorships.description')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
                <div className="p-1 bg-gradient-to-r from-amber-200 to-amber-300">
                  <div className="bg-card p-4 text-center">
                    <h3 className="font-semibold">{t('sponsorships.levels.bronze.title')}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-2">
                    {bronzeBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <ArrowRight className="h-4 w-4 text-amber-400 mr-2 mt-1 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full mt-6">
                    {t('contact.cta')}
                  </Button>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-xl overflow-hidden transform hover:shadow-md hover:scale-105 transition-all duration-300 z-10">
                <div className="p-1 bg-gradient-to-r from-gray-300 to-gray-400">
                  <div className="bg-card p-4 text-center">
                    <h3 className="font-semibold">{t('sponsorships.levels.silver.title')}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-2">
                    {silverBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <ArrowRight className="h-4 w-4 text-gray-400 mr-2 mt-1 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6">
                    {t('contact.cta')}
                  </Button>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
                <div className="p-1 bg-gradient-to-r from-yellow-400 to-yellow-500">
                  <div className="bg-card p-4 text-center">
                    <h3 className="font-semibold">{t('sponsorships.levels.gold.title')}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-2">
                    {goldBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <ArrowRight className="h-4 w-4 text-yellow-500 mr-2 mt-1 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full mt-6">
                    {t('contact.cta')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">{t('contact.title')}</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    {t('contact.description')}
                  </p>
                  
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">{t('contact.getInTouch')}</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-primary mt-0.5 mr-3" />
                        <div>
                          <p className="font-medium">Email</p>
                          <a href={`mailto:${t('contact.email')}`} className="text-muted-foreground hover:text-primary">
                            {t('contact.email')}
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-primary mt-0.5 mr-3" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <a href={`tel:${t('contact.phone')}`} className="text-muted-foreground hover:text-primary">
                            {t('contact.phone')}
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button className="w-full">
                        {t('contact.cta')}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="rounded-xl overflow-hidden shadow-lg relative aspect-[4/3]">
                    <img 
                      src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                      alt="Advertising illustration" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                      <div className="p-6 text-white">
                        <p className="text-xl font-semibold mb-2">Reach our audience</p>
                        <p>Join our growing list of advertising partners</p>
                        <div className="flex space-x-2 mt-4">
                          <div className="h-8 w-8 bg-white/20 backdrop-blur-sm rounded-full"></div>
                          <div className="h-8 w-8 bg-white/20 backdrop-blur-sm rounded-full"></div>
                          <div className="h-8 w-8 bg-white/20 backdrop-blur-sm rounded-full"></div>
                          <div className="h-8 w-8 bg-white/20 backdrop-blur-sm rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
              <div>
                <div className="text-4xl font-bold mb-2">10K+</div>
                <p className="text-primary-foreground/70">Monthly visitors</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">5K+</div>
                <p className="text-primary-foreground/70">Newsletter subscribers</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">85%</div>
                <p className="text-primary-foreground/70">Engagement rate</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">30+</div>
                <p className="text-primary-foreground/70">Partner companies</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Ads;
