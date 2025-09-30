// app/_layout.tsx
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { CartProvider } from './CartContext';

// ✅ make sure this path matches your project structure
// If _layout.tsx is in app/, and the component is in components/BottomNavigation.tsx:
import BottomNavigation from '../components/BottomNavigation';

export default function RootLayout() {
  return (
    <CartProvider>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
        {/* Bottom tab bar */}
        <BottomNavigation />
      </View>
    </CartProvider>
  );
}
