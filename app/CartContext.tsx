import React, { createContext, useContext, useState } from 'react';

export type CartItem = {
  id: number;
  name: string;
  size: '8oz' | '12oz';
  packSize: number;
  price: number;      // dollars, e.g. 4.99
  quantity: number;
};

type CartCtx = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, qty: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => setCartItems(prev => [...prev, item]);

  const updateQuantity = (id: number, qty: number) =>
    setCartItems(items =>
      qty === 0
        ? items.filter(i => i.id !== id)
        : items.map(i => (i.id === id ? { ...i, quantity: qty } : i))
    );

  const removeFromCart = (id: number) =>
    setCartItems(items => items.filter(i => i.id !== id));

  const clearCart = () => setCartItems([]);

  return (
    <Ctx.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </Ctx.Provider>
  );
};

export const useCart = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error('useCart must be used inside <CartProvider>');
  return v;
};
