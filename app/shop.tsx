// app/shop.tsx
'use client';

import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SIZE_PRICES } from './prices';
import { useCart, SizeKey } from './CartContext';

const BG_CREAM = '#fdf6ec';
const GREEN = '#0b3d2e';
const GOLD  = '#c7a45a';
const BORDER = '#eadccf';

const PACK_OPTIONS = [2, 6, 12];

const { width } = Dimensions.get('window');
const isPhone = width < 768;
const isSmallPhone = width < 380;

// responsive sizing (small phone / phone / desktop)
const BTN_FONT  = isSmallPhone ? 13.5 : isPhone ? 14.5 : 16;
const BTN_H     = isSmallPhone ? 44   : isPhone ? 48   : 52;

// a width that scales with the viewport, but never too tiny
// -> prevents cut off on desktop, still fits on phones
const BTN_MIN_W =
  Math.max(
    isSmallPhone ? 160 : isPhone ? 176 : 240,
    Math.floor(width * (isPhone ? 0.48 : 0.26)) // ~48% on phone rows, ~26% on desktop rows
  );

// Footer in _layout.tsx is 50px; add a little buffer
const FOOTER_PAD = 64;

export default function ShopScreen() {
  const router = useRouter();
  const { addItem } = useCart();

  const [size, setSize] = useState<SizeKey>('8oz');
  const [pack, setPack] = useState<number>(PACK_OPTIONS[0]);
  const [qty, setQty]   = useState<number>(1);

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
          {/* top-right Cart button */}
          <View style={styles.topBar}>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.headerCartBtn} onPress={() => router.push('/cart')}>
              <Text style={{ color: GREEN, fontWeight: '700' }}>Cart</Text>
            </TouchableOpacity>
          </View>

          {/* hero image + short text */}
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
            <Choice label="8 oz"  selected={size === '8oz'}  onPress={() => setSize('8oz')} />
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
            <QtyBtn label="–" onPress={() => setQty((q) => Math.max(1, q - 1))} />
            <Text style={styles.qtyText}>{qty}</Text>
            <QtyBtn label="+" onPress={() => setQty((q) => Math.min(99, q + 1))} />
          </View>

          {/* Price + CTA */}
          <View style={{ marginTop: 8, alignItems: 'center' }}>
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

/* small components */

function Choice({ label, selected, onPress }: {
  label: string; selected: boolean; onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.choiceBtn, selected && styles.choiceBtnSelected]}
      accessibilityState={{ selected }}
      activeOpacity={0.8}
    >
      <Text
        style={[styles.choiceText, selected && styles.choiceTextSelected]}
        numberOfLines={1}
        ellipsizeMode="clip"
        allowFontScaling={true}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function QtyBtn({ label, onPress }:{ label: string; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.qtyBtn}>
      <Text style={styles.qtyBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

/* styles */

const styles = StyleSheet.create({
  card: {
    backgroundColor: BG_CREAM,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: BORDER,
    maxWidth: 980,
    alignSelf: 'center',
    width: '100%',
  },

  topBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
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

  heroRow: {
    flexDirection: isPhone ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: isPhone ? 6 : 14,
    marginBottom: 8,
  },
  heroImage: {
    width: isPhone ? '100%' : 380,
    height: isPhone ? 240 : 320,
    alignSelf: 'center',
  },
  heroText: { flex: 1, alignItems: isPhone ? 'center' : 'flex-start' },

  title: {
    fontSize: isPhone ? 22 : 26,
    fontWeight: '800',
    color: '#fff',
    backgroundColor: GREEN,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  subtitle: {
    marginTop: 6,
    color: GOLD,
    fontSize: isPhone ? 14 : 15,
    fontWeight: '700',
    textAlign: isPhone ? 'center' : 'left',
  },
  desc: {
    marginTop: 4,
    color: '#3b3b3b',
    fontSize: isPhone ? 13 : 14,
    lineHeight: isPhone ? 18 : 20,
    textAlign: isPhone ? 'center' : 'left',
  },

  sectionTitle: { fontSize: 16, fontWeight: '800', color: GREEN, alignSelf: 'center', marginTop: 8 },

  centerRow: {
    marginTop: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 12,
  },

  // —— smaller choice buttons (no clipping)
  choiceBtn: {
  minWidth: BTN_MIN_W,
  minHeight: BTN_H,            // ⬅️ was `height`; minHeight avoids vertical crop
  paddingHorizontal: 14,
  borderWidth: 1,
  borderColor: GREEN,
  borderRadius: 10,
  backgroundColor: BG_CREAM,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  overflow: 'visible',         // be lenient
},
choiceBtnSelected: { backgroundColor: GREEN, borderColor: GREEN },

choiceText: {
  fontSize: BTN_FONT,
  lineHeight: Math.round(BTN_FONT * 1.35), // more headroom
  fontWeight: '700',
  color: GREEN,
  textAlign: 'center',
  includeFontPadding: true,    // ⬅️ turn ON to stop ascender/descender clipping
},
choiceTextSelected: { color: BG_CREAM },

  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 12, justifyContent: 'center', marginTop: 4 },
  qtyBtn: {
    height: BTN_H - 6,
    width: BTN_H - 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: GREEN,
  },
  qtyBtnText: { color: BG_CREAM, fontSize: BTN_FONT + 2, lineHeight: BTN_FONT + 6, fontWeight: '800' },
  qtyText: { minWidth: 30, textAlign: 'center', fontSize: BTN_FONT, lineHeight: BTN_FONT + 4, fontWeight: '800', color: GREEN },

  priceValue: { fontSize: isSmallPhone ? 20 : 22, fontWeight: '900', color: GREEN },
  note: { fontSize: isSmallPhone ? 12 : 13, color: GOLD, marginTop: 2 },

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
  primaryBtnText: { color: BG_CREAM, fontSize: BTN_FONT, lineHeight: BTN_FONT + 4, fontWeight: '800' },
});
