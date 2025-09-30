import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useCart } from './CartContext';

const fmt = (n: number) => `$${n.toFixed(2)}`;

// Easy to tweak later:
const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_FLAT = 4.99;

export default function CheckoutScreen() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT; // ✅ Free shipping at $50+
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const placeOrder = () => {
    if (cart.length === 0) {
      Alert.alert('Cart is empty', 'Add something first 🙂');
      router.push('/shop');
      return;
    }
    clearCart();
    Alert.alert('Order placed!', 'Thank you for your purchase.', [
      { text: 'OK', onPress: () => router.replace('/shop') },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 26, fontWeight: '700', marginBottom: 16 }}>Checkout</Text>

        {/* Order summary */}
        <View style={{ padding: 12, borderRadius: 8, backgroundColor: '#f6f6f6' }}>
          {cart.length === 0 ? (
            <Text>Your cart is empty.</Text>
          ) : (
            cart.map((item) => (
              <View
                key={item.id}
                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}
              >
                {/* Product Image */}
                <Image
                  source={require('../assets/images/a5103974-aee6-415a-9faa-72b606dfcdca.png')}
                  style={{ width: 60, height: 60, borderRadius: 8, marginRight: 10 }}
                  resizeMode="cover"
                />
                {/* Details */}
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '600' }}>{item.name}</Text>
                  <Text>{fmt(item.price * item.quantity)}</Text>
                </View>
              </View>
            ))
          )}

          {/* Totals */}
          <View style={{ height: 8 }} />
          <Text>Subtotal: {fmt(subtotal)}</Text>
          <Text>Shipping: {fmt(shipping)}</Text>
          <Text>Tax (8%): {fmt(tax)}</Text>
          <Text style={{ marginTop: 6, fontWeight: '700' }}>Total: {fmt(total)}</Text>

          {/* Free shipping messages */}
          {subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
            <Text style={{ marginTop: 8, color: '#cc3333', fontWeight: '600' }}>
              Add {fmt(FREE_SHIPPING_THRESHOLD - subtotal)} more to get FREE shipping 🚚
            </Text>
          )}
          {subtotal >= FREE_SHIPPING_THRESHOLD && (
            <>
              <Text style={{ marginTop: 8, color: 'green', fontWeight: '700' }}>
                You unlocked FREE shipping! 🎉
              </Text>
              <Text style={{ marginTop: 4, color: '#666' }}>
                You saved {fmt(SHIPPING_FLAT)} on shipping.
              </Text>
            </>
          )}
        </View>

        {/* Actions */}
        <TouchableOpacity
          style={{ marginTop: 16, padding: 14, backgroundColor: '#0f3d2e', borderRadius: 10, alignItems: 'center' }}
          onPress={placeOrder}
        >
          <Text style={{ color: '#fff', fontWeight: '700' }}>Place Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: 10, padding: 12, borderWidth: 1, borderRadius: 8, alignItems: 'center' }}
          onPress={() => router.back()}
        >
          <Text>Back to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
