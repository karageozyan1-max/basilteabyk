// app/_layout.tsx
import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Slot, Link } from 'expo-router';

const BG_CREAM = '#fdf6ec';
const BORDER   = '#eadccf';
const GREEN    = '#0b3d2e';
const FOOTER_H = 48; // <= footer height

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_CREAM }}>
      {/* Give pages bottom padding so they don't sit under the footer */}
      <View style={{ flex: 1, paddingBottom: FOOTER_H + 8 }}>
        <Slot />
      </View>

      {/* Sticky footer */}
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
          zIndex: 10,
        }}
      >
        <Link href="/"        style={{ fontWeight: '800', fontSize: 16, color: GREEN }}>Home</Link>
        <Link href="/shop"    style={{ fontWeight: '800', fontSize: 16, color: GREEN }}>Shop</Link>
        <Link href="/faq"     style={{ fontWeight: '800', fontSize: 16, color: GREEN }}>FAQs</Link>
        <Link href="/story"   style={{ fontWeight: '800', fontSize: 16, color: GREEN }}>Our Story</Link>
        <Link href="/contact" style={{ fontWeight: '800', fontSize: 16, color: GREEN }}>Contact</Link>
      </View>
    </SafeAreaView>
  );
}
