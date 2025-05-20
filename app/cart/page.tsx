'use client';

import Link from 'next/link';
import { CartList } from '@/components/cart/CartList';
import { CartSummary } from '@/components/cart/CartSummary';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-600 mb-8">Your cart is empty</p>
        <Link 
          href="/menu" 
          className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
        >
          Browse Our Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart ({totalItems} items)</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <CartList />
        </div>
        
        <div className="lg:w-1/3">
          <CartSummary />
          
          <div className="mt-6">
            <Link
              href="/checkout"
              className="w-full block text-center bg-orange-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}