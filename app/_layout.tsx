'use client';

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Stack, useRouter, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const BG_CREAM = '#fdf6ec';
const GREEN = '#0b3d2e';
const BORDER = '#eadccf';

export default function Layout() {
  const router = useRouter();
  const pathname = usePathname();

  const NavItem = ({ label, href }: { label: string; href: string }) => {
    // treat both "" and "/" as home
    const isActive = pathname === href || (href === '/' && (pathname === '/' || pathname === ''));
    return (
      <TouchableOpacity onPress={() => router.push(href)} style={{ paddingHorizontal: 6, paddingVertical: 4 }}>
        <Text
          style={{
            color: GREEN,
            fontWeight: isActive ? '800' : '700',
            fontSize: isActive ? 15 : 14,
          }}
          numberOfLines={1}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_CREAM }}>
      {/* Give every screen bottom padding so sticky footer never covers content */}
      <View style={{ flex: 1, paddingBottom: 64 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>

      {/* Sticky footer on every page */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 56,                 // tighter height (was larger)
          backgroundColor: BG_CREAM,
          borderTopWidth: 1,
          borderTopColor: BORDER,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingHorizontal: 12,
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
