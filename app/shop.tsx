// app/shop.tsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function Shop() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fdfcf5' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24 }}
        showsVerticalScrollIndicator={true}
      >
        <Text style={{ fontSize: 22, fontWeight: '800', marginBottom: 16 }}>
          Shop – Scroll Test
        </Text>

        {/* FORCE SCROLLING: big spacer */}
        <View style={{ height: 1400, backgroundColor: '#fff2', borderWidth: 1, borderColor: '#eee' }} />

        <Text style={{ marginTop: 16 }}>Bottom reached ✅</Text>
      </ScrollView>
    </View>
  );
}
