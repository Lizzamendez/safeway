import React, { useState, useEffect } from 'react';
import { Plus, Check, Palette, Watch, Paperclip, QrCode, CreditCard, Share2, X, Copy, Facebook, Linkedin, Twitter, MessageCircle, Heart } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

interface ProductsProps {
  onAddToCart: (product: Product, color: string, format: 'Clip' | 'Pulseira') => void;
}

const Products: React.FC<ProductsProps> = ({ onAddToCart }) => {
  // Config state
  const [selectedFormat, setSelectedFormat] = useState<'Clip' | 'Pulseira'>('Clip');
  const [selectedColor, setSelectedColor] = useState<string>('#000000');
  const [activeColorName, setActiveColorName] = useState<string>('Preto');
  
  // Gallery state
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageAnimating, setIsImageAnimating] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Interaction State
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);

  // Helper to handle product access (since we usually have one main product)
  const product = PRODUCTS[activeProductIndex];
  
  // Ensure we have images to display
  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const currentImageSrc = galleryImages[currentImageIndex];

  const handleImageChange = (index: number) => {
    if (index === currentImageIndex) return;
    
    setIsImageAnimating(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setImageLoaded(false); // Reset load state so skeleton shows for new image if needed
      setIsImageAnimating(false);
    }, 300); // Duration matches CSS transition
  };

  const presetColors = [
    { name: 'Preto', hex: '#000000' },
    { name: 'Branco', hex: '#FFFFFF' },
    { name: 'Azul', hex: '#006B99' },
    { name: 'Rosa', hex: '#EC4899' },
  ];

  // Update color name when custom color changes
  useEffect(() => {
    const preset = presetColors.find(p => p.hex.toLowerCase() === selectedColor.toLowerCase());
    if (preset) {
      setActiveColorName(preset.name);
    } else {
      setActiveColorName(selectedColor.toUpperCase());
    }
  }, [selectedColor]);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 2000);
    });
  };

  const shareUrl = window.location.href;
  const shareText = `Confira o ${product.name} da Safe Way! Segurança e autonomia em um toque.`;

  // Listen for config from Quiz or other sources if implemented later via props/context
  // For now this is standalone

  return (
    <div id="products" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Personalize seu Safe Click</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Escolha o formato e a cor que mais combinam com você.
          </p>
        </div>

        {/* Product Card */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700 flex flex-col md:flex-row transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
              
            {/* Gallery Section */}
            <div className="md:w-1/2 bg-gray-100 dark:bg-slate-700 flex flex-col relative">
              
              {/* Wishlist Button (Floating) */}
              <button 
                onClick={() => setIsWishlist(!isWishlist)}
                className="absolute top-4 right-16 z-30 p-2.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-full text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 shadow-md transition-all hover:scale-110"
                title={isWishlist ? "Remover da Lista de Desejos" : "Adicionar à Lista de Desejos"}
              >
                <Heart className={`h-5 w-5 transition-colors duration-300 ${isWishlist ? "fill-red-500 text-red-500" : ""}`} />
              </button>

              {/* Share Button (Floating) */}
              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="absolute top-4 right-4 z-30 p-2.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-full text-gray-600 dark:text-gray-300 hover:text-safeway-blue dark:hover:text-safeway-cyan shadow-md transition-all hover:scale-110"
                title="Compartilhar Produto"
              >
                <Share2 className="h-5 w-5" />
              </button>

              {/* Main Image Container */}
              <div className="relative h-96 md:h-[500px] overflow-hidden group">
                {/* Skeleton Loader - Exibido enquanto imageLoaded for falso */}
                <div 
                  className={`absolute inset-0 bg-gray-200 dark:bg-slate-600 animate-pulse transition-opacity duration-500 ${
                    imageLoaded ? 'opacity-0 z-0' : 'opacity-100 z-10'
                  }`} 
                />
                
                <img 
                  src={currentImageSrc} 
                  alt={`${product.name} view ${currentImageIndex + 1}`}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full object-cover transition-all duration-500 ease-in-out relative z-10 ${
                    imageLoaded && !isImageAnimating
                      ? 'opacity-100 blur-0 scale-100' 
                      : 'opacity-0 blur-sm scale-105'
                  }`}
                />
                
                {/* Badge */}
                <div className="absolute top-6 left-6 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-4 py-2 rounded-full text-sm font-bold text-safeway-blue dark:text-safeway-cyan shadow-sm">
                  3ª Geração
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="p-4 flex gap-3 overflow-x-auto justify-center bg-gray-50 dark:bg-slate-700/50 border-t border-gray-200 dark:border-slate-600">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleImageChange(idx)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                      currentImageIndex === idx 
                        ? 'border-safeway-blue dark:border-safeway-cyan ring-2 ring-safeway-blue/20 dark:ring-safeway-cyan/20 scale-105' 
                        : 'border-transparent opacity-70 hover:opacity-100 hover:border-gray-300 dark:hover:border-slate-500'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Configuration Section */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h3>
                <p className="text-gray-500 dark:text-gray-400">{product.description}</p>
                
                <div className="mt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Preço Unitário</span>
                    <div className="text-4xl font-bold text-safeway-blue dark:text-safeway-cyan">R$ {product.price.toFixed(2)}</div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-slate-700/50 px-3 py-2 rounded-lg border border-gray-100 dark:border-slate-600">
                    <div className="flex items-center gap-1.5">
                      <QrCode className="h-4 w-4 text-safeway-blue dark:text-safeway-cyan" />
                      <span>Pix</span>
                    </div>
                    <div className="w-px h-4 bg-gray-300 dark:bg-slate-500"></div>
                    <div className="flex items-center gap-1.5">
                      <CreditCard className="h-4 w-4 text-safeway-blue dark:text-safeway-cyan" />
                      <span>Cartão</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8 flex-grow">
                
                {/* Format Selection */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                    1. Escolha o Formato
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setSelectedFormat('Clip')}
                      className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                        selectedFormat === 'Clip' 
                          ? 'border-safeway-blue dark:border-safeway-cyan bg-blue-50 dark:bg-safeway-cyan/10 text-safeway-blue dark:text-safeway-cyan scale-105 shadow-md' 
                          : 'border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      <Paperclip className="h-8 w-8 mb-2" />
                      <span className="font-semibold">Simples (Clip)</span>
                    </button>
                    <button
                      onClick={() => setSelectedFormat('Pulseira')}
                      className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                        selectedFormat === 'Pulseira' 
                          ? 'border-safeway-blue dark:border-safeway-cyan bg-blue-50 dark:bg-safeway-cyan/10 text-safeway-blue dark:text-safeway-cyan scale-105 shadow-md' 
                          : 'border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      <Watch className="h-8 w-8 mb-2" />
                      <span className="font-semibold">Pulseira</span>
                    </button>
                  </div>
                </div>

                {/* Color Selection - Refactored */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wider flex items-center gap-2">
                      2. Escolha a Cor
                    </h4>
                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-700/50 px-3 py-1 rounded-full border border-gray-100 dark:border-slate-600">
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
                        style={{ backgroundColor: selectedColor }}
                      ></div>
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{activeColorName}</span>
                    </div>
                  </div>
                  
                  {/* Interactive Color Palette */}
                  <div className="flex flex-wrap gap-4">
                    {presetColors.map((color) => (
                      <button
                        key={color.hex}
                        onClick={() => setSelectedColor(color.hex)}
                        className={`group relative w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                          selectedColor === color.hex
                            ? 'border-safeway-blue dark:border-safeway-cyan scale-110 shadow-lg ring-2 ring-offset-2 ring-safeway-blue/30 dark:ring-offset-slate-800' 
                            : 'border-gray-200 dark:border-slate-600 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                        aria-label={`Selecionar cor ${color.name}`}
                      >
                         {selectedColor === color.hex && (
                           <Check className={`h-6 w-6 animate-success-pop ${
                             color.name === 'Branco' ? 'text-gray-900' : 'text-white'
                           }`} />
                         )}
                      </button>
                    ))}
                    
                    {/* Custom Color Button with Hidden Input */}
                    <div className="relative group">
                       <button
                        className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 overflow-hidden ${
                          !presetColors.some(p => p.hex === selectedColor)
                            ? 'border-safeway-blue dark:border-safeway-cyan scale-110 shadow-lg ring-2 ring-offset-2 ring-safeway-blue/30 dark:ring-offset-slate-800' 
                            : 'border-gray-200 dark:border-slate-600 hover:scale-105'
                        }`}
                        title="Cor Personalizada"
                       >
                         {/* Background Preview for Custom Color */}
                         <div 
                           className="absolute inset-0"
                           style={{ 
                             background: !presetColors.some(p => p.hex === selectedColor) 
                               ? selectedColor 
                               : 'linear-gradient(135deg, #f87171, #fbbf24, #34d399, #60a5fa)' 
                           }}
                         />
                         
                         {/* Icon overlay */}
                         <Palette className={`relative z-10 h-5 w-5 ${
                            !presetColors.some(p => p.hex === selectedColor)
                              ? 'text-white drop-shadow-md opacity-100' // Show icon if custom selected
                              : 'text-white opacity-80' // Gradient background
                         }`} />

                         {/* Invisible Input covering the button */}
                         <input 
                            type="color"
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20"
                         />
                       </button>
                       <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                         Personalizar
                       </span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-6">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Características:</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <div className="mr-2 p-1 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 flex-shrink-0">
                          <Check className="h-3 w-3" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <button
                onClick={() => onAddToCart(product, selectedColor, selectedFormat)}
                className="w-full mt-8 py-5 bg-safeway-blue text-white rounded-xl font-bold text-lg hover:bg-sky-700 dark:bg-safeway-blue dark:hover:bg-safeway-cyan transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-95 duration-200"
              >
                <Plus className="h-6 w-6" />
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsShareModalOpen(false)}></div>
          
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-slide-up">
            <div className="p-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Share2 className="h-5 w-5 text-safeway-blue dark:text-safeway-cyan" />
                Compartilhar
              </h3>
              <button 
                onClick={() => setIsShareModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-4 gap-4 mb-6">
                <a 
                  href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                    <MessageCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-300">WhatsApp</span>
                </a>
                
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                    <Facebook className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-300">Facebook</span>
                </a>

                <a 
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center group-hover:bg-sky-200 dark:group-hover:bg-sky-800 transition-colors">
                    <Twitter className="h-6 w-6 text-sky-500 dark:text-sky-400" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-300">Twitter</span>
                </a>

                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                    <Linkedin className="h-6 w-6 text-blue-700 dark:text-blue-400" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-300">LinkedIn</span>
                </a>
              </div>

              <div className="relative">
                <input 
                  type="text" 
                  readOnly 
                  value={shareUrl} 
                  className="w-full pl-3 pr-10 py-3 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600 text-sm text-gray-600 dark:text-gray-300 focus:outline-none"
                />
                <button 
                  onClick={handleCopyLink}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                  title="Copiar Link"
                >
                  {isLinkCopied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;