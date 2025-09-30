// app/shop.tsx
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { useCart } from './CartContext';
import { SIZE_PRICES, formatPrice } from './prices';

export default function ShopScreen() {
  const router = useRouter();
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<'8oz' | '12oz'>('8oz');
  const [packSize, setPackSize] = useState<6 | 12>(6);

  const sizes = ['8oz', '12oz'] as const;
  const packSizes = [6, 12] as const;

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', marginBottom: 16 }}>Shop</Text>

        {/* Size selector */}
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Choose Size</Text>
        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
          {sizes.map((s) => (
            <TouchableOpacity
              key={s}
              onPress={() => setSelectedSize(s)}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 14,
                borderRadius: 10,
                backgroundColor: selectedSize === s ? '#0f3d2e' : '#f0f0f0',
                marginRight: 10,
              }}
            >
              <Text style={{ color: selectedSize === s ? '#fff' : '#222' }}>
                {s} ({formatPrice(SIZE_PRICES[s])})
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Pack selector */}
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Choose Pack</Text>
        <View style={{ flexDirection: 'row', marginBottom: 24 }}>
          {packSizes.map((p) => (
            <TouchableOpacity
              key={p}
              onPress={() => setPackSize(p)}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 14,
                borderRadius: 10,
                backgroundColor: packSize === p ? '#0f3d2e' : '#f0f0f0',
                marginRight: 10,
              }}
            >
              <Text style={{ color: packSize === p ? '#fff' : '#222' }}>{p}-pack</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Total + Add to cart */}
        <Text style={{ fontSize: 16, marginBottom: 12 }}>
          Total: <Text style={{ fontWeight: '700' }}>{formatPrice(totalPrice)}</Text>
        </Text>

        <TouchableOpacity
          onPress={handleAddToCart}
          style={{
            paddingVertical: 14,
            borderRadius: 10,
            backgroundColor: '#0f3d2e',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '700' }}>
            Add to Cart — {formatPrice(totalPrice)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/cart')} style={{ marginTop: 16 }}>
          <Text style={{ color: '#0f3d2e', textAlign: 'center' }}>Go to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
