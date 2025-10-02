'use client';
import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SIZE_PRICES } from '../prices'; // adjust if your prices.ts is elsewhere

type SizeKey = '8oz' | '12oz';
type PackKey = 6 | 12;

export default function ShopScreen() {
  const router = useRouter();
  const [size, setSize] = useState<SizeKey>('8oz');
  const [pack, setPack] = useState<PackKey>(6);

  const unitPrice = useMemo(() => SIZE_PRICES[size][pack], [size, pack]);

  function goToCart() {
    router.push({
      pathname: '/cart',
      params: { size, pack: String(pack) },
    });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fafafa' }}>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.card}>
          {/* header */}
          <View style={styles.headerRow}>
            <Image
              source={require('../assets/images/basil-bottle.png')}
              style={{ width: 80, height: 80, marginRight: 12 }}
              resizeMode="contain"
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Shop — Basil Tea by K</Text>
              <Text style={styles.subtitle}>Honey-infused basil tea in glass bottles</Text>
            </View>
          </View>

          {/* Size */}
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.btnRow}>
            <Choice label="8 oz" selected={size === '8oz'} onPress={() => setSize('8oz')} />
            <Choice label="12 oz" selected={size === '12oz'} onPress={() => setSize('12oz')} />
          </View>

          {/* Pack */}
          <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Pack</Text>
          <View style={styles.btnRow}>
            <Choice label="6-pack" selected={pack === 6} onPress={() => setPack(6)} />
            <Choice label="12-pack" selected={pack === 12} onPress={() => setPack(12)} />
          </View>

          {/* Price + CTA */}
          <View style={styles.priceRow}>
            <View>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.priceValue}>${unitPrice.toFixed(2)}</Text>
              <Text style={styles.note}>{pack}-pack • {size}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={goToCart}>
            <Text style={styles.primaryBtnText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Choice({
  label, selected, onPress,
}: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.choiceBtn, selected && styles.choiceBtnSelected]}
      accessibilityState={{ selected }}
    >
      <Text style={[styles.choiceText, selected && styles.choiceTextSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  page: { padding: 20 },
  card: {
    backgroundColor: '#fff', borderRadius: 14, padding: 18,
    borderWidth: 1, borderColor: '#e8e8e8', gap: 12,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '800' },
  subtitle: { marginTop: 4, color: '#666' },

  sectionTitle: { fontSize: 14, fontWeight: '700', marginTop: 6 },
  btnRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },

  choiceBtn: {
    paddingVertical: 8, paddingHorizontal: 12,
    borderWidth: 1, borderColor: '#dcdcdc', borderRadius: 10,
    backgroundColor: '#fff', width: '48%', alignItems: 'center',
  },
  choiceBtnSelected: { backgroundColor: '#111', borderColor: '#111' },
  choiceText: { fontSize: 13, fontWeight: '600', color: '#111' },
  choiceTextSelected: { color: '#fff' },

  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  priceLabel: { fontSize: 12, color: '#666' },
  priceValue: { fontSize: 22, fontWeight: '800', marginTop: 2 },
  note: { fontSize: 12, color: '#888' },

  primaryBtn: {
    marginTop: 6, paddingVertical: 12, borderRadius: 10,
    backgroundColor: '#111', alignItems: 'center',
  },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
