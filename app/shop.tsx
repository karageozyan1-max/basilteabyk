// app/shop.tsx
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import Icon from '../components/Icon';

import { useCart } from './CartContext';
import { SIZE_PRICES, formatPrice } from './prices';

export default function ShopScreen() {
  const router = useRouter();
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<'8oz' | '12oz'>('8oz');
  const [packSize, setPackSize] = useState<6 | 12>(6);

  const sizes = [
    { label: '8oz Bottle',  value: '8oz' as const,  price: SIZE_PRICES['8oz']  },
    { label: '12oz Bottle', value: '12oz' as const, price: SIZE_PRICES['12oz'] },
  ];
  const packSizes: (6 | 12)[] = [6, 12];

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
  <SafeAreaView style={commonStyles.container}>
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      
      {/* Title */}
      <Text style={commonStyles.heading}>Shop</Text>

      {/* Choose Size */}
      <Text style={commonStyles.text}>Choose Size</Text>
      {sizes.map((s) => (
        <TouchableOpacity
          key={s.value}
          style={{
            padding: 12,
            marginVertical: 4,
            backgroundColor: selectedSize === s.value ? colors.primary : colors.card,
            borderRadius: 8,
          }}
          onPress={() => setSelectedSize(s.value)}
        >
          <Text style={{ color: colors.text }}>
            {s.label} ({formatPrice(s.price)})
          </Text>
        </TouchableOpacity>
      ))}

      {/* Choose Pack */}
      <Text style={[commonStyles.text, { marginTop: 16 }]}>Choose Pack</Text>
      {packSizes.map((p) => (
        <TouchableOpacity
          key={p}
          style={{
            padding: 12,
            marginVertical: 4,
            backgroundColor: packSize === p ? colors.primary : colors.card,
            borderRadius: 8,
          }}
          onPress={() => setPackSize(p)}
        >
          <Text style={{ color: colors.text }}>{p}-pack</Text>
        </TouchableOpacity>
      ))}

      {/* Total */}
      <Text style={[commonStyles.text, { marginTop: 16 }]}>
        Total: {formatPrice(totalPrice)}
      </Text>

      {/* Add to Cart Button */}
      <TouchableOpacity
        style={[buttonStyles.primary, { marginTop: 20 }]}
        onPress={handleAddToCart}
      >
        <Text style={buttonStyles.buttonText}>
          Add to Cart – {formatPrice(totalPrice)}
        </Text>
      </TouchableOpacity>

    </ScrollView>
  </SafeAreaView>
);
