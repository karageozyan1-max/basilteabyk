import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import { Link, Slot } from 'expo-router';

const BG_CREAM = '#faf6ec';
const BORDER = '#e4dccf';
const GREEN = '#0b3d2e';

export default function Layout() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Main content */}
      <View style={styles.content}>
        <Slot />
      </View>

      {/* Sticky Footer */}
      <View style={styles.footer}>
        <Link href="/" style={styles.link}>Home</Link>
        <Link href="/shop" style={styles.link}>Shop</Link>
        <Link href="/faq" style={styles.link}>FAQs</Link>
        <Link href="/story" style={styles.link}>Our Story</Link>
        <Link href="/contact" style={styles.link}>Contact</Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_CREAM,
  },
  content: {
    flex: 1,              // fills screen
    paddingBottom: 60,    // prevents overlap with footer
  },
  footer: {
    height: 50,
    backgroundColor: BG_CREAM,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  link: {
    fontWeight: '800',
    fontSize: 18,
    color: GREEN,
  },
});
