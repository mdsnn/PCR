import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../context/ThemeContext";

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <MaterialCommunityIcons />
          <Text style={[styles.title, { color: colors.text }]}></Text>
          <ThemeToggle style={styles.themeToggle} />
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Welcome to your app!
          </Text>
          <Text style={[styles.cardText, { color: colors.textSecondary }]}>
            This is the home screen with a beautiful glassmorphism tab bar at
            the bottom. Try switching between light and dark mode using the
            toggle above!
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Features
          </Text>
          <Text style={[styles.cardText, { color: colors.textSecondary }]}>
            • Custom glassmorphism tab bar{"\n"}• Light/Dark mode toggle{"\n"}•
            Smooth animations{"\n"}• Material Community Icons{"\n"}• Expo Router
            navigation
          </Text>
        </View>

        {/* Add some extra content to demonstrate scrolling */}
        {Array.from({ length: 5 }, (_, i) => (
          <View
            key={i}
            style={[styles.card, { backgroundColor: colors.surface }]}
          >
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Card {i + 1}
            </Text>
            <Text style={[styles.cardText, { color: colors.textSecondary }]}>
              This is additional content to show how the tab bar stays fixed at
              the bottom while content scrolls behind it. The theme adapts
              beautifully!
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
  },
  content: {
    padding: 20,
    paddingBottom: 120, // Extra padding for tab bar
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
    position: "relative",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 8,
  },
  themeToggle: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  card: {
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
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
