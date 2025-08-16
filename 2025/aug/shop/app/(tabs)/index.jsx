import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function HomeScreen() {
  const { user } = useSelector((state) => state.auth);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-6 py-4">
        <View className="bg-white p-6 rounded-2xl shadow-sm mb-6">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            Welcome Home! 👋
          </Text>
          <Text className="text-gray-600">Hello, {user?.email || "User"}</Text>
        </View>

        <View className="bg-white p-6 rounded-2xl shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Getting Started
          </Text>
          <Text className="text-gray-600 leading-6">
            This is your home screen. You can navigate between tabs and access
            your profile from the tab bar below. Your authentication state is
            managed with Redux Toolkit and persisted across app sessions.
          </Text>
        </View>

        <View className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-2xl shadow-sm">
          <Text className="text-white font-semibold text-lg mb-2">
            App Features ✨
          </Text>
          <Text className="text-blue-100">
            • Supabase Authentication{"\n"}• Redux Toolkit State Management
            {"\n"}• Expo Router Navigation{"\n"}• React Hook Form + Yup
            Validation{"\n"}• NativeWind Styling
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
