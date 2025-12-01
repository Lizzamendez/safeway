import React, { useState } from 'react';
import { Phone, Globe, Instagram, MapPin, Mail, Linkedin, Facebook, Twitter, Share2, Check } from 'lucide-react';
import { COMPANY_INFO } from '../constants';

const Contact: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleShareAddress = async () => {
    const addressText = `${COMPANY_INFO.address} - CEP: ${COMPANY_INFO.cep}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Endereço Safe Way',
          text: `Visite a Safe Way em: ${addressText}`,
          url: 'https://safeway.com' // Exemplo
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(addressText);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    }
  };

  return (
    <footer id="contact" className="bg-safeway-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">SAFE WAY</h3>
            <p className="text-gray-400">
              Segurança ao alcance de um toque. Protegendo quem você ama com tecnologia e carinho.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Links Rápidos</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#home" className="hover:text-safeway-cyan transition-colors">Início</a></li>
              <li><a href="#products" className="hover:text-safeway-cyan transition-colors">Produtos</a></li>
              <li><a href="#about" className="hover:text-safeway-cyan transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-safeway-cyan transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Contato</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-safeway-cyan" />
                {COMPANY_INFO.phone}
              </li>
              <li className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-safeway-cyan" />
                {COMPANY_INFO.website}
              </li>
              <li className="flex items-center gap-3">
                <Instagram className="h-5 w-5 text-safeway-cyan" />
                {COMPANY_INFO.instagram}
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-safeway-cyan" />
                contato@safeway.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Localização</h4>
            <div className="flex items-start gap-3 text-gray-400 mb-6 group">
              <MapPin className="h-6 w-6 text-safeway-cyan flex-shrink-0 mt-1" />
              <div>
                <p>{COMPANY_INFO.address}</p>
                <p className="mt-1">CEP: {COMPANY_INFO.cep}</p>
                
                <button 
                  onClick={handleShareAddress}
                  className="mt-3 text-xs font-medium text-safeway-cyan hover:text-white flex items-center gap-1 transition-colors border border-safeway-cyan/30 hover:border-white rounded-full px-3 py-1"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-3 w-3" /> Copiado!
                    </>
                  ) : (
                    <>
                      <Share2 className="h-3 w-3" /> Compartilhar Endereço
                    </>
                  )}
                </button>
              </div>
            </div>

            <h4 className="text-sm font-semibold mb-4 text-gray-300">Siga-nos</h4>
            <div className="flex gap-4">
              <a href="#" className="bg-gray-800 p-2.5 rounded-full hover:bg-safeway-blue hover:text-white text-gray-400 transition-all duration-300 transform hover:-translate-y-1" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2.5 rounded-full hover:bg-safeway-blue hover:text-white text-gray-400 transition-all duration-300 transform hover:-translate-y-1" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2.5 rounded-full hover:bg-safeway-blue hover:text-white text-gray-400 transition-all duration-300 transform hover:-translate-y-1" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Safe Way. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;