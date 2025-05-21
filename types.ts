
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  rating?: number;
  reviews?: number;
  sku?: string;
  options?: ProductOption[];
  longDescription?: string;
}

export interface ProductOption {
  name: string; // e.g., "Size", "Color"
  values: string[]; // e.g., ["S", "M", "L"] or ["Red", "Blue"]
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOptions?: { [key: string]: string }; // e.g. { Size: "M", Color: "Red" }
}

export interface Category {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  customerDetails: CustomerDetails;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  orderDate: Date;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
}
