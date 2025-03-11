
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const Footer = () => {
  const { t } = useTranslation('common');
  
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    services: [
      { name: t('footer.services.design'), href: '/design' },
      { name: t('footer.services.printing'), href: '/design/print' },
      { name: t('footer.services.clothes'), href: '/design/clothes' },
      { name: t('footer.services.stickers'), href: '/design/stickers' },
    ],
    company: [
      { name: t('footer.company.about'), href: '/about' },
      { name: t('footer.company.team'), href: '/team' },
      { name: t('footer.company.careers'), href: '/career' },
      { name: t('footer.company.contact'), href: '/contact' },
    ],
    resources: [
      { name: t('footer.resources.blog'), href: '/blog' },
      { name: t('footer.resources.news'), href: '/news' },
      { name: t('footer.resources.faq'), href: '/faq' },
      { name: t('footer.resources.press'), href: '/press' },
    ]
  };
  
  const socialLinks = [
    { icon: <Facebook />, href: 'https://facebook.com/kalmarstudio' },
    { icon: <Instagram />, href: 'https://instagram.com/kalmarstudio' },
    { icon: <Twitter />, href: 'https://twitter.com/kalmarstudio' },
    { icon: <Linkedin />, href: 'https://linkedin.com/company/kalmarstudio' },
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-purple-50/70 border-t border-purple-100">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-5">
              <div className="bg-gradient-to-br from-purple-600 to-purple-500 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold">K</div>
              <span className="ml-2 text-2xl font-display font-bold tracking-tight bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
                Kalmar
              </span>
            </div>
            <p className="text-gray-600 mb-6 max-w-xs">
              {t('footer.description')}
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-purple-500 mr-3 mt-0.5" />
                <span className="text-gray-600">
                  Tryckvägen 123, 123 45 Kalmar, Sweden
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-purple-500 mr-3" />
                <a href="tel:+46701234567" className="text-gray-600 hover:text-purple-600 transition-colors">
                  +46 70 123 45 67
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-purple-500 mr-3" />
                <a href="mailto:info@kalmarstudio.se" className="text-gray-600 hover:text-purple-600 transition-colors">
                  info@kalmarstudio.se
                </a>
              </div>
            </div>
          </div>
          
          {/* Services Links */}
          <div>
            <h3 className="text-base font-semibold mb-5 text-gray-900">{t('footer.services')}</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <NavLink 
                    to={link.href} 
                    className="text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 className="text-base font-semibold mb-5 text-gray-900">{t('footer.company')}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <NavLink 
                    to={link.href} 
                    className="text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources Links */}
          <div>
            <h3 className="text-base font-semibold mb-5 text-gray-900">{t('footer.resources')}</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <NavLink 
                    to={link.href} 
                    className="text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="border-t border-purple-100 pt-8 pb-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{t('footer.newsletter')}</h3>
              <p className="text-gray-600 mb-0">
                {t('footer.newsletterDescription')}
              </p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder={t('footer.emailPlaceholder')}
                  className="flex-grow px-4 py-3 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors whitespace-nowrap"
                >
                  {t('footer.subscribe')}
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-purple-100 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
              <div className="text-gray-600 text-sm">
                © {currentYear} Kalmar Studio. {t('footer.copyright')}
              </div>
              <div className="flex space-x-4 text-sm">
                <NavLink to="/privacy" className="text-gray-600 hover:text-purple-600 transition-colors">
                  {t('footer.privacy')}
                </NavLink>
                <NavLink to="/terms" className="text-gray-600 hover:text-purple-600 transition-colors">
                  {t('footer.terms')}
                </NavLink>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex space-x-3">
                {socialLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-purple-100 p-2 rounded-full text-purple-500 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                    aria-label={`Social media link ${index + 1}`}
                  >
                    <span className="sr-only">Social Media</span>
                    {React.cloneElement(link.icon as React.ReactElement, { size: 16 })}
                  </a>
                ))}
              </div>
              
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
