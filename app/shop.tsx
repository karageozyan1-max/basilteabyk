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

  // UI state
  const [selectedSize, setSelectedSize] = useState<'8oz' | '12oz'>('8oz');
  const [packSize, setPackSize] = useState<1 | 6 | 12>(1);

  // Options
  const sizes = [
    { label: '8oz Bottle', value: '8oz' as const, price: SIZE_PRICES['8oz'] },
    { label: '12oz Bottle', value: '12oz' as const, price: SIZE_PRICES['12oz'] },
  ];
  const packSizes: (1 | 6 | 12)[] = [1, 6, 12];

  // Final total
  const totalPrice = SIZE_PRICES[selectedSize] * packSize;

  const handleAddToCart = () => {
    const isSingle = packSize === 1;
    addToCart({
      id: Date.now(),
      name: isSingle
        ? `1 bottle of ${selectedSize} Basil Tea with Honey`
        : `${packSize}-pack of ${selectedSize} Basil Tea with Honey`,
      size: selectedSize,
      packSize,
      price: totalPrice,   // final total for this selection
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

        {/* Choose Size */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.textMedium, { marginBottom: 12 }]}>Choose Size:</Text>
          <View style={{ flexDirection: 'row', marginBottom: 12 }}>
            {sizes.map((s, idx) => (
              <TouchableOpacity
                key={s.value}
                onPress={() => setSelectedSize(s.value)}
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: selectedSize === s.value ? colors.primary : colors.border,
                  backgroundColor: selectedSize === s.value ? colors.primary : colors.backgroundAlt,
                  marginRight: idx === 0 ? 8 : 0,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={[
                    commonStyles.textMedium,
                    { color: selectedSize === s.value ? colors.textLight : colors.text },
                  ]}
                >
                  {s.label}
                </Text>
                <Text
                  style={[
                    commonStyles.textSmall,
                    { color: selectedSize === s.value ? colors.textLight : colors.grey },
                  ]}
                >
                  {formatPrice(s.price)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Choose Pack */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.textMedium, { marginBottom: 12 }]}>Choose Pack:</Text>
          <View style={{ flexDirection: 'row' }}>
            {packSizes.map((p, idx) => (
              <TouchableOpacity
                key={p}
                onPress={() => setPackSize(p)}
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: packSize === p ? colors.primary : colors.border,
                  backgroundColor: packSize === p ? colors.primary : colors.backgroundAlt,
                  marginRight: idx < packSizes.length - 1 ? 8 : 0,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={[
                    commonStyles.textMedium,
                    { color: packSize === p ? colors.textLight : colors.text },
                  ]}
                >
                  {p === 1 ? '1 bottle' : `${p}-pack`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Total */}
        <View style={[commonStyles.section, { marginTop: 10 }]}>
          <Text style={commonStyles.text}>
            Total: <Text style={{ fontWeight: '700' }}>{formatPrice(totalPrice)}</Text>
          </Text>
        </View>

        {/* Add to Cart */}
        <View style={[commonStyles.section, { marginTop: 10 }]}>
          <TouchableOpacity style={buttonStyles.primary} onPress={handleAddToCart}>
            <Text style={commonStyles.buttonText}>
              Add to Cart – {formatPrice(totalPrice)}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
