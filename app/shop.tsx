import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const BG_CREAM = '#fdfcf5';
const GREEN = '#0b3d2e';
const BORDER = '#e4dccf';

export default function ShopScreen() {
  const router = useRouter();
  const [size, setSize] = useState('8oz');
  const [pack, setPack] = useState('6 Pack');
  const [quantity, setQuantity] = useState(1);

  // Prices
  const prices: Record<string, number> = {
    '8oz-6 Pack': 18,
    '8oz-12 Pack': 34,
    '12oz-6 Pack': 28,
    '12oz-12 Pack': 52,
  };

  const getPrice = () => {
    return prices[`${size}-${pack}`] * quantity;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_CREAM }}>
      <ScrollView
        contentContainerStyle={{ padding: 18, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Bar with Cart */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.headerCartBtn} onPress={() => router.push('/cart')}>
            <Text style={{ color: GREEN, fontWeight: '700' }}>Cart</Text>
          </TouchableOpacity>
        </View>

        {/* Product Hero */}
        <View style={styles.heroRow}>
          <Image
            source={require('../assets/images/basil-bottle.png')}
            style={styles.heroImage}
            resizeMode="contain"
          />
          <View style={styles.heroText}>
            <Text style={styles.title}>Basil Tea by K</Text>
            <Text style={styles.subtitle}>Honey-infused basil tea</Text>
            <Text style={styles.desc}>
              Refreshing basil brewed in small batches, lightly sweetened with organic honey.
            </Text>
          </View>
        </View>

        {/* Size Selection */}
        <Text style={styles.sectionTitle}>Choose Size</Text>
        <View style={styles.btnRow}>
          {['8oz', '12oz'].map((s) => (
            <TouchableOpacity
              key={s}
              style={[styles.optionBtn, size === s && styles.selectedBtn]}
              onPress={() => setSize(s)}
            >
              <Text style={[styles.optionText, size === s && styles.selectedText]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Pack Selection */}
        <Text style={styles.sectionTitle}>Choose Pack</Text>
        <View style={styles.btnRow}>
          {['6 Pack', '12 Pack'].map((p) => (
            <TouchableOpacity
              key={p}
              style={[styles.optionBtn, pack === p && styles.selectedBtn]}
              onPress={() => setPack(p)}
            >
              <Text style={[styles.optionText, pack === p && styles.selectedText]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quantity Selection */}
        <Text style={styles.sectionTitle}>Quantity</Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyValue}>{quantity}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity(quantity + 1)}>
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Price & Add to Cart */}
        <View style={styles.addCartBox}>
          <Text style={styles.price}>${getPrice()}</Text>
          <TouchableOpacity style={styles.addCartBtn}>
            <Text style={styles.addCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  headerCartBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: BORDER,
  },
  heroRow: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  heroImage: {
    width: 120,
    height: 160,
    marginRight: 16,
  },
  heroText: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: GREEN,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: GREEN,
    marginBottom: 6,
  },
  desc: {
    fontSize: 14,
    color: '#444',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: GREEN,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  optionBtn: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 6,
    backgroundColor: '#fff',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: GREEN,
  },
  selectedBtn: {
    backgroundColor: GREEN,
  },
  selectedText: {
    color: BG_CREAM,
  },
  qtyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  qtyBtn: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginHorizontal: 10,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: '700',
    color: GREEN,
  },
  qtyValue: {
    fontSize: 18,
    fontWeight: '700',
    color: GREEN,
  },
  addCartBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: GREEN,
  },
  addCartBtn: {
    backgroundColor: GREEN,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  addCartText: {
    color: BG_CREAM,
    fontWeight: '700',
    fontSize: 16,
  },
});
