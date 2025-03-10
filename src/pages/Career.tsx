
import React, { useRef } from 'react';
import { useScrollReveal } from '../utils/animations';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Briefcase, MapPin, Clock, Users, BriefcaseBusiness } from 'lucide-react';
import { cn } from '@/lib/utils';

const jobListings = [
  {
    id: 1,
    title: 'Grafisk designer',
    type: 'Heltid',
    location: 'Kalmar',
    department: 'Design',
    description: 'Vi söker en kreativ grafisk designer med passion för tryck och digitala medier. Du kommer att arbeta med en mängd olika projekt för våra kunder, från logotypdesign till kompletta företagsidentiteter.',
    requirements: [
      'Minst 3 års erfarenhet som grafisk designer',
      'Expertkunskaper i Adobe Creative Suite',
      'Portfolio som visar ditt arbete inom tryck och digital design',
      'Förmåga att hantera flera projekt samtidigt',
      'Kunskaper i UX/UI design är meriterande'
    ]
  },
  {
    id: 2,
    title: 'Tryckerioperatör',
    type: 'Heltid',
    location: 'Kalmar',
    department: 'Produktion',
    description: 'Som tryckerioperatör ansvarar du för hantering av våra tryckpressar och efterbehandlingsutrustning. Du säkerställer att alla trycksaker håller hög kvalitet och levereras i tid.',
    requirements: [
      'Erfarenhet av att arbeta med digitala tryckpressar',
      'Kunskap om olika trycktekniker och material',
      'Noggrann och kvalitetsmedveten',
      'Förmåga att arbeta självständigt och i team',
      'Tekniskt kunnig med grundläggande felsökningsförmåga'
    ]
  },
  {
    id: 3,
    title: 'Säljare',
    type: 'Heltid',
    location: 'Kalmar',
    department: 'Försäljning',
    description: 'Vi söker en driven säljare som vill hjälpa våra kunder att hitta de bästa trycklösningarna för deras behov. Du kommer att arbeta med både nya och befintliga kunder och bygga långsiktiga relationer.',
    requirements: [
      'Dokumenterad erfarenhet av B2B-försäljning',
      'God kommunikationsförmåga och social kompetens',
      'Förmåga att förstå kundens behov och hitta rätt lösningar',
      'Målinriktad och resultatorienterad',
      'Erfarenhet från tryckeri- eller designbranschen är meriterande'
    ]
  }
];

const values = [
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Teamwork',
    description: 'Vi tror på kraften i samarbete och att vi tillsammans skapar de bästa resultaten.'
  },
  {
    icon: <BriefcaseBusiness className="h-6 w-6" />,
    title: 'Utveckling',
    description: 'Vi uppmuntrar ständig kompetensutveckling och personlig tillväxt hos alla medarbetare.'
  }
];

const CareerPage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);
  const jobsRef = useRef<HTMLDivElement>(null);
  const jobsVisible = useScrollReveal(jobsRef, 0.1);

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
                KARRIÄR
              </span>
              <h1
                className={cn(
                  "text-3xl md:text-5xl font-bold mb-4 transition-all duration-700 delay-100",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Jobba hos oss
              </h1>
              <p
                className={cn(
                  "text-foreground/70 text-lg transition-all duration-700 delay-200",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Upptäck karriärmöjligheter hos Kalmar Studio och bli en del av vårt kreativa team.
              </p>
            </div>
          </div>
        </section>

        <section ref={sectionRef} className="py-20 md:py-32 bg-background">
          <div className="section-container">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2
                  className={cn(
                    "text-3xl md:text-4xl font-bold mb-6 transition-all duration-700 delay-100",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                >
                  Vår arbetsplats
                </h2>

                <p
                  className={cn(
                    "text-foreground/70 mb-6 transition-all duration-700 delay-200",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                >
                  På Kalmar Studio värdesätter vi kreativitet, samarbete och kontinuerlig utveckling. Vi strävar efter att skapa en inkluderande och inspirerande arbetsmiljö där varje medarbetare kan växa och utvecklas både professionellt och personligt.
                </p>

                <p
                  className={cn(
                    "text-foreground/70 mb-8 transition-all duration-700 delay-300",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                >
                  Som anställd hos oss får du möjlighet att arbeta med spännande projekt och varumärken samtidigt som du blir en del av ett passionerat team som drivs av att skapa enastående tryck- och designlösningar.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {values.map((value, index) => (
                    <div 
                      key={index}
                      className={cn(
                        "transition-all duration-700",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                      )}
                      style={{ transitionDelay: isVisible ? `${400 + index * 100}ms` : "0ms" }}
                    >
                      <div className="flex items-start">
                        <div className="p-2 bg-kalmar-100 rounded-lg mr-4">
                          {value.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                          <p className="text-foreground/70">{value.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div 
                className={cn(
                  "relative rounded-2xl overflow-hidden shadow-card transition-all duration-700 delay-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
              >
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                  alt="Kalmar Studio team"
                  className="w-full h-full object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section ref={jobsRef} className="py-20 md:py-32 bg-kalmar-50">
          <div className="section-container">
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Lediga tjänster</h2>
              <p className="text-foreground/70 text-lg">
                Se våra aktuella lediga tjänster nedan. Om ingen tjänst matchar din profil, är du välkommen att skicka in en spontanansökan.
              </p>
            </div>
            
            <div className="space-y-8 mb-16">
              {jobListings.map((job, index) => (
                <div
                  key={job.id}
                  className={cn(
                    "bg-white rounded-xl border border-border shadow-subtle transition-all duration-700 overflow-hidden",
                    jobsVisible 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-8"
                  )}
                  style={{ transitionDelay: jobsVisible ? `${300 + index * 100}ms` : "0ms" }}
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="bg-kalmar-100/50 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                        <Briefcase className="h-3 w-3 mr-1" />
                        {job.type}
                      </span>
                      <span className="bg-kalmar-100/50 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {job.location}
                      </span>
                      <span className="bg-kalmar-100/50 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {job.department}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4">{job.title}</h3>
                    
                    <p className="text-foreground/70 mb-6">
                      {job.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Kvalifikationer:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                        {job.requirements.map((req, idx) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <NavLink
                      to={`/career/${job.id}`}
                      className="button-primary group"
                    >
                      Ansök nu
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </NavLink>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-border shadow-subtle">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Spontanansökan</h3>
                <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
                  Hittar du ingen tjänst som passar dig men är intresserad av att jobba hos oss? Skicka in en spontanansökan så kontaktar vi dig när en passande tjänst blir tillgänglig.
                </p>
                <NavLink
                  to="/contact"
                  className="button-outline group"
                >
                  Skicka spontanansökan
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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

export default CareerPage;
