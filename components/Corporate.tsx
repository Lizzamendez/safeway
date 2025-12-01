import React, { useState } from 'react';
import { Building2, Calculator, CheckCircle2, ArrowRight, Store, TrendingUp } from 'lucide-react';

const Corporate: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(100);
  const basePrice = 50.00;
  
  const discountTier = quantity >= 100 ? 0.30 : (quantity >= 50 ? 0.15 : 0);
  const pricePerUnit = basePrice * (1 - discountTier);
  const total = pricePerUnit * quantity;
  const savings = (basePrice * quantity) - total;

  return (
    <div id="corporate" className="py-20 bg-gradient-to-br from-slate-900 to-safeway-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-safeway-cyan font-bold text-sm">
              <Building2 className="h-4 w-4" />
              <span className="text-gray-400 mx-1">|</span>
              <Store className="h-4 w-4" />
              ATACADO E REVENDA
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Soluções para Empresas<br />
              <span className="text-safeway-cyan">e Revendedores.</span>
            </h2>
            <p className="text-lg text-gray-300">
              Adquira o Safe Click em volume com condições exclusivas. Seja para <strong>revender em sua loja</strong> com alta margem de lucro ou para garantir a segurança dos seus colaboradores.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="bg-safeway-teal/20 p-1 rounded-full">
                   <TrendingUp className="h-5 w-5 text-safeway-teal" />
                </div>
                <span className="text-lg">Margens atrativas para revenda (B2B)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-safeway-teal/20 p-1 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-safeway-teal" />
                </div>
                <span className="text-lg">Produto de alta demanda e giro rápido</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-safeway-teal/20 p-1 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-safeway-teal" />
                </div>
                <span className="text-lg">Personalização para brindes corporativos</span>
              </li>
            </ul>

            <button className="bg-safeway-warm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30">
              Seja um Parceiro
            </button>
          </div>

          <div className="bg-white text-gray-900 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
              <div className="p-3 bg-safeway-blue/10 rounded-xl text-safeway-blue">
                <Calculator className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Simulador de Atacado</h3>
                <p className="text-sm text-gray-500">Calcule seu investimento e lucro</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantidade de Dispositivos
                </label>
                <input 
                  type="range" 
                  min="10" 
                  max="500" 
                  step="10" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-safeway-blue"
                />
                <div className="mt-2 text-center font-mono text-2xl font-bold text-safeway-blue bg-blue-50 py-2 rounded-lg border border-blue-100">
                  {quantity} unidades
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Preço sugerido (Varejo):</span>
                  <span className="text-gray-500">R$ {basePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-green-600">
                  <span>Seu custo unitário:</span>
                  <span>R$ {pricePerUnit.toFixed(2)} (-{discountTier * 100}%)</span>
                </div>
                <div className="h-px bg-gray-200 my-2"></div>
                <div className="flex justify-between items-end">
                  <span className="font-bold text-lg">Investimento Total:</span>
                  <span className="text-3xl font-extrabold text-gray-900">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                {savings > 0 && (
                  <div className="mt-2 text-center text-sm font-bold text-white bg-green-500 py-1 rounded-full">
                    Lucro Potencial: R$ {savings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                )}
              </div>

              <button className="w-full py-4 rounded-xl font-bold text-lg border-2 border-safeway-blue text-safeway-blue hover:bg-safeway-blue hover:text-white transition-all flex items-center justify-center gap-2 group">
                Solicitar Cotação para Revenda
                <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Corporate;