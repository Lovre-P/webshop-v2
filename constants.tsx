
import React from 'react';
// Fix: Import Product, Category, FAQItem, and BlogPost types
import { Product, Category, FAQItem, BlogPost } from '../types';

export const APP_NAME = "Modern Webshop";

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDER_SUCCESS: '/order-success',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/login',
  REGISTER: '/register',
  ACCOUNT: '/account',
  FAQ: '/faq',
  BLOG: '/blog',
  BLOG_POST: '/blog/:id',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_OF_SERVICE: '/terms-of-service',
};

export const PLACEHOLDER_IMAGE_URL = (width: number, height: number) => `https://picsum.photos/${width}/${height}`;
export const LOREM_IPSUM_SHORT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
export const LOREM_IPSUM_MEDIUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
export const LOREM_IPSUM_LONG = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";


// SVG Icons
export const ShoppingCartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);

export const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

export const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

export const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export const XMarkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

export const StarIcon: React.FC<{ className?: string; filled?: boolean }> = ({ className, filled = true }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5} className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.82.61l-4.725-2.885a.563.563 0 00-.652 0l-4.725 2.885a.562.562 0 01-.82-.61l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.243.096 3.298.27m-3.298-.27L5.036 6.781a2.25 2.25 0 012.244-2.077h3.716a2.25 2.25 0 012.244 2.077L14.74 9m-4.788 0h4.788c.66 0 1.224.097 1.736.282m-1.736-.282S15 9 15 9m-4.788 0S9 9 9 9m10.232-4.472c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.243.096 3.298.27m-3.298-.27L5.036 6.781a2.25 2.25 0 012.244-2.077h3.716a2.25 2.25 0 012.244 2.077L14.74 9m-4.788 0h4.788c.66 0 1.224.097 1.736.282m-1.736-.282S15 9 15 9m-4.788 0S9 9 9 9" />
  </svg>
);

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Classic Tee', description: 'A comfortable and stylish classic t-shirt.', price: 29.99, imageUrl: PLACEHOLDER_IMAGE_URL(400,400), category: 'Apparel', stock: 100, rating: 4.5, reviews: 120, sku: 'TS001', options: [{name: 'Size', values: ['S', 'M', 'L', 'XL']}], longDescription: LOREM_IPSUM_LONG },
  { id: '2', name: 'Modern Hoodie', description: 'Warm and modern hoodie for all seasons.', price: 59.99, imageUrl: PLACEHOLDER_IMAGE_URL(400,401), category: 'Apparel', stock: 50, rating: 4.8, reviews: 90, sku: 'HD002', options: [{name: 'Size', values: ['M', 'L', 'XL']}, {name: 'Color', values: ['Black', 'Gray']}], longDescription: LOREM_IPSUM_LONG },
  { id: '3', name: 'Smart Watch', description: 'Stay connected with this amazing smart watch.', price: 199.99, imageUrl: PLACEHOLDER_IMAGE_URL(400,402), category: 'Electronics', stock: 30, rating: 4.2, reviews: 200, sku: 'SW003', longDescription: LOREM_IPSUM_LONG },
  { id: '4', name: 'Wireless Headphones', description: 'Immersive sound experience.', price: 99.99, imageUrl: PLACEHOLDER_IMAGE_URL(400,403), category: 'Electronics', stock: 75, rating: 4.6, reviews: 150, sku: 'HP004', longDescription: LOREM_IPSUM_LONG },
  { id: '5', name: 'Yoga Mat', description: 'Premium quality yoga mat.', price: 39.99, imageUrl: PLACEHOLDER_IMAGE_URL(400,404), category: 'Sports', stock: 120, rating: 4.9, reviews: 250, sku: 'YM005', longDescription: LOREM_IPSUM_LONG },
  { id: '6', name: 'Coffee Maker', description: 'Brew your perfect coffee every morning.', price: 79.99, imageUrl: PLACEHOLDER_IMAGE_URL(400,405), category: 'Home Goods', stock: 40, rating: 4.3, reviews: 80, sku: 'CM006', longDescription: LOREM_IPSUM_LONG },
];

export const MOCK_CATEGORIES: Category[] = [
  { id: 'apparel', name: 'Apparel', imageUrl: PLACEHOLDER_IMAGE_URL(300,200) },
  { id: 'electronics', name: 'Electronics', imageUrl: PLACEHOLDER_IMAGE_URL(300,201) },
  { id: 'sports', name: 'Sports', imageUrl: PLACEHOLDER_IMAGE_URL(300,202) },
  { id: 'home-goods', name: 'Home Goods', imageUrl: PLACEHOLDER_IMAGE_URL(300,203) },
  { id: 'books', name: 'Books', imageUrl: PLACEHOLDER_IMAGE_URL(300,204) },
];

export const MOCK_FAQS: FAQItem[] = [
  { id: '1', question: 'What are the shipping options?', answer: 'We offer standard and express shipping. Standard shipping takes 5-7 business days, and express shipping takes 2-3 business days.', category: 'Shipping' },
  { id: '2', question: 'What is your return policy?', answer: 'You can return items within 30 days of purchase for a full refund, provided they are in original condition.', category: 'Returns' },
  { id: '3', question: 'How can I track my order?', answer: 'Once your order is shipped, you will receive a tracking number via email.', category: 'Orders' },
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  { id: '1', title: 'The Future of E-commerce', date: '2024-07-15', author: 'Jane Doe', excerpt: 'Exploring upcoming trends in online shopping...', imageUrl: PLACEHOLDER_IMAGE_URL(600,400), category: 'Trends', content: LOREM_IPSUM_LONG },
  { id: '2', title: 'Top 5 Gadgets of The Year', date: '2024-07-10', author: 'John Smith', excerpt: 'A review of the must-have tech gadgets...', imageUrl: PLACEHOLDER_IMAGE_URL(600,401), category: 'Technology', content: LOREM_IPSUM_LONG },
];