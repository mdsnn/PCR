import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Potbelly</Text>
          <Text style={styles.subtitle}>Your favorite food app</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Items</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Delicious Sandwiches</Text>
            <Text style={styles.cardText}>
              Fresh ingredients, made to order
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Fresh Salads</Text>
            <Text style={styles.cardText}>Healthy and nutritious options</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Hot Soups</Text>
            <Text style={styles.cardText}>
              Warm and comforting daily specials
            </Text>
          </View>
        </View>
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
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#10b981",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#6b7280",
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
});
