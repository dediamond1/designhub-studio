
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Footer = () => {
  const { t } = useTranslation();
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
      { name: t('navigation.about'), path: '/about' },
      { name: t('navigation.career'), path: '/career' },
      { name: t('navigation.blog'), path: '/blog' },
      { name: t('navigation.news'), path: '/news' },
    ],
    services: [
      { name: t('services.tshirts.title'), path: '/services#t-shirts' },
      { name: t('services.businessCards.title'), path: '/services#business-cards' },
      { name: t('services.decals.title'), path: '/services#decals' },
      { name: t('services.graphicDesign.title'), path: '/services#design' },
      { name: t('services.webSocial.title'), path: '/services#web' },
    ],
    support: [
      { name: t('navigation.contact'), path: '/contact' },
      { name: 'FAQ', path: '/faq' },
      { name: t('Delivery Information'), path: '/delivery' },
      { name: t('Return Policy'), path: '/returns' },
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
              {t('footer.description')}
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
            <h3 className="text-lg font-semibold mb-4">{t('footer.company')}</h3>
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
            <h3 className="text-lg font-semibold mb-4">{t('footer.services')}</h3>
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
            <h3 className="text-lg font-semibold mb-4">{t('footer.support')}</h3>
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
              <h3 className="text-lg font-semibold mb-4">{t('footer.newsletter')}</h3>
              <form onSubmit={handleSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.emailPlaceholder')}
                  className="flex-1 px-4 py-2 rounded-l-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-kalmar-400"
                  required
                />
                <button
                  type="submit"
                  className="bg-kalmar-600 hover:bg-kalmar-700 px-4 py-2 rounded-r-md transition-colors"
                  aria-label={t('common.subscribe')}
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-white/50 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© {currentYear} Kalmar Studio. {t('All rights reserved.')}</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <NavLink to="/terms" className="hover:text-white transition-colors">
              {t('Terms of Service')}
            </NavLink>
            <NavLink to="/privacy" className="hover:text-white transition-colors">
              {t('Privacy Policy')}
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
