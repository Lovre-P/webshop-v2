
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import { ROUTES, PLACEHOLDER_IMAGE_URL } from '../constants';

const OrderSuccessPage: React.FC = () => {
  const location = useLocation();
  // const orderDetails = location.state?.orderDetails; // If you pass order details via state

  useEffect(() => {
    // Typically, you might fetch fresh order details here if needed or rely on passed state.
    // For this example, we'll keep it simple.
  }, []);

  return (
    <div className="text-center py-12 bg-white p-8 rounded-lg shadow-xl max-w-2xl mx-auto">
      <img src={PLACEHOLDER_IMAGE_URL(200,180)} alt="Order success" className="mx-auto h-40 mb-6 rounded-full"/>
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Thank You For Your Order!</h1>
      <p className="text-neutral-700 text-lg mb-3">
        Your order has been placed successfully.
      </p>
      <p className="text-neutral-600 mb-6">
        You will receive an email confirmation shortly with your order details and tracking information (Order ID: #{(Math.random()*100000).toFixed(0)}).
      </p>
      {/* {orderDetails && (
        <div className="text-left bg-neutral-100 p-4 rounded-md mb-6 text-sm">
          <h3 className="font-semibold mb-2">Order Summary:</h3>
          <p><strong>Order ID:</strong> {orderDetails.id}</p>
          <p><strong>Total:</strong> ${orderDetails.totalAmount.toFixed(2)}</p>
          <p><strong>Estimated Delivery:</strong> {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
        </div>
      )} */}
      <div className="space-y-3 sm:space-y-0 sm:flex sm:justify-center sm:space-x-4">
        <Link to={ROUTES.PRODUCTS}>
          <Button variant="primary" size="lg">Continue Shopping</Button>
        </Link>
        <Link to={ROUTES.ACCOUNT}> {/* Assuming an account page exists */}
          <Button variant="outline" size="lg">View My Orders</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
