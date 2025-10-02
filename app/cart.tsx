'use client';

import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SIZE_PRICES } from './prices';

type SizeKey = '8oz' | '12oz';
// Match whatever you choose in shop.tsx
type PackKey = 2 | 6 | 12; // use `1 | 6 | 12` if you choose single

export default function CartPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ size?: string; pack?: string }>();
  const size = (params.size as SizeKey) || '8oz';
  const pack = (parseInt(params.pack || '6', 10) as PackKey);

  const totalPrice = useMemo(() => SIZE_PRICES[size] * (pack || 6), [size, pack]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fafafa' }}>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Image
              source={require('../assets/images/basil-bottle.png')}
              style={{ width: 72, height: 72, marginRight: 12 }}
              resizeMode="contain"
            />
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={styles.title}>Your Cart</Text>
              <Text style={styles.subtitle}>{pack}-pack • {size}</Text>
            </View>
          </View>

          <View style={{ marginTop: 12 }}>
            <Text style={styles.priceLabel}>Total</Text>
            <Text style={styles.priceValue}>${totalPrice.toFixed(2)}</Text>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/checkout')}>
            <Text style={styles.primaryBtnText}>Checkout</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.push('/shop')}>
            <Text style={styles.secondaryBtnText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { padding: 20 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 18, borderWidth: 1, borderColor: '#e8e8e8' },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '800', flexShrink: 1 },
  subtitle: { marginTop: 4, color: '#666', flexShrink: 1 },
  priceLabel: { fontSize: 12, color: '#666' },
  priceValue: { fontSize: 22, fontWeight: '800', marginTop: 2 },
  primaryBtn: { marginTop: 16, paddingVertical: 12, borderRadius: 10, backgroundColor: '#111', alignItems: 'center' },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  secondaryBtn: { marginTop: 10, paddingVertical: 12, borderRadius: 10, borderWidth: 1, borderColor: '#ddd', alignItems: 'center' },
  secondaryBtnText: { fontSize: 15, fontWeight: '700', color: '#111' },
});
