import React from 'react';
import { View } from 'react-native';
import { Slot } from 'expo-router';

const BG_CREAM = '#fdfcf5';

export default function Layout() {
  // zero footer, zero absolute positioning — nothing can block scroll
  return (
    <View style={{ flex: 1, backgroundColor: BG_CREAM }}>
      <Slot />
    </View>
  );
}
