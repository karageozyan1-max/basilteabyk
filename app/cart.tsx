// app/cart.tsx
'use client';

import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useCart } from './CartContext';

const BG_CREAM = '#fdf6ec';
const GREEN = '#0b3d2e';
const GOLD = '#c7a45a';
const BORDER = '#eadccf';

const { width } = Dimensions.get('window');
const isSmall = width < 380;
const BTN_H = isSmall ? 42 : 48;
const FOOTER_PAD = 70; // space so sticky footer never covers totals

export default function CartPage() {
  const router = useRouter();
  const { items, updateQty, removeItem, clearCart, subtotal } = useCart();

  const FREE_SHIP_THRESHOLD = 50;
  const SHIPPING_FLAT = 6.99;
  const TAX_RATE = 0.08;

  const shipping = subtotal === 0 || subtotal >= FREE_SHIP_THRESHOLD ? 0 : SHIPPING_FLAT;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  const hasItem = items.length > 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_CREAM }}>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: FOOTER_PAD }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Your Cart</Text>

          {!hasItem ? (
            <>
              <Text style={{ color: GOLD, marginTop: 8 }}>Your cart is empty.</Text>
              <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/shop')}>
                <Text style={styles.primaryBtnText}>Go to Shop</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* Items */}
              {items.map((i) => (
                <View key={i.id} style={styles.itemRow}>
                  <Image
                    source={require('../assets/images/basil-bottle.png')}
                    style={{ width: 56, height: 56, borderRadius: 8, marginRight: 10 }}
                    resizeMode="cover"
                  />
                  {/* IMPORTANT: minWidth:0 and flexShrink prevent vertical letters */}
                  <View style={styles.itemCol}>
                    <Text style={styles.itemName} numberOfLines={2}>
                      Basil Tea — {i.size}
                    </Text>
                    <Text style={styles.itemMeta} numberOfLines={2}>
                      {i.pack}-pack • ${i.unitPrice.toFixed(2)} per bottle
                    </Text>

                    <View style={styles.qtyRow}>
                      <QtyBtn onPress={() => updateQty(i.id, i.qty - 1)} label="–" />
                      <Text style={styles.qtyText}>{i.qty}</Text>
                      <QtyBtn onPress={() => updateQty(i.id, i.qty + 1)} label="+" />
                      <TouchableOpacity onPress={() => removeItem(i.id)} style={{ marginLeft: 8 }}>
                        <Text style={{ color: '#a33', fontWeight: '700' }}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text style={styles.itemPrice}>
                    ${(i.unitPrice * i.pack * i.qty).toFixed(2)}
                  </Text>
                </View>
              ))}

              {/* Totals */}
              <View style={{ height: 10 }} />
              <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <Row label="Shipping" value={shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`} />
              <Row label={`Tax (8%)`} value={`$${tax.toFixed(2)}`} />
              <View style={{ height: 6 }} />
              <Row label="Total" value={`$${total.toFixed(2)}`} bold />

              {/* Free shipping hint */}
              {subtotal < FREE_SHIP_THRESHOLD && subtotal > 0 && (
                <Text style={{ color: GOLD, marginTop: 6, fontWeight: '700' }}>
                  Add ${(FREE_SHIP_THRESHOLD - subtotal).toFixed(2)} more to get FREE shipping 🎉
                </Text>
              )}

              {/* Actions */}
              <TouchableOpacity
                style={[styles.primaryBtn, { marginTop: 12 }]}
                onPress={() => router.push('/checkout')}
              >
                <Text style={styles.primaryBtnText}>Checkout</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.push('/shop')}>
                <Text style={styles.secondaryBtnText}>Continue Shopping</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryBtn} onPress={() => clearCart()}>
                <Text style={styles.secondaryBtnText}>Clear Cart</Text>
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

function QtyBtn({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.qtyBtn}>
      <Text style={styles.qtyBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

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

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    gap: 6,
  },

  // Middle column — the key to avoid vertical letters on mobile
  itemCol: {
    flex: 1,
    minWidth: 0,         // allow measuring available width correctly
    alignSelf: 'stretch',
  },

  itemName: { fontSize: 16, fontWeight: '700', color: GREEN, flexShrink: 1 },
  itemMeta: { fontSize: 13, color: GOLD, marginTop: 2, flexShrink: 1 },

  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: GREEN,
    marginLeft: 6,
    textAlign: 'right',
  },

  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  qtyBtn: {
    height: 36,
    width: 36,
    borderRadius: 8,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: { color: BG_CREAM, fontSize: 18, fontWeight: '800' },
  qtyText: { width: 30, textAlign: 'center', fontSize: 16, fontWeight: '800', color: GREEN },

  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 4 },
  rowLabel: { fontSize: 14, color: '#333' },
  rowValue: { fontSize: 14, color: '#333' },
  rowBold: { fontWeight: '800', color: GREEN },

  primaryBtn: {
    height: BTN_H,
    borderRadius: 10,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: { color: BG_CREAM, fontWeight: '700' },

  secondaryBtn: {
    marginTop: 10,
    height: BTN_H,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: GREEN,
    backgroundColor: BG_CREAM,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: { fontWeight: '700', color: GREEN },
});
