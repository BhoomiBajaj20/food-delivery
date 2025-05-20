import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/ui/Navbar';
import { CartProvider } from '@/context/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FoodDelivery - Order Delicious Food Online',
  description: 'A modern food delivery app built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-20">{children}</main>
            <footer className="bg-gray-800 text-white py-8">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="mb-6 md:mb-0">
                    <h3 className="text-xl font-bold mb-4">FoodDelivery</h3>
                    <p className="text-gray-300 max-w-md">
                      Delivering delicious food to your doorstep since 2023.
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div>
                      <h4 className="font-semibold mb-3">Quick Links</h4>
                      <ul className="space-y-2">
                        <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
                        <li><a href="/menu" className="text-gray-300 hover:text-white">Menu</a></li>
                        <li><a href="/cart" className="text-gray-300 hover:text-white">Cart</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Contact</h4>
                      <ul className="space-y-2">
                        <li className="text-gray-300">123 Food Street</li>
                        <li className="text-gray-300">Tasty City, TC 12345</li>
                        <li className="text-gray-300">info@fooddelivery.com</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
                  <p>&copy; {new Date().getFullYear()} FoodDelivery. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}