import { Stack } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";

export default function Layout() {
  return (
    <PaperProvider>
      <Stack screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="users" options={{ title: "Users" }} />
        <Stack.Screen name="products" options={{ title: "Products" }} />
        <Stack.Screen name="orders" options={{ title: "Orders" }} />
      </Stack>
    </PaperProvider>
  );
}
