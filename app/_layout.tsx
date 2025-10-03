import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { Link } from 'expo-router';

const BG_CREAM = '#faf6ec';
const BORDER = '#e4dccf';
const GREEN = '#0b3d2e';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_CREAM }}>
      {/* Main content with padding for footer */}
      <View style={{ flex: 1, paddingBottom: 50 }}>
        {children}
      </View>

      {/* Sticky footer */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 50,
          backgroundColor: BG_CREAM,
          borderTopWidth: 1,
          borderTopColor: BORDER,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          paddingHorizontal: 4,
          zIndex: 10,
        }}
      >
        <Link href="/" style={{ fontWeight: '800', fontSize: 18, color: GREEN }}>Home</Link>
        <Link href="/shop" style={{ fontWeight: '800', fontSize: 18, color: GREEN }}>Shop</Link>
        <Link href="/faq" style={{ fontWeight: '800', fontSize: 18, color: GREEN }}>FAQs</Link>
        <Link href="/story" style={{ fontWeight: '800', fontSize: 18, color: GREEN }}>Our Story</Link>
        <Link href="/contact" style={{ fontWeight: '800', fontSize: 18, color: GREEN }}>Contact</Link>
      </View>
    </SafeAreaView>
  );
}
