
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, PLACEHOLDER_IMAGE_URL, LOREM_IPSUM_MEDIUM, ROUTES } from '../constants';

const HomePage: React.FC = () => {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4); // Show first 4 as featured
  const categories = MOCK_CATEGORIES.slice(0, 4);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center rounded-lg shadow-lg overflow-hidden text-white py-20 px-6 md:py-32 md:px-10"
        style={{ backgroundImage: `url(${PLACEHOLDER_IMAGE_URL(1200, 600)})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Discover Your Next Favorite
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            {LOREM_IPSUM_MEDIUM}
          </p>
          <Link to={ROUTES.PRODUCTS}>
            <Button size="lg" variant="primary">Shop Now</Button>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-3xl font-semibold text-neutral-800 mb-6 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
            <Link to={ROUTES.PRODUCTS}>
                <Button variant="outline">View All Products</Button>
            </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-3xl font-semibold text-neutral-800 mb-6 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <Link 
              key={category.id} 
              to={`${ROUTES.PRODUCTS}?category=${category.id}`}
              className="block group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img 
                src={category.imageUrl || PLACEHOLDER_IMAGE_URL(300,200)} 
                alt={category.name} 
                className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity duration-300"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-neutral-700 group-hover:text-primary transition-colors duration-300">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Promotional Banner Section */}
      <section className="bg-primary-light text-primary-dark p-8 md:p-12 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-3xl font-bold mb-2">Summer Sale On Now!</h2>
          <p className="text-lg">Get up to 50% off on selected items. Don't miss out!</p>
        </div>
        <Link to={`${ROUTES.PRODUCTS}?sale=summer`}>
          <Button variant="secondary" size="lg">Shop Sale</Button>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
