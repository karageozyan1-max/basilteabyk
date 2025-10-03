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
const BTN_H = isSmall ? 42 : 48;

export default function ShopScreen() {
  const router = useRouter();
  const [size, setSize] = useState<SizeKey>('8oz');
  const [pack, setPack] = useState<number>(PACK_OPTIONS[0]);
  const [qty, setQty] = useState<number>(1);

  const unit = SIZE_PRICES[size];
  const total = useMemo(() => unit * pack * qty, [unit, pack, qty]);

  function goToCart() {
    router.push({ pathname: '/cart', params: { size, pack: String(pack), qty: String(qty) } });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_CREAM }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 54 }} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>

          {/* Header row with tiny brand + Cart button */}
          <View style={styles.headerRow}>
            <Image
              source={require('../assets/images/basil-bottle.png')}
              style={{ width: 42, height: 42, marginRight: 10 }}
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

          {/* Big product image */}
          <Image
            source={require('../assets/images/basil-bottle.png')}
            style={styles.heroImage}
            resizeMode="contain"
          />

          {/* Simple description */}
          <Text style={styles.desc}>
            Lightly sweet, clean, and refreshing. Real basil brewed in small batches, balanced with honey. Best served chilled.
          </Text>

          {/* Size */}
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.centerRow}>
            <Choice label="8 oz"  selected={size === '8oz'}  onPress={() => setSize('8oz')} />
            <Choice label="12 oz" selected={size === '12oz'} onPress={() => setSize('12oz')} />
          </View>

          {/* Pack */}
          <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Pack</Text>
          <View style={styles.centerRow}>
            {PACK_OPTIONS.map((p) => (
              <Choice key={p} label={`${p}-pack`} selected={pack === p} onPress={() => setPack(p)} />
            ))}
          </View>

          {/* Quantity */}
          <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Quantity</Text>
          <View style={styles.qtyRow}>
            <QtyBtn label="–" onPress={() => setQty((q) => Math.max(1, q - 1))} />
            <Text style={styles.qtyText}>{qty}</Text>
            <QtyBtn label="+" onPress={() => setQty((q) => Math.min(99, q + 1))} />
          </View>

          {/* Price + CTA */}
          <View style={{ marginTop: 10, alignItems: 'center' }}>
            <Text style={styles.priceValue}>${total.toFixed(2)}</Text>
            <Text style={styles.note}>{qty} × {pack}-pack • {size}</Text>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={goToCart}>
            <Text style={styles.primaryBtnText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* --- Reusable bits --- */

function Choice({
  label, selected, onPress,
}: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.choiceBtn, selected && styles.choiceBtnSelected]}
      accessibilityState={{ selected }}
    >
      <Text
        style={[styles.choiceText, selected && styles.choiceTextSelected]}
        numberOfLines={1}
      >
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

/* --- Styles --- */

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

  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },

  title: {
    fontSize: isSmall ? 18 : 20,
    fontWeight: '800',
    color: '#fff',
    backgroundColor: GREEN,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  subtitle: { marginTop: 4, color: GOLD, fontSize: isSmall ? 12 : 14, fontWeight: '600' },
  headerCartBtn: {
    paddingVertical: 6, paddingHorizontal: 10,
    borderWidth: 1, borderColor: '#eadccf', borderRadius: 10, backgroundColor: BG_CREAM,
    minWidth: 56, alignItems: 'center', justifyContent: 'center',
  },

  heroImage: {
    alignSelf: 'center',
    width: '100%',
    height: isSmall ? 240 : 300, // bigger
    marginTop: 4,
    marginBottom: 6,
  },

  desc: {
    color: '#3b3b3b',
    fontSize: isSmall ? 13 : 14,
    lineHeight: isSmall ? 18 : 20,
    textAlign: 'center',
    marginBottom: 4,
  },

  sectionTitle: { fontSize: 14, fontWeight: '800', color: GREEN, alignSelf: 'center', marginTop: 8 },

  centerRow: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',    // centered on all screens
    gap: 10,
  },

  // Buttons made wider so text never clips on phones
  choiceBtn: {
    height: BTN_H,
    minWidth: 140,                // wider than before
    paddingHorizontal: 14,
    borderWidth: 1, borderColor: GREEN, borderRadius: 12,
    backgroundColor: BG_CREAM,
    alignItems: 'center', justifyContent: 'center',
  },
  choiceBtnSelected: { backgroundColor: GREEN, borderColor: GREEN },
  choiceText: { fontSize: isSmall ? 13 : 14, fontWeight: '700', color: GREEN },
  choiceTextSelected: { color: BG_CREAM },

  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 14, justifyContent: 'center', marginTop: 6 },
  qtyBtn: { height: BTN_H, width: BTN_H, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: GREEN },
  qtyBtnText: { color: BG_CREAM, fontSize: isSmall ? 18 : 22, fontWeight: '800' },
  qtyText: { minWidth: 36, textAlign: 'center', fontSize: isSmall ? 16 : 18, fontWeight: '800', color: GREEN },

  priceValue: { fontSize: isSmall ? 22 : 24, fontWeight: '900', color: GREEN },
  note: { fontSize: isSmall ? 12 : 13, color: GOLD, marginTop: 2 },

  primaryBtn: {
    marginTop: 8, height: BTN_H, borderRadius: 12, backgroundColor: GREEN,
    alignItems: 'center', justifyContent: 'center', alignSelf: 'center', paddingHorizontal: 18,
  },
  primaryBtnText: { color: BG_CREAM, fontSize: isSmall ? 15 : 16, fontWeight: '800' },
});
