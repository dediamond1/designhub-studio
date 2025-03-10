
import React, { useRef } from 'react';
import { useScrollReveal } from '../utils/animations';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const newsItems = [
  {
    id: 1,
    title: 'Vi öppnar nytt showroom i Kalmar',
    excerpt: 'Äntligen kan vi presentera vårt nya showroom i centrala Kalmar där du kan se våra produkter och diskutera dina projekt med våra designers.',
    image: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    date: '15 juni 2023'
  },
  {
    id: 2,
    title: 'Ny miljövänlig tryckteknik installerad',
    excerpt: 'Vi har investerat i den senaste miljövänliga trycktekniken som inte bara ger bättre resultat utan också minskar vår miljöpåverkan markant.',
    image: 'https://images.unsplash.com/photo-1581077698845-9f8852a45dab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    date: '2 maj 2023'
  },
  {
    id: 3,
    title: 'Kalmar Studio vinner pris för bästa kundbemötande',
    excerpt: 'Vi är stolta över att ha tilldelats priset för "Bästa kundbemötande" i den årliga branschgalan för tryckerier och designbyråer.',
    image: 'https://images.unsplash.com/photo-1579869847514-7c1a19d2d2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1634&q=80',
    date: '12 april 2023'
  },
  {
    id: 4,
    title: 'Nytt designverktyg lanserat på vår hemsida',
    excerpt: 'Nu kan du enkelt designa dina egna produkter direkt på vår hemsida med vårt nya, användarvänliga designverktyg.',
    image: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80',
    date: '28 mars 2023'
  },
  {
    id: 5,
    title: 'Vi utökar vårt sortiment med nya produkter',
    excerpt: 'Upptäck våra nya produkter som nu finns tillgängliga, inklusive helt nya material och format för dina projekt.',
    image: 'https://images.unsplash.com/photo-1586195831867-6585a13164c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    date: '15 februari 2023'
  }
];

const NewsPage = () => {
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
                NYHETER
              </span>
              <h1
                className={cn(
                  "text-3xl md:text-5xl font-bold mb-4 transition-all duration-700 delay-100",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Senaste nytt från Kalmar Studio
              </h1>
              <p
                className={cn(
                  "text-foreground/70 text-lg transition-all duration-700 delay-200",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Håll dig uppdaterad med de senaste nyheterna och händelserna från vårt företag.
              </p>
            </div>
          </div>
        </section>

        <section ref={sectionRef} className="py-20 md:py-32">
          <div className="section-container">
            <div className="space-y-16">
              {newsItems.map((news, index) => (
                <article
                  key={news.id}
                  className={cn(
                    "grid md:grid-cols-2 gap-10 items-center bg-white rounded-2xl shadow-subtle border border-border overflow-hidden transition-all duration-700",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                  style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
                >
                  <div className="h-full">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-full h-full object-cover aspect-[4/3] md:aspect-auto"
                    />
                  </div>
                  
                  <div className="p-8 md:pr-10">
                    <div className="flex items-center text-sm text-foreground/60 mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      {news.date}
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      {news.title}
                    </h2>
                    
                    <p className="text-foreground/70 text-lg mb-6">
                      {news.excerpt}
                    </p>
                    
                    <NavLink
                      to={`/news/${news.id}`}
                      className="button-outline group"
                    >
                      Läs mer
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </NavLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NewsPage;
