import { Link } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);

    if (error) {
      Alert.alert("Login Failed", error.message);
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-100"
    >
      <View className="flex-1 justify-center px-5">
        <Text className="text-3xl font-bold text-center mb-2 text-gray-800">
          Welcome Back
        </Text>
        <Text className="text-base text-center mb-8 text-gray-600">
          Sign in to your account
        </Text>

        <TextInput
          className="bg-white px-4 py-4 rounded-xl mb-4 text-base border border-gray-300"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          className="bg-white px-4 py-4 rounded-xl mb-4 text-base border border-gray-300"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          className={`${
            loading ? "bg-gray-400" : "bg-blue-500"
          } py-4 rounded-xl mt-2`}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text className="text-white text-center text-base font-semibold">
            {loading ? "Signing In..." : "Sign In"}
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">Don't have an account? </Text>
          <Link href="/(auth)/register" className="text-blue-500 font-semibold">
            Sign up
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
