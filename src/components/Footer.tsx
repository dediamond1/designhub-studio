
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Footer = () => {
  const [email, setEmail] = React.useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    setEmail('');
    // Toast notification would go here
  };
  
  const currentYear = new Date().getFullYear();
  
  const links = {
    company: [
      { name: 'Om oss', path: '/about' },
      { name: 'Karriär', path: '/career' },
      { name: 'Blogg', path: '/blog' },
      { name: 'Nyheter', path: '/news' },
    ],
    services: [
      { name: 'T-shirts & Kläder', path: '/services#t-shirts' },
      { name: 'Visitkort & Trycksaker', path: '/services#business-cards' },
      { name: 'Dekaler & Klistermärken', path: '/services#decals' },
      { name: 'Grafisk Design', path: '/services#design' },
      { name: 'Webb & Sociala Medier', path: '/services#web' },
    ],
    support: [
      { name: 'Kontakt', path: '/contact' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Leveransinformation', path: '/delivery' },
      { name: 'Returpolicy', path: '/returns' },
    ]
  };
  
  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, name: 'Facebook', url: 'https://facebook.com' },
    { icon: <Instagram className="h-5 w-5" />, name: 'Instagram', url: 'https://instagram.com' },
    { icon: <Twitter className="h-5 w-5" />, name: 'Twitter', url: 'https://twitter.com' },
    { icon: <Linkedin className="h-5 w-5" />, name: 'LinkedIn', url: 'https://linkedin.com' },
  ];

  return (
    <footer className="bg-kalmar-950 text-white">
      <div className="section-container pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <NavLink to="/" className="inline-block text-2xl font-display font-bold tracking-tight mb-6">
              Kalmar Studio
            </NavLink>
            <p className="text-white/70 mb-6 max-w-md">
              Vi är specialister på skräddarsydda trycklösningar för företag och privatpersoner. Med passion för kvalitet och kreativitet skapar vi trycksaker som gör intryck.
            </p>
            
            <div className="flex space-x-4 mb-8">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Företaget</h3>
            <ul className="space-y-3">
              {links.company.map((link, index) => (
                <li key={index}>
                  <NavLink 
                    to={link.path} 
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Tjänster</h3>
            <ul className="space-y-3">
              {links.services.map((link, index) => (
                <li key={index}>
                  <NavLink 
                    to={link.path} 
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {links.support.map((link, index) => (
                <li key={index}>
                  <NavLink 
                    to={link.path} 
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Nyhetsbrev</h3>
              <form onSubmit={handleSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Din e-postadress"
                  className="flex-1 px-4 py-2 rounded-l-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-kalmar-400"
                  required
                />
                <button
                  type="submit"
                  className="bg-kalmar-600 hover:bg-kalmar-700 px-4 py-2 rounded-r-md transition-colors"
                  aria-label="Prenumerera"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <hr className="border-white/10 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            © {currentYear} Kalmar Studio. Alla rättigheter förbehållna.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <NavLink to="/privacy" className="text-white/50 text-sm hover:text-white transition-colors">
              Integritetspolicy
            </NavLink>
            <NavLink to="/terms" className="text-white/50 text-sm hover:text-white transition-colors">
              Användarvillkor
            </NavLink>
            <NavLink to="/cookies" className="text-white/50 text-sm hover:text-white transition-colors">
              Cookies
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
