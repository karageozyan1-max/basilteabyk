import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useCart } from './CartContext';
import { SIZE_PRICES, formatPrice } from './prices';

export default function ShopScreen() {
  const router = useRouter();
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<'8oz' | '12oz'>('8oz');
  const [packSize, setPackSize] = useState<6 | 12>(6);
  const sizes = ['8oz', '12oz'] as const;
  const totalPrice = SIZE_PRICES[selectedSize] * packSize;

  const handleAddToCart = () => {
    addToCart({
      id: Date.now(),
      name: 'Basil Tea with Honey',
      size: selectedSize,
      packSize,
      price: SIZE_PRICES[selectedSize],
      quantity: 1,
    });
    router.push('/cart');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', marginBottom: 12 }}>Shop</Text>

        <Text style={{ fontSize: 18, fontWeight: '600' }}>Choose Size</Text>
        <View style={{ flexDirection: 'row', marginVertical: 12 }}>
          {sizes.map(s => (
            <TouchableOpacity
              key={s}
              onPress={() => setSelectedSize(s)}
              style={{
                paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10,
                backgroundColor: selectedSize === s ? '#0f3d2e' : '#f0f0f0', marginRight: 8,
              }}
            >
              <Text style={{ color: selectedSize === s ? '#fff' : '#222' }}>
                {s} ({formatPrice(SIZE_PRICES[s])})
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={{ fontSize: 18, fontWeight: '600' }}>Choose Pack</Text>
        <View style={{ flexDirection: 'row', marginVertical: 12 }}>
          {[6, 12].map(p => (
            <TouchableOpacity
              key={p}
              onPress={() => setPackSize(p as 6 | 12)}
              style={{
                paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10,
                backgroundColor: packSize === p ? '#0f3d2e' : '#f0f0f0', marginRight: 8,
              }}
            >
              <Text style={{ color: packSize === p ? '#fff' : '#222' }}>{p}-pack</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={{ marginTop: 8, marginBottom: 12 }}>
          Total: <Text style={{ fontWeight: '700' }}>{formatPrice(totalPrice)}</Text>
        </Text>

        <TouchableOpacity
          onPress={handleAddToCart}
          style={{ paddingVertical: 14, borderRadius: 10, backgroundColor: '#0f3d2e', alignItems: 'center' }}
        >
          <Text style={{ color: '#fff', fontWeight: '700' }}>
            Add to Cart — {formatPrice(totalPrice)}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
