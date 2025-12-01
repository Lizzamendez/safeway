import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'safe-click-v3',
    name: 'Safe Click 3ª Geração',
    description: 'Dispositivo de segurança completo. Escolha o formato que melhor se adapta à sua rotina e personalize com sua cor favorita.',
    price: 50.00,
    image: 'https://images.unsplash.com/photo-1551817958-c9c488344c20?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1551817958-c9c488344c20?auto=format&fit=crop&q=80&w=800', // Frontal
      'https://images.unsplash.com/photo-1510022079733-8b58aca7c4a9?auto=format&fit=crop&q=80&w=800', // Lateral/Clip (Simulado)
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&q=80&w=800', // Pulso (Simulado)
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800'  // Lifestyle (Simulado)
    ],
    features: ['Conexão Bluetooth Eficiente', 'Bateria Íon-Lítio', 'Vibração', 'Plástico e Silicone', 'Resistente à Água']
  }
];

export const COMPANY_INFO = {
  phone: '(11) 97782-0259',
  website: 'safeway.com',
  instagram: '@SAFEWAY.OFC',
  address: 'Rua das Acácias, nº 215, Jardim Aurora, São Paulo – SP',
  cep: '02435-210'
};