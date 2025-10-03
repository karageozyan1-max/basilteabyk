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

// One footer button (kept small so 5 items fit; wraps on tiny phones)
function FooterItem({ label, href }: { label: string; href: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <TouchableOpacity
      onPress={() => router.push(href)}
      style={{
        flexBasis: '20%',     // 5 items = 20% each
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 4,
      }}
      accessibilityRole="button"
    >
      <Text
        style={{
          fontSize: 13,
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
        {/* Your pages */}
        <Stack screenOptions={{ headerShown: false }} />

        {/* Sticky footer */}
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: BG_CREAM,
            borderTopWidth: 1,
            borderTopColor: BORDER,
            paddingHorizontal: 6,
            paddingVertical: 6,   // compact so it doesn’t eat space
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',     // <-- allows wrap on the smallest phones
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <FooterItem label="Home" href="/" />
            <FooterItem label="Shop" href="/shop" />
            <FooterItem label="FAQs" href="/faq" />
            <FooterItem label="Our Story" href="/story" />
            <FooterItem label="Contact" href="/contact" />
          </View>
        </View>
      </SafeAreaView>
    </CartProvider>
  );
}
