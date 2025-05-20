'use client';

import { useState } from 'react';
import FoodCard  from '@/components/ui/FoodCard';
import { menuItems } from '@/data/menuItems';
import { categories } from '@/data/categories';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const filteredItems = activeCategory 
    ? menuItems.filter(item => item.category === activeCategory)
    : menuItems;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Menu</h1>
      
      {/* Category filters */}
      <div className="flex overflow-x-auto pb-4 mb-6 space-x-4">
        <button
          className={`px-4 py-2 rounded-full whitespace-nowrap ${
            activeCategory === null ? 'bg-orange-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveCategory(null)}
        >
          All Items
        </button>
        
        {categories.map(category => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeCategory === category.id ? 'bg-orange-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Menu items grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map(item => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No items found in this category.</p>
        </div>
      )}
    </div>
  );
}