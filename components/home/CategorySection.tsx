'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types';

interface CategorySectionProps {
  categories: Category[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  return (
    <section id="categories" className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Food Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide variety of delicious options from top local restaurants
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category: Category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link 
      href={`/menu?category=${category.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300"
    >
      <div className="relative h-36 w-full">
        <Image
          src={category.imageUrl}
          alt={category.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 30vw, 16vw"
        />
      </div>
      
      <div className="p-3 text-center">
        <h3 className="font-semibold text-gray-800">{category.name}</h3>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{category.description}</p>
      </div>
    </Link>
  );
};

export default CategorySection;
