// app/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';
import { CartProvider } from './CartContext'; // <= this is the key

export default function Layout() {
  return (
    <CartProvider>
      <Stack screenOptions={{ headerTitleAlign: 'center' }} />
    </CartProvider>
  );
}
