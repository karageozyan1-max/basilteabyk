'use client';

import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SIZE_PRICES } from './prices';
import { useCart } from './CartContext';

// 🎨 Tweak these if your brand uses different shades
const CREAM_BG = '#FFF6E8';
const GREEN = '#2F7A57';

type SizeKey = '8oz' | '12oz';
const PACK_OPTIONS = [2, 6, 12];

export default function ShopScreen() {
  const router = useRouter();
  const { item } = useCart();
  const [size, setSize] = useState<SizeKey>('8oz');
  const [pack, setPack] = useState<number>(PACK_OPTIONS[0]);

  const totalPrice = useMemo(() => SIZE_PRICES[size] * pack, [size, pack]);
  const badgeCount = item?.qty ?? 0;

  function goToCart() {
    router.push({ pathname: '/cart', params: { size, pack: String(pack) } });
  }

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
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={styles.title}>Shop — Basil Tea by K</Text>
              {/* ✅ subtitle fixed so it wraps horizontally on phones */}
              <Text style={styles.subtitle}>Honey-infused basil tea in glass bottles</Text>
            </View>
            <TouchableOpacity style={styles.headerCartBtn} onPress={() => router.push('/cart')}>
              <Text style={{ color: '#111', fontWeight: '700' }}>Cart</Text>
              {badgeCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{badgeCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Size — kept exactly how you liked it */}
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.btnRow}>
            <Choice label="8 oz" selected={size === '8oz'} onPress={() => setSize('8oz')} />
            <Choice label="12 oz" selected={size === '12oz'} onPress={() => setSize('12oz')} />
          </View>

          {/* Pack — kept exactly how you liked it */}
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

        {/* ✅ Bottom nav that FOLLOWS the page (not fixed), in cream + green */}
        <View style={styles.followFooter}>
          <FooterLink label="Shop" onPress={() => router.push('/shop')} />
          <FooterLink label="FAQs" onPress={() => router.push('/faqs')} />
          <FooterLink label="Contact" onPress={() => router.push('/contact')} />
          <FooterLink label="Our Story" onPress={() => router.push('/story')} />
        </View>
      </ScrollView>
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
  page: { padding: 20, paddingBottom: 80 }, // extra space at bottom feels nice
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 18, borderWidth: 1, borderColor: '#e8e8e8', gap: 12 },

  headerRow: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '800', flexShrink: 1 },

  // ✅ key fix for vertical text: shrink + minWidth + wrap
  subtitle: {
    marginTop: 4,
    color: '#666',
    flexShrink: 1,
    minWidth: 0,
    flexWrap: 'wrap',
    textAlign: 'left',
  },

  headerCartBtn: {
    paddingVertical: 8, paddingHorizontal: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', minWidth: 58, position: 'relative',
  },
  badge: {
    position: 'absolute', top: -8, right: -8, backgroundColor: '#111', borderRadius: 9999,
    minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center',
  },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '800' },

  sectionTitle: { fontSize: 14, fontWeight: '700', marginTop: 6 },

  // 👇 your “perfect” buttons (unchanged)
  btnRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  choiceBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '48%',
    alignItems: 'center',
  },
  choiceBtnSelected: { backgroundColor: '#111', borderColor: '#111' },
  choiceText: { fontSize: 13, fontWeight: '600', color: '#111' },
  choiceTextSelected: { color: '#fff' },

  priceValue: { fontSize: 22, fontWeight: '800' },
  note: { fontSize: 12, color: '#888', marginTop: 2 },

  primaryBtn: { marginTop: 6, paddingVertical: 12, borderRadius: 10, backgroundColor: '#111', alignItems: 'center' },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },

  // 💛💚 cream + green footer that follows the page
  followFooter: {
    backgroundColor: CREAM_BG as any,
    borderTopWidth: 1,
    borderTopColor: '#eadccf',
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footerBtn: { paddingHorizontal: 8, paddingVertical: 6 },
  footerText: { fontSize: 14, fontWeight: '700', color: GREEN as any },
});
