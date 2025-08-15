import { Redirect, Stack } from "expo-router";
import { useSelector } from "react-redux";

export default function AuthLayout() {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
