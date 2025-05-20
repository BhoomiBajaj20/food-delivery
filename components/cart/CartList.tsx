import CartItem from '@/components/ui/CartItem';
import { useCart } from '@/context/CartContext';

export function CartList() {
  const { items } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
      
      <div className="space-y-4">
        {items.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}