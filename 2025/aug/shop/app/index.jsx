import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { useAuth } from "../contexts/AuthContext";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (user && inAuthGroup) {
      // User is signed in but in auth screens, redirect to tabs
      router.replace("/(tabs)/home");
    } else if (!user && !inAuthGroup) {
      // User is not signed in but not in auth screens, redirect to login
      router.replace("/(auth)/login");
    }
  }, [user, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}
