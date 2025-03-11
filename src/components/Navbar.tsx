
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavbarTransition } from '../utils/animations';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isScrolled = useNavbarTransition();
  const location = useLocation();
  const { t } = useTranslation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  const navItems = [
    { name: t('navigation.home'), path: '/' },
    { name: t('navigation.about'), path: '/about' },
    { name: t('navigation.services'), path: '/services' },
    { name: t('navigation.design'), path: '/design' },
    { name: t('navigation.blog'), path: '/blog' },
    { name: t('navigation.news'), path: '/news' },
    { name: t('navigation.offers'), path: '/offers' },
    { name: t('navigation.contact'), path: '/contact' },
    { name: t('navigation.career'), path: '/career' },
    { name: t('navigation.ads'), path: '/ads' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'py-3 glassmorphism shadow-sm' : 'py-6 bg-transparent'
      )}
    >
      <nav className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <NavLink 
          to="/" 
          className="text-2xl font-display font-bold tracking-tight z-20"
        >
          Kalmar Studio
        </NavLink>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                'nav-link text-sm font-medium',
                isActive ? 'active' : ''
              )}
            >
              {item.name}
            </NavLink>
          ))}
          <LanguageSwitcher />
          <NavLink 
            to="/contact" 
            className="button-primary"
          >
            {t('common.getQuote')}
          </NavLink>
        </div>
        
        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center space-x-2 z-20">
          <LanguageSwitcher />
          <button
            className="focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div
          className={cn(
            'fixed inset-0 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center space-y-6 lg:hidden transition-all duration-300 z-10',
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          )}
        >
          {navItems.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                'text-lg font-medium',
                isActive ? 'text-foreground' : 'text-foreground/70 hover:text-foreground',
                'transition-all duration-300 delay-[calc(50ms*var(--index))]',
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              )}
              style={{ '--index': index } as React.CSSProperties}
            >
              {item.name}
            </NavLink>
          ))}
          <NavLink 
            to="/contact" 
            className={cn(
              'button-primary mt-4',
              'transition-all duration-300 delay-[calc(50ms*11)]',
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            )}
            style={{ '--index': navItems.length } as React.CSSProperties}
          >
            {t('common.getQuote')}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
