import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Maria Lúcia, 68 anos",
    role: "Aposentada",
    content: "Depois que sofri uma queda em casa, fiquei com medo de ficar sozinha. O Safe Click me devolveu a confiança. Sei que se algo acontecer, minha filha saberá imediatamente.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Ana Clara, 24 anos",
    role: "Estudante",
    content: "Voltar da faculdade à noite sempre foi uma preocupação. Com o modo 'Pulseira', me sinto muito mais segura no transporte público. É discreto e eficiente.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Instituto Inclusão",
    role: "Parceiro Social",
    content: "A tecnologia assistiva da Safe Way mudou a vida de nossos assistidos. A facilidade de uso do botão é incrível para pessoas com mobilidade reduzida.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1554244933-d877fea83595?auto=format&fit=crop&q=80&w=200"
  }
];

const Testimonials: React.FC = () => {
  return (
    <div className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
             <Quote className="h-6 w-6 text-safeway-warm" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Histórias que Inspiram Confiança</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Veja como a tecnologia Safe Way está transformando vidas e trazendo tranquilidade para famílias em todo o Brasil.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div key={index} className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center gap-1 mb-4 text-yellow-400">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-200 italic mb-6 leading-relaxed">"{item.content}"</p>
              <div className="flex items-center gap-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-600 shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{item.name}</h4>
                  <p className="text-sm text-safeway-blue dark:text-safeway-cyan font-medium">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;