import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  title: string;
  price: number;
  imagePlaceholder: string;
  description: string;
  sku?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  maxQuantity?: number;
}

export function ProductCard({ 
  title, 
  price, 
  imagePlaceholder, 
  description,
  sku = '',
  weight,
  dimensions,
  maxQuantity
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <img 
          src={imagePlaceholder} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-amber-900">{title}</h3>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-amber-900">${price.toFixed(2)}</span>
          <button 
            className="snipcart-add-item flex items-center px-3 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
            data-item-id={sku || title.toLowerCase().replace(/\s+/g, '-')}
            data-item-name={title}
            data-item-price={price}
            data-item-url={window.location.href}
            data-item-description={description}
            data-item-image={imagePlaceholder}
            {...(weight && { 'data-item-weight': weight })}
            {...(dimensions && {
              'data-item-length': dimensions.length,
              'data-item-width': dimensions.width,
              'data-item-height': dimensions.height
            })}
            {...(maxQuantity && { 'data-item-max-quantity': maxQuantity })}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}