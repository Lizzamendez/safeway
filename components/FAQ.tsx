import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-slate-700">
      <button 
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-900 dark:text-white pr-8">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-safeway-blue flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
        )}
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "O Safe Click funciona fora de casa?",
      answer: "Sim! O dispositivo se conecta via Bluetooth ao seu smartphone. Onde houver sinal de celular, o alerta será enviado com sua localização exata."
    },
    {
      question: "A bateria é recarregável?",
      answer: "Sim, o Safe Click 3ª Geração possui bateria de íon-lítio recarregável via cabo USB-C (incluso). A carga dura aproximadamente 30 dias em uso moderado."
    },
    {
      question: "É resistente à água?",
      answer: "O dispositivo é resistente a respingos e suor (IP67), ideal para o dia a dia e atividades físicas. Não recomendamos mergulho prolongado."
    },
    {
      question: "Preciso pagar mensalidade?",
      answer: "Não! O aplicativo Safe Way é gratuito para usuários do dispositivo. Existem planos opcionais apenas para serviços de monitoramento profissional 24h."
    },
    {
      question: "Posso cadastrar quantos contatos de emergência?",
      answer: "Você pode cadastrar até 5 contatos de confiança que receberão o alerta via SMS e notificação no app simultaneamente."
    }
  ];

  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-safeway-blue/10 rounded-full mb-4">
            <HelpCircle className="h-6 w-6 text-safeway-blue" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Perguntas Frequentes</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Tire suas dúvidas sobre o funcionamento e características do Safe Click.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 px-8">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;