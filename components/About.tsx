import React from 'react';
import { Target, Eye, Heart, Leaf, Users, Gavel } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div id="about" className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* MVV Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Quem Somos</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Fundada em 2021, a Safe Way evoluiu para se tornar referência em segurança inclusiva.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 mx-auto">
              <Target className="h-6 w-6 text-safeway-blue dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Missão</h3>
            <p className="text-gray-600 dark:text-gray-300">Criar tecnologias acessíveis e seguras, democratizando o acesso à proteção pessoal.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all text-center">
            <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center mb-6 mx-auto">
              <Eye className="h-6 w-6 text-safeway-cyan dark:text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Visão</h3>
            <p className="text-gray-600 dark:text-gray-300">Ser referência global em segurança inclusiva, inovando continuamente.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all text-center">
            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mb-6 mx-auto">
              <Heart className="h-6 w-6 text-pink-500 dark:text-pink-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Valores</h3>
            <ul className="text-gray-600 dark:text-gray-300 space-y-1 inline-block text-left">
              <li>• Inclusão</li>
              <li>• Acessibilidade</li>
              <li>• Inovação</li>
              <li>• Responsabilidade</li>
            </ul>
          </div>
        </div>

        {/* ESG Section */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-16 shadow-xl overflow-hidden relative border border-gray-100 dark:border-slate-700">
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Compromisso ESG</h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">Ambiental, Social e Governança</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="text-xl font-bold mb-2 dark:text-gray-100">Ambiental</h4>
                <p className="text-gray-600 dark:text-gray-400">Utilização de materiais reciclados (plástico e silicone) e práticas sustentáveis em toda a cadeia produtiva.</p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="text-xl font-bold mb-2 dark:text-gray-100">Social</h4>
                <p className="text-gray-600 dark:text-gray-400">Incentiva a inclusão e segurança de PCDs, mulheres e idosos através de design funcional.</p>
              </div>

              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                  <Gavel className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="text-xl font-bold mb-2 dark:text-gray-100">Governança</h4>
                <p className="text-gray-600 dark:text-gray-400">Gestão pautada em ética, transparência e responsabilidade corporativa.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;