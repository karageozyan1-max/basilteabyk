import React, { createContext, useContext, useState } from 'react';

type CartItem = { id: number; name: string; size: '8oz' | '12oz'; packSize: number; price: number; quantity: number; };
type CartCtx = {
  cartItems: CartItem[];
  addToCart: (i: CartItem) => void;
  updateQuantity: (id: number, q: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const addToCart = (i: CartItem) => setCartItems(p => [...p, i]);
  const updateQuantity = (id: number, q: number) =>
    setCartItems(items => q === 0 ? items.filter(x => x.id !== id) : items.map(x => x.id === id ? { ...x, quantity: q } : x));
  const removeFromCart = (id: number) => setCartItems(items => items.filter(x => x.id !== id));
  const clearCart = () => setCartItems([]);
  return <Ctx.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}>{children}</Ctx.Provider>;
};

export const useCart = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error('useCart must be used inside <CartProvider>');
  return v;
};
