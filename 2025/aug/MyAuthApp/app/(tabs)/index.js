import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user?.name}!</Text>
      <Text style={styles.email}>Email: {user?.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  email: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
