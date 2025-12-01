import React from 'react';
import { Gift, HeartHandshake, Sprout } from 'lucide-react';

const Impact: React.FC = () => {
  return (
    <div id="impact" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Segurança que Gera <span className="text-safeway-warm">Impacto</span></h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              A Safe Way não é apenas uma empresa de tecnologia. Somos um movimento por uma sociedade mais segura e inclusiva.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center">
                  <HeartHandshake className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">Projeto Safe Women</h4>
                  <p className="text-gray-600 dark:text-gray-300">Para cada 10 unidades vendidas, doamos 1 dispositivo para mulheres em situação de vulnerabilidade assistidas por ONGs parceiras.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Sprout className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">Logística Reversa</h4>
                  <p className="text-gray-600 dark:text-gray-300">Seu Safe Click antigo vale desconto na compra de um novo, garantindo o descarte correto e a reciclagem dos componentes.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-safeway-warm/20 to-transparent rounded-3xl transform rotate-3"></div>
             <img 
               src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800" 
               alt="Impacto Social" 
               className="relative rounded-3xl shadow-xl transform -rotate-3 hover:rotate-0 transition-all duration-500" 
             />
          </div>
        </div>

        {/* Loyalty Banner */}
        <div className="bg-safeway-dark dark:bg-slate-800 rounded-2xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-800 dark:border-slate-700">
          <div className="absolute top-0 right-0 w-64 h-64 bg-safeway-warm opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10 flex-1">
            <div className="inline-flex items-center gap-2 text-safeway-warm font-bold uppercase tracking-wider text-sm mb-2">
              <Gift className="h-5 w-5" />
              Clube Safe Way
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Indique e Ganhe</h3>
            <p className="text-gray-400 text-lg">
              Convide amigos para a Safe Way. Eles ganham <strong className="text-white">10% OFF</strong> na primeira compra e você acumula pontos para trocar por acessórios exclusivos.
            </p>
          </div>
          
          <button className="relative z-10 px-8 py-4 bg-white text-safeway-dark font-bold rounded-full hover:bg-safeway-warm hover:text-white transition-all shadow-lg whitespace-nowrap">
            Participar do Clube
          </button>
        </div>

      </div>
    </div>
  );
};

export default Impact;