'use client';

import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SIZE_PRICES } from './prices';

type SizeKey = '8oz' | '12oz';

export default function CheckoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ size?: string; pack?: string }>();
  const size = (params.size as SizeKey) || '8oz';
  const pack = Math.max(parseInt(params.pack || '2', 10), 1);
  const price = useMemo(() => SIZE_PRICES[size] * pack, [size, pack]);

  function placeOrder() {
    // call your real payment flow here
    router.replace('/order-success');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fafafa' }}>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.card}>
          <Text style={styles.title}>Checkout</Text>

          <View style={styles.row}>
            <Image
              source={require('../assets/images/basil-bottle.png')}
              style={{ width: 60, height: 60, borderRadius: 8, marginRight: 10 }}
              resizeMode="cover"
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '700' }}>Basil Tea Bottle</Text>
              <Text style={{ color: '#666' }}>{pack}-pack • {size}</Text>
            </View>
            <Text style={{ fontWeight: '700' }}>${price.toFixed(2)}</Text>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={placeOrder}>
            <Text style={styles.primaryBtnText}>Place Order</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.back()}>
            <Text style={styles.secondaryBtnText}>Back to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { padding: 20 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 18, borderWidth: 1, borderColor: '#e8e8e8' },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  primaryBtn: { marginTop: 10, paddingVertical: 12, borderRadius: 10, backgroundColor: '#111', alignItems: 'center' },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  secondaryBtn: { marginTop: 10, paddingVertical: 12, borderRadius: 10, borderWidth: 1, borderColor: '#ddd', alignItems: 'center' },
  secondaryBtnText: { fontSize: 15, fontWeight: '700', color: '#111' },
});
