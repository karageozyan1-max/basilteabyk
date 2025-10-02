import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useCart } from './CartContext';
import { useRouter } from 'expo-router';

export default function CartScreen() {
  const { cart, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 50 ? 0 : 4.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginBottom: 12,
      }}
    >
      <Image
        source={require('../assets/images/basil-bottle.png')}
        style={{ width: 60, height: 60, marginRight: 12 }}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text
          style={{ fontSize: 16, fontWeight: '500', flexShrink: 1 }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.quantity} × {item.size} Basil Tea with Honey
        </Text>
        <Text style={{ fontSize: 14, color: '#666' }}>
          ${item.price.toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.id)}>
        <Text style={{ color: 'red', fontSize: 14 }}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Your Cart</Text>

      {cart.length === 0 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, marginBottom: 12 }}>Your cart is empty.</Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#0a6847',
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 8,
            }}
            onPress={() => router.push('/shop')}
          >
            <Text style={{ color: 'white', fontSize: 16 }}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />

          <View style={{ marginTop: 20 }}>
            <Text>Subtotal: ${subtotal.toFixed(2)}</Text>
            <Text>Shipping: ${shipping.toFixed(2)}</Text>
            <Text>Tax (8%): ${tax.toFixed(2)}</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 8 }}>
              Total: ${total.toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#0a6847',
              paddingVertical: 14,
              borderRadius: 8,
              marginTop: 20,
              alignItems: 'center',
            }}
            onPress={() => router.push('/checkout')}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>Proceed to Checkout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginTop: 16,
              alignItems: 'center',
            }}
            onPress={clearCart}
          >
            <Text style={{ color: 'red' }}>Clear Cart</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
