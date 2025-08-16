import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../store/authSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => dispatch(signOut()),
      },
    ]);
  };

  return (
    <View className="flex-1 bg-white px-6 py-12">
      <View className="items-center mb-8">
        <View className="w-20 h-20 bg-blue-500 rounded-full items-center justify-center mb-4">
          <Text className="text-white text-2xl font-bold">
            {user?.email?.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text className="text-2xl font-bold text-gray-800 mb-2">Profile</Text>
        <Text className="text-gray-600">{user?.email}</Text>
      </View>

      <View className="space-y-4">
        <View className="bg-gray-50 rounded-lg p-4">
          <Text className="text-gray-500 text-sm">Email</Text>
          <Text className="text-gray-800 text-lg">{user?.email}</Text>
        </View>

        <View className="bg-gray-50 rounded-lg p-4">
          <Text className="text-gray-500 text-sm">Account Created</Text>
          <Text className="text-gray-800 text-lg">
            {new Date(user?.created_at).toLocaleDateString()}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        className={`bg-red-500 rounded-lg py-4 mt-8 ${loading ? "opacity-50" : ""}`}
        onPress={handleLogout}
        disabled={loading}
      >
        <Text className="text-white text-center font-semibold text-lg">
          {loading ? "Logging out..." : "Logout"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
