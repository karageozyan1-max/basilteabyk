import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Slot, Link } from 'expo-router';

const BG_CREAM = '#fdfcf5';
const GREEN = '#0b3d2e';
const BORDER = '#e4dccf';

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_CREAM }}>
      {/* Main content (pages render here) */}
      <View style={{ flex: 1 }}>
        <Slot />
      </View>

      {/* Footer */}
      <View
        style={{
          height: 50,
          backgroundColor: BG_CREAM,
          borderTopWidth: 1,
          borderTopColor: BORDER,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Link href="/" style={{ fontWeight: '800', fontSize: 18, color: GREEN }}>Home</Link>
        <Link href="/shop" style={{ fontWeight: '800', fontSize: 18, color: GREEN }}>Shop</Link>
        <Link href="/faq" style={{ fontWeight: '800', fontSize: 18, color: GREEN }}>FAQs</Link>
        <Link href="/story" style={{ fontWeight: '800', fontSize: 18, color: GREEN }}>Our Story</Link>
        <Link href="/contact" style={{ fontWeight: '800', fontSize: 18, color: GREEN }}>Contact</Link>
      </View>
    </SafeAreaView>
  );
}
