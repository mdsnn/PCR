import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFoundScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-6xl mb-4">🤔</Text>
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          Page Not Found
        </Text>
        <Text className="text-gray-600 text-center mb-8">
          Sorry, we couldn't find the page you're looking for.
        </Text>
        <Link href="/" asChild>
          <TouchableOpacity className="bg-blue-600 px-6 py-3 rounded-lg">
            <Text className="text-white font-semibold">Go Home</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}
