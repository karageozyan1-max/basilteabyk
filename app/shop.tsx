// app/shop.tsx
'use client';

import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SIZE_PRICES } from './prices';

type SizeKey = '8oz' | '12oz';
type PackKey = 6 | 12;

export default function ShopScreen() {
  const router = useRouter();
  const [size, setSize] = useState<SizeKey>('8oz');
  const [pack, setPack] = useState<PackKey>(6);

  const totalPrice = useMemo(() => SIZE_PRICES[size] * pack, [size, pack]);

  function goToCart() {
    router.push({ pathname: '/cart', params: { size, pack: String(pack) } });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fafafa' }}>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Image
              source={require('../assets/images/basil-bottle.png')}
              style={{ width: 80, height: 80, marginRight: 12 }}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.title}>Shop — Basil Tea by K</Text>
              <Text style={styles.subtitle}>Honey-infused basil tea</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.btnRow}>
            <Choice label="8 oz" selected={size === '8oz'} onPress={() => setSize('8oz')} />
            <Choice label="12 oz" selected={size === '12oz'} onPress={() => setSize('12oz')} />
          </View>

          <Text style={styles.sectionTitle}>Pack</Text>
          <View style={styles.btnRow}>
            <Choice label="6-pack" selected={pack === 6} onPress={() => setPack(6)} />
            <Choice label="12-pack" selected={pack === 12} onPress={() => setPack(12)} />
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceValue}>${totalPrice.toFixed(2)}</Text>
            <Text style={styles.note}>
              {pack}-pack • {size}
            </Text>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={goToCart}>
            <Text style={styles.primaryBtnText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Choice({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.choiceBtn, selected && styles.choiceBtnSelected]}
    >
      <Text style={[styles.choiceText, selected && styles.choiceTextSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  page: { padding: 20 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 18, borderWidth: 1, borderColor: '#ddd' },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '800' },
  subtitle: { color: '#666', marginTop: 4 },
  sectionTitle: { fontWeight: '700', marginTop: 16, marginBottom: 6 },
  btnRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  choiceBtn: { padding: 10, borderWidth: 1, borderRadius: 8, flex: 1, marginHorizontal: 4, alignItems: 'center' },
  choiceBtnSelected: { backgroundColor: '#111', borderColor: '#111' },
  choiceText: { fontSize: 14, fontWeight: '600' },
  choiceTextSelected: { color: '#fff' },
  priceRow: { marginVertical: 12 },
  priceValue: { fontSize: 22, fontWeight: '800' },
  note: { fontSize: 12, color: '#888' },
  primaryBtn: { padding: 14, borderRadius: 8, backgroundColor: '#111', alignItems: 'center' },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
