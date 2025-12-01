import React, { useEffect, useState } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { SectionId } from '../types';

interface HeroProps {
  onNavigate: (section: SectionId) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div id="home" className="pt-24 pb-12 relative overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-safeway-cyan/20 dark:bg-safeway-cyan/10 rounded-full blur-3xl opacity-60 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[30rem] h-[30rem] bg-safeway-blue/10 dark:bg-safeway-blue/5 rounded-full blur-[100px] opacity-50 pointer-events-none"></div>
      
      {/* Dark Mode Overlay for subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 dark:to-slate-900/50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          <div className="lg:w-1/2 space-y-8">
            <div className={`inline-flex items-center px-3 py-1 rounded-full bg-safeway-cyan/10 dark:bg-safeway-cyan/20 text-safeway-blue dark:text-safeway-cyan text-sm font-medium transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <Star className="h-4 w-4 mr-2 fill-current" />
              Lançamento da 3ª Geração
            </div>
            
            <h1 className={`text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight transition-all duration-1000 delay-100 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Segurança ao alcance de <span className="gradient-text">um toque</span>
            </h1>
            
            <p className={`text-xl text-gray-600 dark:text-gray-300 transition-all duration-1000 delay-200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              O <strong>Safe Click</strong> conecta você à ajuda imediata. Ideal para mulheres, idosos e PCDs. Tecnologia, autonomia e impacto positivo em um único dispositivo.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <button 
                onClick={() => onNavigate('products')}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-safeway-blue hover:bg-sky-700 dark:bg-safeway-blue dark:hover:bg-safeway-cyan rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                Comprar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-safeway-blue dark:text-white bg-white dark:bg-slate-800 border-2 border-safeway-blue dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-full transition-all duration-300"
              >
                Saiba Mais
              </button>
            </div>

            <div className={`p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-orange-200 dark:border-orange-500/30 rounded-xl shadow-sm transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-sm text-orange-800 dark:text-orange-300 font-semibold text-center">
                🎉 CUPOM: Use <span className="font-bold text-lg">CLICK20</span> para 20% OFF na primeira compra!
              </p>
            </div>
          </div>

          <div className={`lg:w-1/2 relative transition-opacity duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute top-0 right-0 bg-safeway-cyan rounded-full filter blur-3xl opacity-20 w-72 h-72 animate-pulse"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white/50 dark:border-slate-700/50 backdrop-blur-sm">
              <img 
                src="https://images.unsplash.com/photo-1512428559087-560fa5ce7d87?auto=format&fit=crop&q=80&w=1000" 
                alt="Safe Click Device Lifestyle" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-safeway-dark/90 to-transparent p-6 pt-20">
                <p className="text-white font-medium drop-shadow-md">Design ergonômico em Plástico e Silicone</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;