'use client';

import React from 'react';
import { Stack } from 'expo-router';
import { CartProvider } from './CartContext';

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </CartProvider>
  );
}
