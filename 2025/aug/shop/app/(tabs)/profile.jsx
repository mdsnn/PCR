import { Ionicons } from "@expo/vector-icons";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../components/LoadingSpinner";
import { signOut } from "../../store/authSlice";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => dispatch(signOut()),
      },
    ]);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-6 py-4">
        {/* Profile Header */}
        <View className="bg-white p-6 rounded-2xl shadow-sm mb-6">
          <View className="items-center mb-4">
            <View className="w-20 h-20 bg-blue-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="person" size={32} color="#3B82F6" />
            </View>
            <Text className="text-xl font-bold text-gray-800">Profile</Text>
          </View>
        </View>

        {/* User Info */}
        <View className="bg-white p-6 rounded-2xl shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Account Information
          </Text>

          <View className="space-y-3">
            <View className="flex-row items-center">
              <Ionicons name="mail-outline" size={20} color="#6B7280" />
              <View className="ml-3 flex-1">
                <Text className="text-gray-500 text-sm">Email</Text>
                <Text className="text-gray-800 font-medium">
                  {user?.email || "Not available"}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={20} color="#6B7280" />
              <View className="ml-3 flex-1">
                <Text className="text-gray-500 text-sm">Member Since</Text>
                <Text className="text-gray-800 font-medium">
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : "Not available"}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color="#6B7280"
              />
              <View className="ml-3 flex-1">
                <Text className="text-gray-500 text-sm">Email Verified</Text>
                <Text className="text-gray-800 font-medium">
                  {user?.email_confirmed_at ? "Yes" : "No"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View className="bg-white p-6 rounded-2xl shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Account Actions
          </Text>

          <TouchableOpacity
            className="bg-red-50 p-4 rounded-lg flex-row items-center"
            onPress={handleSignOut}
          >
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            <Text className="ml-3 text-red-600 font-medium">Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View className="bg-white p-6 rounded-2xl shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            About This App
          </Text>
          <Text className="text-gray-600 text-sm leading-5">
            Built with Expo, Supabase, Redux Toolkit, React Hook Form, Yup
            validation, and styled with NativeWind.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
