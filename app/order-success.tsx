import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function OrderSuccess() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 16, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 28, fontWeight: '800', marginBottom: 8 }}>Thank you! 🎉</Text>
      <Text style={{ fontSize: 16, color: '#444', textAlign: 'center', marginBottom: 20 }}>
        Your order has been placed successfully.
      </Text>

      <TouchableOpacity
        onPress={() => router.replace('/shop')}
        style={{ paddingVertical: 14, paddingHorizontal: 20, backgroundColor: '#0f3d2e', borderRadius: 10 }}
      >
        <Text style={{ color: '#fff', fontWeight: '700' }}>Continue Shopping</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/cart')} style={{ marginTop: 12 }}>
        <Text style={{ color: '#0f3d2e' }}>View Cart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
