'use client';

import React from 'react';
import Image from 'next/image';
import { formatCurrency } from '@/utils/formatCurrency';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';
import QuantitySelector from '../ui/QuantitySelector';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  
  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };
  
  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItem(item.id);
    }
  };
  
  const handleRemove = () => {
    removeItem(item.id);
  };
  
  // Calculate total for this item including options
  const calculateItemTotal = () => {
    const baseTotal = item.price * item.quantity;
    const optionsTotal = item.selectedOptions
      ? item.selectedOptions.reduce((sum, opt) => sum + opt.priceAdjustment, 0) * item.quantity
      : 0;
    return baseTotal + optionsTotal;
  };

  return (
    <div className="flex items-start space-x-4 py-4 border-b border-gray-200">
      {/* Item Image */}
      <div className="flex-shrink-0 w-20 h-20 relative rounded-md overflow-hidden">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="bg-gray-200 w-full h-full flex items-center justify-center">
            <span className="text-gray-400 text-xs">No image</span>
          </div>
        )}
      </div>
      
      {/* Item Details */}
      <div className="flex-grow">
        <h3 className="font-medium text-gray-800">{item.name}</h3>
        
        <div className="mt-1 text-sm text-gray-500">
          {item.selectedOptions && item.selectedOptions.length > 0 && (
            <div className="text-xs text-gray-500 mt-1">
              {item.selectedOptions.map((option, index) => (
                <div key={index}>
                  {option.name}: {option.choice} 
                  {option.priceAdjustment > 0 && (
                    <span className="ml-1">
                      (+{formatCurrency(option.priceAdjustment)})
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-2 flex items-center justify-between">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
          
          <div className="flex items-center">
            <span className="font-medium">
              {formatCurrency(calculateItemTotal())}
            </span>
            <button
              onClick={handleRemove}
              className="ml-3 text-gray-400 hover:text-red-500"
              aria-label="Remove item"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;