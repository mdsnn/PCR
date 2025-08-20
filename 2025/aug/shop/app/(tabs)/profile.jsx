import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

export default function Profile() {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          const { error } = await signOut();
          if (error) {
            Alert.alert("Error", error.message);
          }
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-gray-100 p-5">
      <Text className="text-3xl font-bold text-gray-800 mb-8">Profile</Text>

      <View className="bg-white p-5 rounded-xl mb-4 shadow-md">
        <Text className="text-sm text-gray-600 font-medium mb-1">Email</Text>
        <Text className="text-base text-gray-800">{user?.email}</Text>
      </View>

      <View className="bg-white p-5 rounded-xl mb-4 shadow-md">
        <Text className="text-sm text-gray-600 font-medium mb-1">User ID</Text>
        <Text className="text-base text-gray-800">{user?.id}</Text>
      </View>

      <View className="bg-white p-5 rounded-xl mb-4 shadow-md">
        <Text className="text-sm text-gray-600 font-medium mb-1">Created</Text>
        <Text className="text-base text-gray-800">
          {new Date(user?.created_at).toLocaleDateString()}
        </Text>
      </View>

      <TouchableOpacity
        className="bg-red-500 py-4 rounded-xl mt-6"
        onPress={handleSignOut}
      >
        <Text className="text-white text-center text-lg font-semibold">
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
