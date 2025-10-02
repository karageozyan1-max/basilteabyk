'use client';

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';

const FOOTER_HEIGHT = 64;

export default function RootLayout() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#fdf6ec' }}>
      {/* Give every page space so the fixed footer never overlaps content */}
      <View style={{ flex: 1, paddingBottom: FOOTER_HEIGHT + 12 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>

      {/* Global sticky footer (safe on web + native) */}
      <View
        style={[
          styles.footer,
          Platform.select({
            web: { position: 'fixed' as const },
            default: { position: 'absolute' as const },
          }),
        ]}
      >
        {(
          [
            ['Home', '/'],
            ['Shop', '/shop'],
            ['FAQs', '/faqs'],
            ['Our Story', '/story'],
            ['Contact', '/contact'],
            ['Cart', '/cart'],
          ] as const
        ).map(([label, path]) => (
          <TouchableOpacity key={path} onPress={() => router.push(path)}>
            <Text style={styles.link}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    left: 0,
    right: 0,
    bottom: 0,
    height: FOOTER_HEIGHT,
    backgroundColor: '#fdf6ec',
    borderTopWidth: 1,
    borderTopColor: '#eadccf',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 1000,
  },
  link: {
    color: '#0b3d2e',
    fontSize: 14,
    fontWeight: '700',
  },
});
