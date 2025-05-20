'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { items } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  if (items.length === 0) {
    return null; 
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <CheckoutForm />
        </div>
        
        <div className="lg:w-1/3">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}