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
  const [packSize, setPackSize] = useState<number>(6);

  const sizes = [
    { label: '8oz Bottle',  value: '8oz' as const,  price: SIZE_PRICES['8oz']  },
    { label: '12oz Bottle', value: '12oz' as const, price: SIZE_PRICES['12oz'] },
  ];
  const packSizes = [6, 12];

  const handleAddToCart = () => {
    const selectedProduct = sizes.find(s => s.value === selectedSize);
    if (!selectedProduct) return;

    addToCart({
      id: Date.now(),
      name: 'Basil Tea with Honey',
      size: selectedProduct.value,
      packSize,
      price: selectedProduct.price,
      quantity: 1,
    });
  };

  const totalPrice = SIZE_PRICES[selectedSize] * packSize;

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

        {/* Product image (optional) */}
        <View style={[commonStyles.section, { alignItems: 'center', paddingVertical: 20 }]}>
          <Image
            source={require('../assets/images/a5183974-aee6-415a-9faa-72b686dfdcea.png')}
            style={commonStyles.productImage}
            resizeMode="cover"
          />
        </View>

        {/* Size selector */}
        <View style={[commonStyles.section]}>
          <Text style={[commonStyles.heading, { marginBottom: 10 }]}>Choose Size</Text>
          <View style={{ flexDirection: 'row' }}>
            {sizes.map(s => (
              <TouchableOpacity
                key={s.value}
                onPress={() => setSelectedSize(s.value)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  borderRadius: 10,
                  backgroundColor: selectedSize === s.value ? colors.primary : colors.card,
                  marginRight: 8,
                }}
              >
                <Text style={{ color: selectedSize === s.value ? '#fff' : colors.text }}>
                  {s.label} ({formatPrice(s.price)})
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Pack selector */}
        <View style={[commonStyles.section]}>
          <Text style={[commonStyles.heading, { marginBottom: 10 }]}>Choose Pack</Text>
          <View style={{ flexDirection: 'row' }}>
            {packSizes.map(ps => (
              <TouchableOpacity
                key={ps}
                onPress={() => setPackSize(ps)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  borderRadius: 10,
                  backgroundColor: packSize === ps ? colors.primary : colors.card,
                  marginRight: 8,
                }}
              >
                <Text style={{ color: packSize === ps ? '#fff' : colors.text }}>{ps}-pack</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Add to cart */}
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
