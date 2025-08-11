import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide the system splash screen immediately
    SplashScreen.hideAsync();
  }, []);

  const handleLoadingFinish = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onFinish={handleLoadingFinish} />;
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="splash" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
