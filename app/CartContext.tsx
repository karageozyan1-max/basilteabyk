'use client';

import React, { createContext, useContext, useReducer, useMemo, useEffect } from 'react';

export type CartItem = {
  id: string;       // stable key
  sizeKey: string;
  pack: number;
  qty: number;
  unitPrice: number;
};

type State = { items: CartItem[] };

type Action =
  | { type: 'ADD'; payload: CartItem }
  | { type: 'UPDATE_QTY'; id: string; qty: number }
  | { type: 'REMOVE'; id: string }
  | { type: 'CLEAR' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD':
      return {
        items: state.items.find(i => i.id === action.payload.id)
          ? state.items.map(i => i.id === action.payload.id ? action.payload : i)
          : [...state.items, action.payload],
      };
    case 'UPDATE_QTY':
      return {
        items: state.items.map(i => i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i),
      };
    case 'REMOVE':
      return { items: state.items.filter(i => i.id !== action.id) };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

const CartCtx = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
const [state, dispatch] = useReducer(reducer, { items: [] }, (init) => {
  if (typeof window === "undefined") return init;
  try {
    const stored = window.localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : init;
  } catch {
    return init;
  }
});
  
 useEffect(() => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem("cart", JSON.stringify(state));
  } catch {}
}, [state]);

  const subtotal = useMemo(
    () => state.items.reduce((sum, i) => sum + i.unitPrice * i.pack * i.qty, 0),
    [state.items]
  );

  const value = useMemo(() => ({
    items: state.items,
    addItem: (item: CartItem) => dispatch({ type: 'ADD', payload: item }),
    updateQty: (id: string, qty: number) => dispatch({ type: 'UPDATE_QTY', id, qty }),
    removeItem: (id: string) => dispatch({ type: 'REMOVE', id }),
    clearCart: () => dispatch({ type: 'CLEAR' }),
    subtotal,
  }), [state.items, subtotal]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
