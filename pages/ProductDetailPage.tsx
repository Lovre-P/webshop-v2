
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS, StarIcon, PLACEHOLDER_IMAGE_URL, LOREM_IPSUM_SHORT, LOREM_IPSUM_LONG } from '../constants';
import Notification from '../components/Notification';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
  const [mainImage, setMainImage] = useState<string>('');
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);


  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const foundProduct = MOCK_PRODUCTS.find(p => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        setMainImage(foundProduct.imageUrl);
        // Initialize selectedOptions
        if (foundProduct.options) {
          const initialOptions: { [key: string]: string } = {};
          foundProduct.options.forEach(opt => {
            if (opt.values.length > 0) {
              initialOptions[opt.name] = opt.values[0];
            }
          });
          setSelectedOptions(initialOptions);
        }
      } else {
        // Handle product not found, e.g., navigate to 404
        navigate('/404', { replace: true });
      }
      setIsLoading(false);
    }, 500);
  }, [productId, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedOptions);
      setNotification({message: `${product.name} added to cart!`, type: 'success'});
    }
  };

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }));
  };

  const renderStars = (rating?: number) => {
    if (typeof rating !== 'number') return <span className="text-sm text-neutral-500">No reviews yet</span>;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<StarIcon key={i} className={`w-6 h-6 ${i <= rating ? 'text-yellow-400' : 'text-neutral-300'}`} filled={i <= rating} />);
    }
    return <div className="flex items-center">{stars} <span className="ml-2 text-sm text-neutral-600">({product?.reviews || 0} reviews)</span></div>;
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[60vh]"><Spinner size="lg" /></div>;
  }

  if (!product) {
    return <div className="text-center py-10 text-xl text-neutral-700">Product not found.</div>;
  }

  const relatedProducts = MOCK_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const breadcrumbItems = [
    { name: 'Products', path: 'products' },
    { name: product.category, path: `products?category=${product.category.toLowerCase().replace(' ', '-')}`},
    { name: product.name }
  ];

  return (
    <div className="space-y-10">
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      <Breadcrumbs items={breadcrumbItems} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 bg-white p-6 md:p-8 rounded-lg shadow-xl">
        {/* Product Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden shadow">
             <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {/* Thumbnails (simplified - could be multiple images) */}
          <div className="grid grid-cols-4 gap-2">
            {[product.imageUrl, PLACEHOLDER_IMAGE_URL(100,100), PLACEHOLDER_IMAGE_URL(100,101), PLACEHOLDER_IMAGE_URL(100,102)].slice(0,4).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImage(img)}
                className={`aspect-square rounded-md overflow-hidden border-2 ${mainImage === img ? 'border-primary' : 'border-transparent'} hover:border-primary transition`}
              >
                <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800">{product.name}</h1>
          <div className="flex items-center space-x-4">
            {renderStars(product.rating)}
          </div>
          <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
          <p className="text-neutral-600 leading-relaxed">{product.description}</p>

          {/* Options */}
          {product.options && product.options.map(option => (
            <div key={option.name} className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">{option.name}:</label>
              <div className="flex flex-wrap gap-2">
                {option.values.map(value => (
                  <Button
                    key={value}
                    variant={selectedOptions[option.name] === value ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleOptionChange(option.name, value)}
                    className="!px-3 !py-1.5"
                  >
                    {value}
                  </Button>
                ))}
              </div>
            </div>
          ))}

          {/* Quantity & Add to Cart */}
          <div className="flex items-center space-x-4 pt-2">
            <div className="flex items-center border border-neutral-300 rounded-md">
              <Button variant="ghost" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="!px-3 !rounded-r-none !border-r border-neutral-300">-</Button>
              <input
                type="number"
                value={quantity}
                readOnly
                className="w-12 text-center focus:outline-none text-sm"
              />
              <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)} className="!px-3 !rounded-l-none !border-l border-neutral-300">+</Button>
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              size="lg"
              className="flex-grow"
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
          <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `${product.stock} items in stock` : 'Currently out of stock'}
          </p>
           <p className="text-sm text-neutral-500">SKU: {product.sku || 'N/A'}</p>
        </div>
      </div>

      {/* Product Details/Specifications & Reviews Tabs */}
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl">
        {/* Basic Tabs (can be improved with state for active tab) */}
        <div className="border-b border-neutral-200 mb-6">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {/* For simplicity, only showing description. Add more tabs as needed. */}
                <a href="#" className="border-primary text-primary whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                Description
                </a>
                <a href="#" className="border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                Specifications
                </a>
                <a href="#" className="border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                Reviews ({product.reviews || 0})
                </a>
            </nav>
        </div>
        <div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-3">Full Description</h3>
            <article className="prose prose-sm max-w-none text-neutral-600 leading-relaxed">
                {product.longDescription || LOREM_IPSUM_LONG}
            </article>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-neutral-800 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
