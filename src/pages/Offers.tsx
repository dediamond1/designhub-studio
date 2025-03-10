
import React, { useRef } from 'react';
import { useScrollReveal } from '../utils/animations';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Percent, Clock, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const offers = [
  {
    id: 1,
    title: 'Sommarkampanj',
    description: '25% rabatt på alla t-shirts och kläder',
    details: 'Perfekt för företagsevent, familjefester eller personliga presenter. Beställ minst 10 plagg och få extra rabatt.',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1654&q=80',
    expires: '30 juli 2023',
    cta: 'Beställ nu',
    link: '/design/clothes',
    discount: '25%',
    featured: true
  },
  {
    id: 2,
    title: 'Företagspaket',
    description: 'Visitkort, broschyrer och kuvert till specialpris',
    details: 'Komplett paket för ditt företag. Inkluderar 500 visitkort, 100 broschyrer och 250 kuvert med ditt företags design.',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80',
    expires: '15 augusti 2023',
    cta: 'Se erbjudande',
    link: '/services#business-cards',
    price: '2495:-',
    discount: '30%'
  },
  {
    id: 3,
    title: 'Stora mängder, små priser',
    description: 'Mängdrabatt på dekaler och klistermärken',
    details: 'Ju fler du beställer, desto större rabatt. Perfekt för event, marknadsföring eller produktmärkning.',
    image: 'https://images.unsplash.com/photo-1609208469039-c0bfbd08eeb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1816&q=80',
    expires: '1 september 2023',
    cta: 'Beställ dekaler',
    link: '/design/stickers',
    discount: 'Upp till 40%'
  }
];

const benefits = [
  'Högkvalitativa material och tryck',
  'Snabb leverans inom 3-5 arbetsdagar',
  'Personlig service och support',
  'Kundnöjdhetsgaranti',
  'Miljövänliga alternativ tillgängliga'
];

const OffersPage = () => {
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
                ERBJUDANDEN
              </span>
              <h1
                className={cn(
                  "text-3xl md:text-5xl font-bold mb-4 transition-all duration-700 delay-100",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Aktuella kampanjer och rabatter
              </h1>
              <p
                className={cn(
                  "text-foreground/70 text-lg transition-all duration-700 delay-200",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Ta del av våra bästa erbjudanden och spara på dina tryckbeställningar.
              </p>
            </div>
          </div>
        </section>

        <section ref={sectionRef} className="py-20 md:py-32">
          <div className="section-container">
            <div className="grid md:grid-cols-2 gap-10 mb-16">
              <div
                className={cn(
                  "relative col-span-2 bg-kalmar-600 rounded-2xl overflow-hidden shadow-card group transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-kalmar-900/50 to-kalmar-700/10 z-10" />
                
                <div className="grid md:grid-cols-2 h-full">
                  <div className="p-8 md:p-12 relative z-20 flex flex-col justify-center">
                    <div className="flex items-center mb-6">
                      <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg mr-4">
                        <Percent className="h-6 w-6 text-white" />
                      </div>
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white">
                        Topperbjudande
                      </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      {offers[0].title}
                    </h2>
                    
                    <h3 className="text-xl md:text-2xl font-medium text-white/90 mb-6">
                      {offers[0].description}
                    </h3>
                    
                    <p className="text-white/80 mb-8">
                      {offers[0].details}
                    </p>
                    
                    <div className="flex items-center mb-8">
                      <Clock className="h-5 w-5 text-white/80 mr-2" />
                      <span className="text-white/80">Gäller till {offers[0].expires}</span>
                    </div>
                    
                    <NavLink
                      to={offers[0].link}
                      className="button-white group self-start"
                    >
                      {offers[0].cta}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </NavLink>
                  </div>
                  
                  <div className="hidden md:block">
                    <img 
                      src={offers[0].image} 
                      alt={offers[0].title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
              
              {offers.slice(1).map((offer, index) => (
                <div
                  key={offer.id}
                  className={cn(
                    "bg-white rounded-xl border border-border shadow-subtle hover:shadow-elevated transition-all duration-500 overflow-hidden group",
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  )}
                  style={{
                    transitionDelay: isVisible ? `${300 + index * 100}ms` : "0ms",
                  }}
                >
                  <div className="relative overflow-hidden aspect-[16/9]">
                    <img 
                      src={offer.image} 
                      alt={offer.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-kalmar-600 px-3 py-1 rounded-full text-xs font-medium text-white">
                        {offer.discount} rabatt
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {offer.title}
                    </h3>
                    
                    <p className="text-lg text-foreground/90 font-medium mb-4">
                      {offer.description}
                    </p>
                    
                    <p className="text-foreground/70 mb-6">
                      {offer.details}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-foreground/60">
                        <Clock className="h-4 w-4 mr-1" />
                        Gäller till {offer.expires}
                      </div>
                      
                      <NavLink
                        to={offer.link}
                        className="flex items-center text-kalmar-600 font-medium hover:text-kalmar-700 transition-colors group"
                      >
                        {offer.cta}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-8 md:p-12 bg-kalmar-50 rounded-2xl">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    Varför välja Kalmar Studio?
                  </h2>
                  
                  <ul className="space-y-4 mb-8">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="p-1 bg-kalmar-100 rounded-full mr-3 mt-0.5">
                          <Check className="h-4 w-4 text-kalmar-700" />
                        </div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <NavLink
                    to="/contact"
                    className="button-primary group"
                  >
                    Kontakta oss
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </NavLink>
                </div>
                
                <div>
                  <div className="bg-white p-6 md:p-8 rounded-xl border border-border shadow-subtle">
                    <h3 className="text-xl font-semibold mb-6">
                      Anmäl dig till vårt nyhetsbrev
                    </h3>
                    
                    <p className="text-foreground/70 mb-6">
                      Få de senaste erbjudandena direkt till din inkorg. Prenumerera nu och få 10% rabatt på din första beställning.
                    </p>
                    
                    <form className="space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Ditt namn"
                          className="w-full px-4 py-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-kalmar-500"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="Din e-post"
                          className="w-full px-4 py-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-kalmar-500"
                          required
                        />
                      </div>
                      <button type="submit" className="button-primary w-full">
                        Prenumerera
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OffersPage;
