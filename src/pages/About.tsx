
import React, { useRef } from 'react';
import { useScrollReveal } from '../utils/animations';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Award, Clock, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

const highlights = [
  'Högkvalitativa trycklösningar',
  'Personlig service',
  'Snabba leveranser',
  'Miljövänliga material',
  'Prisbelönt design',
  'Kundfokuserad process'
];

const values = [
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Kundrelationer',
    description: 'Vi bygger långsiktiga relationer med våra kunder genom att alltid leverera över förväntan och prioritera kundnöjdhet.'
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: 'Kvalitet',
    description: 'Vi kompromissar aldrig med kvalitet. Varje produkt som lämnar våra lokaler håller högsta standard.'
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Punktlighet',
    description: 'Vi förstår vikten av deadlines och levererar alltid i tid. Din tid är värdefull för oss.'
  },
  {
    icon: <Leaf className="h-6 w-6" />,
    title: 'Hållbarhet',
    description: 'Vi tar miljöansvar genom att använda hållbara material och miljövänliga processer i vår produktion.'
  }
];

const AboutPage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);
  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesVisible = useScrollReveal(valuesRef, 0.1);

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
                OM KALMAR STUDIO
              </span>
              <h1
                className={cn(
                  "text-3xl md:text-5xl font-bold mb-4 transition-all duration-700 delay-100",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Din vision, vårt hantverk
              </h1>
              <p
                className={cn(
                  "text-foreground/70 text-lg transition-all duration-700 delay-200",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Lär känna historien bakom Kalmar Studio och vår passion för tryck och design.
              </p>
            </div>
          </div>
        </section>

        <section ref={sectionRef} className="py-20 md:py-32">
          <div className="section-container">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="relative">
                <div
                  className={cn(
                    "relative z-10 rounded-2xl overflow-hidden shadow-card transition-all duration-700",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1572943681383-65cc7fb3a911?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                    alt="Printing studio"
                    className="w-full h-full object-cover aspect-[4/3]"
                  />
                </div>
                <div 
                  className={cn(
                    "absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 -z-10 w-64 h-64 bg-kalmar-100 rounded-full transition-all duration-700 delay-200",
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  )}
                />
                <div 
                  className={cn(
                    "absolute top-0 left-0 -translate-y-1/4 -translate-x-1/4 -z-10 w-40 h-40 bg-kalmar-200 rounded-full transition-all duration-700 delay-300",
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  )}
                />
              </div>

              <div>
                <h2
                  className={cn(
                    "text-3xl md:text-4xl font-bold mb-6 transition-all duration-700 delay-100",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                >
                  Vår historia
                </h2>

                <p
                  className={cn(
                    "text-foreground/70 mb-6 transition-all duration-700 delay-200",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                >
                  Kalmar Studio grundades 2010 med visionen att erbjuda högkvalitativa trycklösningar till rimliga priser. Vad som började som en liten verksamhet med fokus på visitkort och affischer har vuxit till ett fullservicetryckeri med modern utrustning och ett team av erfarna formgivare.
                </p>

                <p
                  className={cn(
                    "text-foreground/70 mb-8 transition-all duration-700 delay-300",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                >
                  Vår filosofi bygger på personlig service, noggrannhet och kreativitet. Vi tror på att bygga långsiktiga relationer med våra kunder genom att leverera resultat som överträffar förväntningar. Idag servar vi kunder över hela Sverige med allt från enskilda beställningar till storskaliga företagsprojekt.
                </p>

                <div
                  className={cn(
                    "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 transition-all duration-700 delay-400",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                >
                  {highlights.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-kalmar-600 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section ref={valuesRef} className="py-20 md:py-32 bg-kalmar-50">
          <div className="section-container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Våra värderingar</h2>
              <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
                Värderingar som guidar oss i vårt dagliga arbete och formar hur vi interagerar med våra kunder och partners.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className={cn(
                    "bg-background p-8 rounded-xl border border-border shadow-subtle transition-all duration-700",
                    valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="p-3 bg-kalmar-100/50 rounded-lg inline-block mb-5">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-foreground/70">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-20 md:py-32">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Redo att samarbeta med oss?</h2>
              <p className="text-foreground/70 text-lg mb-10">Vi ser fram emot att hjälpa dig förverkliga dina idéer. Kontakta oss idag för att diskutera ditt projekt.</p>
              <NavLink
                to="/contact"
                className="button-primary group"
              >
                Kontakta oss
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </NavLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
