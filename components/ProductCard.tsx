
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import Button from './Button';
import { StarIcon } from '../constants'; // Assuming StarIcon is in constants

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // For simplicity, assuming no options selected from card view
    addToCart(product, 1);
    // TODO: Add notification "Product added to cart"
    alert(`${product.name} added to cart!`);
  };
  
  const renderStars = (rating?: number) => {
    if (typeof rating !== 'number') return null;
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={`full-${i}`} className="w-5 h-5 text-yellow-400" filled />);
    }
    if (halfStar) { // Simplified: just show full or empty for now from card.
      // stars.push(<StarHalfIcon key="half" className="w-5 h-5 text-yellow-400" />);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarIcon key={`empty-${i}`} className="w-5 h-5 text-gray-300" filled={false} />);
    }
    return <div className="flex items-center">{stars} <span className="ml-1 text-sm text-neutral-500">({product.reviews || 0})</span></div>;
  };


  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col">
      <Link to={`/products/${product.id}`} className="block">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-56 object-cover" 
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="text-lg font-semibold text-neutral-800 hover:text-primary transition-colors mb-1 truncate">{product.name}</h3>
        </Link>
        <p className="text-sm text-neutral-600 mb-2 flex-grow">{product.description}</p>
        
        {product.rating && (
          <div className="mb-2">
            {renderStars(product.rating)}
          </div>
        )}

        <div className="flex items-center justify-between mb-3">
            <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
            {product.stock > 0 ? (
                 <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">In Stock</span>
            ) : (
                <span className="text-xs font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Out of Stock</span>
            )}
        </div>
        
        <Button 
            onClick={handleAddToCart} 
            disabled={product.stock <= 0}
            className="w-full mt-auto"
            variant="primary"
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
