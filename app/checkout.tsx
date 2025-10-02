'use client';

import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useCart } from './CartContext';
import { SIZE_PRICES } from './prices';

export default function CheckoutScreen() {
  const router = useRouter();
  const { item, clear } = useCart();

  if (!item) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fafafa' }}>
        <ScrollView contentContainerStyle={styles.page}>
          <View style={styles.card}>
            <Text style={styles.title}>Checkout</Text>
            <Text style={{ color: '#666', marginTop: 6 }}>Your cart is empty.</Text>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/shop')}>
              <Text style={styles.primaryBtnText}>Back to Shop</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const { size, pack, qty } = item;
  const total = useMemo(() => SIZE_PRICES[size] * pack * qty, [size, pack, qty]);

  function placeOrder() {
    // TODO: hook up real payment
    clear();                      // clear AFTER “placing” the order
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
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={{ fontWeight: '700' }}>Basil Tea Bottle</Text>
              <Text style={{ color: '#666' }}>{qty} × {pack}-pack • {size}</Text>
            </View>
            <Text style={{ fontWeight: '700' }}>${total.toFixed(2)}</Text>
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
