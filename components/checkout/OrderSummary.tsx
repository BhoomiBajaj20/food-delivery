import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils/formatCurrency';

export function OrderSummary() {
  const { items, total: subtotal } = useCart();

  const deliveryFee = subtotal > 0 ? 3.99 : 0;

  const tax = subtotal * 0.08;

  const total = subtotal + deliveryFee + tax;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="border-b pb-4 mb-4">
        {items.map(item => (
          <div key={item.id} className="flex justify-between py-2">
            <span className="text-gray-700">
              {item.quantity} × {item.name}
            </span>
            <span className="text-gray-900 font-medium">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span>{formatCurrency(deliveryFee)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            Including VAT and all applicable taxes
          </p>
        </div>
      </div>
    </div>
  );
}