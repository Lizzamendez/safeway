import React from 'react';
import { Truck, Ticket } from 'lucide-react';

const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-safeway-dark dark:bg-slate-950 text-white overflow-hidden py-1.5 relative z-[60] border-b border-gray-800">
      {/* Container for the scrolling text. We duplicate content to ensure seamless loop */}
      <div className="flex w-fit animate-marquee hover:pause">
        <div className="flex items-center gap-12 px-6 whitespace-nowrap">
          <span className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider">
            <Truck className="h-3 w-3 md:h-4 md:w-4 text-safeway-cyan" />
            Frete Grátis acima de R$ 200
          </span>
          <span className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider">
            <Ticket className="h-3 w-3 md:h-4 md:w-4 text-safeway-warm" />
            Cupom <span className="text-white bg-white/20 px-1 rounded">CLICK20</span>: 20% OFF
          </span>
          <span className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider">
            <Truck className="h-3 w-3 md:h-4 md:w-4 text-safeway-cyan" />
            Entrega Expressa SP
          </span>
        </div>
        {/* Duplicate */}
        <div className="flex items-center gap-12 px-6 whitespace-nowrap">
          <span className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider">
            <Truck className="h-3 w-3 md:h-4 md:w-4 text-safeway-cyan" />
            Frete Grátis acima de R$ 200
          </span>
          <span className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider">
            <Ticket className="h-3 w-3 md:h-4 md:w-4 text-safeway-warm" />
            Cupom <span className="text-white bg-white/20 px-1 rounded">CLICK20</span>: 20% OFF
          </span>
          <span className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider">
            <Truck className="h-3 w-3 md:h-4 md:w-4 text-safeway-cyan" />
            Entrega Expressa SP
          </span>
        </div>
         {/* Duplicate 2 */}
         <div className="flex items-center gap-12 px-6 whitespace-nowrap">
          <span className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider">
            <Truck className="h-3 w-3 md:h-4 md:w-4 text-safeway-cyan" />
            Frete Grátis acima de R$ 200
          </span>
          <span className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider">
            <Ticket className="h-3 w-3 md:h-4 md:w-4 text-safeway-warm" />
            Cupom <span className="text-white bg-white/20 px-1 rounded">CLICK20</span>: 20% OFF
          </span>
          <span className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider">
            <Truck className="h-3 w-3 md:h-4 md:w-4 text-safeway-cyan" />
            Entrega Expressa SP
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;