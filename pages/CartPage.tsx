
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Button from '../components/Button';
import Breadcrumbs from '../components/Breadcrumbs';
import { ROUTES, TrashIcon, PLACEHOLDER_IMAGE_URL } from '../constants';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number, selectedOptions?: { [key: string]: string }) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity, selectedOptions);
    } else if (newQuantity === 0) {
      removeFromCart(productId, selectedOptions);
    }
  };
  
  const subtotal = getCartTotal();
  const shippingCost = cartItems.length > 0 ? 5.00 : 0; // Example shipping
  const total = subtotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <img src={PLACEHOLDER_IMAGE_URL(300,200)} alt="Empty cart" className="mx-auto h-48 mb-6 rounded-lg" />
        <h1 className="text-3xl font-semibold text-neutral-800 mb-4">Your Cart is Empty</h1>
        <p className="text-neutral-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link to={ROUTES.PRODUCTS}>
          <Button variant="primary" size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs items={[{ name: 'Shopping Cart' }]} />
      <h1 className="text-3xl font-bold text-neutral-800 mb-8">My Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <div className="space-y-6">
            {cartItems.map(item => (
              <div key={item.product.id + JSON.stringify(item.selectedOptions)} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-neutral-200 pb-6 last:border-b-0 last:pb-0">
                <img src={item.product.imageUrl} alt={item.product.name} className="w-24 h-24 object-cover rounded-md shadow"/>
                <div className="flex-grow">
                  <Link to={`/products/${item.product.id}`} className="text-lg font-semibold text-neutral-800 hover:text-primary transition-colors">
                    {item.product.name}
                  </Link>
                  {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                    <p className="text-sm text-neutral-500">
                      {Object.entries(item.selectedOptions).map(([key, value]) => `${key}: ${value}`).join(', ')}
                    </p>
                  )}
                  <p className="text-sm text-neutral-600 mt-1">Unit Price: ${item.product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-3 mt-2 sm:mt-0">
                  <div className="flex items-center border border-neutral-300 rounded-md">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1, item.selectedOptions)}
                        className="!px-2 !py-1 !rounded-r-none !border-r border-neutral-300"
                    >
                        -
                    </Button>
                    <input 
                        type="number" 
                        value={item.quantity} 
                        readOnly
                        className="w-10 text-center focus:outline-none text-xs"
                    />
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1, item.selectedOptions)}
                        className="!px-2 !py-1 !rounded-l-none !border-l border-neutral-300"
                    >
                        +
                    </Button>
                  </div>
                  <p className="text-md font-semibold text-neutral-700 w-20 text-right">${(item.product.price * item.quantity).toFixed(2)}</p>
                  <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.product.id, item.selectedOptions)} className="text-red-500 hover:text-red-700 !p-1">
                    <TrashIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <Button variant="danger" onClick={clearCart} size="sm">Clear Cart</Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 bg-neutral-50 p-6 rounded-lg shadow-lg h-fit sticky top-24">
          <h2 className="text-2xl font-semibold text-neutral-800 mb-6 border-b pb-3">Order Summary</h2>
          <div className="space-y-3 text-neutral-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="mb-4">
                <label htmlFor="coupon" className="block text-sm font-medium text-neutral-600 mb-1">Coupon Code</label>
                <div className="flex">
                    <input type="text" id="coupon" name="coupon" placeholder="Enter coupon" className="flex-grow p-2 border border-neutral-300 rounded-l-md focus:ring-primary focus:border-primary text-sm"/>
                    <Button variant="outline" className="!rounded-l-none !px-3" size="sm">Apply</Button>
                </div>
            </div>
            <div className="flex justify-between text-xl font-bold text-neutral-800 border-t pt-3 mt-3">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Link to={ROUTES.CHECKOUT} className="block mt-6">
            <Button variant="primary" size="lg" className="w-full">Proceed to Checkout</Button>
          </Link>
          <Link to={ROUTES.PRODUCTS} className="block mt-3 text-center">
            <Button variant="outline" className="w-full" size="md">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
