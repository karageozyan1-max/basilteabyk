import React from "react";
import { View, Text, Image, StyleSheet, Pressable, useWindowDimensions } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  return (
    <View style={styles.page}>
      <View style={[styles.inner, isDesktop && styles.innerDesktop]}>
        {/* Left: text + card */}
        <View style={[styles.left, isDesktop && styles.leftDesktop]}>
          <Text style={styles.brand}>Basil Tea by K.</Text>
          <Text style={styles.tagline}>Sip abundance. Feel balance.</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>BASIL{"\n"}TEA</Text>
            <Text style={styles.cardSub}>BY K</Text>
            <Text style={styles.cardMini}>SIP ABUNDANCE. FEEL BALANCE.</Text>
            <Text style={styles.cardMini2}>LIVE PROSPERITY.</Text>
          </View>

          <Link href="/shop" asChild>
            <Pressable style={styles.shopBtn}>
              <Text style={styles.shopBtnText}>Shop Now</Text>
            </Pressable>
          </Link>
        </View>

        {/* Right: bottle */}
        <View style={[styles.right, isDesktop && styles.rightDesktop]}>
          <Image
            source={require("../assets/images/basil-bottle.png")}
            style={[styles.bottle, isDesktop && styles.bottleDesktop]}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#0f3d2e", // deep green
    paddingTop: 40,
    paddingBottom: 110, // space so bottom nav doesn't cover button
  },
  inner: {
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 16,
    gap: 18,
  },
  innerDesktop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
  },
  left: { width: "100%" },
  leftDesktop: { width: "55%" },

  brand: {
    color: "#f3efe6",
    fontSize: 44,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  tagline: {
    color: "#c7ad74",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#1a4b3a",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    maxWidth: 520,
  },
  cardTitle: {
    color: "#f3efe6",
    fontSize: 44,
    fontWeight: "700",
    lineHeight: 46,
  },
  cardSub: {
    color: "#f3efe6",
    fontSize: 18,
    marginTop: 6,
    letterSpacing: 2,
  },
  cardMini: {
    color: "rgba(243,239,230,0.75)",
    marginTop: 18,
    fontSize: 12,
    letterSpacing: 1,
  },
  cardMini2: {
    color: "rgba(243,239,230,0.75)",
    marginTop: 6,
    fontSize: 12,
    letterSpacing: 1,
  },

  shopBtn: {
    marginTop: 18,
    backgroundColor: "#c7ad74",
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 14,
    alignSelf: "flex-start",
  },
  shopBtnText: {
    color: "#173a2d",
    fontSize: 16,
    fontWeight: "700",
  },

  right: { width: "100%", alignItems: "center" },
  rightDesktop: { width: "40%", alignItems: "flex-end" },

  bottle: {
    width: "100%",
    maxWidth: 420,
    height: 420,
  },
  bottleDesktop: {
    maxWidth: 520,
    height: 520,
  },
});
