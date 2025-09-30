// app/cart.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useCart } from './CartContext';

const fmt = (n: number) => `$${n.toFixed(2)}`;

export default function CartScreen() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const lineTotal = (item: { price: number; quantity: number }) => item.price * item.quantity;
  const cartTotal = cart.reduce((sum, item) => sum + lineTotal(item), 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 26, fontWeight: '700', marginBottom: 16 }}>Your Cart</Text>

        {cart.length === 0 ? (
          <>
            <Text>Your cart is empty.</Text>
            <TouchableOpacity
              style={{
                marginTop: 12, padding: 12, backgroundColor: '#0f3d2e',
                borderRadius: 8, alignItems: 'center',
              }}
              onPress={() => router.push('/shop')}
            >
              <Text style={{ color: '#fff', fontWeight: '700' }}>Go to Shop</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {cart.map((item) => (
              <View
                key={item.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 12,
                  borderRadius: 8,
                  backgroundColor: '#f6f6f6',
                  marginBottom: 12,
                }}
              >
                {/* Product Image */}
                <Image
                  source={require('../assets/images/a5103974-aee6-415a-9faa-72b606dfcdca.png')}
                  style={{ width: 70, height: 70, borderRadius: 8, marginRight: 12 }}
                  resizeMode="cover"
                />

                {/* Details */}
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '700', marginBottom: 6 }}>{item.name}</Text>
                  <Text style={{ marginBottom: 8 }}>{fmt(lineTotal(item))}</Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      style={{ paddingVertical: 6, paddingHorizontal: 12, borderWidth: 1, borderRadius: 6, marginRight: 8 }}
                    >
                      <Text>−</Text>
                    </TouchableOpacity>
                    <Text style={{ minWidth: 28, textAlign: 'center' }}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{ paddingVertical: 6, paddingHorizontal: 12, borderWidth: 1, borderRadius: 6, marginLeft: 8 }}
                    >
                      <Text>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeFromCart(item.id)} style={{ marginLeft: 12 }}>
                      <Text style={{ color: '#cc3333' }}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}

            {/* Continue shopping */}
            <TouchableOpacity
              style={{
                marginTop: 4, padding: 12, borderWidth: 1, borderRadius: 8, alignItems: 'center',
              }}
              onPress={() => router.push('/shop')}
            >
              <Text>Continue Shopping</Text>
            </TouchableOpacity>

            {/* Cart total */}
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: '700' }}>
                Total: {fmt(cartTotal)}
              </Text>
            </View>

            {/* Proceed to checkout */}
            <TouchableOpacity
              style={{
                marginTop: 12, padding: 14, backgroundColor: '#0f3d2e',
                borderRadius: 10, alignItems: 'center',
              }}
              onPress={() => router.push('/checkout')}
            >
              <Text style={{ color: '#fff', fontWeight: '700' }}>Proceed to Checkout</Text>
            </TouchableOpacity>

            {/* Clear cart */}
            <TouchableOpacity
              style={{ marginTop: 10, padding: 12, borderWidth: 1, borderRadius: 8, alignItems: 'center' }}
              onPress={clearCart}
            >
              <Text>Clear Cart</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
