
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavbarTransition } from '../utils/animations';
import { Menu, X, ChevronDown, ChevronRight, User, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import LanguageSwitcher from './LanguageSwitcher';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const isScrolled = useNavbarTransition();
  const location = useLocation();
  const { t } = useTranslation('common');
  
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
        { 
          name: t('navigation.design'), 
          path: '/design',
          description: t('menuDescriptions.design', 'Create your own custom designs'),
          icon: <ShoppingBag className="h-5 w-5 text-kalmar-500" />
        },
        { 
          name: t('navigation.print'), 
          path: '/design/print',
          description: t('menuDescriptions.print', 'Professional printing services'),
          icon: <ShoppingBag className="h-5 w-5 text-kalmar-500" />
        },
        { 
          name: t('navigation.clothes'), 
          path: '/design/clothes',
          description: t('menuDescriptions.clothes', 'Custom apparel and clothing'),
          icon: <ShoppingBag className="h-5 w-5 text-kalmar-500" />
        },
        { 
          name: t('navigation.stickers'), 
          path: '/design/stickers',
          description: t('menuDescriptions.stickers', 'Custom stickers and decals'),
          icon: <ShoppingBag className="h-5 w-5 text-kalmar-500" />
        },
      ]
    },
    { 
      name: t('navigation.resources'), 
      path: '#',
      dropdown: true,
      children: [
        { 
          name: t('navigation.blog'), 
          path: '/blog',
          description: t('menuDescriptions.blog', 'Read our latest articles'),
          icon: <ShoppingBag className="h-5 w-5 text-kalmar-500" />
        },
        { 
          name: t('navigation.news'), 
          path: '/news',
          description: t('menuDescriptions.news', 'Company news and updates'),
          icon: <ShoppingBag className="h-5 w-5 text-kalmar-500" />
        },
        { 
          name: t('navigation.offers'), 
          path: '/offers',
          description: t('menuDescriptions.offers', 'Special deals and promotions'),
          icon: <ShoppingBag className="h-5 w-5 text-kalmar-500" />
        },
      ] 
    },
    { name: t('navigation.contact'), path: '/contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled 
          ? 'py-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800' 
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
            <div className="bg-gradient-to-br from-kalmar-600 to-kalmar-500 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold shadow-md">K</div>
            <span className="text-xl md:text-2xl font-display font-bold tracking-tight bg-gradient-to-r from-kalmar-600 to-kalmar-500 bg-clip-text text-transparent">
              Kalmar Studio
            </span>
          </NavLink>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              !item.dropdown ? (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => cn(
                    'px-4 py-2 rounded-md text-base font-medium transition-colors relative group',
                    isActive 
                      ? 'text-kalmar-600 dark:text-kalmar-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-kalmar-600 dark:hover:text-kalmar-400'
                  )}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-kalmar-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </NavLink>
              ) : (
                <div 
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setHoveredMenu(item.name)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <button 
                    className={cn(
                      'flex items-center px-4 py-2 rounded-md text-base font-medium transition-colors relative group',
                      hoveredMenu === item.name || item.children?.some(child => location.pathname === child.path)
                        ? 'text-kalmar-600 dark:text-kalmar-400' 
                        : 'text-gray-700 dark:text-gray-300 hover:text-kalmar-600 dark:hover:text-kalmar-400'
                    )}
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-kalmar-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </button>

                  <AnimatePresence>
                    {hoveredMenu === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-1 w-64 rounded-lg bg-white shadow-xl border border-gray-100 overflow-hidden z-50"
                      >
                        <div className="py-2">
                          {item.children?.map((child) => (
                            <NavLink
                              key={child.path}
                              to={child.path}
                              className={({ isActive }) => cn(
                                'flex items-start px-4 py-3 hover:bg-gray-50 transition-colors',
                                isActive ? 'bg-gray-50' : ''
                              )}
                            >
                              {child.icon}
                              <div className="ml-3">
                                <p className={cn(
                                  'text-sm font-medium',
                                  location.pathname === child.path ? 'text-kalmar-600' : 'text-gray-900'
                                )}>
                                  {child.name}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">{child.description}</p>
                              </div>
                            </NavLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            ))}
          </nav>
          
          {/* Right side buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher />
            
            <NavLink 
              to="/login" 
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              <User className="mr-2 h-4 w-4" />
              {t('login')}
            </NavLink>
            
            <NavLink 
              to="/contact" 
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-kalmar-600 to-kalmar-500 hover:from-kalmar-700 hover:to-kalmar-600 rounded-md shadow-sm transition-colors"
            >
              {t('getQuote')}
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
            className="lg:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-xl"
          >
            <div className="container mx-auto px-4 py-6 space-y-6">
              {navItems.map((item, index) => (
                <div key={item.path || index}>
                  {item.dropdown ? (
                    <div className="space-y-2">
                      <div className="font-medium text-gray-900 dark:text-gray-100 px-3 py-2 flex items-center">
                        {item.name}
                        <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
                      </div>
                      <div className="pl-4 space-y-1 border-l-2 border-gray-200 dark:border-gray-700">
                        {item.children?.map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            className={({ isActive }) => cn(
                              'flex items-center px-3 py-2 rounded-md',
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
                        'flex items-center px-3 py-2 rounded-md',
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
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-3">
                <NavLink 
                  to="/login" 
                  className="flex items-center justify-center px-4 py-2.5 text-sm font-medium text-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                >
                  <User className="mr-2 h-4 w-4" />
                  {t('login')}
                </NavLink>
                <NavLink 
                  to="/contact" 
                  className="flex items-center justify-center px-4 py-2.5 text-sm font-medium text-center text-white bg-gradient-to-r from-kalmar-600 to-kalmar-500 hover:from-kalmar-700 hover:to-kalmar-600 rounded-md shadow-sm transition-colors"
                >
                  {t('getQuote')}
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
