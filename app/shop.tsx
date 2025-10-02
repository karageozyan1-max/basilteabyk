import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useCart } from './CartContext';
import { SIZE_PRICES } from './prices';

export default function ShopScreen() {
  const router = useRouter();
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState('8oz');
  const [selectedPack, setSelectedPack] = useState(1);

  const sizes = [
    { label: '8oz Bottle', value: '8oz', price: SIZE_PRICES['8oz'] },
    { label: '12oz Bottle', value: '12oz', price: SIZE_PRICES['12oz'] },
  ];

  const packs = [
    { label: '1 bottle', value: 1 },
    { label: '6-pack', value: 6 },
    { label: '12-pack', value: 12 },
  ];

  const totalPrice = SIZE_PRICES[selectedSize] * selectedPack;

  const handleAddToCart = () => {
    addToCart({
      id: Date.now(),
      name: 'Basil Tea with Honey',
      size: selectedSize,
      packSize: selectedPack,
      price: totalPrice,
      quantity: 1,
    });
    router.push('/cart');
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <ScrollView>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Shop</Text>

        {/* Product Image */}
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Image
            source={require('../assets/images/basil-bottle.png')}
            style={{ width: 220, height: 220 }}
            resizeMode="contain"
          />
        </View>

        {/* Size Selection */}
        <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 10 }}>Choose Size</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          {sizes.map((size) => (
            <TouchableOpacity
              key={size.value}
              style={{
                flex: 1,
                padding: 14,
                marginHorizontal: 5,
                borderRadius: 8,
                borderWidth: 2,
                borderColor: selectedSize === size.value ? '#0a6847' : '#ccc',
                backgroundColor: selectedSize === size.value ? '#0a6847' : '#fff',
                alignItems: 'center',
              }}
              onPress={() => setSelectedSize(size.value)}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: selectedSize === size.value ? '#fff' : '#000',
                }}
              >
                {size.label} - ${size.price.toFixed(2)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Pack Selection */}
        <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 10 }}>Choose Pack</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {packs.map((pack) => (
            <TouchableOpacity
              key={pack.value}
              style={{
                flex: 1,
                padding: 14,
                marginHorizontal: 5,
                borderRadius: 8,
                borderWidth: 2,
                borderColor: selectedPack === pack.value ? '#0a6847' : '#ccc',
                backgroundColor: selectedPack === pack.value ? '#0a6847' : '#fff',
                alignItems: 'center',
              }}
              onPress={() => setSelectedPack(pack.value)}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: selectedPack === pack.value ? '#fff' : '#000',
                }}
              >
                {pack.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add to Cart */}
        <TouchableOpacity
          style={{
            backgroundColor: '#0a6847',
            padding: 16,
            borderRadius: 8,
            marginTop: 30,
            alignItems: 'center',
          }}
          onPress={handleAddToCart}
        >
          <Text style={{ color: '#fff', fontSize: 18 }}>
            Add to Cart - ${totalPrice.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
