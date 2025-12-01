import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AnnouncementBar from './components/AnnouncementBar';
import Hero from './components/Hero';
import Products from './components/Products';
import Corporate from './components/Corporate';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Impact from './components/Impact';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import Quiz from './components/Quiz';
import ChatWidget from './components/ChatWidget';
import { CartItem, Product, SectionId } from './types';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<SectionId>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  
  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleNavigate = (sectionId: SectionId) => {
    setCurrentSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections: SectionId[] = ['home', 'products', 'corporate', 'about', 'impact', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 400) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product: Product, color: string, format: 'Clip' | 'Pulseira') => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === product.id && item.selectedColor === color && item.selectedFormat === format
      );

      if (existingIndex >= 0) {
        const newItems = [...prev];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + 1
        };
        return newItems;
      }

      return [...prev, { 
        ...product, 
        quantity: 1,
        selectedColor: color,
        selectedFormat: format
      }];
    });
    setIsCartOpen(true);
  };

  const updateCartItemQuantity = (index: number, delta: number) => {
    setCartItems(prev => {
      const newItems = [...prev];
      const item = newItems[index];
      const newQuantity = item.quantity + delta;
      if (newQuantity < 1) return prev;
      newItems[index] = { ...item, quantity: newQuantity };
      return newItems;
    });
  };

  const removeCartItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = (total: number) => {
    setCheckoutTotal(total);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuizRecommendation = (format: 'Clip' | 'Pulseira', color: string) => {
    handleNavigate('products');
    // Add logic to auto-scroll to product and maybe highlight/pre-select
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <AnnouncementBar />
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)}
        currentSection={currentSection}
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <main>
        <Hero onNavigate={handleNavigate} />
        <Products onAddToCart={addToCart} />
        <Corporate />
        <Testimonials />
        <About />
        <Impact />
        <FAQ />
      </main>

      <Contact />

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartItemQuantity}
        onRemoveItem={removeCartItem}
        onCheckout={handleCheckout}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        total={checkoutTotal}
        onClearCart={() => setCartItems([])}
      />

      <Quiz 
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectRecommendation={handleQuizRecommendation}
      />

      {/* Chat Widget (Right) */}
      <ChatWidget />
    </div>
  );
};

export default App;