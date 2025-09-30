import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { useCart } from './CartContext';
import { commonStyles, buttonStyles } from '../styles/commonStyles';
import { formatPrice } from './prices';

export default function CartScreen() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const lineTotal = (item: { price: number; quantity: number }) => item.price * item.quantity;
  const cartTotal = cart.reduce((sum, item) => sum + lineTotal(item), 0);

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[commonStyles.heading, { marginBottom: 20 }]}>Your Cart</Text>

        {cart.length === 0 ? (
          <>
            <Text style={commonStyles.text}>Your cart is empty.</Text>
            <TouchableOpacity
              style={[buttonStyles.primary, { marginTop: 16 }]}
              onPress={() => router.push('/shop')}
            >
              <Text style={commonStyles.buttonText}>Go to Shop</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {cart.map((item) => (
              <View
                key={item.id}
                style={{
                  padding: 16,
                  borderWidth: 1,
                  borderColor: '#ddd',
                  borderRadius: 8,
                  marginBottom: 12,
                }}
              >
                <Text style={commonStyles.textMedium}>{item.name}</Text>
                <Text style={[commonStyles.text, { marginTop: 6 }]}>
                  {formatPrice(lineTotal(item))}
                </Text>

                {/* Simple + / − and Remove */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
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
            ))}

            <View style={{ marginTop: 20 }}>
              <Text style={commonStyles.textMedium}>
                Total: {formatPrice(cartTotal)}
              </Text>
            </View>

            <TouchableOpacity
              style={[buttonStyles.primary, { marginTop: 20 }]}
              onPress={() => alert('Checkout coming soon')}
            >
              <Text style={commonStyles.buttonText}>Proceed to Checkout</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[buttonStyles.secondary, { marginTop: 10 }]}
              onPress={clearCart}
            >
              <Text style={commonStyles.buttonText}>Clear Cart</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
