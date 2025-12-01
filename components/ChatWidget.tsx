import React, { useState } from 'react';
import { MessageCircle, X, Send, User } from 'lucide-react';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  // Simulated chat history
  const [history, setHistory] = useState<{sender: 'bot' | 'user', text: string}[]>([
    { sender: 'bot', text: 'Oi! Precisa de ajuda para escolher? 😊' },
    { sender: 'bot', text: 'Me conta, você busca segurança para você ou para alguém especial?' }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    setHistory(prev => [...prev, { sender: 'user', text: message }]);
    const userMsg = message;
    setMessage('');

    // Simulate bot thinking/reply
    setTimeout(() => {
      let reply = "Que ótimo! Nossa equipe vai adorar te ajudar. Um especialista humano entrará em contato em instantes.";
      if (userMsg.toLowerCase().includes('preço') || userMsg.toLowerCase().includes('valor')) {
        reply = "O Safe Click custa R$ 50,00 e temos promoções progressivas!";
      } else if (userMsg.toLowerCase().includes('cor') || userMsg.toLowerCase().includes('personal')) {
        reply = "Você pode personalizar 100% do seu dispositivo, desde a cor até o formato (Clip ou Pulseira)!";
      }
      setHistory(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden animate-slide-up origin-bottom-right flex flex-col max-h-[500px]">
          
          {/* Header */}
          <div className="bg-safeway-blue p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                   <User className="h-6 w-6 text-white" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-safeway-blue rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold">Equipe Safe Way</h3>
                <p className="text-xs text-blue-100">Online agora</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-slate-900 space-y-4 min-h-[300px]">
            {history.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-safeway-blue text-white rounded-br-none' 
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-slate-700 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700 flex gap-2">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-safeway-blue/50"
            />
            <button 
              type="submit"
              className="p-2 bg-safeway-blue text-white rounded-full hover:bg-sky-700 transition-colors flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`group p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center gap-2 ${isOpen ? 'bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300' : 'bg-safeway-blue text-white'}`}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap">
               Posso ajudar?
            </span>
          </>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;