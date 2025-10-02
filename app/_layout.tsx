'use client';

import React from 'react';
import { Stack, Link } from 'expo-router';
import { View, Text, StyleSheet, Platform } from 'react-native';
// If you have a CartProvider, keep it. Otherwise remove the two Cart lines.
import { CartProvider, useCart } from './CartContext';

const FOOTER_HEIGHT = 64;

export default function RootLayout() {
  return (
    <CartProvider>
      <View style={{ flex: 1, backgroundColor: '#fdf6ec' }}>
        {/* This wrapper gives every screen bottom padding so the fixed footer never covers content */}
        <View style={{ flex: 1, paddingBottom: FOOTER_HEIGHT + 12 }}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>
        <StickyFooter />
      </View>
    </CartProvider>
  );
}

function StickyFooter() {
  const { item } = useCart?.() || { item: null as any };
  const cartCount = item?.qty ?? 0;

  return (
    <View
      style={[
        styles.footer,
        Platform.select({
          web: { position: 'fixed' as const },
          default: { position: 'absolute' as const },
        }),
      ]}
    >
      <FooterLink href="/">Home</FooterLink>
      <FooterLink href="/shop">Shop</FooterLink>
      <FooterLink href="/faqs">FAQs</FooterLink>
      <FooterLink href="/story">Our Story</FooterLink>
      <FooterLink href="/contact">Contact</FooterLink>
      <FooterLink href="/cart">{cartCount > 0 ? `Cart (${cartCount})` : 'Cart'}</FooterLink>
    </View>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} asChild>
      <Text style={styles.link}>{children}</Text>
    </Link>
  );
}

const styles = StyleSheet.create({
  footer: {
    left: 0, right: 0, bottom: 0,
    height: FOOTER_HEIGHT,
    backgroundColor: '#fdf6ec',           // cream like Home
    borderTopWidth: 1,
    borderTopColor: '#eadccf',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 1000,
  },
  link: {
    color: '#0b3d2e',                     // deep green like Home
    fontSize: 14,
    fontWeight: '700',
  },
});
