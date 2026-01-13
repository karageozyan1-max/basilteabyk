import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';
import { useCart } from './CartContext'; // ✅ ADD THIS

export default function CartScreen() {
  const router = useRouter();

  const { items, subtotal, updateQty, removeItem, clearCart } = useCart(); // ✅ REAL CART DATA

  const shipping = subtotal >= 25 ? 0 : 4.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const decQty = (id: string, currentQty: number) => {
    if (currentQty <= 1) {
      removeItem(id);
    } else {
      updateQty(id, currentQty - 1);
    }
  };

  const incQty = (id: string, currentQty: number) => {
    updateQty(id, currentQty + 1);
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout with total:', total);
    alert('Checkout functionality would be implemented here with payment processing.');
    // Optional: clear cart after checkout demo
    // clearCart();
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={[commonStyles.section, { flexDirection: 'row', alignItems: 'center', paddingTop: 10 }]}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[commonStyles.heading, { flex: 1 }]}>Cart</Text>
        </View>

        <View style={[commonStyles.content, { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }]}>
          <Icon name="bag-outline" size={64} color={colors.grey} style={{ marginBottom: 20 }} />
          <Text style={[commonStyles.heading, { textAlign: 'center', marginBottom: 12 }]}>
            Your cart is empty
          </Text>
          <Text style={[commonStyles.text, { textAlign: 'center', marginBottom: 32 }]}>
            Add some delicious basil tea to get started!
          </Text>

          <TouchableOpacity style={buttonStyles.primary} onPress={() => router.push('/shop')}>
            <Text style={commonStyles.buttonText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[commonStyles.section, { flexDirection: 'row', alignItems: 'center', paddingTop: 10 }]}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[commonStyles.heading, { flex: 1 }]}>Cart ({items.length})</Text>

          <TouchableOpacity onPress={clearCart}>
            <Text style={[commonStyles.textSmall, { color: colors.grey }]}>Clear</Text>
          </TouchableOpacity>
        </View>

        {/* Cart Items */}
        <View style={commonStyles.section}>
          {items.map((item) => (
            <View key={item.id} style={[commonStyles.card, { marginBottom: 16 }]}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={require('../assets/images/a5103974-aee6-415a-9faa-72b606dfcdca.png')}
                  style={{ width: 80, height: 80, borderRadius: 8, marginRight: 16 }}
                  resizeMode="cover"
                />

                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.textMedium, { marginBottom: 4 }]}>
                    Basil Tea with Honey
                  </Text>
                  <Text style={[commonStyles.textSmall, { marginBottom: 8 }]}>
                    Size: {item.sizeKey} • Pack: {item.pack}
                  </Text>
                  <Text style={[commonStyles.textMedium, { color: colors.primary }]}>
                    ${(item.unitPrice * item.pack).toFixed(2)}
                  </Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <TouchableOpacity
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: colors.border,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => decQty(item.id, item.qty)}
                    >
                      <Icon name="remove" size={16} color={colors.text} />
                    </TouchableOpacity>

                    <Text
                      style={[
                        commonStyles.textMedium,
                        { marginHorizontal: 16, minWidth: 20, textAlign: 'center' },
                      ]}
                    >
                      {item.qty}
                    </Text>

                    <TouchableOpacity
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: colors.primary,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => incQty(item.id, item.qty)}
                    >
                      <Icon name="add" size={16} color={colors.textLight} />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity onPress={() => removeItem(item.id)}>
                    <Icon name="trash-outline" size={20} color={colors.grey} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Order Summary */}
        <View style={[commonStyles.section, { backgroundColor: colors.backgroundAlt, paddingVertical: 32 }]}>
          <Text style={[commonStyles.heading, { marginBottom: 20 }]}>Order Summary</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={commonStyles.text}>Subtotal</Text>
            <Text style={commonStyles.text}>${subtotal.toFixed(2)}</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={commonStyles.text}>Shipping</Text>
            <Text style={commonStyles.text}>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            <Text style={commonStyles.text}>Tax</Text>
            <Text style={commonStyles.text}>${tax.toFixed(2)}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 16,
              borderTopWidth: 1,
              borderTopColor: colors.border,
              marginBottom: 24,
            }}
          >
            <Text style={[commonStyles.textMedium, { fontSize: 18 }]}>Total</Text>
            <Text style={[commonStyles.textMedium, { fontSize: 18, color: colors.primary }]}>
              ${total.toFixed(2)}
            </Text>
          </View>

          {shipping > 0 && (
            <Text style={[commonStyles.textSmall, { textAlign: 'center', marginBottom: 20, color: colors.secondary }]}>
              Add ${(50 - subtotal).toFixed(2)} more for free shipping!
            </Text>
          )}

          <TouchableOpacity style={buttonStyles.primary} onPress={handleCheckout}>
            <Text style={commonStyles.buttonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>

        {/* Trust Badges */}
        <View style={[commonStyles.section, { paddingVertical: 20 }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <View style={{ alignItems: 'center' }}>
              <Icon name="shield-checkmark" size={24} color={colors.primary} />
              <Text style={[commonStyles.textSmall, { marginTop: 4 }]}>Secure</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Icon name="card" size={24} color={colors.primary} />
              <Text style={[commonStyles.textSmall, { marginTop: 4 }]}>Safe Payment</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Icon name="refresh" size={24} color={colors.primary} />
              <Text style={[commonStyles.textSmall, { marginTop: 4 }]}>30-Day Return</Text>
            </View>
          </View>
        </View>

        {/* Bottom Spacing for Navigation */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
