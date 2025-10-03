'use client';

import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SIZE_PRICES } from './prices';
import { useCart, SizeKey } from './CartContext';

const BG_CREAM = '#fdf6ec';
const GREEN = '#0b3d2e';
const GOLD = '#c7a45a';
const BORDER = '#eadccf';

const PACK_OPTIONS = [2, 6, 12];

const { width } = Dimensions.get('window');
const isPhone = width < 768;
const isSmallPhone = width < 380;

// Button sizing that will NOT clip text
const BTN_FONT = isSmallPhone ? 15 : isPhone ? 16 : 17;
const BTN_H = isSmallPhone ? 48 : isPhone ? 52 : 56;
const BTN_MIN_W = isPhone ? 166 : 220;

// Height of your sticky footer from _layout.tsx
const FOOTER_H = 58;

export default function ShopScreen() {
  const router = useRouter();
  const { addItem } = useCart();

  const [size, setSize] = useState<SizeKey>('8oz');
  const [pack, setPack] = useState<number>(PACK_OPTIONS[0]);
  const [qty, setQty] = useState<number>(1);

  const unit = SIZE_PRICES[size];
  const total = useMemo(() => unit * pack * qty, [unit, pack, qty]);

  function handleAddToCart() {
    const id = `${size}-${pack}`;
    addItem({ id, size, pack, qty, unitPrice: unit });
    router.push('/cart');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_CREAM }}>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: FOOTER_H + 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/* Top bar with Cart button (no tiny product image) */}
          <View style={styles.topBar}>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.headerCartBtn} onPress={() => router.push('/cart')}>
              <Text style={{ color: GREEN, fontWeight: '700' }}>Cart</Text>
            </TouchableOpacity>
          </View>

          {/* Hero: image + text (responsive) */}
          <View style={styles.heroRow}>
            <Image
              source={require('../assets/images/basil-bottle.png')}
              style={styles.heroImage}
              resizeMode="contain"
            />
            <View style={styles.heroText}>
              <Text style={styles.title}>Basil Tea by K</Text>
              <Text style={styles.subtitle}>Honey-infused basil tea in glass bottles</Text>
              <Text style={styles.desc}>
                Lightly sweet, clean, and refreshing. Real basil brewed in small batches, balanced with honey.
              </Text>
            </View>
          </View>

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

          {/* Price & CTA */}
          <View style={{ marginTop: 10, alignItems: 'center' }}>
            <Text style={styles.priceValue}>${total.toFixed(2)}</Text>
            <Text style={styles.note}>{qty} × {pack}-pack • {size}</Text>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={handleAddToCart}>
            <Text style={styles.primaryBtnText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* Reusable bits */

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

/* Styles */

const styles = StyleSheet.create({
  card: {
    backgroundColor: BG_CREAM,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: BORDER,
    maxWidth: 1000,
    alignSelf: 'center',
    width: '100%',
  },

  // Top right Cart button
  topBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  headerCartBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    backgroundColor: BG_CREAM,
    minWidth: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Hero section
  heroRow: {
    flexDirection: isPhone ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: isPhone ? 8 : 16,
    marginBottom: 8,
  },
  heroImage: {
    width: isPhone ? '100%' : 420,
    height: isPhone ? 280 : 360,
    alignSelf: 'center',
  },
  heroText: { flex: 1, alignItems: isPhone ? 'center' : 'flex-start' },

  title: {
    fontSize: isPhone ? 24 : 28,
    fontWeight: '800',
    color: '#fff',
    backgroundColor: GREEN,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  subtitle: {
    marginTop: 8,
    color: GOLD,
    fontSize: isPhone ? 14 : 16,
    fontWeight: '700',
    textAlign: isPhone ? 'center' : 'left',
  },
  desc: {
    marginTop: 6,
    color: '#3b3b3b',
    fontSize: isPhone ? 13 : 14,
    lineHeight: isPhone ? 18 : 20,
    textAlign: isPhone ? 'center' : 'left',
  },

  sectionTitle: { fontSize: 14, fontWeight: '800', color: GREEN, alignSelf: 'center', marginTop: 8 },

  // Centered button rows
  centerRow: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },

  // Choice buttons (no clipping)
  choiceBtn: {
    minWidth: BTN_MIN_W,
    height: BTN_H,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: GREEN,
    borderRadius: 12,
    backgroundColor: BG_CREAM,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceBtnSelected: { backgroundColor: GREEN, borderColor: GREEN },
  choiceText: {
    fontSize: BTN_FONT,
    lineHeight: BTN_FONT + 6,
    fontWeight: '700',
    color: GREEN,
    textAlign: 'center',
  },
  choiceTextSelected: { color: BG_CREAM },

  // Quantity
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 14, justifyContent: 'center', marginTop: 6 },
  qtyBtn: {
    height: BTN_H,
    width: BTN_H,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: GREEN,
  },
  qtyBtnText: { color: BG_CREAM, fontSize: BTN_FONT + 2, lineHeight: BTN_FONT + 8, fontWeight: '800' },
  qtyText: { minWidth: 36, textAlign: 'center', fontSize: BTN_FONT, lineHeight: BTN_FONT + 6, fontWeight: '800', color: GREEN },

  // Price + CTA
  priceValue: { fontSize: isSmallPhone ? 22 : 24, fontWeight: '900', color: GREEN },
  note: { fontSize: isSmallPhone ? 12 : 13, color: GOLD, marginTop: 2 },

  primaryBtn: {
    marginTop: 8,
    height: BTN_H,
    borderRadius: 12,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 18,
  },
  primaryBtnText: { color: BG_CREAM, fontSize: BTN_FONT, lineHeight: BTN_FONT + 6, fontWeight: '800' },
});
