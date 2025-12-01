import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Watch, Paperclip, ShoppingBag, Truck, Loader2, QrCode, CreditCard } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: (total: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const [cep, setCep] = useState('');
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Logic for bulk discount
  const isBulkDiscount = totalItems >= 100;
  const discount = isBulkDiscount ? total * 0.3 : 0;
  
  // Final total calculation
  const finalTotal = total - discount + (shippingCost || 0);

  const handleCalculateShipping = () => {
    if (cep.length < 8) return;
    
    setIsCalculating(true);
    // Simulate API delay
    setTimeout(() => {
      // Mock shipping cost logic
      const mockCost = 15.90;
      setShippingCost(mockCost);
      setIsCalculating(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md transform transition-transform bg-white dark:bg-slate-900 shadow-2xl flex flex-col h-full border-l border-gray-200 dark:border-slate-700 animate-slide-up sm:animate-none">
          
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-800">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Seu Carrinho</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-400">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-full shadow-inner">
                  <ShoppingBag className="h-16 w-16 text-gray-300 dark:text-gray-600" />
                </div>
                <div className="space-y-2 max-w-xs mx-auto">
                   <h3 className="text-xl font-bold text-gray-900 dark:text-white">Seu carrinho está vazio</h3>
                   <p className="text-gray-500 dark:text-gray-400">
                     Adicione o Safe Click para garantir sua segurança e a de quem você ama.
                   </p>
                </div>
                <button 
                  onClick={onClose} 
                  className="w-full py-4 bg-safeway-blue text-white rounded-xl font-bold shadow-lg hover:bg-sky-700 transition-all transform hover:-translate-y-1"
                >
                  Continuar Comprando
                </button>
              </div>
            ) : (
              items.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex gap-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-slate-700">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                        <h3>{item.name}</h3>
                        <p className="ml-4">R$ {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      
                      {/* Configuration Details */}
                      <div className="mt-1 flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                           <span className="font-medium text-gray-700 dark:text-gray-300">Formato:</span>
                           <span className="flex items-center gap-1 bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs">
                             {item.selectedFormat === 'Pulseira' ? <Watch className="h-3 w-3" /> : <Paperclip className="h-3 w-3" />}
                             {item.selectedFormat}
                           </span>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="font-medium text-gray-700 dark:text-gray-300">Cor:</span>
                           <div className="flex items-center gap-2">
                             <div className="w-4 h-4 rounded-full border border-gray-300 dark:border-slate-600 shadow-sm" style={{ backgroundColor: item.selectedColor }}></div>
                             <span className="uppercase text-xs">{item.selectedColor}</span>
                           </div>
                        </div>
                      </div>

                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm mt-4">
                      <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-lg">
                        <button 
                          onClick={() => onUpdateQuantity(index, -1)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300 disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 font-medium text-gray-900 dark:text-white">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(index, 1)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(index)}
                        className="font-medium text-red-500 hover:text-red-700 dark:hover:text-red-400 flex items-center gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-gray-100 dark:border-slate-800 px-6 py-6 bg-gray-50 dark:bg-slate-800/50">
              {isBulkDiscount && (
                 <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 rounded-lg text-sm flex justify-between">
                    <span>Desconto Atacado (30%)</span>
                    <span>- R$ {discount.toFixed(2)}</span>
                 </div>
              )}
              
              <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white mb-2">
                <p>Subtotal</p>
                <p>R$ {total.toFixed(2)}</p>
              </div>

              {shippingCost !== null && (
                 <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white mb-2">
                   <p>Frete</p>
                   <p>R$ {shippingCost.toFixed(2)}</p>
                 </div>
              )}

              <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white mb-6">
                <p>Total</p>
                <p>R$ {finalTotal.toFixed(2)}</p>
              </div>

              {/* Shipping Estimator */}
              <div className="mb-6 p-4 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-3">
                  <Truck className="h-4 w-4 text-safeway-blue" />
                  Estimativa de Frete
                </label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="CEP (00000-000)"
                    value={cep}
                    onChange={(e) => setCep(e.target.value.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2').substring(0, 9))}
                    className="flex-1 rounded-lg border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-safeway-blue/50 border shadow-sm"
                  />
                  <button 
                    onClick={handleCalculateShipping}
                    disabled={cep.length < 9 || isCalculating}
                    className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center min-w-[80px] justify-center"
                  >
                    {isCalculating ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Calcular'}
                  </button>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                   <CreditCard className="h-4 w-4 text-safeway-blue" />
                   Formas de Pagamento
                </p>
                <div className="grid grid-cols-2 gap-3">
                   <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-3 flex items-center justify-center gap-2 bg-white dark:bg-slate-900 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-safeway-blue dark:hover:border-safeway-cyan hover:text-safeway-blue dark:hover:text-safeway-cyan transition-colors cursor-default">
                     <QrCode className="h-4 w-4" />
                     <span>Pix</span>
                   </div>
                   <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-3 flex items-center justify-center gap-2 bg-white dark:bg-slate-900 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-safeway-blue dark:hover:border-safeway-cyan hover:text-safeway-blue dark:hover:text-safeway-cyan transition-colors cursor-default">
                     <CreditCard className="h-4 w-4" />
                     <span>Cartão</span>
                   </div>
                </div>
              </div>

              <button
                onClick={() => onCheckout(finalTotal)}
                className="w-full flex items-center justify-center rounded-xl border border-transparent bg-safeway-blue px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-sky-700 transition-all"
              >
                Finalizar Compra
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;