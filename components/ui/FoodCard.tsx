'use client';

import React from 'react';
import Image from 'next/image';
import Button from './Button';
import { formatCurrency } from '@/utils/formatCurrency';
import { MenuItem } from '@/types';
import { useCart } from '@/context/CartContext';

interface FoodCardProps {
  item: MenuItem;
}

const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const { addItem } = useCart();
  
  const handleAddToCart = () => {
    addItem(item, 1);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 w-full">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {item.popular && (
          <span className="absolute top-2 right-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
            Popular
          </span>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
          <span className="font-medium text-primary">{formatCurrency(item.price)}</span>
        </div>
        
        <p className="mt-2 text-gray-600 text-sm line-clamp-2">{item.description}</p>
        
        <div className="mt-4">
          <Button onClick={handleAddToCart} fullWidth className='bg-orange-600 hover:bg-orange-700'>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;