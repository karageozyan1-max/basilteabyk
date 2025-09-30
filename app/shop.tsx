// app/shop.tsx
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';

export default function ShopScreen() {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>Shop screen loads ✅</Text>
    </SafeAreaView>
  );
}
