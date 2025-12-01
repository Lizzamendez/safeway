import React from 'react';
import { ShoppingCart, Menu, X, ShieldCheck, Moon, Sun } from 'lucide-react';
import { SectionId } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  currentSection: SectionId;
  onNavigate: (section: SectionId) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, currentSection, onNavigate, isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks: { id: SectionId; label: string }[] = [
    { id: 'home', label: 'Início' },
    { id: 'products', label: 'Produtos' },
    { id: 'corporate', label: 'Para Empresas' },
    { id: 'about', label: 'Sobre Nós' },
    { id: 'impact', label: 'Impacto' },
    { id: 'contact', label: 'Contato' },
  ];

  return (
    <nav className="fixed top-0 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/90 border-b border-gray-100 dark:border-slate-800 shadow-sm z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => onNavigate('home')}
          >
            <div className="p-2.5 rounded-full mr-3 bg-gradient-to-br from-safeway-cyan to-safeway-blue shadow-lg group-hover:scale-105 transition-transform">
              <ShieldCheck className="h-8 w-8 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-3xl tracking-tight text-safeway-blue dark:text-safeway-cyan transition-colors">
                SAFE <span className="text-safeway-dark dark:text-white">WAY</span>
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`text-lg font-medium transition-colors duration-200 ${
                  currentSection === link.id 
                    ? 'text-safeway-blue dark:text-safeway-cyan font-bold' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-safeway-blue dark:hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            <div className="h-8 w-px bg-gray-200 dark:bg-slate-700 mx-4"></div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-yellow-400"
              title={isDarkMode ? "Modo Claro" : "Modo Escuro"}
            >
              {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>

            <button 
              onClick={onOpenCart}
              className="relative p-3 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-white"
            >
              <ShoppingCart className="h-7 w-7" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
             <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 dark:text-yellow-400"
            >
              {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
             <button 
              onClick={onOpenCart}
              className="relative p-2 mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ShoppingCart className="h-7 w-7 text-gray-700 dark:text-white" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md focus:outline-none text-gray-700 dark:text-white hover:text-safeway-blue"
            >
              {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors animate-slide-down shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-md text-xl font-medium transition-colors ${
                  currentSection === link.id
                    ? 'bg-safeway-blue/10 dark:bg-safeway-blue/20 text-safeway-blue dark:text-safeway-cyan'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;