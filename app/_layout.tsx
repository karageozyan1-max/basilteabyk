// app/_layout.tsx
'use client';

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Stack, useRouter, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CartProvider } from './CartContext'; // ✅ add cart provider

// Colors + Footer height
const BG_CREAM = '#fdf6ec';
const GREEN = '#004d25';
const BORDER = '#d9d9d9';
const FOOTER_H = 58;

// Footer nav item component
function NavItem({ label, href }: { label: string; href: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <TouchableOpacity onPress={() => router.push(href)} style={{ paddingHorizontal: 6 }}>
      <Text
        style={{
          color: active ? GREEN : '#666',
          fontWeight: active ? '800' : '700',
          fontSize: 14,
        }}
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

        {/* Footer */}
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: FOOTER_H,
            backgroundColor: BG_CREAM,
            borderTopWidth: 1,
            borderTopColor: BORDER,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingHorizontal: 8,
            paddingVertical: 6,
          }}
        >
          <NavItem label="Home" href="/" />
          <NavItem label="Shop" href="/shop" />
          <NavItem label="FAQs" href="/faq" />
          <NavItem label="Our Story" href="/story" />
          <NavItem label="Contact" href="/contact" />
        </View>
      </SafeAreaView>
    </CartProvider>
  );
}
