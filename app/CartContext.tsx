'use client';

import React, { createContext, useContext, useState } from 'react';

type SizeKey = '8oz' | '12oz';
type CartItem = { size: SizeKey; pack: number; qty: number } | null;

type CartCtx = {
  item: CartItem;
  setItem: (v: CartItem) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [item, setItem] = useState<CartItem>(null);
  return (
    <Ctx.Provider value={{ item, setItem, clear: () => setItem(null) }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useCart must be used within CartProvider');
  return v;
}
