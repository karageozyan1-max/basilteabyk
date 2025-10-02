'use client';

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Stack, useRouter, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const BG_CREAM = '#fdf6ec';
const GREEN = '#0b3d2e';
const BORDER = '#eadccf';
const FOOTER_H = 48; // compact footer

export default function Layout() {
  const router = useRouter();
  const pathname = usePathname();

  const NavItem = ({ label, href }: { label: string; href: string }) => {
    const isActive = pathname === href || (href === '/' && (pathname === '/' || pathname === ''));
    return (
      <TouchableOpacity onPress={() => router.push(href)} style={{ paddingHorizontal: 4 }}>
        <Text style={{ color: GREEN, fontWeight: isActive ? '800' : '700', fontSize: 15 }}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_CREAM }}>
      {/* leave just enough room so content never sits under the footer */}
      <View style={{ flex: 1, paddingBottom: FOOTER_H + 6 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>

      {/* sticky footer */}
      <View
        style={{
          position: 'absolute',
          left: 0, right: 0, bottom: 0,
          height: FOOTER_H,
          backgroundColor: BG_CREAM,
          borderTopWidth: 1, borderTopColor: BORDER,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingHorizontal: 10,
          paddingVertical: 4, // tight so no big blank strip
        }}
      >
        <NavItem label="Home" href="/" />
        <NavItem label="Shop" href="/shop" />
        <NavItem label="FAQs" href="/faqs" />
        <NavItem label="Our Story" href="/story" />
        <NavItem label="Contact" href="/contact" />
        <NavItem label="Cart" href="/cart" />
      </View>
    </SafeAreaView>
  );
}
