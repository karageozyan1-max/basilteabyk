import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';

const BG_CREAM = '#fdf6ec';
const BORDER = '#eadccf';
const GREEN = '#0b3d2e';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_CREAM }}>
      {children}

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
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingHorizontal: 4,
          paddingVertical: 2,
          zIndex: 10,
        }}
      >
        <Link
          href="/"
          style={{ fontWeight: '800', fontSize: 18, color: GREEN }}
        >
          Home
        </Link>
        <Link
          href="/shop"
          style={{ fontWeight: '800', fontSize: 18, color: GREEN }}
        >
          Shop
        </Link>
        <Link
          href="/faq"
          style={{ fontWeight: '800', fontSize: 18, color: GREEN }}
        >
          FAQs
        </Link>
        <Link
          href="/story"
          style={{ fontWeight: '800', fontSize: 18, color: GREEN }}
        >
          Our Story
        </Link>
        <Link
          href="/contact"
          style={{ fontWeight: '800', fontSize: 18, color: GREEN }}
        >
          Contact
        </Link>
      </View>
    </SafeAreaView>
  );
}
