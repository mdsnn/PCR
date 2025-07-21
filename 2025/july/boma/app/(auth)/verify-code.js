import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function VerifyCode() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleVerify = () => {
    if (code.length !== 6) {
      Alert.alert("Code must be 6 digits");
      return;
    }

    router.push("/(auth)/reset-password");
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-2xl font-bold text-center mb-6">Verify Code</Text>
      <TextInput
        placeholder="Enter verification code"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        className="bg-gray-100 p-4 rounded-xl mb-4"
      />
      <TouchableOpacity
        onPress={handleVerify}
        className="bg-green-500 p-4 rounded-xl shadow-sm"
      >
        <Text className="text-white text-center font-semibold">Verify</Text>
      </TouchableOpacity>
    </View>
  );
}
