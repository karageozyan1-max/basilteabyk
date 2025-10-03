import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useCart } from './CartContext';

const FREE_SHIP_THRESHOLD = 50;
const SHIPPING_FLAT = 6.99;
const TAX_RATE = 0.08;

export default function CheckoutScreen() {
  const router = useRouter();
  const { items, subtotal } = useCart();

  const shipping = subtotal >= FREE_SHIP_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FLAT;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;
  const hasItems = items.length > 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fdf6ec' }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 64 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Checkout</Text>

        {!hasItems ? (
          <>
            <Text style={{ color: '#b38c2c', marginTop: 6 }}>Your cart is empty.</Text>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/shop')}>
              <Text style={styles.primaryBtnText}>Go to Shop</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.back()}>
              <Text style={styles.secondaryBtnText}>Back</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {items.map((it, idx) => (
              <View key={idx} style={styles.itemRow}>
                <Image source={require('../assets/images/basil-bottle.png')} style={{ width: 64, height: 64, borderRadius: 8, marginRight: 10 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemName}>Basil Tea — {it.sizeKey}</Text>
                  <Text style={styles.itemPrice}>${it.unitPrice.toFixed(2)} × {it.qty} = ${(it.unitPrice * it.qty).toFixed(2)}</Text>
                </View>
              </View>
            ))}

            <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            <Row label="Shipping" value={shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`} />
            <Row label={`Tax (${Math.round(TAX_RATE * 100)}%)`} value={`$${tax.toFixed(2)}`} />
            <Row label="Total" value={`$${total.toFixed(2)}`} bold />

            {subtotal >= FREE_SHIP_THRESHOLD && (
              <Text style={styles.freeMsg}>You unlocked FREE shipping! You saved ${SHIPPING_FLAT.toFixed(2)} 🎉</Text>
            )}

            <TouchableOpacity style={styles.primaryBtn} onPress={() => router.replace('/order-success')}>
              <Text style={styles.primaryBtnText}>Place Order</Text>
            </TouchableOpacity>
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
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  itemName: { fontSize: 16, fontWeight: '600' },
  itemPrice: { fontSize: 14, color: '#333' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  rowLabel: { fontSize: 16 },
  rowValue: { fontSize: 16 },
  rowBold: { fontWeight: '700' },
  freeMsg: { marginTop: 10, color: '#0b3d2e', fontWeight: '700' },
  primaryBtn: { backgroundColor: '#1f5134', padding: 12, borderRadius: 8, marginTop: 16 },
  primaryBtnText: { color: 'white', textAlign: 'center', fontWeight: '700' },
  secondaryBtn: { borderWidth: 1, borderColor: '#1f5134', padding: 12, borderRadius: 8, marginTop: 8 },
  secondaryBtnText: { color: '#1f5134', textAlign: 'center', fontWeight: '700' },
});
