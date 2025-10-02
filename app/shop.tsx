'use client';

import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SIZE_PRICES } from './prices';

const BG_CREAM = '#fdf6ec';
const GREEN = '#0b3d2e';
const GOLD = '#c7a45a';

type SizeKey = '8oz' | '12oz';
const PACK_OPTIONS = [2, 6, 12];

const { width } = Dimensions.get('window');
const isSmall = width < 380;
const BTN_H = isSmall ? 44 : 52;

export default function ShopScreen() {
  const router = useRouter();
  const [size, setSize] = useState<SizeKey>('8oz');
  const [pack, setPack] = useState<number>(PACK_OPTIONS[0]);
  const [qty, setQty] = useState<number>(1); // 👈 NEW

  const unit = SIZE_PRICES[size];
  const total = useMemo(() => unit * pack * qty, [unit, pack, qty]);

  function goToCart() {
    router.push({
      pathname: '/cart',
      params: { size, pack: String(pack), qty: String(qty) },
    });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_CREAM }}>
      <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Image
              source={require('../assets/images/basil-bottle.png')}
              style={{ width: 72, height: 72, marginRight: 12 }}
              resizeMode="contain"
            />
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={styles.title}>Shop — Basil Tea by K</Text>
              <Text style={styles.subtitle}>Honey-infused basil tea in glass bottles</Text>
            </View>
            <TouchableOpacity style={styles.headerCartBtn} onPress={() => router.push('/cart')}>
              <Text style={{ color: GREEN, fontWeight: '700' }}>Cart</Text>
            </TouchableOpacity>
          </View>

          {/* Size */}
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.row2}>
            <Choice label="8 oz"  selected={size === '8oz'}  onPress={() => setSize('8oz')} />
            <Choice label="12 oz" selected={size === '12oz'} onPress={() => setSize('12oz')} />
          </View>

          {/* Pack */}
          <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Pack</Text>
          <View style={styles.row3}>
            {PACK_OPTIONS.map(p => (
              <Choice key={p} label={`${p}-pack`} selected={pack === p} onPress={() => setPack(p)} three />
            ))}
          </View>

          {/* Quantity 👇 */}
          <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Quantity</Text>
          <View style={styles.qtyRow}>
            <QtyBtn label="–" onPress={() => setQty(q => Math.max(1, q - 1))} />
            <Text style={styles.qtyText}>{qty}</Text>
            <QtyBtn label="+" onPress={() => setQty(q => Math.min(99, q + 1))} />
          </View>

          {/* Price + CTA */}
          <View style={{ marginVertical: 12 }}>
            <Text style={styles.priceValue}>${total.toFixed(2)}</Text>
            <Text style={styles.note}>
              {qty} × {pack}-pack • {size}
            </Text>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={goToCart}>
            <Text style={styles.primaryBtnText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Choice({
  label, selected, onPress, three = false,
}: { label: string; selected: boolean; onPress: () => void; three?: boolean }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.choiceBase,
        three ? styles.threeCol : styles.twoCol,
        selected && styles.choiceSelected,
      ]}
      accessibilityState={{ selected }}
    >
      <Text style={[styles.choiceText, selected && styles.choiceTextSelected]} numberOfLines={1}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function QtyBtn({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.qtyBtn}>
      <Text style={styles.qtyBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  page: { padding: 20 },
  card: {
    backgroundColor: BG_CREAM,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#eadccf',
    gap: 12,
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
    textAlign: 'left', fontSize: isSmall ? 13 : 15, fontWeight: '600',
  },

  headerCartBtn: {
    paddingVertical: 8, paddingHorizontal: 10,
    borderWidth: 1, borderColor: '#eadccf', borderRadius: 10,
    backgroundColor: BG_CREAM,
    alignItems: 'center', justifyContent: 'center', minWidth: 58,
  },

  sectionTitle: { fontSize: 14, fontWeight: '700', marginTop: 6, color: GREEN },

  row2: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  row3: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' },

  choiceBase: {
    height: BTN_H,
    borderWidth: 1,
    borderColor: GREEN,
    borderRadius: 10,
    backgroundColor: BG_CREAM,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  twoCol: { width: '48%' },
  threeCol: { width: '31%' },

  choiceSelected: { backgroundColor: GREEN, borderColor: GREEN },
  choiceText: { fontSize: isSmall ? 13 : 14, fontWeight: '700', color: GREEN, textAlign: 'center' },
  choiceTextSelected: { color: BG_CREAM },

  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  qtyBtn: {
    height: BTN_H, width: BTN_H,
    alignItems: 'center', justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: GREEN,
  },
  qtyBtnText: { color: BG_CREAM, fontSize: isSmall ? 18 : 22, fontWeight: '800' },
  qtyText: { minWidth: 36, textAlign: 'center', fontSize: isSmall ? 16 : 18, fontWeight: '800', color: GREEN },

  priceValue: { fontSize: isSmall ? 20 : 22, fontWeight: '800', color: GREEN },
  note: { fontSize: isSmall ? 12 : 13, color: GOLD, marginTop: 2 },

  primaryBtn: { marginTop: 6, height: BTN_H, borderRadius: 10, backgroundColor: GREEN, alignItems: 'center', justifyContent: 'center' },
  primaryBtnText: { color: BG_CREAM, fontSize: isSmall ? 14 : 15, fontWeight: '700' },
});
