
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, selectedOptions?: { [key: string]: string }) => void;
  removeFromCart: (productId: string, selectedOptions?: { [key: string]: string }) => void;
  updateQuantity: (productId: string, quantity: number, selectedOptions?: { [key: string]: string }) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const localData = localStorage.getItem('cartItems');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const getItemIndex = useCallback((productId: string, selectedOptions?: { [key: string]: string }): number => {
    return cartItems.findIndex(item => {
      const optionsMatch = selectedOptions 
        ? JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
        : true; // If no options provided for search, or item has no options, consider it a match for product ID only
      return item.product.id === productId && optionsMatch;
    });
  }, [cartItems]);

  const addToCart = useCallback((product: Product, quantity: number, selectedOptions?: { [key: string]: string }) => {
    setCartItems(prevItems => {
      const itemIndex = getItemIndex(product.id, selectedOptions);
      if (itemIndex > -1) {
        const newItems = [...prevItems];
        newItems[itemIndex].quantity += quantity;
        return newItems;
      } else {
        return [...prevItems, { product, quantity, selectedOptions }];
      }
    });
  }, [getItemIndex]);

  const removeFromCart = useCallback((productId: string, selectedOptions?: { [key: string]: string }) => {
    setCartItems(prevItems => prevItems.filter(item => {
       const optionsMatch = selectedOptions 
        ? JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
        : true;
      return !(item.product.id === productId && optionsMatch);
    }));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number, selectedOptions?: { [key: string]: string }) => {
    setCartItems(prevItems => {
      const itemIndex = getItemIndex(productId, selectedOptions);
      if (itemIndex > -1) {
        const newItems = [...prevItems];
        if (quantity <= 0) {
          newItems.splice(itemIndex, 1); // Remove item if quantity is 0 or less
        } else {
          newItems[itemIndex].quantity = quantity;
        }
        return newItems;
      }
      return prevItems;
    });
  }, [getItemIndex]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getCartTotal = useCallback((): number => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const getCartItemCount = useCallback((): number => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};
