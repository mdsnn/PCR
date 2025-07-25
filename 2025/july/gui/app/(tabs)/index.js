import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="home" size={32} color="#22c55e" />
          <Text style={styles.title}>Home</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Welcome to your app!</Text>
          <Text style={styles.cardText}>
            This is the home screen with a beautiful glassmorphism tab bar at
            the bottom.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Features</Text>
          <Text style={styles.cardText}>
            • Custom glassmorphism tab bar{"\n"}• Smooth animations{"\n"}•
            Material Community Icons{"\n"}• Expo Router navigation
          </Text>
        </View>

        {/* Add some extra content to demonstrate scrolling */}
        {Array.from({ length: 5 }, (_, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.cardTitle}>Card {i + 1}</Text>
            <Text style={styles.cardText}>
              This is additional content to show how the tab bar stays fixed at
              the bottom while content scrolls behind it.
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: {
    padding: 20,
    paddingBottom: 120, // Extra padding for tab bar
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 8,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
});
