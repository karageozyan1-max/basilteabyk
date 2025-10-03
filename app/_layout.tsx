// app/_layout.tsx
'use client';

import React from 'react';
import { View } from 'react-native';
import { Stack, Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

// ---- Theme colors
const BG_CREAM = '#f4f0e6';
const GREEN    = '#0b3d2e';
const BORDER   = '#e4dccf';

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_CREAM }}>
      {/* Render all pages here */}
      <Stack screenOptions={{ headerShown: false }} />

      {/* Sticky footer */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 40,
          backgroundColor: BG_CREAM,
          borderTopWidth: 1,
          borderTopColor: BORDER,
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingHorizontal: 6,
            gap: 8,
          }}
        >
          <Link href="/" style={{ fontWeight: '800', fontSize: 18, color: GREEN }}>Home</Link>
          <Link href="/shop" style={{ fontWeight: '800', fontSize: 18, color: GREEN }}>Shop</Link>
          <Link href="/faq" style={{ fontWeight: '800', fontSize: 18, color: GREEN }}>FAQs</Link>
          <Link href="/story" style={{ fontWeight: '800', fontSize: 18, color: GREEN }}>Our Story</Link>
          <Link href="/contact" style={{ fontWeight: '800', fontSize: 18, color: GREEN }}>Contact</Link>
          {/* Cart is not in the footer since you already have it in the header */}
        </View>
      </View>
    </SafeAreaView>
  );
}
