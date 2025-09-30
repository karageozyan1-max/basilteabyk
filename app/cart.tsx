
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';

export default function CartScreen() {
  const router = useRouter();
  
  // Mock cart data - in a real app this would come from state management
  const [cartItems, setCartItems] = useState<any[]>([]);
  

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 25 ? 0 : 4.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(items => items.filter(item => item.id !== id));
    } else {
      setCartItems(items => 
        items.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout with total:', total);
    alert('Checkout functionality would be implemented here with payment processing.');
  };

  if (cartItems.length === 0) {
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
          
          <TouchableOpacity 
            style={buttonStyles.primary}
            onPress={() => router.push('/shop')}
          >
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
          <Text style={[commonStyles.heading, { flex: 1 }]}>Cart ({cartItems.length})</Text>
        </View>

        {/* Cart Items */}
        <View style={commonStyles.section}>
          {cartItems.map((item) => (
            <View key={item.id} style={[commonStyles.card, { marginBottom: 16 }]}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={item.image}
                  style={{ width: 80, height: 80, borderRadius: 8, marginRight: 16 }}
                  resizeMode="cover"
                />
                
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.textMedium, { marginBottom: 4 }]}>
                    {item.name}
                  </Text>
                  <Text style={[commonStyles.textSmall, { marginBottom: 8 }]}>
                    Size: {item.size}
                  </Text>
                  <Text style={[commonStyles.textMedium, { color: colors.primary }]}>
                    ${item.price.toFixed(2)}
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
                        justifyContent: 'center'
                      }}
                      onPress={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Icon name="remove" size={16} color={colors.text} />
                    </TouchableOpacity>
                    
                    <Text style={[commonStyles.textMedium, { marginHorizontal: 16, minWidth: 20, textAlign: 'center' }]}>
                      {item.quantity}
                    </Text>
                    
                    <TouchableOpacity
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: colors.primary,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Icon name="add" size={16} color={colors.textLight} />
                    </TouchableOpacity>
                  </View>
                  
                  <TouchableOpacity onPress={() => updateQuantity(item.id, 0)}>
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
            <Text style={commonStyles.text}>
              {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
            </Text>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            <Text style={commonStyles.text}>Tax</Text>
            <Text style={commonStyles.text}>${tax.toFixed(2)}</Text>
          </View>
          
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            paddingTop: 16, 
            borderTopWidth: 1, 
            borderTopColor: colors.border,
            marginBottom: 24
          }}>
            <Text style={[commonStyles.textMedium, { fontSize: 18 }]}>Total</Text>
            <Text style={[commonStyles.textMedium, { fontSize: 18, color: colors.primary }]}>
              ${total.toFixed(2)}
            </Text>
          </View>

          {shipping > 0 && (
            <Text style={[commonStyles.textSmall, { textAlign: 'center', marginBottom: 20, color: colors.secondary }]}>
              Add ${(25 - subtotal).toFixed(2)} more for free shipping!
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
