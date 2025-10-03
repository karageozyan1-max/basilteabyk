'use client';

import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SIZE_PRICES } from './prices';

const BG_CREAM = '#fdf6ec';
const GREEN = '#0b3d2e';
const GOLD = '#c7a45a';

const { width } = Dimensions.get('window');
const isSmall = width < 380;
const BTN_H = isSmall ? 42 : 48;

type SizeKey = '8oz' | '12oz';

export default function CartPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ size?: string; pack?: string; qty?: string }>();

  const size: SizeKey = (params.size as SizeKey) || '8oz';
  const pack = Math.max(0, parseInt(params.pack || '0', 10));
  const qty  = Math.max(1, parseInt(params.qty || '1', 10));

  const unit = SIZE_PRICES[size] ?? 0;
  const total = useMemo(() => unit * pack * qty, [unit, pack, qty]);
  const hasItem = pack > 0 && qty > 0;

  const goCheckout = () =>
    router.push({ pathname: '/checkout', params: { size, pack: String(pack), qty: String(qty) } });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_CREAM }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 54 }} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            {hasItem && ( // 👈 only show bottle image if there is an item
              <Image
                source={require('../assets/images/basil-bottle.png')}
                style={{ width: 56, height: 56, marginRight: 12 }}
                resizeMode="contain"
              />
            )}
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={styles.title}>Your Cart</Text>
              <Text style={styles.subtitle}>{hasItem ? `${qty} × ${pack}-pack • ${size}` : 'No items'}</Text>
            </View>
          </View>

          {hasItem ? (
            <>
              <View style={{ marginTop: 14 }}>
                <Text style={styles.priceLabel}>Total</Text>
                <Text style={styles.priceValue}>${total.toFixed(2)}</Text>
              </View>

              <TouchableOpacity style={styles.primaryBtn} onPress={goCheckout}>
                <Text style={styles.primaryBtnText}>Checkout</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.push('/shop')}>
                <Text style={styles.secondaryBtnText}>Continue Shopping</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.back()}>
                <Text style={styles.secondaryBtnText}>Back</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={{ color: GOLD, marginTop: 10 }}>Your cart is empty.</Text>

              <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/shop')}>
                <Text style={styles.primaryBtnText}>Go to Shop</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.back()}>
                <Text style={styles.secondaryBtnText}>Back</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: BG_CREAM,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#eadccf',
    maxWidth: 920,
    alignSelf: 'center',
    width: '100%',
  },

  headerRow: { flexDirection: 'row', alignItems: 'center' },

  title: {
    fontSize: isSmall ? 18 : 22,
    fontWeight: '800',
    color: '#fff',
    backgroundColor: GREEN,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  subtitle: {
    marginTop: 6, color: GOLD, flexShrink: 1, minWidth: 0, flexWrap: 'wrap',
    fontSize: isSmall ? 13 : 15, fontWeight: '600',
  },

  priceLabel: { fontSize: 12, color: GOLD },
  priceValue: { fontSize: isSmall ? 20 : 22, fontWeight: '800', marginTop: 2, color: GREEN },

  primaryBtn: {
    marginTop: 16, height: BTN_H, borderRadius: 10, backgroundColor: GREEN,
    alignItems: 'center', justifyContent: 'center',
  },
  primaryBtnText: { color: BG_CREAM, fontSize: isSmall ? 14 : 15, fontWeight: '700' },

  secondaryBtn: {
    marginTop: 10, height: BTN_H, borderRadius: 10,
    borderWidth: 1, borderColor: GREEN, backgroundColor: BG_CREAM,
    alignItems: 'center', justifyContent: 'center',
  },
  secondaryBtnText: { fontSize: isSmall ? 14 : 15, fontWeight: '700', color: GREEN },
});
