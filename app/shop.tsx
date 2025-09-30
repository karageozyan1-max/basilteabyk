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
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[commonStyles.section, { flexDirection: 'row', alignItems: 'center', paddingTop: 18 }]}>
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
            source={require('../assets/images/a5183974-aee6-415a-9faa-72b686dfdcea.png')}
            style={commonStyles.productImage}
            resizeMode="cover"
          />
        </View>

        {/* Choose Size */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.heading, { marginBottom: 10 }]}>Choose Size</Text>
          <View style={{ flexDirection: 'row' }}>
            {sizes.map(s => (
              <TouchableOpacity
                key={s.value}
                onPress={() => setSelectedSize(s.value)}
                style={{
                  alignItems: 'center',
                  padding: 16,
                  borderRadius: 12,
                  backgroundColor: colors.card,
                  flex: 1,
                  marginRight: s.value === '8oz' ? 8 : 0,
                  boxShadow: '0px 2px 8px rgba(15, 61, 46, 0.1)' as any,
                  elevation: 2,
                  borderWidth: selectedSize === s.value ? 1 : 0,
                  borderColor: selectedSize === s.value ? colors.primary : 'transparent',
                }}
              >
                <Text style={commonStyles.text}>
                  {s.label} ({formatPrice(s.price)})
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Choose Pack */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.heading, { marginBottom: 10 }]}>Choose Pack</Text>
          <View style={{ flexDirection: 'row' }}>
            {packSizes.map(ps => (
              <TouchableOpacity
                key={ps}
                onPress={() => setPackSize(ps)}
                style={{
                  alignItems: 'center',
                  padding: 16,
                  borderRadius: 12,
                  backgroundColor: colors.card,
                  flex: 1,
                  marginRight: ps === 6 ? 8 : 0,
                  boxShadow: '0px 2px 8px rgba(15, 61, 46, 0.1)' as any,
                  elevation: 2,
                  borderWidth: packSize === ps ? 1 : 0,
                  borderColor: packSize === ps ? colors.primary : 'transparent',
                }}
              >
                <Text style={commonStyles.text}>{ps}-pack</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Add to Cart */}
        <View style={[commonStyles.section, { marginTop: 10 }]}>
          <TouchableOpacity style={buttonStyles.primary} onPress={handleAddToCart}>
            <Text style={commonStyles.buttonText}>
              Add to Cart – {formatPrice(totalPrice)}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
