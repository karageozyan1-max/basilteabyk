'use client';

import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SIZE_PRICES } from './prices';
import { useCart } from './CartContext';

type SizeKey = '8oz' | '12oz';
const PACK_OPTIONS = [2, 6, 12];               // change to [1,6,12] to allow single bottles
const MIN_QTY = 1;
const MAX_QTY = 10;                            // max number of packs per add

export default function ShopScreen() {
  const router = useRouter();
  const { item } = useCart();                  // for badge only

  const [size, setSize] = useState<SizeKey>('8oz');
  const [pack, setPack] = useState<number>(PACK_OPTIONS[0]);
  const [qty, setQty] = useState<number>(1);   // number of packs

  const totalPrice = useMemo(() => SIZE_PRICES[size] * pack * qty, [size, pack, qty]);

  const badgeCount = item?.qty ?? 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fafafa' }}>
      <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Image
              source={require('../assets/images/basil-bottle.png')}
              style={{ width: 80, height: 80, marginRight: 12 }}
              resizeMode="contain"
            />

            {/* text column */}
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={styles.title}>Shop — Basil Tea by K</Text>
              <Text style={styles.subtitle}>
                Honey-infused basil tea in glass bottles
              </Text>
            </View>

            {/* Cart button (no auto-add) + badge */}
            <TouchableOpacity style={styles.headerCartBtn} onPress={() => router.push('/cart')}>
              <Text style={{ color: '#111', fontWeight: '700' }}>Cart</Text>
              {badgeCount > 0 && (
                <View style={styles.badge}><Text style={styles.badgeText}>{badgeCount}</Text></View>
              )}
            </TouchableOpacity>
          </View>

          {/* Size (2 columns) */}
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.row2}>
            <Choice label="8 oz"  selected={size === '8oz'}  onPress={() => setSize('8oz')} />
            <Choice label="12 oz" selected={size === '12oz'} onPress={() => setSize('12oz')} />
          </View>

          {/* Pack (3 columns) */}
          <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Pack</Text>
          <View style={styles.row3}>
            {PACK_OPTIONS.map((p) => (
              <Choice key={p} label={`${p}-pack`} selected={pack === p} onPress={() => setPack(p)} three />
            ))}
          </View>

          {/* Quantity (number of packs) */}
          <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Quantity</Text>
          <View style={styles.qtyRow}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQty((q) => Math.max(MIN_QTY, q - 1))}
              accessibilityLabel="Decrease quantity"
            >
              <Text style={styles.qtyBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qtyValue}>{qty}</Text>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQty((q) => Math.min(MAX_QTY, q + 1))}
              accessibilityLabel="Increase quantity"
            >
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Price + CTA */}
          <View style={{ marginVertical: 12 }}>
            <Text style={styles.priceValue}>${totalPrice.toFixed(2)}</Text>
            <Text style={styles.note}>{qty} × {pack}-pack • {size}</Text>
          </View>

          <AddToCart size={size} pack={pack} qty={qty} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function AddToCart({ size, pack, qty }: { size: SizeKey; pack: number; qty: number }) {
  const router = useRouter();
  const { setItem } = useCart();

  function handleAdd() {
    setItem({ size, pack, qty });
    router.push('/cart');
  }

  return (
    <TouchableOpacity style={styles.primaryBtn} onPress={handleAdd}>
      <Text style={styles.primaryBtnText}>Add to Cart</Text>
    </TouchableOpacity>
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
      <Text style={[styles.choiceText, selected && styles.choiceTextSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  page: { padding: 20 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 18, borderWidth: 1, borderColor: '#e8e8e8' },

  headerRow: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '800', flexShrink: 1 },
  subtitle: { marginTop: 4, color: '#666', flexShrink: 1, flexWrap: 'wrap', textAlign: 'left' },

  headerCartBtn: {
    paddingVertical: 8, paddingHorizontal: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', minWidth: 58, position: 'relative',
  },
  badge: {
    position: 'absolute', top: -8, right: -8, backgroundColor: '#111', borderRadius: 9999,
    minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center',
  },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '800' },

  sectionTitle: { fontSize: 14, fontWeight: '700', marginTop: 12, marginBottom: 8 },

  // perfectly even rows on mobile & desktop:
  row2: { flexDirection: 'row', justifyContent: 'space-between' },
  row3: { flexDirection: 'row', justifyContent: 'space-between' },

  choiceBase: {
    paddingVertical: 12, borderWidth: 1, borderColor: '#dcdcdc', borderRadius: 12,
    alignItems: 'center',
  },
  twoCol: { width: '48%' },
  threeCol: { width: '31%' },
  choiceSelected: { backgroundColor: '#111', borderColor: '#111' },
  choiceText: { fontSize: 14, fontWeight: '600', color: '#111' },
  choiceTextSelected: { color: '#fff' },

  qtyRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12,
  },
  qtyBtn: {
    width: 44, height: 44, borderRadius: 10, borderWidth: 1, borderColor: '#dcdcdc',
    alignItems: 'center', justifyContent: 'center',
  },
  qtyBtnText: { fontSize: 22, fontWeight: '800', color: '#111', lineHeight: 22 },
  qtyValue: { minWidth: 36, textAlign: 'center', fontSize: 18, fontWeight: '700' },

  priceValue: { fontSize: 22, fontWeight: '800' },
  note: { fontSize: 12, color: '#888', marginTop: 2 },

  primaryBtn: {
    marginTop: 8, paddingVertical: 12, borderRadius: 10, backgroundColor: '#111', alignItems: 'center',
  },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
