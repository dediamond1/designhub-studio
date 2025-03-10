
import React, { useRef } from 'react';
import { useScrollReveal } from '../utils/animations';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const blogPosts = [
  {
    id: 1,
    title: '5 tips för att skapa effektiva visitkort',
    excerpt: 'Lär dig hur du designar visitkort som lämnar ett bestående intryck och effektivt förmedlar ditt varumärke.',
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    category: 'Design',
    date: '12 maj 2023',
    author: 'Anna Karlsson',
    readTime: '5 min'
  },
  {
    id: 2,
    title: 'Hållbarhet inom tryckeribranschen',
    excerpt: 'Hur vi arbetar för att minska vår miljöpåverkan och erbjuda mer hållbara alternativ för alla våra trycksaker.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80',
    category: 'Hållbarhet',
    date: '28 april 2023',
    author: 'Erik Johansson',
    readTime: '7 min'
  },
  {
    id: 3,
    title: 'Så väljer du rätt tryckmetod för ditt projekt',
    excerpt: 'En guide till olika tryckmetoder och när de passar bäst för olika typer av projekt och material.',
    image: 'https://images.unsplash.com/photo-1576153192621-7a3be10b356e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80',
    category: 'Tryckmetoder',
    date: '15 mars 2023',
    author: 'Maria Nilsson',
    readTime: '6 min'
  },
  {
    id: 4,
    title: 'Trender inom grafisk design 2023',
    excerpt: 'De hetaste trenderna inom grafisk design under året och hur du kan implementera dem i dina trycksaker.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80',
    category: 'Trender',
    date: '2 februari 2023',
    author: 'Johan Svensson',
    readTime: '8 min'
  },
  {
    id: 5,
    title: 'Skapa en framgångsrik reklamkampanj med tryck',
    excerpt: 'Tips och trick för att planera och genomföra en effektiv reklamkampanj med hjälp av tryckt material.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    category: 'Marknadsföring',
    date: '10 januari 2023',
    author: 'Sofia Andersson',
    readTime: '5 min'
  },
  {
    id: 6,
    title: 'Färger och deras påverkan på trycksaker',
    excerpt: 'Hur olika färger påverkar våra känslor och hur du kan använda detta i dina trycksaker för bättre effekt.',
    image: 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1778&q=80',
    category: 'Färgteori',
    date: '5 december 2022',
    author: 'Anders Lindberg',
    readTime: '7 min'
  }
];

const categories = [
  'Alla',
  'Design',
  'Hållbarhet',
  'Tryckmetoder',
  'Trender',
  'Marknadsföring',
  'Färgteori'
];

const BlogPage = () => {
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
                BLOGG
              </span>
              <h1
                className={cn(
                  "text-3xl md:text-5xl font-bold mb-4 transition-all duration-700 delay-100",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Nyheter & inspiration
              </h1>
              <p
                className={cn(
                  "text-foreground/70 text-lg transition-all duration-700 delay-200",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Här delar vi med oss av nyheter, tips och inspiration inom design och tryck.
              </p>
            </div>
          </div>
        </section>

        <section ref={sectionRef} className="py-20 md:py-32">
          <div className="section-container">
            <div className="mb-12 overflow-x-auto pb-4">
              <div className="flex space-x-2 min-w-max">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all",
                      index === 0 
                        ? "bg-kalmar-600 text-white" 
                        : "bg-kalmar-50 text-foreground hover:bg-kalmar-100"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <article
                  key={post.id}
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
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-sm text-foreground/60 mb-3">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.date}
                      </span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-kalmar-600 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-foreground/70 mb-6">
                      {post.excerpt}
                    </p>
                    
                    <NavLink
                      to={`/blog/${post.id}`}
                      className="flex items-center text-kalmar-600 font-medium hover:text-kalmar-700 transition-colors group"
                    >
                      Läs mer
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </NavLink>
                  </div>
                </article>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <button className="button-outline">
                Ladda fler artiklar
              </button>
            </div>
          </div>
        </section>
        
        <section className="py-20 md:py-32 bg-kalmar-50">
          <div className="section-container">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Prenumerera på vårt nyhetsbrev</h2>
              <p className="text-foreground/70 mb-8">
                Få de senaste artiklarna, tips och erbjudanden direkt i din inkorg. Vi skickar nyhetsbrev ungefär en gång i månaden.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Din e-postadress"
                  className="flex-grow px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-kalmar-500"
                  required
                />
                <button type="submit" className="button-primary whitespace-nowrap">
                  Prenumerera
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
