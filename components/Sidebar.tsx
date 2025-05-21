
import React from 'react';
import { Link } from 'react-router-dom';
// Fix: Import Category from ../types, not ../constants
import { MOCK_CATEGORIES, PLACEHOLDER_IMAGE_URL, LOREM_IPSUM_SHORT } from '../constants'; // Using MOCK_CATEGORIES
import type { Category } from '../types';

interface SidebarProps {
  // Example filter properties, extend as needed
  categories?: Category[];
  currentCategory?: string;
  onCategorySelect?: (categoryId: string) => void;
  // Add more filter props like price range, brands etc.
}

const Sidebar: React.FC<SidebarProps> = ({
  categories = MOCK_CATEGORIES,
  currentCategory,
  onCategorySelect
}) => {
  return (
    <aside className="w-full md:w-64 lg:w-72 bg-white p-6 rounded-lg shadow-lg space-y-6">
      {/* Categories Filter */}
      {categories && categories.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-neutral-800 mb-3">Categories</h3>
          <ul className="space-y-2">
            {categories.map(category => (
              <li key={category.id}>
                <button
                  onClick={() => onCategorySelect && onCategorySelect(category.id)}
                  className={`block w-full text-left px-3 py-2 rounded-md transition-colors
                    ${currentCategory === category.id
                      ? 'bg-primary text-white font-medium'
                      : 'hover:bg-neutral-100 text-neutral-700'
                    }`}
                >
                  {category.name}
                </button>
              </li>
            ))}
             <li>
                <button
                  onClick={() => onCategorySelect && onCategorySelect('')} // Empty string for "All Categories"
                  className={`block w-full text-left px-3 py-2 rounded-md transition-colors
                    ${!currentCategory
                      ? 'bg-primary text-white font-medium'
                      : 'hover:bg-neutral-100 text-neutral-700'
                    }`}
                >
                  All Categories
                </button>
              </li>
          </ul>
        </div>
      )}

      {/* Price Range Filter (Placeholder) */}
      <div>
        <h3 className="text-xl font-semibold text-neutral-800 mb-3">Price Range</h3>
        <input type="range" min="0" max="1000" defaultValue="500" className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary" />
        <div className="flex justify-between text-sm text-neutral-600 mt-1">
          <span>$0</span>
          <span>$1000</span>
        </div>
      </div>

      {/* Promotional Banner (Placeholder) */}
      <div className="mt-6 border-t pt-6">
        <img src={PLACEHOLDER_IMAGE_URL(250,150)} alt="Promo Banner" className="rounded-md mb-2" />
        <h4 className="font-semibold text-neutral-700">Special Offer!</h4>
        <p className="text-sm text-neutral-600">{LOREM_IPSUM_SHORT.substring(0,50)}...</p>
        <Link to="products?promo=special" className="text-sm text-primary hover:underline font-medium mt-1 inline-block">
          Shop Now
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;