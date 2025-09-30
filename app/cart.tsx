import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useCart } from './CartContext';
import { formatPrice } from './prices';

export default function CartScreen() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= 25 ? 0 : 4.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', marginBottom: 12 }}>Your Cart</Text>

        {cartItems.length === 0 ? (
          <>
            <Text>Your cart is empty.</Text>
            <TouchableOpacity onPress={() => router.push('/shop')} style={{ marginTop: 12 }}>
              <Text style={{ color: '#0f3d2e' }}>Go to Shop</Text>
            </TouchableOpacity>
          </>
        ) : (
          cartItems.map(item => (
            <View key={item.id} style={{ padding: 12, borderRadius: 8, backgroundColor: '#f6f6f6', marginBottom: 10 }}>
              <Text style={{ fontWeight: '600' }}>
                {item.packSize} × {item.size} {item.name}
              </Text>
              <Text>{formatPrice(item.price)} each</Text>

              <View style={{ flexDirection: 'row', marginTop: 8 }}>
                <TouchableOpacity onPress={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}>
                  <Text style={{ marginRight: 12 }}>–</Text>
                </TouchableOpacity>
                <Text>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                  <Text style={{ marginLeft: 12 }}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeFromCart(item.id)} style={{ marginLeft: 16 }}>
                  <Text style={{ color: '#cc3333' }}>Remove</Text>
                </TouchableOpacity>
              </View>

              <Text style={{ marginTop: 6, fontWeight: '600' }}>
                Line total: {formatPrice(item.price * item.quantity)}
              </Text>
            </View>
          ))
        )}

        <View style={{ marginTop: 16 }}>
          <Text>Subtotal: {formatPrice(subtotal)}</Text>
          <Text>Shipping: {formatPrice(shipping)}</Text>
          <Text>Tax (8%): {formatPrice(tax)}</Text>
          <Text style={{ fontWeight: '700', marginTop: 6 }}>Total: {formatPrice(total)}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
