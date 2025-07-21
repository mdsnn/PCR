import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSendCode = () => {
    if (!email.includes("@")) {
      Alert.alert("Invalid email");
      return;
    }

    router.push("/(auth)/verify-code");
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-2xl font-bold text-center mb-6">
        Forgot Password
      </Text>
      <View className="bg-gray-100 p-4 rounded-xl flex-row items-center mb-4">
        <Ionicons name="mail-outline" size={20} color="#666" className="mr-2" />
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          className="flex-1"
        />
      </View>
      <TouchableOpacity
        onPress={handleSendCode}
        className="bg-green-500 p-4 rounded-xl shadow-sm mt-2"
      >
        <Text className="text-white text-center font-semibold">
          Send Verification Code
        </Text>
      </TouchableOpacity>
    </View>
  );
}
