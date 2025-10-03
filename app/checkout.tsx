import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useCart } from './CartContext';

const FREE_SHIP_THRESHOLD = 50;
const SHIPPING_FLAT = 6.99;
const TAX_RATE = 0.08;

export default function CheckoutScreen() {
  const { items, subtotal, clearCart } = useCart();  // ✅ from context

  const shipping = subtotal >= 50 ? 0 : 6.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Your cart is empty.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Text style={styles.title}>Checkout</Text>

        {items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text>{item.sizeKey} – ${item.unitPrice.toFixed(2)}</Text>
            <Text>Qty: {item.qty}</Text>
          </View>
        ))}

        <View>
          <Text>Subtotal: ${subtotal.toFixed(2)}</Text>
          <Text>Shipping: ${shipping.toFixed(2)}</Text>
          <Text>Tax: ${tax.toFixed(2)}</Text>
          <Text style={{ fontWeight: 'bold' }}>Total: ${total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => {
            clearCart(); 
            router.replace('/order-success');
          }}
        >
          <Text style={styles.primaryBtnText}>Place Order</Text>
        </TouchableOpacity>
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
