'use client';

import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useCart } from './CartContext';
import { SIZE_PRICES } from './prices';

export default function CartPage() {
  const router = useRouter();
  const { item, setItem, clear } = useCart();

  if (!item) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fafafa' }}>
        <ScrollView contentContainerStyle={styles.page}>
          <View style={styles.card}>
            <Text style={styles.title}>Your Cart</Text>
            <Text style={{ color: '#666', marginTop: 6 }}>Your cart is empty.</Text>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/shop')}>
              <Text style={styles.primaryBtnText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const { size, pack, qty } = item;
  const unitPackTotal = SIZE_PRICES[size] * pack;
  const total = useMemo(() => unitPackTotal * qty, [unitPackTotal, qty]);

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
              <Text style={styles.subtitle}>{qty} × {pack}-pack • {size}</Text>
            </View>
          </View>

          {/* Quantity controls (packs) */}
          <View style={{ marginTop: 14, alignItems: 'center' }}>
            <Text style={{ fontWeight: '700', marginBottom: 8 }}>Quantity</Text>
            <View style={styles.qtyRow}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setItem({ ...item, qty: Math.max(1, qty - 1) })}
              >
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{qty}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setItem({ ...item, qty: Math.min(10, qty + 1) })}
              >
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Totals */}
          <View style={{ marginTop: 14 }}>
            <Text style={styles.priceLabel}>Total</Text>
            <Text style={styles.priceValue}>${total.toFixed(2)}</Text>
            <Text style={styles.noteSmall}>
              (${unitPackTotal.toFixed(2)} per {pack}-pack)
            </Text>
          </View>

          {/* Actions */}
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => router.push('/checkout')}
          >
            <Text style={styles.primaryBtnText}>Checkout</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.push('/shop')}>
            <Text style={styles.secondaryBtnText}>Continue Shopping</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.secondaryBtn, { marginTop: 8 }]} onPress={clear}>
            <Text style={styles.secondaryBtnText}>Remove from Cart</Text>
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

  qtyRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
  qtyBtn: {
    width: 44, height: 44, borderRadius: 10, borderWidth: 1, borderColor: '#dcdcdc',
    alignItems: 'center', justifyContent: 'center',
  },
  qtyBtnText: { fontSize: 22, fontWeight: '800', color: '#111', lineHeight: 22 },
  qtyValue: { minWidth: 36, textAlign: 'center', fontSize: 18, fontWeight: '700' },

  priceLabel: { fontSize: 12, color: '#666' },
  priceValue: { fontSize: 22, fontWeight: '800', marginTop: 2 },
  noteSmall: { fontSize: 12, color: '#888', marginTop: 4 },

  primaryBtn: { marginTop: 16, paddingVertical: 12, borderRadius: 10, backgroundColor: '#111', alignItems: 'center' },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  secondaryBtn: { marginTop: 10, paddingVertical: 12, borderRadius: 10, borderWidth: 1, borderColor: '#ddd', alignItems: 'center' },
  secondaryBtnText: { fontSize: 15, fontWeight: '700', color: '#111' },
});
