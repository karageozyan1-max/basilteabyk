'use client';

import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SIZE_PRICES } from './prices';

const BG_CREAM = '#fdf6ec';
const GREEN = '#0b3d2e';
const GOLD = '#c7a45a';

const FOOTER_HEIGHT = 64;

type SizeKey = '8oz' | '12oz';

export default function CartPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ size?: string; pack?: string }>();

  const size: SizeKey = (params.size as SizeKey) || '8oz';
  const pack = (parseInt(params.pack || '0', 10) as number) || 0;

  const total = useMemo(() => {
    if (!pack) return 0;
    return SIZE_PRICES[size] * pack;
  }, [size, pack]);

  const hasItem = pack > 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_CREAM }}>
      <ScrollView contentContainerStyle={[styles.page, { paddingBottom: FOOTER_HEIGHT + 20 }]}>
        <View style={styles.card}>
          {hasItem ? (
            <>
              <View style={styles.headerRow}>
                <Image
                  source={require('../assets/images/basil-bottle.png')}
                  style={{ width: 72, height: 72, marginRight: 12 }}
                  resizeMode="contain"
                />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Text style={styles.title}>Your Cart</Text>
                  <Text style={styles.subtitle}>{pack}-pack • {size}</Text>
                </View>
              </View>

              <View style={{ marginTop: 14 }}>
                <Text style={styles.priceLabel}>Total</Text>
                <Text style={styles.priceValue}>${total.toFixed(2)}</Text>
              </View>

              <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/checkout')}>
                <Text style={styles.primaryBtnText}>Checkout</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.push('/shop')}>
                <Text style={styles.secondaryBtnText}>Continue Shopping</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.back()}>
                <Text style={styles.secondaryBtnText}>Back</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.title}>Your Cart</Text>
              <Text style={{ color: GOLD, marginTop: 6 }}>Your cart is empty.</Text>

              <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/shop')}>
                <Text style={styles.primaryBtnText}>Go to Shop</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.back()}>
                <Text style={styles.secondaryBtnText}>Back</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      {/* Sticky footer (matches Home colors) */}
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
  },

  headerRow: { flexDirection: 'row', alignItems: 'center' },

  title: { fontSize: 22, fontWeight: '800', color: '#ffffff', backgroundColor: GREEN, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start' },
  subtitle: { marginTop: 6, color: GOLD, flexShrink: 1, minWidth: 0, flexWrap: 'wrap', textAlign: 'left', fontWeight: '600' },

  priceLabel: { fontSize: 12, color: GOLD },
  priceValue: { fontSize: 22, fontWeight: '800', marginTop: 2, color: GREEN },

  primaryBtn: { marginTop: 16, paddingVertical: 12, borderRadius: 10, backgroundColor: GREEN, alignItems: 'center' },
  primaryBtnText: { color: BG_CREAM, fontSize: 15, fontWeight: '700' },

  secondaryBtn: { marginTop: 10, paddingVertical: 12, borderRadius: 10, borderWidth: 1, borderColor: GREEN, backgroundColor: BG_CREAM, alignItems: 'center' },
  secondaryBtnText: { fontSize: 15, fontWeight: '700', color: GREEN },

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
