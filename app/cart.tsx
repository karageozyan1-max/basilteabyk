import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const BG_CREAM = '#fdfcf5';
const GREEN = '#0b3d2e';
const BORDER = '#e4dccf';

export default function CartScreen() {
  const router = useRouter();
  const [cart, setCart] = useState<
    { id: string; name: string; size: string; pack: string; qty: number; price: number }[]
  >([]);

  // Example of adding item (in reality this should come from context or props)
  const addItem = (item: { name: string; size: string; pack: string; qty: number; price: number }) => {
    setCart((prev) => {
      // check if same product (size + pack) already exists
      const index = prev.findIndex(
        (p) => p.name === item.name && p.size === item.size && p.pack === item.pack
      );
      if (index >= 0) {
        // update quantity if already exists
        const updated = [...prev];
        updated[index].qty += item.qty;
        return updated;
      }
      // else add new line item
      return [...prev, { ...item, id: Date.now().toString() }];
    });
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_CREAM }}>
      <ScrollView
        contentContainerStyle={{ padding: 18, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Your Cart</Text>

        {cart.length === 0 ? (
          <Text style={styles.empty}>Your cart is empty</Text>
        ) : (
          cart.map((item) => (
            <View key={item.id} style={styles.itemBox}>
              <Text style={styles.itemText}>
                {item.qty} × {item.size} {item.pack} {item.name}
              </Text>
              <Text style={styles.itemPrice}>${item.price * item.qty}</Text>
            </View>
          ))
        )}

        {/* Total */}
        <View style={styles.totalBox}>
          <Text style={styles.totalText}>Total: ${getTotal()}</Text>
        </View>

        {/* Checkout Button */}
        <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push('/checkout')}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: '800',
    color: GREEN,
    marginBottom: 16,
  },
  empty: {
    fontSize: 16,
    color: '#444',
  },
  itemBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '600',
    color: GREEN,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: GREEN,
  },
  totalBox: {
    marginTop: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '800',
    color: GREEN,
  },
  checkoutBtn: {
    marginTop: 20,
    backgroundColor: GREEN,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: BG_CREAM,
    fontWeight: '700',
    fontSize: 16,
  },
});
