'use client';

import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SIZE_PRICES } from './prices';

// Colors to match Home page
const BG_CREAM = '#fdf6ec';
const GREEN = '#0b3d2e';
const GOLD = '#c7a45a';

const FOOTER_HEIGHT = 64;

type SizeKey = '8oz' | '12oz';
const PACK_OPTIONS = [2, 6, 12]; // buttons stay like you had them

export default function ShopScreen() {
  const router = useRouter();

  const [size, setSize] = useState<SizeKey>('8oz');
  const [pack, setPack] = useState<number>(PACK_OPTIONS[0]);

  const totalPrice = useMemo(() => SIZE_PRICES[size] * pack, [size, pack]);

  function goToCart() {
    // same behavior as before: pass selection to /cart via query params
    router.push({ pathname: '/cart', params: { size, pack: String(pack) } });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_CREAM }}>
      {/* Add bottom padding so content doesn't hide behind sticky footer */}
      <ScrollView contentContainerStyle={[styles.page, { paddingBottom: FOOTER_HEIGHT + 20 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Image
              source={require('../assets/images/basil-bottle.png')}
              style={{ width: 80, height: 80, marginRight: 12 }}
              resizeMode="contain"
            />
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={styles.title}>Shop — Basil Tea by K</Text>
              {/* ✅ wrap-friendly subtitle so it never turns vertical */}
              <Text style={styles.subtitle}>Honey-infused basil tea in glass bottles</Text>
            </View>

            <TouchableOpacity style={styles.headerCartBtn} onPress={() => router.push('/cart')}>
              <Text style={{ color: GREEN, fontWeight: '700' }}>Cart</Text>
            </TouchableOpacity>
          </View>

          {/* Size (kept exactly like before) */}
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.btnRow}>
            <Choice label="8 oz"  selected={size === '8oz'}  onPress={() => setSize('8oz')} />
            <Choice label="12 oz" selected={size === '12oz'} onPress={() => setSize('12oz')} />
          </View>

          {/* Pack (kept like before) */}
          <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Pack</Text>
          <View style={styles.btnRow}>
            {PACK_OPTIONS.map((p) => (
              <Choice key={p} label={`${p}-pack`} selected={pack === p} onPress={() => setPack(p)} />
            ))}
          </View>

          {/* Price + CTA */}
          <View style={{ marginVertical: 12 }}>
            <Text style={styles.priceValue}>${totalPrice.toFixed(2)}</Text>
            <Text style={styles.note}>{pack}-pack • {size}</Text>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={goToCart}>
            <Text style={styles.primaryBtnText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ⭐ Sticky footer always visible */}
      <View
        style={[
          styles.footer,
          Platform.select({
            web: { position: 'fixed' as const },
            default: { position: 'absolute' as const },
          }),
        ]}
      >
        <FooterLink label="Home" onPress={() => router.push('/')} />
        <FooterLink label="Shop" onPress={() => router.push('/shop')} />
        <FooterLink label="FAQs" onPress={() => router.push('/faqs')} />
        <FooterLink label="Our Story" onPress={() => router.push('/story')} />
        <FooterLink label="Contact" onPress={() => router.push('/contact')} />
      </View>
    </SafeAreaView>
  );
}

function Choice({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.choiceBtn, selected && styles.choiceBtnSelected]}
      accessibilityState={{ selected }}
    >
      <Text style={[styles.choiceText, selected && styles.choiceTextSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

function FooterLink({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.footerBtn}>
      <Text style={styles.footerText}>{label}</Text>
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
  },

  headerRow: { flexDirection: 'row', alignItems: 'center' },

  title: { fontSize: 22, fontWeight: '800', color: '#ffffff', backgroundColor: GREEN, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start' },

  // gold subtitle, never vertical
  subtitle: {
    marginTop: 6,
    color: GOLD,
    flexShrink: 1,
    minWidth: 0,
    flexWrap: 'wrap',
    textAlign: 'left',
    fontSize: 15,
    fontWeight: '600',
  },

  headerCartBtn: {
    paddingVertical: 8, paddingHorizontal: 10,
    borderWidth: 1, borderColor: '#eadccf', borderRadius: 10,
    backgroundColor: BG_CREAM,
    alignItems: 'center', justifyContent: 'center', minWidth: 58,
  },

  sectionTitle: { fontSize: 14, fontWeight: '700', marginTop: 6, color: GREEN },

  // your buttons kept the same look (2 per row; 3rd wraps)
  btnRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  choiceBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: GREEN,
    borderRadius: 10,
    backgroundColor: BG_CREAM,
    width: '48%',
    alignItems: 'center',
  },
  choiceBtnSelected: { backgroundColor: GREEN, borderColor: GREEN },
  choiceText: { fontSize: 13, fontWeight: '600', color: GREEN },
  choiceTextSelected: { color: BG_CREAM },

  priceValue: { fontSize: 22, fontWeight: '800', color: GREEN },
  note: { fontSize: 12, color: GOLD, marginTop: 2 },

  primaryBtn: { marginTop: 6, paddingVertical: 12, borderRadius: 10, backgroundColor: GREEN, alignItems: 'center' },
  primaryBtnText: { color: BG_CREAM, fontSize: 15, fontWeight: '700' },

  // sticky footer (cream + green)
  footer: {
    bottom: 0, left: 0, right: 0,
    height: FOOTER_HEIGHT,
    backgroundColor: BG_CREAM,
    borderTopWidth: 1,
    borderTopColor: '#eadccf',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 999,
  },
  footerBtn: { paddingHorizontal: 8, paddingVertical: 6 },
  footerText: { fontSize: 14, fontWeight: '700', color: GREEN },
});
