import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import Icon from '../components/Icon';

import { useCart } from './CartContext';
import { formatPrice } from './prices';

export default function CartScreen() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 25 ? 0 : 4.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart is empty', 'Add something first 🙂');
      return;
    }
    Alert.alert('Checkout', 'Start your payment flow here.');
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <View style={[commonStyles.section, { flexDirection: 'row', alignItems: 'center', marginBottom: 8 }]}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={commonStyles.heading}>Your Cart</Text>
        </View>

        {/* Items */}
        {cartItems.length === 0 ? (
          <View style={[commonStyles.card, { padding: 20, alignItems: 'center' }]}>
            <Text style={commonStyles.text}>Your cart is empty.</Text>
            <TouchableOpacity
              style={[buttonStyles.primary, { marginTop: 12 }]}
              onPress={() => router.push('/shop')}
            >
              <Text style={commonStyles.buttonText}>Go to Shop</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            {cartItems.map(item => (
              <View
                key={item.id}
                style={{
                  backgroundColor: colors.card,
                  borderRadius: 12,
                  padding: 12,
                  marginBottom: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  shadowColor: '#0F3D2E',
                  shadowOpacity: 0.08,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 8,
                  elevation: 2,
                }}
              >
                <View style={{ flex: 1, paddingRight: 10 }}>
                  <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                    {item.packSize} × {item.size} {item.name}
                  </Text>
                  <Text style={[commonStyles.textSmall, { marginTop: 4 }]}>
                    {formatPrice(item.price)} each
                  </Text>
                </View>

                {/* Quantity controls */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    style={{ padding: 6, marginRight: 6 }}
                  >
                    <Icon name="remove-circle-outline" size={22} color={colors.primary} />
                  </TouchableOpacity>
                  <Text style={[commonStyles.text, { minWidth: 20, textAlign: 'center' }]}>
                    {item.quantity}
                  </Text>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{ padding: 6, marginLeft: 6 }}
                  >
                    <Icon name="add-circle-outline" size={22} color={colors.primary} />
                  </TouchableOpacity>
                </View>

                {/* Line total + remove */}
                <View style={{ alignItems: 'flex-end', marginLeft: 12 }}>
                  <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                    {formatPrice(item.price * item.quantity)}
                  </Text>
                  <TouchableOpacity onPress={() => removeFromCart(item.id)} style={{ marginTop: 6 }}>
                    <Text style={[commonStyles.textSmall, { color: '#cc3333' }]}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Totals */}
        <View style={[commonStyles.card, { padding: 16, marginTop: 8 }]}>
          <Row label="Subtotal" value={formatPrice(subtotal)} />
          <Row label="Shipping" value={formatPrice(shipping)} />
          <Row label="Tax (8%)" value={formatPrice(tax)} />
          <View style={{ height: 8 }} />
          <Row label="Total" value={formatPrice(total)} bold />
        </View>

        {/* Actions */}
        {cartItems.length > 0 && (
          <View style={{ marginTop: 16 }}>
            <TouchableOpacity style={buttonStyles.primary} onPress={handleCheckout}>
              <Text style={commonStyles.buttonText}>Checkout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[buttonStyles.secondary, { marginTop: 10 }]}
              onPress={() =>
                Alert.alert('Clear cart?', 'This will remove all items.', [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Clear', style: 'destructive', onPress: clearCart },
                ])
              }
            >
              <Text style={commonStyles.buttonText}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Row({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
      <Text style={[commonStyles.text, bold && { fontWeight: '700' }]}>{label}</Text>
      <Text style={[commonStyles.text, bold && { fontWeight: '700' }]}>{value}</Text>
    </View>
  );
}
