'use client';

import React from 'react';
import Image from 'next/image';
import Button from '../ui/Button';
import Link from 'next/link';

const Banner: React.FC = () => {
  return (
    <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1770"
          alt="Delicious food spread"
          fill
          priority  
          className="object-cover brightness-50"
          sizes="100vw"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 flex flex-col justify-center pt-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Delicious Food Delivered To Your Door
          </h1>
          
          <p className="text-xl text-gray-200 mb-8">
            Discover the best meals from premium restaurants in your area, delivered fast and fresh.
          </p>
          
          <div className="flex flex-wrap items-baseline gap-4 mt-6">
            <Link href="/menu">
              <Button size="lg">
                Order Now
              </Button>
            </Link>
            
            <a href="#categories">
              <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white hover:text-black hover:text-primary">
                Explore Menu
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      <div className="pb-6" />

      {/* Wave SVG */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#ffffff">
          <path d="M0,64L80,80C160,96,320,128,480,128C640,128,800,96,960,80C1120,64,1280,64,1360,64L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Banner;