'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export function CheckoutForm() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP Code is required';
    
    // Payment method validation
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry date is required';
      if (!formData.cardCvc.trim()) newErrors.cardCvc = 'CVC is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);

    setTimeout(() => {
      clearCart();
      router.push('/order-success');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Delivery Information</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Personal Information */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`w-full p-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
          </div>
          
          {/* Delivery Address */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Delivery Address</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="address">Street Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className={`w-full p-2 border rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className={`w-full p-2 border rounded-md ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="zipCode">ZIP Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    className={`w-full p-2 border rounded-md ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                  {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                </div>
              </div>
            </div>
          </div>
          
          {/* Payment Method */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Payment Method</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="card">Credit/Debit Card</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="cash"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="cash">Cash on Delivery</label>
                </div>
              </div>
              
              {formData.paymentMethod === 'card' && (
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="block text-gray-700 mb-1" htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className={`w-full p-2 border rounded-md ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                      value={formData.cardNumber}
                      onChange={handleChange}
                    />
                    {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1" htmlFor="cardExpiry">Expiry Date</label>
                      <input
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        placeholder="MM/YY"
                        className={`w-full p-2 border rounded-md ${errors.cardExpiry ? 'border-red-500' : 'border-gray-300'}`}
                        value={formData.cardExpiry}
                        onChange={handleChange}
                      />
                      {errors.cardExpiry && <p className="text-red-500 text-sm mt-1">{errors.cardExpiry}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1" htmlFor="cardCvc">CVC</label>
                      <input
                        type="text"
                        id="cardCvc"
                        name="cardCvc"
                        placeholder="123"
                        className={`w-full p-2 border rounded-md ${errors.cardCvc ? 'border-red-500' : 'border-gray-300'}`}
                        value={formData.cardCvc}
                        onChange={handleChange}
                      />
                      {errors.cardCvc && <p className="text-red-500 text-sm mt-1">{errors.cardCvc}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:bg-orange-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}