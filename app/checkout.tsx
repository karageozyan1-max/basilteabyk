'use client';

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useCart } from './CartContext'; // stays the same

const fmt = (n: number) => `$${n.toFixed(2)}`;

const FREE_SHIP_THRESHOLD = 50;
const SHIPPING_FLAT = 4.99;

export default function CheckoutScreen() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = cart.length === 0
    ? 0
    : subtotal >= FREE_SHIP_THRESHOLD
      ? 0
      : SHIPPING_FLAT;
  const tax = cart.length === 0 ? 0 : subtotal * 0.08; // example tax
  const total = subtotal + shipping + tax;

  function placeOrder() {
    // your real checkout goes here
    clearCart();
    router.replace('/order-success');
  }

  if (cart.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Text style={{ fontSize: 26, fontWeight: '700', marginBottom: 16 }}>
            Checkout
          </Text>
          <Text>Your cart is empty.</Text>
          <TouchableOpacity
            onPress={() => router.push('/shop')}
            style={{
              marginTop: 16,
              paddingVertical: 12,
              paddingHorizontal: 16,
              backgroundColor: '#111',
              borderRadius: 8,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '700' }}>Back to Shop</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 26, fontWeight: '700', marginBottom: 16 }}>
          Checkout
        </Text>

        {/* Items */}
        {cart.map((item) => (
          <View
            key={item.id}
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}
          >
            <Image
              source={require('../assets/images/basil-bottle.png')}
              style={{ width: 60, height: 60, borderRadius: 8, marginRight: 10 }}
              resizeMode="cover"
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600' }}>{item.name}</Text>
              <Text>{fmt(item.price)} × {item.quantity}</Text>
            </View>
            <Text style={{ marginLeft: 8, fontWeight: '700' }}>
              {fmt(item.price * item.quantity)}
            </Text>
          </View>
        ))}

        {/* Totals */}
        <View style={{ height: 8 }} />
        <Text>Subtotal: {fmt(subtotal)}</Text>
        <Text>Shipping: {fmt(shipping)}</Text>
        <Text>Tax: {fmt(tax)}</Text>
        <Text style={{ marginTop: 6, fontWeight: '700' }}>
          Total: {fmt(total)}
        </Text>

        {/* Free shipping messaging */}
        {subtotal < FREE_SHIP_THRESHOLD && (
          <Text style={{ marginTop: 8, color: '#e63333', fontWeight: '600' }}>
            Add {fmt(FREE_SHIP_THRESHOLD - subtotal)} more to get FREE shipping 🚚
          </Text>
        )}
        {subtotal >= FREE_SHIP_THRESHOLD && shipping === 0 && (
          <Text style={{ marginTop: 8, color: 'green', fontWeight: '700' }}>
            You unlocked FREE shipping! You saved {fmt(SHIPPING_FLAT)} 🎉
          </Text>
        )}

        {/* Actions */}
        <TouchableOpacity
          style={{
            marginTop: 16,
            paddingVertical: 12,
            backgroundColor: '#1a73e8',
            borderRadius: 8,
            alignItems: 'center',
          }}
          onPress={placeOrder}
        >
          <Text style={{ color: '#fff', fontWeight: '700' }}>Place Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginTop: 10,
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#ddd',
          }}
          onPress={() => router.back()}
        >
          <Text>Back to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
