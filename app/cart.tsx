'use client';

import React, { useMemo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { SIZE_PRICES } from './prices'; // <-- correct path

type SizeKey = '8oz' | '12oz';
type PackKey = 6 | 12;

export default function CartPage() {
  const params = useLocalSearchParams<{ size?: string; pack?: string }>();
  const size = (params.size as SizeKey) || '8oz';
  const pack = (parseInt(params.pack || '6', 10) as PackKey) || 6;

  const unitPrice = useMemo(() => SIZE_PRICES[size][pack], [size, pack]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fafafa' }}>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Image
              source={require('../assets/images/basil-bottle.png')}
              style={{ width: 72, height: 72, marginRight: 12 }}
              resizeMode="contain"
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Your Cart</Text>
              <Text style={styles.subtitle}>{pack}-pack • {size}</Text>
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.priceValue}>${unitPrice.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { padding: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '800' },
  subtitle: { marginTop: 4, color: '#666' },
  priceLabel: { fontSize: 12, color: '#666' },
  priceValue: { fontSize: 22, fontWeight: '800', marginTop: 2 },
});
