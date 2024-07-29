import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider  value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> 
      <StatusBar style="auto" />
      <Text>12</Text>
      <Image style={styles.image} source={require('../assets/images/splash.jpg')}  width={40} height={40} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="charging" options={{ headerShown: false }} />
        <Stack.Screen name="tenks" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack> 
    </ThemeProvider>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 90,
    marginTop: 10, 
  }
});