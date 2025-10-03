// app/shop.tsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function Shop() {
return (
  <SafeAreaView style={{ flex: 1, backgroundColor: BG_CREAM }}>
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1, padding: 18, paddingBottom: FOOTER_PAD }}
      showsVerticalScrollIndicator={true} // turn on so you can see scrolling
    >
      {/* your page content stays the same here */}
    </ScrollView>
  </SafeAreaView>
);
}
