import React, { useState } from 'react';
import { X, Lightbulb, ArrowRight, Check } from 'lucide-react';

interface QuizProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecommendation: (format: 'Clip' | 'Pulseira', color: string) => void;
}

const Quiz: React.FC<QuizProps> = ({ isOpen, onClose, onSelectRecommendation }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  if (!isOpen) return null;

  const questions = [
    {
      question: "Qual é o seu principal objetivo com o Safe Click?",
      options: [
        { label: "Segurança no transporte público", value: "A" },
        { label: "Monitoramento de idoso em casa", value: "B" },
        { label: "Prática de esportes ao ar livre", value: "C" }
      ]
    },
    {
      question: "Como você prefere carregar seus acessórios?",
      options: [
        { label: "No pulso, sempre visível", value: "Pulseira" },
        { label: "Discreto, na roupa ou bolsa", value: "Clip" }
      ]
    },
    {
      question: "Qual cor define melhor seu estilo?",
      options: [
        { label: "Discreto e Clássico", value: "#000000" }, // Preto
        { label: "Moderno e Clean", value: "#FFFFFF" }, // Branco
        { label: "Vibrante e Alegre", value: "#EC4899" } // Rosa
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Finished
    }
  };

  const getRecommendation = () => {
    const format = answers[1] === "Pulseira" ? "Pulseira" : "Clip";
    const color = answers[2]; // Hex code stored directly
    return { format, color };
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-slide-up transition-colors duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full text-gray-500 dark:text-gray-400">
          <X className="h-6 w-6" />
        </button>

        <div className="p-8">
          {step < questions.length ? (
            <>
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-safeway-warm/10 dark:bg-safeway-warm/20 text-safeway-warm p-2 rounded-lg">
                  <Lightbulb className="h-6 w-6" />
                </span>
                <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Descubra seu Safe Click • Pergunta {step + 1}/{questions.length}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 min-h-[64px]">
                {questions[step].question}
              </h3>

              <div className="space-y-3">
                {questions[step].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt.value)}
                    className="w-full text-left p-4 rounded-xl border-2 border-gray-100 dark:border-slate-700 hover:border-safeway-cyan dark:hover:border-safeway-cyan hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-all font-medium text-gray-700 dark:text-gray-200 flex justify-between items-center group"
                  >
                    {opt.label}
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 text-safeway-cyan transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Combinação Perfeita!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">Baseado no seu perfil, recomendamos:</p>
              
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-slate-600 mb-8 transform hover:scale-105 transition-transform duration-500">
                <p className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-1">Safe Click 3ª Geração</p>
                <p className="text-3xl font-bold text-safeway-blue dark:text-safeway-cyan mb-2">
                  Formato {getRecommendation().format}
                </p>
                <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
                   <span>Cor Sugerida:</span>
                   <div 
                    className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-500 shadow-sm"
                    style={{ backgroundColor: getRecommendation().color }}
                   ></div>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    const rec = getRecommendation();
                    onSelectRecommendation(rec.format as 'Clip' | 'Pulseira', rec.color);
                    onClose();
                  }}
                  className="flex-1 py-3 bg-safeway-blue text-white rounded-xl font-bold hover:bg-sky-700 transition-colors shadow-lg"
                >
                  Ver Produto
                </button>
                <button 
                  onClick={resetQuiz}
                  className="px-6 py-3 border-2 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                  Refazer
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Progress Bar */}
        {step < questions.length && (
          <div className="h-2 bg-gray-100 dark:bg-slate-700 w-full">
            <div 
              className="h-full bg-safeway-warm transition-all duration-500"
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;