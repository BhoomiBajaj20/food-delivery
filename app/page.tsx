import Banner from '@/components/home/Banner';
import CategorySection from '@/components/home/CategorySection';
import FeaturedItems from '@/components/home/FeaturedItems';
import { categories } from '@/data/categories';
import { menuItems } from '@/data/menuItems';

export default function Home() {
  // const featuredItems = menuItems.filter(item => item.featured);

  return (
    <main className="container mx-auto px-4">
      <Banner />
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        <CategorySection categories={categories} />
      </div>
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-6">Featured Items</h2>
        <FeaturedItems />
      </div>
    </main>
  );
}