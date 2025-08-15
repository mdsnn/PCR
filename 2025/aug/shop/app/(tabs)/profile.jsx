// app/(tabs)/profile.js
import { Ionicons } from "@expo/vector-icons";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../lib/store/authSlice";

export default function Profile() {
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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-row justify-between items-center px-6 py-4 bg-white shadow-sm">
        <Text className="text-2xl font-bold text-gray-800">Profile</Text>
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
        {/* Profile Header */}
        <View className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <View className="items-center">
            <View className="w-20 h-20 bg-blue-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="person" size={32} color="#3b82f6" />
            </View>
            <Text className="text-xl font-bold text-gray-800">
              {user?.email}
            </Text>
            <Text className="text-gray-500 text-sm">
              Member since {formatDate(user?.created_at)}
            </Text>
          </View>
        </View>

        {/* Account Information */}
        <View className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Account Information
          </Text>

          <View className="space-y-4">
            <View className="flex-row justify-between items-center py-2">
              <Text className="text-gray-600">Email</Text>
              <Text className="text-gray-800 font-medium">{user?.email}</Text>
            </View>

            <View className="flex-row justify-between items-center py-2">
              <Text className="text-gray-600">User ID</Text>
              <Text className="text-gray-800 font-mono text-xs">
                {user?.id}
              </Text>
            </View>

            <View className="flex-row justify-between items-center py-2">
              <Text className="text-gray-600">Email Verified</Text>
              <View className="flex-row items-center">
                <Ionicons
                  name={
                    user?.email_confirmed_at
                      ? "checkmark-circle"
                      : "close-circle"
                  }
                  size={16}
                  color={user?.email_confirmed_at ? "#059669" : "#dc2626"}
                />
                <Text
                  className={`ml-1 font-medium ${
                    user?.email_confirmed_at ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {user?.email_confirmed_at ? "Yes" : "No"}
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between items-center py-2">
              <Text className="text-gray-600">Last Sign In</Text>
              <Text className="text-gray-800">
                {formatDate(user?.last_sign_in_at)}
              </Text>
            </View>

            <View className="flex-row justify-between items-center py-2">
              <Text className="text-gray-600">Created At</Text>
              <Text className="text-gray-800">
                {formatDate(user?.created_at)}
              </Text>
            </View>
          </View>
        </View>

        {/* Profile Actions */}
        <View className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Profile Actions
          </Text>

          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
                <Ionicons name="person-outline" size={20} color="#3b82f6" />
              </View>
              <Text className="ml-3 text-gray-800 font-medium">
                Edit Profile
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#059669"
                />
              </View>
              <Text className="ml-3 text-gray-800 font-medium">
                Change Password
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center">
                <Ionicons name="shield-outline" size={20} color="#7c3aed" />
              </View>
              <Text className="ml-3 text-gray-800 font-medium">
                Privacy Settings
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between py-3">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center">
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color="#ea580c"
                />
              </View>
              <Text className="ml-3 text-gray-800 font-medium">
                Notifications
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        {/* Danger Zone */}
        <View className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <Text className="text-lg font-semibold text-red-600 mb-4">
            Danger Zone
          </Text>

          <TouchableOpacity className="flex-row items-center justify-between py-3">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center">
                <Ionicons name="trash-outline" size={20} color="#dc2626" />
              </View>
              <View className="ml-3">
                <Text className="text-red-600 font-medium">Delete Account</Text>
                <Text className="text-red-400 text-xs">
                  This action cannot be undone
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#fca5a5" />
          </TouchableOpacity>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          onPress={handleSignOut}
          disabled={loading}
          className="bg-red-500 rounded-lg p-4 items-center"
        >
          <View className="flex-row items-center">
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text className="text-white font-semibold ml-2">
              {loading ? "Signing Out..." : "Sign Out"}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
