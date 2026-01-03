// app/cart.tsx
'use client';

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';
import { useCart } from './CartContext';

const FREE_SHIP_THRESHOLD = 50;
const SHIPPING_FLAT = 6.99;
const TAX_RATE = 0.08;

export default function CartScreen() {
  const { items, updateQty, removeItem, clearCart, subtotal } = useCart();

  const shipping = subtotal >= FREE_SHIP_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FLAT;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  const hasItems = items.length > 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fdf6ec' }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 64 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Your Cart</Text>

        {!hasItems ? (
          <>
            <Text style={{ marginTop: 8 }}>Your cart is empty.</Text>
            <Link href="/shop" asChild>
              <TouchableOpacity style={[styles.btn, styles.btnPrimary, { marginTop: 16 }]}>
                <Text style={styles.btnPrimaryText}>Go to Shop</Text>
              </TouchableOpacity>
            </Link>
          </>
        ) : (
          <>
            {/* Items */}
            {items.map((it) => (
              <View key={it.id} style={styles.itemRow}>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Text style={styles.itemName} numberOfLines={1}>
                    Basil Tea — {it.sizeKey}
                  </Text>
                  <Text style={styles.itemMeta}>{it.pack}-pack • ${it.unitPrice.toFixed(2)} per bottle</Text>
                </View>

                {/* qty controls */}
                <View style={styles.qtyWrap}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQty(it.id, Math.max(1, it.qty - 1))}
                    accessibilityLabel="Decrease quantity"
                  >
                    <Text style={styles.qtyBtnText}>−</Text>
                  </TouchableOpacity>

                  <Text style={styles.qtyValue}>{it.qty}</Text>

                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQty(it.id, Math.min(99, it.qty + 1))}
                    accessibilityLabel="Increase quantity"
                  >
                    <Text style={styles.qtyBtnText}>+</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ alignItems: 'flex-end', marginLeft: 10 }}>
<Text style={styles.lineTotal}>${(it.unitPrice * it.pack * it.qty).toFixed(2)}</Text>
                  <TouchableOpacity onPress={() => removeItem(it.id)}>
                    <Text style={styles.remove}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {/* Totals */}
            <View style={{ height: 10 }} />
            <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            <Row label="Shipping" value={shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`} />
            <Row label={`Tax (${Math.round(TAX_RATE * 100)}%)`} value={`$${tax.toFixed(2)}`} />
            <Row label="Total" value={`$${total.toFixed(2)}`} bold />

            {/* Free shipping nudge */}
            {subtotal < FREE_SHIP_THRESHOLD && subtotal > 0 && (
              <Text style={styles.freeMsg}>
                Add ${(FREE_SHIP_THRESHOLD - subtotal).toFixed(2)} more to get FREE shipping 🎉
              </Text>
            )}
            {subtotal >= FREE_SHIP_THRESHOLD && subtotal > 0 && (
              <Text style={[styles.freeMsg, { color: '#0b3d2e' }]}>
                You unlocked FREE shipping! You saved ${SHIPPING_FLAT.toFixed(2)} 🎉
              </Text>
            )}

           {/* Actions */}
<Link href="/checkout" asChild>
  <TouchableOpacity style={[styles.btn, styles.btnPrimary]}>
    <Text style={styles.btnPrimaryText}>Checkout</Text>
  </TouchableOpacity>
</Link>

<TouchableOpacity
  style={[styles.btn, styles.btnGhost]}
  onPress={() => {
    clearCart();
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("cart");
    }
  }}
>
  <Text style={styles.btnGhostText}>Reset Cart</Text>
</TouchableOpacity>

              
            <Link href="/shop" asChild>
              <TouchableOpacity style={[styles.btn, styles.btnGhost]}>
                <Text style={styles.btnGhostText}>Continue Shopping</Text>
              </TouchableOpacity>
            </Link>
          </>
        )}
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
  title: { fontSize: 22, fontWeight: '800' },

  itemRow: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemName: { fontSize: 16, fontWeight: '700' },
  itemMeta: { fontSize: 13, color: '#555' },

  qtyWrap: { flexDirection: 'row', alignItems: 'center', gap: 8, marginLeft: 8 },
  qtyBtn: {
    width: 32, height: 32, borderRadius: 8,
    borderWidth: 1, borderColor: '#1f5134',
    alignItems: 'center', justifyContent: 'center',
  },
  qtyBtnText: { fontSize: 18, fontWeight: '800', color: '#1f5134' },
  qtyValue: { width: 28, textAlign: 'center', fontSize: 16, fontWeight: '700' },

  lineTotal: { fontSize: 16, fontWeight: '800' },
  remove: { textDecorationLine: 'underline', marginTop: 2 },

  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  rowLabel: { fontSize: 16 },
  rowValue: { fontSize: 16 },
  rowBold: { fontWeight: '800' },

  freeMsg: { marginTop: 10, color: '#b38c2c', fontWeight: '700' },

  btn: { padding: 12, borderRadius: 10, marginTop: 10, alignItems: 'center', justifyContent: 'center' },
  btnPrimary: { backgroundColor: '#1f5134' },
  btnPrimaryText: { color: 'white', fontWeight: '800' },
  btnGhost: { borderColor: '#1f5134', borderWidth: 1, backgroundColor: 'transparent' },
  btnGhostText: { color: '#1f5134', fontWeight: '700' },
});
