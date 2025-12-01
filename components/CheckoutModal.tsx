import React, { useState, useEffect } from 'react';
import { X, Check, Lock, MapPin, CreditCard, User, Truck, ChevronRight } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onClearCart: () => void;
}

type CheckoutStep = 'auth' | 'shipping' | 'payment' | 'success';

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, items, total, onClearCart }) => {
  const [step, setStep] = useState<CheckoutStep>('auth');
  const [isLoading, setIsLoading] = useState(false);
  
  // Form States (Simulated)
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState({ street: '', number: '', cep: '', city: '' });
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'pix'>('credit');

  useEffect(() => {
    if (isOpen) {
      setStep('auth');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNextStep = (next: CheckoutStep) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(next);
      if (next === 'success') {
        onClearCart();
      }
    }, 1000); // Simulate API call
  };

  const renderAuthStep = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Identificação</h3>
        <p className="text-sm text-gray-500">Faça login ou crie sua conta para continuar</p>
      </div>

      <div className="space-y-4">
        <button 
          onClick={() => handleNextStep('shipping')}
          className="w-full flex items-center justify-center gap-3 p-4 border border-gray-200 dark:border-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          <span className="font-medium text-gray-700 dark:text-gray-200">Continuar com Google</span>
        </button>
        
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-200 dark:border-slate-700"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Ou use seu e-mail</span>
          <div className="flex-grow border-t border-gray-200 dark:border-slate-700"></div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-mail</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-safeway-blue"
            placeholder="seu@email.com"
          />
        </div>

        <button 
          onClick={() => handleNextStep('shipping')}
          disabled={!email}
          className="w-full py-3 bg-safeway-blue text-white rounded-xl font-bold hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Continuar
        </button>
      </div>
    </div>
  );

  const renderShippingStep = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Endereço de Entrega</h3>
        <p className="text-sm text-gray-500">Onde você quer receber seu Safe Click?</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CEP</label>
            <input 
              type="text" 
              placeholder="00000-000"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-safeway-blue dark:text-white"
              onChange={(e) => setAddress({...address, cep: e.target.value})}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rua / Avenida</label>
            <input 
              type="text" 
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-safeway-blue dark:text-white"
              onChange={(e) => setAddress({...address, street: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Número</label>
            <input 
              type="text" 
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-safeway-blue dark:text-white"
              onChange={(e) => setAddress({...address, number: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cidade</label>
            <input 
              type="text" 
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-safeway-blue dark:text-white"
              onChange={(e) => setAddress({...address, city: e.target.value})}
            />
          </div>
        </div>

        <button 
          onClick={() => handleNextStep('payment')}
          className="w-full py-3 bg-safeway-blue text-white rounded-xl font-bold hover:bg-sky-700 transition-colors flex items-center justify-center gap-2"
        >
          Ir para Pagamento
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Pagamento</h3>
        <p className="text-sm text-gray-500">Ambiente seguro e criptografado</p>
      </div>

      <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl mb-6">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
           <span>Total dos produtos</span>
           <span>R$ {total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
           <span>Frete</span>
           <span className="text-green-600 dark:text-green-400 font-medium">Grátis</span>
        </div>
        <div className="border-t border-gray-200 dark:border-slate-700 my-2 pt-2 flex justify-between font-bold text-lg text-gray-900 dark:text-white">
           <span>Total a pagar</span>
           <span>R$ {total.toFixed(2)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setPaymentMethod('credit')}
          className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
            paymentMethod === 'credit' 
              ? 'border-safeway-blue bg-blue-50 dark:bg-safeway-blue/20 text-safeway-blue dark:text-safeway-cyan' 
              : 'border-gray-200 dark:border-slate-700 text-gray-500'
          }`}
        >
          <CreditCard className="h-6 w-6" />
          <span className="font-medium text-sm">Cartão</span>
        </button>
        <button
          onClick={() => setPaymentMethod('pix')}
          className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
            paymentMethod === 'pix' 
              ? 'border-safeway-blue bg-blue-50 dark:bg-safeway-blue/20 text-safeway-blue dark:text-safeway-cyan' 
              : 'border-gray-200 dark:border-slate-700 text-gray-500'
          }`}
        >
          <span className="font-bold text-lg">PIX</span>
          <span className="font-medium text-sm">Instantâneo</span>
        </button>
      </div>

      {paymentMethod === 'credit' && (
        <div className="space-y-3 animate-fade-in">
          <input type="text" placeholder="Número do Cartão" className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 dark:text-white" />
          <div className="grid grid-cols-2 gap-3">
             <input type="text" placeholder="MM/AA" className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 dark:text-white" />
             <input type="text" placeholder="CVV" className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 dark:text-white" />
          </div>
          <input type="text" placeholder="Nome no Cartão" className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 dark:text-white" />
        </div>
      )}

      <button 
        onClick={() => handleNextStep('success')}
        className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-1"
      >
        Finalizar Pedido R$ {total.toFixed(2)}
      </button>

      <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-4">
        <Lock className="h-3 w-3" />
        Pagamento 100% Seguro
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="text-center py-12 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Visual Animation Container */}
      <div className="relative mb-8">
        {/* Pulsating Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-green-400/20 dark:bg-green-400/10 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-green-500/20 dark:bg-green-500/10 rounded-full animate-pulse"></div>

        {/* Confetti Particles (Simulated with absolute divs) */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full animate-confetti"
            style={{
              backgroundColor: ['#F59E0B', '#3B82F6', '#EF4444', '#10B981'][i % 4],
              transform: `rotate(${i * 45}deg) translateY(-50px)`,
              animationDelay: `${i * 0.05}s`
            }}
          />
        ))}

        {/* Main Icon */}
        <div className="relative w-24 h-24 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center z-10 animate-success-pop shadow-xl border-4 border-white dark:border-slate-800">
          <Check className="h-12 w-12 text-green-600 dark:text-green-400 stroke-[3]" />
        </div>
      </div>

      <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3 animate-slide-up">Pedido Confirmado!</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xs mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
        Obrigado por escolher a Safe Way. Você receberá os detalhes do rastreamento por e-mail.
      </p>
      
      <div className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-xl text-left mb-8 w-full max-w-sm border border-gray-100 dark:border-slate-700 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Código do Pedido:</p>
        <div className="flex items-center justify-between">
          <p className="font-mono font-bold text-xl text-safeway-blue dark:text-safeway-cyan">#SW-{Math.floor(Math.random() * 10000)}</p>
          <span className="text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded">Pago</span>
        </div>
      </div>

      <button 
        onClick={onClose}
        className="px-10 py-4 bg-safeway-blue text-white rounded-full font-bold hover:bg-sky-700 transition-all shadow-lg hover:shadow-safeway-blue/30 transform hover:-translate-y-1 animate-slide-up"
        style={{ animationDelay: '0.3s' }}
      >
        Voltar para a Loja
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 z-10">
          <div className="flex items-center gap-2">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${step === 'auth' || step === 'success' ? 'bg-safeway-blue text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-400'}`}>1</span>
            <div className="w-8 h-0.5 bg-gray-200 dark:bg-slate-700"></div>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${step === 'shipping' ? 'bg-safeway-blue text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-400'}`}>2</span>
            <div className="w-8 h-0.5 bg-gray-200 dark:bg-slate-700"></div>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${step === 'payment' ? 'bg-safeway-blue text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-400'}`}>3</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 relative">
          {isLoading ? (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 dark:bg-slate-900/90 z-20 backdrop-blur-sm">
               <div className="w-12 h-12 border-4 border-safeway-blue border-t-transparent rounded-full animate-spin mb-4"></div>
               <p className="text-gray-600 dark:text-gray-300 font-medium animate-pulse">Processando...</p>
             </div>
          ) : (
            <>
              {step === 'auth' && renderAuthStep()}
              {step === 'shipping' && renderShippingStep()}
              {step === 'payment' && renderPaymentStep()}
              {step === 'success' && renderSuccessStep()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;