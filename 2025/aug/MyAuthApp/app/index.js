import { Redirect } from "expo-router";
import { Text, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Redirect based on authentication status
  if (user) {
    return <Redirect href="/(tabs)" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
}
