import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";

import { CartProvider } from "./CartContext";
import BottomNavigation from "../components/BottomNavigation";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <CartProvider>
         <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
  <View style={{ flex: 1, width: "100%", maxWidth: 1200 }}>
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "default",
      }}
    />
  </View>
            <BottomNavigation />
          </View>
        </CartProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
