// app/CartContext.tsx
import React, { createContext, useContext, useState } from 'react';

export type CartItem = {
  id: number;          // internal id for this line
  name: string;        // e.g. "6-pack of 8oz Basil Tea with Honey"
  price: number;       // FINAL price for that selection (e.g. 29.94)
  quantity: number;    // how many times this exact selection was added
  // optional metadata if you need it elsewhere
  size?: string;       // "8oz" | "12oz"
  packSize?: number;   // 1 | 6 | 12
};

type CartCtx = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => void;
  updateQuantity: (id: number, qty: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Merge by (name + price) so identical selections become one line
  const addToCart: CartCtx['addToCart'] = (incoming) => {
    setCart((prev) => {
      const qtyToAdd = incoming.quantity ?? 1;
      const idx = prev.findIndex(
        (i) => i.name === incoming.name && i.price === incoming.price
      );

      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qtyToAdd };
        return copy;
      }

      return [
        ...prev,
        {
          id: Date.now(),
          name: incoming.name,
          price: incoming.price,
          quantity: qtyToAdd,
          size: incoming.size,
          packSize: incoming.packSize,
        },
      ];
    });
  };

  const updateQuantity: CartCtx['updateQuantity'] = (id, qty) =>
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );

  const removeFromCart: CartCtx['removeFromCart'] = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const clearCart = () => setCart([]);

  return (
    <Ctx.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </Ctx.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
};
