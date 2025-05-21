
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Button from '../components/Button';
import Breadcrumbs from '../components/Breadcrumbs';
import { ROUTES } from '../constants';
import { Address, CustomerDetails } from '../types';

const CheckoutPage: React.FC = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({ firstName: '', lastName: '', email: '', phone: '' });
  const [shippingAddress, setShippingAddress] = useState<Address>({ street: '', city: '', postalCode: '', country: '' });
  const [billingAddress, setBillingAddress] = useState<Address>({ street: '', city: '', postalCode: '', country: '' });
  const [useShippingForBilling, setUseShippingForBilling] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('creditCard'); // 'creditCard', 'paypal', 'cod'

  const subtotal = getCartTotal();
  const shippingCost = cartItems.length > 0 ? 5.00 : 0; // Example shipping
  const total = subtotal + shippingCost;

  const handleInputChange = <T,>(setter: React.Dispatch<React.SetStateAction<T>>, field: keyof T) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setter(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation (can be more thorough)
    if (!customerDetails.email || !shippingAddress.street) {
      alert("Please fill in all required fields.");
      return;
    }
    
    // Simulate order placement
    console.log("Order submitted:", {
      customerDetails,
      shippingAddress,
      billingAddress: useShippingForBilling ? shippingAddress : billingAddress,
      paymentMethod,
      cartItems,
      total,
    });
    
    clearCart();
    navigate(ROUTES.ORDER_SUCCESS);
  };

  if (cartItems.length === 0 && total === 0) { // Check total too, in case shipping is 0 for empty cart.
    navigate(ROUTES.CART); // Redirect to cart if empty
    return null;
  }
  
  const InputField: React.FC<{label: string, id: string, type?: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, required?: boolean, autoComplete?: string}> = 
    ({label, id, type="text", value, onChange, required=false, autoComplete}) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-neutral-700 mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
      <input type={type} id={id} name={id} value={value} onChange={onChange} required={required} autoComplete={autoComplete}
             className="w-full p-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm" />
    </div>
  );


  return (
    <div>
      <Breadcrumbs items={[{ name: 'Shopping Cart', path: ROUTES.CART }, { name: 'Checkout' }]} />
      <h1 className="text-3xl font-bold text-neutral-800 mb-8">Checkout</h1>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Customer & Shipping Info */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="First Name" id="firstName" value={customerDetails.firstName} onChange={handleInputChange(setCustomerDetails, 'firstName')} required autoComplete="given-name" />
              <InputField label="Last Name" id="lastName" value={customerDetails.lastName} onChange={handleInputChange(setCustomerDetails, 'lastName')} required autoComplete="family-name" />
              <InputField label="Email" id="email" type="email" value={customerDetails.email} onChange={handleInputChange(setCustomerDetails, 'email')} required autoComplete="email" />
              <InputField label="Phone" id="phone" type="tel" value={customerDetails.phone} onChange={handleInputChange(setCustomerDetails, 'phone')} required autoComplete="tel" />
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Shipping Address</h2>
            <div className="space-y-4">
              <InputField label="Street Address" id="shippingStreet" value={shippingAddress.street} onChange={handleInputChange(setShippingAddress, 'street')} required autoComplete="shipping street-address" />
              <InputField label="City" id="shippingCity" value={shippingAddress.city} onChange={handleInputChange(setShippingAddress, 'city')} required autoComplete="shipping address-level2" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Postal Code" id="shippingPostalCode" value={shippingAddress.postalCode} onChange={handleInputChange(setShippingAddress, 'postalCode')} required autoComplete="shipping postal-code" />
                <InputField label="Country" id="shippingCountry" value={shippingAddress.country} onChange={handleInputChange(setShippingAddress, 'country')} required autoComplete="shipping country-name" />
              </div>
            </div>
          </section>
          
          <section className="bg-white p-6 rounded-lg shadow-lg">
             <h2 className="text-xl font-semibold text-neutral-800 mb-4">Billing Address</h2>
            <div className="mb-4">
                <label className="flex items-center">
                    <input type="checkbox" checked={useShippingForBilling} onChange={(e) => setUseShippingForBilling(e.target.checked)} className="h-4 w-4 text-primary border-neutral-300 rounded focus:ring-primary"/>
                    <span className="ml-2 text-sm text-neutral-700">Same as shipping address</span>
                </label>
            </div>
            {!useShippingForBilling && (
                 <div className="space-y-4">
                    <InputField label="Street Address" id="billingStreet" value={billingAddress.street} onChange={handleInputChange(setBillingAddress, 'street')} required={!useShippingForBilling} autoComplete="billing street-address" />
                    <InputField label="City" id="billingCity" value={billingAddress.city} onChange={handleInputChange(setBillingAddress, 'city')} required={!useShippingForBilling} autoComplete="billing address-level2" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="Postal Code" id="billingPostalCode" value={billingAddress.postalCode} onChange={handleInputChange(setBillingAddress, 'postalCode')} required={!useShippingForBilling} autoComplete="billing postal-code" />
                        <InputField label="Country" id="billingCountry" value={billingAddress.country} onChange={handleInputChange(setBillingAddress, 'country')} required={!useShippingForBilling} autoComplete="billing country-name" />
                    </div>
                </div>
            )}
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Payment Method</h2>
            <div className="space-y-3">
              {/* Simplified Payment Options - In real app, use Stripe Elements or similar */}
              <div className={`p-3 border rounded-md cursor-pointer ${paymentMethod === 'creditCard' ? 'border-primary bg-primary-light/20' : 'border-neutral-300'}`} onClick={() => setPaymentMethod('creditCard')}>
                <label className="flex items-center">
                  <input type="radio" name="paymentMethod" value="creditCard" checked={paymentMethod === 'creditCard'} onChange={() => {}} className="h-4 w-4 text-primary border-neutral-300 focus:ring-primary mr-2"/>
                  Credit Card
                </label>
                {paymentMethod === 'creditCard' && (
                  <div className="mt-3 space-y-3 pl-6">
                    <InputField label="Card Number" id="cardNumber" autoComplete="cc-number" value="" onChange={()=>{/* Implement state */}}/>
                    <div className="grid grid-cols-2 gap-3">
                      <InputField label="Expiry Date (MM/YY)" id="cardExpiry" autoComplete="cc-exp" value="" onChange={()=>{/* Implement state */}}/>
                      <InputField label="CVV" id="cardCvv" autoComplete="cc-csc" value="" onChange={()=>{/* Implement state */}}/>
                    </div>
                  </div>
                )}
              </div>
              <div className={`p-3 border rounded-md cursor-pointer ${paymentMethod === 'paypal' ? 'border-primary bg-primary-light/20' : 'border-neutral-300'}`} onClick={() => setPaymentMethod('paypal')}>
                 <label className="flex items-center">
                  <input type="radio" name="paymentMethod" value="paypal" checked={paymentMethod === 'paypal'} onChange={() => {}} className="h-4 w-4 text-primary border-neutral-300 focus:ring-primary mr-2"/>
                  PayPal
                </label>
              </div>
               <div className={`p-3 border rounded-md cursor-pointer ${paymentMethod === 'cod' ? 'border-primary bg-primary-light/20' : 'border-neutral-300'}`} onClick={() => setPaymentMethod('cod')}>
                 <label className="flex items-center">
                  <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={() => {}} className="h-4 w-4 text-primary border-neutral-300 focus:ring-primary mr-2"/>
                  Cash on Delivery
                </label>
              </div>
            </div>
          </section>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 bg-neutral-50 p-6 rounded-lg shadow-lg h-fit sticky top-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4 border-b pb-2">Order Review</h2>
          <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
            {cartItems.map(item => (
              <div key={item.product.id + JSON.stringify(item.selectedOptions)} className="flex justify-between items-start text-sm">
                <div className="flex-grow">
                  <span className="font-medium">{item.product.name}</span> (x{item.quantity})
                  {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                    <p className="text-xs text-neutral-500 pl-2">
                      {Object.entries(item.selectedOptions).map(([key, value]) => `${key}: ${value}`).join(', ')}
                    </p>
                  )}
                </div>
                <span className="text-neutral-600">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2 border-t pt-3">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-neutral-800 mt-2 pt-2 border-t">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Button type="submit" variant="primary" size="lg" className="w-full mt-6">
            Confirm Order
          </Button>
          <Link to={ROUTES.CART} className="block mt-3 text-center">
            <Button variant="outline" className="w-full">Return to Cart</Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
