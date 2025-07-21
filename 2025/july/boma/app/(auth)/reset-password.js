import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleReset = () => {
    if (password.length < 6) {
      Alert.alert("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    Alert.alert("Password reset successfully");
    router.replace("/(auth)/login");
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-2xl font-bold text-center mb-6">
        Reset Password
      </Text>
      <TextInput
        placeholder="New Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="bg-gray-100 p-4 rounded-xl mb-4"
      />
      <TextInput
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        className="bg-gray-100 p-4 rounded-xl mb-4"
      />
      <TouchableOpacity
        onPress={handleReset}
        className="bg-green-500 p-4 rounded-xl shadow-sm"
      >
        <Text className="text-white text-center font-semibold">
          Reset Password
        </Text>
      </TouchableOpacity>
    </View>
  );
}
