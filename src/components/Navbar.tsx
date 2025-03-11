
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavbarTransition } from '../utils/animations';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import LanguageSwitcher from './LanguageSwitcher';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';

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
    { 
      name: t('navigation.services'), 
      path: '/services',
      dropdown: true,
      children: [
        { name: t('navigation.design'), path: '/design' },
        { name: t('navigation.print'), path: '/design/print' },
        { name: t('navigation.clothes'), path: '/design/clothes' },
        { name: t('navigation.stickers'), path: '/design/stickers' },
      ]
    },
    { 
      name: t('navigation.resources'), 
      path: '#',
      dropdown: true,
      children: [
        { name: t('navigation.blog'), path: '/blog' },
        { name: t('navigation.news'), path: '/news' },
        { name: t('navigation.offers'), path: '/offers' },
      ] 
    },
    { name: t('navigation.career'), path: '/career' },
    { name: t('navigation.ads'), path: '/ads' },
    { name: t('navigation.contact'), path: '/contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled 
          ? 'py-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800' 
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink 
            to="/" 
            className="flex items-center space-x-2 z-20"
          >
            <span className="bg-gradient-to-r from-kalmar-600 to-kalmar-500 size-8 rounded flex items-center justify-center text-white font-bold">K</span>
            <span className="text-xl md:text-2xl font-display font-bold tracking-tight bg-gradient-to-r from-kalmar-600 to-kalmar-500 bg-clip-text text-transparent">
              Kalmar Studio
            </span>
          </NavLink>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              item.dropdown ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <button className="group px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center">
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-48">
                    {item.children?.map((child) => (
                      <DropdownMenuItem key={child.path} asChild>
                        <NavLink 
                          to={child.path}
                          className={({ isActive }) => cn(
                            'w-full px-2 py-1.5 cursor-pointer',
                            isActive ? 'text-kalmar-600 dark:text-kalmar-400 font-medium' : ''
                          )}
                        >
                          {child.name}
                        </NavLink>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => cn(
                    'px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
                    isActive 
                      ? 'text-kalmar-600 dark:text-kalmar-400 font-medium' 
                      : 'text-gray-700 dark:text-gray-300'
                  )}
                >
                  {item.name}
                </NavLink>
              )
            ))}
          </nav>
          
          {/* Right side buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher />
            <NavLink 
              to="/login" 
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              {t('common.login')}
            </NavLink>
            <NavLink 
              to="/contact" 
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-kalmar-600 to-kalmar-500 hover:from-kalmar-700 hover:to-kalmar-600 rounded-md shadow-sm transition-colors"
            >
              {t('common.getQuote')}
            </NavLink>
          </div>
          
          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2 z-20">
            <LanguageSwitcher />
            <button
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navItems.map((item, index) => (
                <div key={item.path || index}>
                  {item.dropdown ? (
                    <div className="space-y-2">
                      <div className="font-medium text-gray-500 dark:text-gray-400 px-3 py-2">
                        {item.name}
                      </div>
                      <div className="pl-4 space-y-1 border-l-2 border-gray-200 dark:border-gray-700">
                        {item.children?.map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            className={({ isActive }) => cn(
                              'block px-3 py-2 rounded-md',
                              isActive 
                                ? 'text-kalmar-600 dark:text-kalmar-400 font-medium bg-gray-50 dark:bg-gray-800' 
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                            )}
                          >
                            {child.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => cn(
                        'block px-3 py-2 rounded-md',
                        isActive 
                          ? 'text-kalmar-600 dark:text-kalmar-400 font-medium bg-gray-50 dark:bg-gray-800' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      )}
                    >
                      {item.name}
                    </NavLink>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-2">
                <NavLink 
                  to="/login" 
                  className="px-4 py-2 text-sm font-medium text-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                >
                  {t('common.login')}
                </NavLink>
                <NavLink 
                  to="/contact" 
                  className="px-4 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-kalmar-600 to-kalmar-500 hover:from-kalmar-700 hover:to-kalmar-600 rounded-md shadow-sm transition-colors"
                >
                  {t('common.getQuote')}
                </NavLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
