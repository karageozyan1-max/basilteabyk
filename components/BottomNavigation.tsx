import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Link, usePathname } from "expo-router";

export default function BottomNavigation() {
  const pathname = usePathname();

  const Tab = ({ href, label }: { href: string; label: string }) => {
    const active = pathname === href;
    return (
      <Link href={href} asChild>
        <Pressable style={[styles.tab, active && styles.activeTab]}>
          <Text style={[styles.text, active && styles.activeText]}>{label}</Text>
        </Pressable>
      </Link>
    );
  };

  return (
    <View style={styles.bar}>
      <Tab href="/" label="Home" />
      <Tab href="/shop" label="Shop" />
      <Tab href="/cart" label="Cart" />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "white",
  },
  tab: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 999 },
  activeTab: { backgroundColor: "#1f5134" },
  text: { fontWeight: "700", color: "#1f5134" },
  activeText: { color: "white" },
});
