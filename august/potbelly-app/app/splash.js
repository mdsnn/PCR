import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const router = useRouter();

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to tabs after 3 seconds
    const timer = setTimeout(() => {
      router.replace("/(tabs)");
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, router]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.title}>Potbelly</Text>
        <Text style={styles.subtitle}>Delicious Food Awaits</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#10b981", // Emerald green
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 18,
    color: "#6b7280",
    textAlign: "center",
    fontWeight: "300",
  },
});
