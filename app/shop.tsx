'use client';

import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SIZE_PRICES } from './prices';
import { useCart, SizeKey } from './CartContext';

const BG_CREAM = '#faf0e6';
const GREEN = '#0b3d2e';
const GOLD = '#c7a45a';
const BORDER = '#eacdcf';

const PACK_OPTIONS = [2, 6, 12];

const { width } = Dimensions.get('window');
const isPhone = width < 768;
const isSmallPhone = width < 380;

const BTN_FONT = isSmallPhone ? 13.5 : isPhone ? 14.5 : 16;
const BTN_H = isSmallPhone ? 44 : isPhone ? 48 : 52;
const BTN_MIN_W = isSmallPhone ? 132 : isPhone ? 148 : 180;

const ShopScreen = () => {
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
        contentContainerStyle={{
          padding: 18,
          paddingBottom: 100, // room for footer so content can scroll
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* top-right cart button */}
        <View style={styles.topBar}>
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
          <QtyBtn label="–" onPress={() => setQty(Math.max(1, qty - 1))} />
          <Text style={styles.qtyBtnText}>{qty}</Text>
          <QtyBtn label="+" onPress={() => setQty(Math.min(99, qty + 1))} />
        </View>

        {/* Price + CTA */}
        <View style={{ marginTop: 8, alignItems: 'center' }}>
          <Text style={styles.priceValue}>${total.toFixed(2)}</Text>
          <Text style={styles.note}>({qty} × {pack}-pack · {size})</Text>
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={handleAddToCart}>
          <Text style={styles.primaryBtnText}>Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// ---------- Styles ----------
const styles = StyleSheet.create({
  topBar: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  headerCartBtn: {
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: GREEN,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroImage: {
    width: 120,
    height: 120,
    marginRight: 16,
  },
  heroText: { flex: 1 },
  title: { fontSize: 22, fontWeight: '800', color: GREEN, marginBottom: 6 },
  subtitle: { fontSize: 16, fontWeight: '600', color: GOLD, marginBottom: 4 },
  desc: { fontSize: 14, color: '#333' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: GREEN, marginBottom: 6 },
  centerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'center',
    marginTop: 6,
  },
  qtyBtn: {
    height: BTN_H,
    width: BTN_H,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GREEN,
    borderRadius: 6,
  },
  qtyBtnText: { fontSize: 18, fontWeight: '700', color: BG_CREAM, minWidth: 30, textAlign: 'center' },
  priceValue: { fontSize: 20, fontWeight: '700', color: GREEN },
  note: { fontSize: 13, color: '#666', marginTop: 4 },
  primaryBtn: {
    marginTop: 14,
    height: BTN_H,
    borderRadius: 10,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 24,
  },
  primaryBtnText: { color: BG_CREAM, fontSize: BTN_FONT + 2, fontWeight: '800' },
});

// ---------- Reusable Choice Component ----------
const Choice = ({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      minWidth: BTN_MIN_W,
      height: BTN_H,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: selected ? GREEN : BORDER,
      backgroundColor: selected ? GREEN : BG_CREAM,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text style={{ color: selected ? BG_CREAM : GREEN, fontSize: BTN_FONT, fontWeight: '700' }}>{label}</Text>
  </TouchableOpacity>
);

const QtyBtn = ({ label, onPress }: { label: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.qtyBtn} onPress={onPress}>
    <Text style={{ color: BG_CREAM, fontSize: 22, fontWeight: '800' }}>{label}</Text>
  </TouchableOpacity>
);

export default ShopScreen;
