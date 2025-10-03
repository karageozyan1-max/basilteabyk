// app/_layout.tsx
'use client';

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Stack, useRouter, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

// ---- Theme
const BG_CREAM = '#f4f0e6';
const GREEN    = '#0b3d2e';
const BORDER   = '#e4dccf';

// compact sticky footer
const FOOTER_H = 40;

export default function Layout() {
  const router = useRouter();
  const pathname = usePathname();

  // simple nav button used in the bold row
  const FooterItem = ({ label, href }: { label: string; href: string }) => (
    <TouchableOpacity onPress={() => router.push(href)}>
      <Text
        style={{
          fontWeight: '800',
          fontSize: 18,
          color: GREEN,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_CREAM }}>
      {/* All pages render here */}
      <Stack screenOptions={{ headerShown: false }} />

      {/* Sticky footer (compact) */}
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
          justifyContent: 'center',
        }}
      >
        {/* Bold row of links (centered, tighter spacing) */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingHorizontal: 6,
            gap: 8,
          }}
        >
          <FooterItem label="Home"    href="/" />
          <FooterItem label="Shop"    href="/shop" />
          <FooterItem label="FAQs"    href="/faqs" />
          <FooterItem label="Our Story" href="/story" />
          <FooterItem label="Contact" href="/contact" />
        </View>
      </View>
    </SafeAreaView>
  );
}
