
import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useScrollReveal } from '../utils/animations';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const headerRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  
  const isHeaderVisible = useScrollReveal(headerRef, 0.1);
  const isMissionVisible = useScrollReveal(missionRef, 0.1);
  const isTeamVisible = useScrollReveal(teamRef, 0.1);
  
  const teamMembers = [
    {
      name: 'Anna Lindberg',
      role: 'VD & Grundare',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      bio: 'Anna startade Kalmar Studio med en passion för tryckkonst och design. Med över 15 års erfarenhet i branschen leder hon nu ett dedikerat team av kreativa experter.'
    },
    {
      name: 'Erik Johansson',
      role: 'Kreativ Director',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      bio: 'Erik har ett öga för detaljer och en passion för grafisk design. Hans kreativa visioner har hjälpt företag över hela Sverige att stärka sina varumärken genom tryckta material.'
    },
    {
      name: 'Maria Svensson',
      role: 'Produktionschef',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80',
      bio: 'Maria säkerställer att varje projekt levereras med högsta kvalitet och inom tidsramen. Hennes noggrannhet och effektivitet har gjort Kalmar Studio känt för sin pålitlighet.'
    },
    {
      name: 'Johan Karlsson',
      role: 'Kundtjänstchef',
      image: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      bio: 'Johan brinner för kundservice och ser till att varje kund får den bästa möjliga upplevelsen. Hans positiva attityd och lösningsorienterade förhållningssätt uppskattas av alla.'
    }
  ];
  
  const milestones = [
    { year: '2010', event: 'Kalmar Studio grundas av Anna Lindberg' },
    { year: '2012', event: 'Öppning av första fysiska studion i Kalmar centrum' },
    { year: '2015', event: 'Lansering av vår webbutik med anpassningsbara designtjänster' },
    { year: '2017', event: 'Expansion till större lokaler med modernare utrustning' },
    { year: '2019', event: 'Vinnare av "Årets företag" i Kalmar län' },
    { year: '2021', event: 'Lansering av miljövänliga tryckalternativ' },
    { year: '2023', event: 'Öppning av andra studio i Växjö' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        {/* Header Section */}
        <section 
          ref={headerRef}
          className="pt-32 pb-20 md:pt-40 md:pb-32 bg-kalmar-50 relative overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute right-0 top-0 w-1/2 h-full bg-kalmar-100 rounded-bl-[200px] opacity-50 transform translate-x-1/4 -translate-y-1/4" />
            <div className="absolute left-0 bottom-0 w-1/2 h-full bg-kalmar-200 rounded-tr-[200px] opacity-30 transform -translate-x-1/4 translate-y-1/4" />
          </div>
          
          <div className="section-container relative z-10">
            <div className="max-w-3xl">
              <span 
                className={cn(
                  "inline-block py-1 px-3 mb-6 text-xs font-medium tracking-wider border border-primary/30 rounded-full bg-primary/5 transition-all duration-700",
                  isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                OM OSS
              </span>
              
              <h1 
                className={cn(
                  "text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight transition-all duration-700 delay-100",
                  isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Kreativitet, kvalitet och personligt engagemang
              </h1>
              
              <p 
                className={cn(
                  "text-lg md:text-xl text-foreground/80 max-w-2xl transition-all duration-700 delay-200",
                  isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Lär känna teamet bakom Kalmar Studio och upptäck vår passion för att skapa exceptionella trycksaker och designlösningar. Vår resa från en liten studio till ett etablerat varumärke är driven av vår kärlek till konsten att trycka.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Mission Section */}
        <section 
          ref={missionRef}
          className="py-20 md:py-32"
        >
          <div className="section-container">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <span 
                  className={cn(
                    "inline-block py-1 px-3 mb-6 text-xs font-medium tracking-wider border border-primary/30 rounded-full bg-primary/5 transition-all duration-700",
                    isMissionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                >
                  VÅR MISSION
                </span>
                
                <h2 
                  className={cn(
                    "text-3xl md:text-4xl font-bold mb-6 transition-all duration-700 delay-100",
                    isMissionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                >
                  Vi tror på kraften i att föra idéer till liv
                </h2>
                
                <p 
                  className={cn(
                    "text-foreground/70 mb-6 transition-all duration-700 delay-200",
                    isMissionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                >
                  På Kalmar Studio drivs vi av en passion för att hjälpa våra kunder förverkliga sina idéer genom högkvalitativa trycksaker och designlösningar. Vi tror att varje företag, oavsett storlek, förtjänar professionellt marknadsföringsmaterial som speglar deras unika identitet och värderingar.
                </p>
                
                <p 
                  className={cn(
                    "text-foreground/70 mb-8 transition-all duration-700 delay-300",
                    isMissionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                >
                  Vår filosofi bygger på tre grundpelare: kreativitet, kvalitet och personligt engagemang. Vi strävar efter att överträffa våra kunders förväntningar genom att erbjuda skräddarsydda lösningar som kombinerar innovation med hantverksskicklighet.
                </p>
                
                <div 
                  className={cn(
                    "flex flex-col gap-4 transition-all duration-700 delay-400",
                    isMissionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                >
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-kalmar-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Kreativa lösningar</h3>
                      <p className="text-foreground/70">Vi tänker utanför boxen för att hitta unika designlösningar som får ditt varumärke att sticka ut.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-kalmar-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Högsta kvalitet</h3>
                      <p className="text-foreground/70">Vi kompromissar aldrig med kvaliteten. Från papper till tryck använder vi endast de bästa materialen och metoderna.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-kalmar-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Personlig service</h3>
                      <p className="text-foreground/70">Vi behandlar varje kund som en partner och ser till att förstå dina behov för att leverera bästa möjliga resultat.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div 
                  className={cn(
                    "relative z-10 rounded-2xl overflow-hidden shadow-card transition-all duration-700 delay-500",
                    isMissionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Printing studio workspace"
                    className="w-full h-full object-cover aspect-square"
                  />
                </div>
                
                <div 
                  className={cn(
                    "absolute -bottom-6 -right-6 p-8 bg-white rounded-2xl shadow-card border border-border z-20 max-w-xs transition-all duration-700 delay-700",
                    isMissionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                >
                  <p className="text-lg font-medium mb-2">"Vår vision är att vara det självklara valet för kreativa trycklösningar i Sverige."</p>
                  <p className="text-foreground/70 text-sm">- Anna Lindberg, VD & Grundare</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Team Section */}
        <section 
          ref={teamRef}
          className="py-20 md:py-32 bg-kalmar-50"
        >
          <div className="section-container">
            <div className="text-center mb-16">
              <span 
                className={cn(
                  "inline-block py-1 px-3 mb-6 text-xs font-medium tracking-wider border border-primary/30 rounded-full bg-primary/5 transition-all duration-700",
                  isTeamVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                VÅRT TEAM
              </span>
              
              <h2 
                className={cn(
                  "text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 delay-100",
                  isTeamVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Möt de kreativa krafterna bakom Kalmar Studio
              </h2>
              
              <p 
                className={cn(
                  "text-foreground/70 text-lg max-w-2xl mx-auto transition-all duration-700 delay-200",
                  isTeamVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Vi är ett passionerat team med olika bakgrunder och kompetenser, förenade av vår kärlek till design och print.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className={cn(
                    "bg-background rounded-xl border border-border shadow-subtle hover:shadow-elevated transition-all duration-500 overflow-hidden group",
                    isTeamVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                  style={{
                    transitionDelay: isTeamVisible ? `${300 + index * 100}ms` : "0ms",
                  }}
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-kalmar-600 mb-4">{member.role}</p>
                    <p className="text-foreground/70 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div 
              className={cn(
                "mt-16 text-center transition-all duration-700 delay-700",
                isTeamVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              <NavLink to="/career" className="button-primary group">
                Bli en del av vårt team
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </NavLink>
            </div>
          </div>
        </section>
        
        {/* Timeline Section */}
        <section className="py-20 md:py-32">
          <div className="section-container">
            <div className="text-center mb-16">
              <span className="inline-block py-1 px-3 mb-6 text-xs font-medium tracking-wider border border-primary/30 rounded-full bg-primary/5">
                VÅR HISTORIA
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Vår resa från start till idag
              </h2>
              
              <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
                Det har varit en spännande resa att bygga Kalmar Studio till vad det är idag. Här är några av våra viktigaste milstolpar.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-kalmar-200" />
                
                {/* Timeline events */}
                <div className="space-y-12">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="relative pl-12">
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-kalmar-100 border-2 border-kalmar-600 flex items-center justify-center">
                        <div className="w-3 h-3 bg-kalmar-600 rounded-full" />
                      </div>
                      
                      <div className="bg-background rounded-xl border border-border shadow-subtle p-6 reveal-on-scroll">
                        <span className="text-kalmar-600 font-bold text-xl mb-2 inline-block">{milestone.year}</span>
                        <p className="text-lg">{milestone.event}</p>
                      </div>
                    </div>
                  ))}
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

export default About;
