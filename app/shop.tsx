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

import { useCart } from './CartContext';
import { SIZE_PRICES, formatPrice } from './prices';

type SizeOption = '8oz' | '12oz';

export default function ShopScreen() {
  const router = useRouter();
  const { addToCart } = useCart();

  // UI state
  const [selectedSize, setSelectedSize] = useState<SizeOption>('8oz');
  const [packSize, setPackSize] = useState<1 | 6 | 12>(1);
  const [quantity, setQuantity] = useState(1); // number of sets (lines) to add

  // Options
  const sizes = [
    { label: '8oz Bottle', value: '8oz' as const, price: SIZE_PRICES['8oz'] },
    { label: '12oz Bottle', value: '12oz' as const, price: SIZE_PRICES['12oz'] },
  ];
  const packSizes: (1 | 6 | 12)[] = [1, 6, 12];

  // Totals
  const perBottle = SIZE_PRICES[selectedSize];
  const selectionPrice = perBottle * packSize;          // price for one selected pack
  const totalPrice = selectionPrice * quantity;         // final total for this add

  const handleAddToCart = () => {
    const isSingle = packSize === 1;
    addToCart({
      // name describes the selection (no qty in the name)
      name: isSingle
        ? `1 bottle of ${selectedSize} Basil Tea with Honey`
        : `${packSize}-pack of ${selectedSize} Basil Tea with Honey`,
      price: selectionPrice,       // price *per line* (one selection)
      quantity,                    // how many of that selection to add
      size: selectedSize,
      packSize,
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

        {/* Product Image (comment out if path is wrong to avoid a blank screen) */}
        <View style={[commonStyles.section, { alignItems: 'center', paddingVertical: 20 }]}>
          <Image
            source={require('../assets/images/a5103974-aee6-415a-9faa-72b606dfcdca.png')}
            style={[commonStyles.productImage, { width: 260, height: 260 }]}
            resizeMode="cover"
          />
        </View>

        {/* Title + Total */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.title}>Basil Tea with Honey</Text>
          <Text style={commonStyles.priceText}>{formatPrice(totalPrice)}</Text>

          {/* Description */}
          <Text style={[commonStyles.text, { marginBottom: 16 }]}>
            A refreshing blend of basil tea infused with natural honey—smooth, lightly sweet, and calming.
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
                  activeOpacity={0.85}
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
                    {formatPrice(s.price)}
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
                  activeOpacity={0.85}
                >
                  <Text
                    style={[
                      ui.chipLabel,
                      { color: isActive ? colors.textLight : colors.text },
                    ]}
                  >
                    {p === 1 ? '1 bottle' : `${p}-pack`}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Quantity (how many of that selection) */}
          <Text style={[commonStyles.textMedium, { marginBottom: 12 }]}>Quantity</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
            <TouchableOpacity
              style={ui.circleBtn}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Icon name="remove" size={20} color={colors.text} />
            </TouchableOpacity>
            <Text style={[commonStyles.textMedium, { marginHorizontal: 18, minWidth: 30, textAlign: 'center' }]}>
              {quantity}
            </Text>
            <TouchableOpacity
              style={[ui.circleBtn, { backgroundColor: colors.primary }]}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Icon name="add" size={20} color={colors.textLight} />
            </TouchableOpacity>
          </View>

          {/* Add to Cart */}
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

// Compact, mobile-friendly chips
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
    minWidth: '48%',                                  // two per row on phones
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
