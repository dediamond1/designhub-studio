
import React, { useRef } from 'react';
import { useScrollReveal } from '../utils/animations';
import { ExternalLink, ShoppingBag, Image, FileImage, Palette, Globe } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const services = [
  {
    title: 'T-shirts & Kläder',
    description: 'Skapa personliga t-shirts och kläder med din egen design. Perfekt för event, företag eller personligt bruk.',
    icon: <ShoppingBag className="h-6 w-6" />,
    link: '/services#t-shirts',
    details: 'Våra högkvalitativa tyger och trycktekniker garanterar slitstarka tryck som håller länge. Vi erbjuder allt från enstaka plagg till större beställningar för företag, föreningar eller event.'
  },
  {
    title: 'Visitkort & Trycksaker',
    description: 'Professionella visitkort och trycksaker som gör intryck och stärker ditt varumärke.',
    icon: <FileImage className="h-6 w-6" />,
    link: '/services#business-cards',
    details: 'Vi erbjuder ett brett sortiment av papperskvaliteter, ytbehandlingar och format. Från standardvistkort till specialutformade broschyrer, kataloger och presentationsmaterial.'
  },
  {
    title: 'Dekaler & Klistermärken',
    description: 'Högkvalitativa dekaler och klistermärken i olika former och storlekar för alla ändamål.',
    icon: <Image className="h-6 w-6" />,
    link: '/services#decals',
    details: 'Våra dekaler är tillverkade av väderbeständigt material som passar både inomhus- och utomhusbruk. Perfekt för bildekor, skyltfönster, produktmärkning eller marknadsföring.'
  },
  {
    title: 'Grafisk Design',
    description: 'Låt våra designers hjälpa dig skapa unika och professionella designlösningar för ditt varumärke.',
    icon: <Palette className="h-6 w-6" />,
    link: '/services#design',
    details: 'Från logotyper och visuell identitet till kampanjmaterial och produktförpackningar. Våra erfarna designers hjälper dig att förmedla rätt budskap genom professionell design.'
  },
  {
    title: 'Webb & Sociala Medier',
    description: 'Designlösningar för dina digitala kanaler, från webbplatser till sociala medier.',
    icon: <Globe className="h-6 w-6" />,
    link: '/services#web',
    details: 'Vi hjälper dig att skapa enhetlig design över alla dina digitala plattformar. Banners för sociala medier, nyhetsbrev, digitala annonser och mycket mer.'
  }
];

const ServicesPage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <section className="pt-28 pb-20 md:pt-32 md:pb-32 bg-kalmar-50">
          <div className="section-container">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <span
                className={cn(
                  "inline-block py-1 px-3 mb-6 text-xs font-medium tracking-wider border border-primary/30 rounded-full bg-primary/5 transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                VÅRA TJÄNSTER
              </span>
              <h1
                className={cn(
                  "text-3xl md:text-5xl font-bold mb-4 transition-all duration-700 delay-100",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Upptäck vårt utbud av trycktjänster
              </h1>
              <p
                className={cn(
                  "text-foreground/70 text-lg transition-all duration-700 delay-200",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Vi erbjuder högkvalitativa tryck- och designlösningar för alla behov, från företag till privatpersoner.
              </p>
            </div>
          </div>
        </section>

        <section ref={sectionRef} className="py-20 md:py-32 bg-background">
          <div className="section-container">
            <div className="grid grid-cols-1 gap-16">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className={cn(
                    "grid md:grid-cols-2 gap-12 items-center",
                    index % 2 !== 0 && "md:flex-row-reverse md:[&>div:first-child]:ml-auto"
                  )}
                >
                  <div 
                    className={cn(
                      "bg-kalmar-50 rounded-2xl p-8 md:p-12 shadow-subtle transition-all duration-700",
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    <div className="p-3 bg-kalmar-100 rounded-lg inline-block mb-5">
                      {service.icon}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{service.title}</h2>
                    <p className="text-foreground/70 mb-4">{service.description}</p>
                    <p className="mb-6">{service.details}</p>
                    <NavLink
                      to={service.link}
                      className="flex items-center text-kalmar-600 font-medium hover:text-kalmar-700 transition-colors hover:underline"
                    >
                      Läs mer
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </NavLink>
                  </div>
                  
                  <div 
                    className={cn(
                      "rounded-2xl overflow-hidden shadow-card transition-all duration-700",
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    <img 
                      src={`https://images.unsplash.com/photo-15${(index + 1) * 10}8943681383-65cc7fb3a911?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80`} 
                      alt={`${service.title} service`}
                      className="w-full h-full object-cover aspect-[4/3]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-20 md:py-32 bg-kalmar-50">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Redo att starta ditt projekt?</h2>
              <p className="text-foreground/70 text-lg mb-10">Kontakta oss idag för att diskutera dina behov eller begära en offert. Vi ser fram emot att hjälpa dig förverkliga dina idéer.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <NavLink to="/contact" className="button-primary">
                  Få en offert
                </NavLink>
                <NavLink to="/design" className="button-outline">
                  Designa din egen
                </NavLink>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
