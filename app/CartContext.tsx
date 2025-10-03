'use client';

import React, { createContext, useContext, useMemo, useReducer } from 'react';

export type SizeKey = '8oz' | '12oz';

export type CartItem = {
  id: string;            // stable key (size-pack)
  size: SizeKey;
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
    case 'ADD': {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          items: state.items.map(i =>
            i.id === existing.id ? { ...i, qty: Math.min(99, i.qty + action.payload.qty) } : i
          ),
        };
      }
      return { items: [...state.items, action.payload] };
    }
    case 'UPDATE_QTY':
      return {
        items: state.items
          .map(i => (i.id === action.id ? { ...i, qty: Math.max(1, Math.min(99, action.qty)) } : i))
          .filter(i => i.qty > 0),
      };
    case 'REMOVE':
      return { items: state.items.filter(i => i.id !== action.id) };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

const CartCtx = createContext<{
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  subtotal: number;
} | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  // Rehydrate once on mount
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem('cart:v1');
      if (saved) {
        const items = JSON.parse(saved);
        if (Array.isArray(items)) {
          dispatch({ type: 'CLEAR' });
          for (const it of items) dispatch({ type: 'ADD', payload: it });
        }
      }
    } catch {}
  }, []);

  // Persist whenever items change
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('cart:v1', JSON.stringify(state.items));
    } catch {}
  }, [state.items]);

  const subtotal = useMemo(
    () => state.items.reduce((sum, i) => sum + i.unitPrice * i.qty, 0),
    [state.items]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      addItem: (item: CartItem) => dispatch({ type: 'ADD', payload: item }),
      updateQty: (id: string, qty: number) =>
        dispatch({ type: 'UPDATE_QTY', id, qty }),
      removeItem: (id: string) => dispatch({ type: 'REMOVE', id }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
      subtotal, // ✅ use your existing subtotal here
    }),
    [state.items, subtotal]
  );

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
