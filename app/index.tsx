// app/index.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text style={{ fontSize: 20, fontWeight: '800', marginBottom: 16 }}>
        Home
      </Text>
      <Link href="/shop" style={{ fontSize: 18, fontWeight: '700', color: '#0b3d2e' }}>
        Go to Shop
      </Link>
    </View>
  );
}
