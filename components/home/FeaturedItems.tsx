'use client';

import React from 'react';
import FoodCard from '../ui/FoodCard';
import { MenuItem } from '@/types';
import { menuItems } from '@/data/menuItems';

const FeaturedItems: React.FC = () => {

  const featuredItems = menuItems.filter(item => item.featured);
  
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Items</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our most popular dishes that customers love
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.slice(0, 6).map((item: MenuItem) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;