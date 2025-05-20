export interface Category {
  id: string;
  name: string;
  image?: string;
  description: string;
  imageUrl: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  imageUrl: string;
  category: string;
  featured: boolean;
  popular: boolean;
  options?: MenuItemOption[];
}

export interface MenuItemOption {
  name: string;
  choices: {
    id: string;
    name: string;
    price: number;
  }[];
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  selectedOptions?: {
    name: string;
    choice: string;
    priceAdjustment: number;
  }[];
}

export interface DeliveryInfo {
  name: string;
  address: string;
  phone: string;
  email?: string;
  instructions?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  deliveryInfo: DeliveryInfo;
  status: 'pending' | 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered';
  timestamp: number;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem, quantity: number, selectedOptions?: any[]) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  total: number;
}