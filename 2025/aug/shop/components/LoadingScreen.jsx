// components/LoadingScreen.js
import { ActivityIndicator, Text, View } from "react-native";

export default function LoadingScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#3b82f6" />
      <Text className="mt-4 text-gray-600">Loading... POTBELLY</Text>
    </View>
  );
}
