import { Text, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <View className="flex-1 bg-gray-100 p-5">
      <Text className="text-2xl font-bold text-gray-800 mb-2">
        Welcome Home!
      </Text>
      <Text className="text-base text-gray-600 mb-8">
        Hello, {user?.email || "User"}
      </Text>

      <View className="bg-white p-5 rounded-xl shadow-md">
        <Text className="text-xl font-semibold text-gray-800 mb-2">
          Dashboard
        </Text>
        <Text className="text-base text-gray-600 leading-6">
          This is your home screen. You can add your app's main content here.
        </Text>
      </View>
    </View>
  );
}
