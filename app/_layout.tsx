// app/_layout.tsx
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { CartProvider } from './CartContext';
import BottomNavigation from '../components/BottomNavigation'; // ✅ correct path

export default function RootLayout() {
  return (
    <CartProvider>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
        {/* Bottom bar at the bottom of every screen */}
        <BottomNavigation />
      </View>
    </CartProvider>
  );
}
