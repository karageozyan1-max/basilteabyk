// app/_layout.tsx
'use client';

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Stack, useRouter, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CartProvider } from './CartContext';

const BG_CREAM = '#fdf6ec';
const GREEN = '#0b3d2e';
const BORDER = '#d9d9d9';

// Compact footer item (always fits 5 across; very small padding)
function FooterItem({ label, href }: { label: string; href: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <TouchableOpacity
      onPress={() => router.push(href)}
      style={{
        flexBasis: '20%',   // 5 items == 20% each
        alignItems: 'center',
        paddingVertical: 2, // tighter
      }}
      accessibilityRole="button"
    >
      <Text
        style={{
          fontSize: 12.5,                 // compact
          fontWeight: active ? '800' : '700',
          color: active ? GREEN : '#666',
        }}
        numberOfLines={1}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function Layout() {
  return (
    <CartProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: BG_CREAM }}>
        <Stack screenOptions={{ headerShown: false }} />

        {/* Compact sticky footer */}
<View
  style={{
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 55,
    backgroundColor: BG_CREAM,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingHorizontal: 6,
  }}
>
  <View
    style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 22,  // more space between bold items
    }}
  >
    <FooterItem label="Home" href="/" style={{ fontWeight: '700', fontSize: 16, color: GREEN }} />
    <FooterItem label="Shop" href="/shop" style={{ fontWeight: '700', fontSize: 16, color: GREEN }} />
    <FooterItem label="FAQs" href="/faq" style={{ fontWeight: '700', fontSize: 16, color: GREEN }} />
    <FooterItem label="Our Story" href="/story" style={{ fontWeight: '700', fontSize: 16, color: GREEN }} />
    <FooterItem label="Contact" href="/contact" style={{ fontWeight: '700', fontSize: 16, color: GREEN }} />
  </View>
</View>
      </SafeAreaView>
    </CartProvider>
  );
}
