'use client';

import { CartContextType, CartItem, MenuItem } from '@/types';
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  total: 0,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));

    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    setTotalItems(count);
    
    const cartTotal = items.reduce((sum, item) => {
      const itemTotal = item.price * item.quantity;
      const optionsTotal = item.selectedOptions ? 
        item.selectedOptions.reduce((optSum, opt) => optSum + opt.priceAdjustment, 0) * item.quantity : 0;
      return sum + itemTotal + optionsTotal;
    }, 0);
    setTotal(cartTotal);
  }, [items]);

  const addItem = (menuItem: MenuItem, quantity: number, selectedOptions?: any[]) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.menuItemId === menuItem.id && 
        JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
      );
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        const newItem: CartItem = {
          id: `${menuItem.id}-${Date.now()}`,
          menuItemId: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          quantity: quantity,
          imageUrl: menuItem.imageUrl,
          selectedOptions: selectedOptions as CartItem['selectedOptions'],
        };
        return [...prevItems, newItem];
      }
    });
  };
  
  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setItems([]);
  };
  
  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);