// app/(tabs)/home.js
import { Ionicons } from "@expo/vector-icons";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../lib/store/authSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => dispatch(signOut()),
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-row justify-between items-center px-6 py-4 bg-white shadow-sm">
        <Text className="text-2xl font-bold text-gray-800">Home</Text>
        <TouchableOpacity
          onPress={handleSignOut}
          disabled={loading}
          className="flex-row items-center bg-red-500 px-3 py-2 rounded-md"
        >
          <Ionicons name="log-out-outline" size={16} color="white" />
          <Text className="text-white font-medium ml-1">
            {loading ? "Signing Out..." : "Sign Out"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6 py-6">
        <View className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center">
              <Ionicons name="person" size={24} color="#3b82f6" />
            </View>
            <View className="ml-4">
              <Text className="text-lg font-semibold text-gray-800">
                Welcome back!
              </Text>
              <Text className="text-gray-600">{user?.email}</Text>
            </View>
          </View>

          <View className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <Text className="text-blue-800 font-medium">Account Status</Text>
            <Text className="text-blue-600 text-sm mt-1">
              {user?.email_confirmed_at
                ? "Email verified"
                : "Email not verified"}
            </Text>
          </View>
        </View>

        <View className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </Text>

          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100">
            <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center">
              <Ionicons name="settings-outline" size={20} color="#059669" />
            </View>
            <View className="ml-3">
              <Text className="text-gray-800 font-medium">Settings</Text>
              <Text className="text-gray-500 text-sm">Manage your account</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100">
            <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center">
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#7c3aed"
              />
            </View>
            <View className="ml-3">
              <Text className="text-gray-800 font-medium">Notifications</Text>
              <Text className="text-gray-500 text-sm">
                Manage notifications
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-3">
            <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center">
              <Ionicons name="help-circle-outline" size={20} color="#ea580c" />
            </View>
            <View className="ml-3">
              <Text className="text-gray-800 font-medium">Help & Support</Text>
              <Text className="text-gray-500 text-sm">
                Get help and support
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6">
          <Text className="text-white text-lg font-bold mb-2">
            🎉 Welcome to the app!
          </Text>
          <Text className="text-blue-100 text-sm">
            You're successfully authenticated with Supabase. Start exploring the
            features!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
