// app/_layout.tsx
import React from 'react';
import { View } from 'react-native';
import { Slot, Link } from 'expo-router';

const BG_CREAM = '#fdf6ec';
const BORDER   = '#eadccf';
const GREEN    = '#0b3d2e';
const FOOTER_H = 48; // footer height

export default function Layout() {
  return (
    <View style={{ flex: 1, backgroundColor: BG_CREAM }}>
      {/* Main content gets bottom padding so it can scroll past the sticky footer */}
      <View
        style={{
          flex: 1,
          paddingBottom: FOOTER_H + 12, // <-- space so footer never covers content
          minHeight: '100%',
          // On web, ensure scrolling is allowed even if a child sets flex:
          overflow: 'auto',
        }}
      >
        <Slot />
      </View>

      {/* Sticky footer (does not block scroll/taps outside the links) */}
      <View
        pointerEvents="box-none" // let scroll/taps pass through the empty areas
        style={{
          position: 'fixed', // bulletproof on web; stays pinned
          left: 0,
          right: 0,
          bottom: 0,
          height: FOOTER_H,
          zIndex: 10,
        }}
      >
        <View
          pointerEvents="auto" // only the row handles touches
          style={{
            height: '100%',
            backgroundColor: BG_CREAM,
            borderTopWidth: 1,
            borderTopColor: BORDER,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingHorizontal: 8,
          }}
        >
          <Link href="/"        style={{ fontWeight: '800', fontSize: 16, color: GREEN }}>Home</Link>
          <Link href="/shop"    style={{ fontWeight: '800', fontSize: 16, color: GREEN }}>Shop</Link>
          <Link href="/faq"     style={{ fontWeight: '800', fontSize: 16, color: GREEN }}>FAQs</Link>
          <Link href="/story"   style={{ fontWeight: '800', fontSize: 16, color: GREEN }}>Our Story</Link>
          <Link href="/contact" style={{ fontWeight: '800', fontSize: 16, color: GREEN }}>Contact</Link>
        </View>
      </View>
    </View>
  );
}
