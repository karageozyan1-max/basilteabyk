// app/shop.tsx
'use client';

import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SIZE_PRICES } from './prices';
import { useCart, SizeKey } from './CartContext';

// Theme colors
const BG_CREAM = '#fdf6ec';
const GREEN = '#0b3d2e';
const GOLD = '#c7a45a';
const BORDER = '#eadccf';

const PACK_OPTIONS = [2, 6, 12];

// Screen dimensions
const { width } = Dimensions.get('window');
const isPhone = width < 768;
const isSmallPhone = width < 380;

// Responsive sizing
const BTN_FONT = isSmallPhone ? 13.5 : isPhone ? 14.5 : 16;
const BTN_H = isSmallPhone ? 42 : isPhone ? 48 : 52;
const BTN_MIN_W = isSmallPhone ? 132 : isPhone ? 148 : 180;

// Footer padding
const FOOTER_PAD = 64;

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
        contentContainerStyle={{ padding: 18, paddingBottom: FOOTER_PAD }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/* Top-right cart button */}
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.headerCartBtn} onPress={() => router.push('/cart')}>
              <Text style={{ color: GREEN, fontWeight: '700' }}>Cart</Text>
            </TouchableOpacity>
          </View>

          {/* Hero image + text */}
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
                Lightly sweet and refreshing. Real basil brewed in small batches, balanced with honey.
              </Text>
            </View>
          </View>

          {/* Size */}
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.centerRow}>
            <Choice label="8 oz" selected={size === '8oz'} onPress={() => setSize('8oz')} />
            <Choice label="12 oz" selected={size === '12oz'} onPress={() => setSize('12oz')} />
          </View>

          {/* Pack */}
          <Text style={[styles.sectionTitle, { marginTop: 14 }]}>Pack</Text>
          <View style={styles.centerRow}>
            {PACK_OPTIONS.map((p) => (
              <Choice key={p} label={`${p}-pack`} selected={pack === p} onPress={() => setPack(p)} />
            ))}
          </View>

          {/* Quantity */}
          <Text style={[styles.sectionTitle, { marginTop: 14 }]}>Quantity</Text>
          <View style={styles.qtyRow}>
            <QtyBtn label="-" onPress={() => setQty(Math.max(1, qty - 1))} />
            <Text style={styles.qtyText}>{qty}</Text>
            <QtyBtn label="+" onPress={() => setQty(Math.min(99, qty + 1))} />
          </View>

          {/* Price + Add to Cart */}
          <View style={{ marginTop: 8, alignItems: 'center' }}>
            <Text style={styles.priceValue}>${total.toFixed(2)}</Text>
            <Text style={styles.note}>
              {qty} × {pack}-pack × {size}
            </Text>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={handleAddToCart}>
            <Text style={styles.primaryBtnText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Small components
function Choice({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
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

// Styles
const styles = StyleSheet.create({
  card: {
    backgroundColor: BG_CREAM,
    borderRadius: 14,
    padding: 16,
  },
  topBar: {
    alignItems: 'flex-end',
  },
  headerCartBtn: {
    padding: 6,
  },
  heroRow: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
  },
  heroImage: {
    width: 120,
    height: 120,
    marginRight: 12,
  },
  heroText: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: GREEN,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: GOLD,
    marginTop: 4,
  },
  desc: {
    fontSize: 14,
    color: GREEN,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: GREEN,
    marginTop: 10,
  },
  centerRow: {
    marginTop: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  choiceBtn: {
    minWidth: BTN_MIN_W,
    minHeight: BTN_H,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: GREEN,
    borderRadius: 10,
    backgroundColor: BG_CREAM,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceBtnSelected: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },
  choiceText: {
    fontSize: BTN_FONT,
    lineHeight: Math.round(BTN_FONT * 1.35),
    fontWeight: '700',
    color: GREEN,
    textAlign: 'center',
    includeFontPadding: true,
  },
  choiceTextSelected: {
    color: BG_CREAM,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'center',
    marginTop: 4,
  },
  qtyBtn: {
    height: BTN_H - 6,
    width: BTN_H - 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: GREEN,
  },
  qtyBtnText: {
    color: BG_CREAM,
    fontSize: BTN_FONT + 2,
    lineHeight: BTN_FONT + 6,
    fontWeight: '800',
  },
  qtyText: {
    minWidth: 30,
    textAlign: 'center',
    fontSize: BTN_FONT,
    lineHeight: BTN_FONT + 4,
    fontWeight: '800',
    color: GREEN,
  },
  priceValue: {
    fontSize: isSmallPhone ? 20 : 22,
    fontWeight: '900',
    color: GREEN,
  },
  note: {
    fontSize: isSmallPhone ? 12 : 13,
    color: GOLD,
    marginTop: 2,
  },
  primaryBtn: {
    marginTop: 8,
    height: BTN_H,
    borderRadius: 10,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 16,
  },
  primaryBtnText: {
    color: BG_CREAM,
    fontSize: BTN_FONT,
    lineHeight: BTN_FONT + 4,
    fontWeight: '800',
  },
});
