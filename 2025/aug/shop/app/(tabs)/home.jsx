import { Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function Home() {

  return (
    <View className="flex-1 bg-white px-6 justify-center items-center">
      <Text className="text-3xl font-bold text-gray-800 mb-4">
        Welcome Home!
      </Text>
      <Text className="text-gray-600 text-center">
        Hello {user?.email}! You've successfully logged in.
    </View>
  );
}
