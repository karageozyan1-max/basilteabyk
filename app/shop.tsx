// app/shop.tsx
import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import Icon from '../components/Icon';

export default function ShopScreen() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('16oz');
  const [packSize, setPackSize] = useState(6);

  const sizes = [
    { label: '16oz Bottle', value: '16oz', price: 12.99 },
    { label: '32oz Bottle', value: '32oz', price: 19.99 },
  ];

  const packSizes = [1, 6, 12]; // added 1 bottle option

  const price =
    (sizes.find((s) => s.value === selectedSize)?.price || 0) * quantity * packSize;

  const handleAddToCart = () => {
    alert(
      `Added ${quantity} x ${packSize}-pack of ${selectedSize} Basil Tea with Honey to cart!`
    );
    router.push('/cart');
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View
          style={[
            commonStyles.section,
            { flexDirection: 'row', alignItems: 'center', paddingTop: 10 },
          ]}
        >
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
            style={[commonStyles.productImage, { width: 260, height: 260 }]}
            resizeMode="cover"
          />
        </View>

        {/* Product Info */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.title}>Basil Tea with Honey</Text>
          <Text style={commonStyles.priceText}>${price.toFixed(2)}</Text>

          <Text style={[commonStyles.text, { marginBottom: 20 }]}>
            A refreshing blend of basil tea infused with natural honey—smooth, lightly
            sweet, and calming.
          </Text>

          {/* Size Selection */}
          <Text style={[commonStyles.textMedium, { marginBottom: 8 }]}>Choose Size</Text>
          <View style={ui.rowWrap}>
            {sizes.map((s) => {
              const isActive = selectedSize === s.value;
              return (
                <TouchableOpacity
                  key={s.value}
                  style={[
                    ui.chip,
                    isActive
                      ? { borderColor: colors.primary, backgroundColor: colors.primary }
                      : { borderColor: colors.border, backgroundColor: colors.backgroundAlt },
                  ]}
                  onPress={() => setSelectedSize(s.value)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      ui.chipLabel,
                      { color: isActive ? colors.textLight : colors.text },
                    ]}
                  >
                    {s.label}
                  </Text>
                  <Text
                    style={[
                      ui.chipSub,
                      { color: isActive ? colors.textLight : colors.grey },
                    ]}
                  >
                    ${s.price.toFixed(2)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Pack Selection */}
          <Text style={[commonStyles.textMedium, { marginBottom: 8 }]}>Choose Pack</Text>
          <View style={ui.rowWrap}>
            {packSizes.map((p) => {
              const isActive = packSize === p;
              return (
                <TouchableOpacity
                  key={p}
                  style={[
                    ui.chip,
                    isActive
                      ? { borderColor: colors.primary, backgroundColor: colors.primary }
                      : { borderColor: colors.border, backgroundColor: colors.backgroundAlt },
                  ]}
                  onPress={() => setPackSize(p)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      ui.chipLabel,
                      { color: isActive ? colors.textLight : colors.text },
                    ]}
                  >
                    {p}-pack
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Quantity Selection */}
          <Text style={[commonStyles.textMedium, { marginBottom: 12 }]}>Quantity:</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32 }}>
            <TouchableOpacity
              style={ui.circleBtn}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Icon name="remove" size={20} color={colors.text} />
            </TouchableOpacity>

            <Text
              style={[
                commonStyles.textMedium,
                { marginHorizontal: 20, minWidth: 30, textAlign: 'center' },
              ]}
            >
              {quantity}
            </Text>

            <TouchableOpacity
              style={[ui.circleBtn, { backgroundColor: colors.primary }]}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Icon name="add" size={20} color={colors.textLight} />
            </TouchableOpacity>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity style={buttonStyles.primary} onPress={handleAddToCart}>
            <Text style={commonStyles.buttonText}>
              Add to Cart - ${price.toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom spacing for navigation */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Compact UI for mobile
const SCREEN_W = Dimensions.get('window').width;

const ui = StyleSheet.create({
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 2,
    marginBottom: 10,
    alignItems: 'center',
    minWidth: '48%',
    maxWidth: Math.min(170, (SCREEN_W - 48) / 2),
  },
  chipLabel: { fontSize: 14, fontWeight: '600' },
  chipSub: { fontSize: 12, marginTop: 2 },
  circleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
