'use client';

import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SIZE_PRICES } from './prices';

type SizeKey = '8oz' | '12oz';
type PackKey = 2 | 6 | 12;            // change to 1 | 6 | 12 if you want single bottles
const PACK_OPTIONS: PackKey[] = [2, 6, 12];

export default function ShopScreen() {
  const router = useRouter();
  const [size, setSize] = useState<SizeKey>('8oz');
  const [pack, setPack] = useState<PackKey>(PACK_OPTIONS[0]);

  const totalPrice = useMemo(() => SIZE_PRICES[size] * pack, [size, pack]);

  function goToCart() {
    router.push({ pathname: '/cart', params: { size, pack: String(pack) } });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fafafa' }}>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Image
              source={require('../assets/images/basil-bottle.png')}
              style={{ width: 80, height: 80, marginRight: 12 }}
              resizeMode="contain"
            />
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={styles.title}>Shop — Basil Tea by K</Text>
              <Text style={styles.subtitle}>Honey-infused basil tea in glass bottles</Text>
            </View>

            {/* Cart shortcut uses current selection */}
            <TouchableOpacity style={styles.headerCartBtn} onPress={goToCart}>
              <Text style={{ color: '#111', fontWeight: '700' }}>Cart</Text>
            </TouchableOpacity>
          </View>

          {/* Size (2 columns) */}
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.row}>
            <ChoiceTwoCol label="8 oz"  selected={size === '8oz'}  onPress={() => setSize('8oz')} />
            <ChoiceTwoCol label="12 oz" selected={size === '12oz'} onPress={() => setSize('12oz')} />
          </View>

          {/* Pack (3 columns) */}
          <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Pack</Text>
          <View style={styles.rowBetween}>
            {PACK_OPTIONS.map((p) => (
              <ChoiceThreeCol
                key={p}
                label={`${p}-pack`}
                selected={pack === p}
                onPress={() => setPack(p)}
              />
            ))}
          </View>

          {/* Price + CTA */}
          <View style={{ marginVertical: 12 }}>
            <Text style={styles.priceValue}>${totalPrice.toFixed(2)}</Text>
            <Text style={styles.note}>{pack}-pack • {size}</Text>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={goToCart}>
            <Text style={styles.primaryBtnText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ChoiceTwoCol({ label, selected, onPress }:{
  label: string; selected: boolean; onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.choiceBase, styles.twoCol, selected && styles.choiceSelected]}
      accessibilityState={{ selected }}
    >
      <Text style={[styles.choiceText, selected && styles.choiceTextSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

function ChoiceThreeCol({ label, selected, onPress }:{
  label: string; selected: boolean; onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.choiceBase, styles.threeCol, selected && styles.choiceSelected]}
      accessibilityState={{ selected }}
    >
      <Text style={[styles.choiceText, selected && styles.choiceTextSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  page: { padding: 20 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 18, borderWidth: 1, borderColor: '#e8e8e8' },

  headerRow: { flexDirection: 'row', alignItems: 'center' },
  headerCartBtn: { paddingVertical: 8, paddingHorizontal: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 },

  title: { fontSize: 20, fontWeight: '800', flexShrink: 1 },
  subtitle: { marginTop: 4, color: '#666', flexShrink: 1 },

  sectionTitle: { fontSize: 14, fontWeight: '700', marginTop: 12, marginBottom: 8 },

  // rows
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between' },

  // choice buttons
  choiceBase: {
    paddingVertical: 10, paddingHorizontal: 12,
    borderWidth: 1, borderColor: '#dcdcdc', borderRadius: 12,
    alignItems: 'center',
  },
  twoCol: { width: '48%' },    // 2 per row
  threeCol: { width: '31%' },  // 3 per row

  choiceSelected: { backgroundColor: '#111', borderColor: '#111' },
  choiceText: { fontSize: 14, fontWeight: '600', color: '#111' },
  choiceTextSelected: { color: '#fff' },

  priceValue: { fontSize: 22, fontWeight: '800' },
  note: { fontSize: 12, color: '#888', marginTop: 2 },

  primaryBtn: {
    marginTop: 8, paddingVertical: 12, borderRadius: 10,
    backgroundColor: '#111', alignItems: 'center',
  },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
