import { Link } from "expo-router";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text variant="headlineMedium">📦 FastAPI Client</Text>
      <Link href="/users" asChild>
        <Button mode="contained" style={{ marginTop: 20 }}>
          Manage Users
        </Button>
      </Link>
      <Link href="/products" asChild>
        <Button mode="contained" style={{ marginTop: 10 }}>
          Manage Products
        </Button>
      </Link>
      <Link href="/orders" asChild>
        <Button mode="contained" style={{ marginTop: 10 }}>
          Manage Orders
        </Button>
      </Link>
    </View>
  );
}
