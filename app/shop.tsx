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

          {/* Top: Big image + title */}
          <Image
            source={require('../assets/images/basil-bottle.png')}
            style={styles.heroImage}
            resizeMode="contain"
          />

          <Text style={styles.title}>Shop — Basil Tea by K</Text>
          <Text style={styles.subtitle}>Honey-infused basil iced tea</Text>

          {/* Product description */}
          <View style={styles.descBlock}>
            <Text style={styles.descLine}>
              • Small-batch basil tea brewed with real basil leaves, balanced with wildflower honey.
            </Text>
            <Text style={styles.descLine}>
              • Naturally refreshing, lightly sweet, and bottled in recyclable glass.
            </Text>
            <Text style={styles.descLine}>
              • No concentrates • No artificial flavors • Just clean, crisp flavor.
            </Text>
            <Text style={styles.descLine}>
              • Enjoy chilled straight from the bottle or poured over ice with a lemon slice.
            </Text>
          </View>

          {/* Size (centered buttons) */}
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.centerRow}>
            <Choice label="8 oz"  selected={size === '8oz'}  onPress={() => setSize('8oz')} />
            <Choice label="12 oz" selected={size === '12oz'} onPress={() => setSize('12oz')} />
          </View>

          {/* Pack (centered, wraps neatly) */}
          <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Pack</Text>
          <View style={styles.centerRow}>
            {PACK_OPTIONS.map((p) => (
              <Choice key={p} label={`${p}-pack`} selected={pack === p} onPress={() => setPack(p)} />
            ))}
          </View>

          {/* Quantity */}
          <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Quantity</Text>
          <View style={styles.qtyRow}>
            <QtyBtn label="–" onPress={() => setQty((q) => Math.max(1, q - 1))} />
            <Text style={styles.qtyText}>{qty}</Text>
            <QtyBtn label="+" onPress={() => setQty((q) => Math.min(99, q + 1))} />
          </View>

          {/* Price + CTA */}
          <View style={{ marginTop: 12, alignItems: 'center' }}>
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

  /* Bigger, centered hero image */
  heroImage: {
    alignSelf: 'center',
    width: '100%',
    height: isSmall ? 220 : 280, // bigger on larger screens
    marginBottom: 10,
  },

  title: {
    fontSize: isSmall ? 20 : 24,
    fontWeight: '800',
    color: '#fff',
    backgroundColor: GREEN,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'center', // centered title
  },
  subtitle: {
    marginTop: 8,
    color: GOLD,
    textAlign: 'center',
    fontSize: isSmall ? 14 : 16,
    fontWeight: '700',
  },

  /* Description block */
  descBlock: {
    marginTop: 12,
    gap: 4,
  },
  descLine: {
    color: '#3b3b3b',
    fontSize: isSmall ? 13 : 14,
    lineHeight: isSmall ? 18 : 20,
    flexShrink: 1,
    minWidth: 0,
    flexWrap: 'wrap',
    textAlign: 'left',
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginTop: 18,
    color: GREEN,
    alignSelf: 'center',
  },

  /* Centered row for choices */
  centerRow: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',  // 👈 centers the buttons
    gap: 10,
  },

  /* Choice buttons: fixed height, flexible width, centered text */
  choiceBtn: {
    height: BTN_H,
    minWidth: 120,           // gives each button some width
    maxWidth: 180,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: GREEN,
    borderRadius: 10,
    backgroundColor: BG_CREAM,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceBtnSelected: { backgroundColor: GREEN, borderColor: GREEN },
  choiceText: { fontSize: isSmall ? 13 : 14, fontWeight: '700', color: GREEN, textAlign: 'center' },
  choiceTextSelected: { color: BG_CREAM },

  /* Quantity */
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 14, justifyContent: 'center', marginTop: 6 },
  qtyBtn: {
    height: BTN_H, width: BTN_H,
    alignItems: 'center', justifyContent: 'center',
    borderRadius: 10, backgroundColor: GREEN,
  },
  qtyBtnText: { color: BG_CREAM, fontSize: isSmall ? 18 : 22, fontWeight: '800' },
  qtyText: { minWidth: 36, textAlign: 'center', fontSize: isSmall ? 16 : 18, fontWeight: '800', color: GREEN },

  /* Price + CTA */
  priceValue: { fontSize: isSmall ? 22 : 24, fontWeight: '900', color: GREEN },
  note: { fontSize: isSmall ? 12 : 13, color: GOLD, marginTop: 2 },
  primaryBtn: {
    marginTop: 10,
    height: BTN_H,
    borderRadius: 10,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 18,
  },
  primaryBtnText: { color: BG_CREAM, fontSize: isSmall ? 15 : 16, fontWeight: '800' },
});
