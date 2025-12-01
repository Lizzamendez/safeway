export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string; // Mantido para compatibilidade com o Carrinho (imagem de capa)
  images: string[]; // Nova propriedade para a galeria
  features: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
  selectedFormat: 'Clip' | 'Pulseira';
}

export type SectionId = 'home' | 'products' | 'corporate' | 'about' | 'impact' | 'contact';