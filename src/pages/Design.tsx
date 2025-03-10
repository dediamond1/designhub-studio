
import React, { useRef } from 'react';
import { useScrollReveal } from '../utils/animations';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Shirt, FileText, Sticker, PenTool } from 'lucide-react';
import { cn } from '@/lib/utils';

const designOptions = [
  {
    icon: <Shirt className="h-8 w-8" />,
    title: 'T-shirts & Kläder',
    description: 'Skapa personliga t-shirts och kläder med din egen design. Ladda upp egna bilder eller använd våra mallar.',
    cta: 'Designa kläder',
    link: '/design/clothes'
  },
  {
    icon: <FileText className="h-8 w-8" />,
    title: 'Visitkort & Trycksaker',
    description: 'Gör intryck med professionella visitkort och trycksaker. Välj mellan olika format och papperskvaliteter.',
    cta: 'Designa trycksaker',
    link: '/design/print'
  },
  {
    icon: <Sticker className="h-8 w-8" />,
    title: 'Dekaler & Klistermärken',
    description: 'Skapa unika dekaler och klistermärken för alla ändamål. Varje form och storlek är möjlig.',
    cta: 'Designa dekaler',
    link: '/design/stickers'
  },
  {
    icon: <PenTool className="h-8 w-8" />,
    title: 'Behöver du hjälp?',
    description: 'Låt våra designers skapa unika och professionella designlösningar för ditt varumärke.',
    cta: 'Kontakta oss',
    link: '/contact'
  }
];

const DesignPage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <section className="pt-28 pb-20 md:pt-32 md:pb-32 bg-gradient-to-br from-kalmar-50 to-kalmar-100/50">
          <div className="section-container">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span
                className={cn(
                  "inline-block py-1 px-3 mb-6 text-xs font-medium tracking-wider border border-primary/30 rounded-full bg-primary/5 transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                DESIGNVERKTYG
              </span>
              <h1
                className={cn(
                  "text-3xl md:text-5xl font-bold mb-4 transition-all duration-700 delay-100",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Skapa din egen design
              </h1>
              <p
                className={cn(
                  "text-foreground/70 text-lg transition-all duration-700 delay-200",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Använd vårt enkla designverktyg för att skapa personliga tryck på kläder, visitkort, dekaler och mycket mer. Inga designkunskaper krävs!
              </p>
            </div>

            <div
              className={cn(
                "transition-all duration-700 delay-300 max-w-5xl mx-auto",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              <img 
                src="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
                alt="Design tool preview"
                className="w-full h-auto rounded-2xl shadow-card"
              />
            </div>
          </div>
        </section>

        <section ref={sectionRef} className="py-20 md:py-32">
          <div className="section-container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Välj vad du vill designa</h2>
              <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
                Vi erbjuder flera olika produkter som du kan anpassa efter dina behov. Välj en kategori för att komma igång.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {designOptions.map((option, index) => (
                <div
                  key={index}
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
                  <div className="p-8 flex flex-col h-full">
                    <div className="p-4 bg-kalmar-100/50 rounded-full inline-block mb-6 self-start">
                      {option.icon}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3">{option.title}</h3>
                    
                    <p className="text-foreground/70 mb-6 flex-grow">
                      {option.description}
                    </p>
                    
                    <NavLink
                      to={option.link}
                      className="flex items-center justify-center w-full text-kalmar-600 py-3 px-4 font-medium rounded-lg border border-kalmar-600/30 hover:bg-kalmar-50 transition-colors group"
                    >
                      {option.cta}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </NavLink>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-20 md:py-32 bg-kalmar-50">
          <div className="section-container">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Hur fungerar det?</h2>
                
                <ol className="space-y-8 mb-8">
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-kalmar-600 text-white font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Välj en produkt</h3>
                      <p className="text-foreground/70">
                        Välj vilken produkt du vill designa från vårt breda sortiment av kläder, trycksaker och dekaler.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-kalmar-600 text-white font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Anpassa din design</h3>
                      <p className="text-foreground/70">
                        Använd vårt användarvänliga designverktyg för att ladda upp bilder, lägga till text eller välja från vårt bibliotek av mallar.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-kalmar-600 text-white font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Granska och beställ</h3>
                      <p className="text-foreground/70">
                        Förhandsgranska din design, välj antal och lägg din beställning. Vi levererar direkt till din dörr.
                      </p>
                    </div>
                  </li>
                </ol>
                
                <NavLink
                  to={designOptions[0].link}
                  className="button-primary group"
                >
                  Kom igång nu
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </NavLink>
              </div>
              
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-card">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                    alt="Design process"
                    className="w-full h-full object-cover aspect-[4/3]"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 -z-10 w-64 h-64 bg-kalmar-100 rounded-full opacity-50" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DesignPage;
