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

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<'16oz' | '32oz'>('16oz');

  const sizes = [
    { label: '16oz Bottle', value: '16oz' as const, price: 12.99 },
    { label: '32oz Bottle', value: '32oz' as const, price: 19.99 }
  ];

  const price = selectedSize === '16oz' ? SIZE_PRICES['8oz'] ?? 12.99 : SIZE_PRICES['12oz'] ?? 19.99;

  const handleAddToCart = () => {
    addToCart({
      id: Date.now(),
      name: 'Basil Tea with Honey',
      size: selectedSize,
      packSize: quantity,
      price,
      quantity: 1,
    });
    router.push('/cart');
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[commonStyles.section, { flexDirection: 'row', alignItems: 'center', paddingTop: 10 }]}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[commonStyles.heading, { flex: 1 }]}>Shop</Text>
          <TouchableOpacity onPress={() => router.push('/cart')}>
            <Icon name="bag-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        <View style={[commonStyles.section, { alignItems: 'center', paddingVertical: 20 }]}>
          <Image
            source={require('../assets/images/a5103974-aee6-415a-9faa-72b606dfcdca.png')}
            style={[commonStyles.productImage, { width: 320, height: 320 }]}
            resizeMode="cover"
          />
        </View>

        {/* Product Info */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.title}>Basil Tea with Honey</Text>
          <Text style={commonStyles.priceText}>{formatPrice(price)}</Text>

          <Text style={[commonStyles.text, { marginBottom: 20 }]}>
            A refreshing blend of basil tea infused with natural honey—smooth, lightly sweet, and calming.
          </Text>

          {/* Size Selection */}
          <Text style={[commonStyles.textMedium, { marginBottom: 12 }]}>Size:</Text>
          <View style={{ flexDirection: 'row', marginBottom: 24 }}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size.value}
                style={[
                  {
                    flex: 1,
                    padding: 12,
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: selectedSize === size.value ? colors.primary : colors.border,
                    backgroundColor: selectedSize === size.value ? colors.primary : colors.backgroundAlt,
                    marginRight: 8,
                    alignItems: 'center'
                  }
                ]}
                onPress={() => setSelectedSize(size.value)}
              >
                <Text style={[
                  commonStyles.textMedium,
                  { color: selectedSize === size.value ? colors.textLight : colors.text }
                ]}>
                  {size.label}
                </Text>
                <Text style={[
                  commonStyles.textSmall,
                  { color: selectedSize === size.value ? colors.textLight : colors.grey }
                ]}>
                  {formatPrice(size.price)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quantity Selection */}
          <Text style={[commonStyles.textMedium, { marginBottom: 12 }]}>Quantity:</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32 }}>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.border,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Icon name="remove" size={20} color={colors.text} />
            </TouchableOpacity>

            <Text style={[commonStyles.textMedium, { marginHorizontal: 20, minWidth: 30, textAlign: 'center' }]}>
              {quantity}
            </Text>

            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Icon name="add" size={20} color={colors.textLight} />
            </TouchableOpacity>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity style={buttonStyles.primary} onPress={handleAddToCart}>
            <Text style={commonStyles.buttonText}>
              Add to Cart - {formatPrice(price * quantity)}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Extra spacing for nav */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
