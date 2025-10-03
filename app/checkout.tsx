'use client';

import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SIZE_PRICES } from './prices';

const BG_CREAM = '#fdf6ec';
const GREEN = '#0b3d2e';
const GOLD = '#c7a45a';

const { width } = Dimensions.get('window');
const isSmall = width < 380;
const BTN_H = isSmall ? 44 : 52;

type SizeKey = '8oz' | '12oz';

const FREE_SHIP_THRESHOLD = 50;
const SHIPPING_FLAT = 6.99;
const TAX_RATE = 0.08;

export default function CheckoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ size?: string; pack?: string; qty?: string }>();

  const size: SizeKey = (params.size as SizeKey) || '8oz';
  const pack = Math.max(0, parseInt(params.pack || '0', 10));
  const qty  = Math.max(1, parseInt(params.qty || '1', 10));

  const unit = SIZE_PRICES[size] ?? 0;
  const subtotal = useMemo(() => unit * pack * qty, [unit, pack, qty]);
  const shipping = useMemo(() => (subtotal >= FREE_SHIP_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FLAT), [subtotal]);
  const tax = useMemo(() => subtotal * TAX_RATE, [subtotal]);
  const total = useMemo(() => subtotal + shipping + tax, [subtotal, shipping, tax]);

  const hasItem = pack > 0 && qty > 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_CREAM }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 54 }} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.title}>Checkout</Text>

          {!hasItem ? (
            <>
              <Text style={{ color: GOLD, marginTop: 6 }}>Your cart is empty.</Text>

              <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/shop')}>
                <Text style={styles.primaryBtnText}>Go to Shop</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.back()}>
                <Text style={styles.secondaryBtnText}>Back</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* Item */}
              <View style={[styles.itemRow, { marginTop: 12 }]}>
                <Image
                  source={require('../assets/images/basil-bottle.png')}
                  style={{ width: 64, height: 64, borderRadius: 8, marginRight: 10 }}
                  resizeMode="cover"
                />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Text style={styles.itemName}>Basil Tea</Text>
                  <Text style={styles.itemMeta}>{qty} × {pack}-pack • {size}</Text>
                </View>
                <Text style={styles.itemPrice}>${unit.toFixed(2)}</Text>
              </View>

              {/* Totals */}
              <View style={{ height: 10 }} />
              <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <Row label="Shipping" value={shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`} />
              <Row label={`Tax (${Math.round(TAX_RATE * 100)}%)`} value={`$${tax.toFixed(2)}`} />
              <View style={{ height: 8 }} />
              <Row label="Total" value={`$${total.toFixed(2)}`} bold />

              {/* Free shipping message */}
              {subtotal < FREE_SHIP_THRESHOLD && subtotal > 0 && (
                <Text style={styles.freeMsg}>
                  Add ${(FREE_SHIP_THRESHOLD - subtotal).toFixed(2)} more to get FREE shipping 🎉
                </Text>
              )}
              {subtotal >= FREE_SHIP_THRESHOLD && (
                <Text style={[styles.freeMsg, { color: GREEN }]}>
                  You unlocked FREE shipping! You saved ${SHIPPING_FLAT.toFixed(2)} 🙌
                </Text>
              )}

              {/* Actions */}
              <TouchableOpacity style={styles.primaryBtn} onPress={() => router.replace('/order-success')}>
                <Text style={styles.primaryBtnText}>Place Order</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() => router.push({ pathname: '/cart', params: { size, pack: String(pack), qty: String(qty) } })}
              >
                <Text style={styles.secondaryBtnText}>Back to Cart</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.push('/shop')}>
                <Text style={styles.secondaryBtnText}>Continue Shopping</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, bold && styles.rowBold]}>{label}</Text>
      <Text style={[styles.rowValue, bold && styles.rowBold]}>{value}</Text>
    </View>
  );
}

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

  title: {
    fontSize: isSmall ? 18 : 22,
    fontWeight: '800',
    color: '#fff',
    backgroundColor: GREEN,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },

  itemRow: { flexDirection: 'row', alignItems: 'center' },
  itemName: { fontSize: isSmall ? 14 : 16, fontWeight: '700', color: GREEN },
  itemMeta: { fontSize: isSmall ? 12 : 13, color: GOLD, marginTop: 2, flexShrink: 1, minWidth: 0, flexWrap: 'wrap' },
  itemPrice: { fontSize: isSmall ? 14 : 16, fontWeight: '700', color: GREEN },

  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 4 },
  rowLabel: { fontSize: isSmall ? 13 : 14, color: '#333' },
  rowValue: { fontSize: isSmall ? 13 : 14, color: '#333' },
  rowBold: { fontWeight: '800', color: GREEN },

  freeMsg: { marginTop: 8, color: GOLD, fontWeight: '700' },

  primaryBtn: {
    marginTop: 14, height: BTN_H, borderRadius: 10, backgroundColor: GREEN,
    alignItems: 'center', justifyContent: 'center',
  },
  primaryBtnText: { color: BG_CREAM, fontSize: isSmall ? 14 : 15, fontWeight: '700' },

  secondaryBtn: {
    marginTop: 10, height: BTN_H, borderRadius: 10,
    borderWidth: 1, borderColor: GREEN, backgroundColor: BG_CREAM,
    alignItems: 'center', justifyContent: 'center',
  },
  secondaryBtnText: { fontSize: isSmall ? 14 : 15, fontWeight: '700', color: GREEN },
});
