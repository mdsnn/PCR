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

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const { data, error } = await signUp(email, password);

    if (error) {
      Alert.alert("Registration Failed", error.message);
    } else {
      Alert.alert(
        "Success",
        "Account created! Please check your email to verify your account.",
        [{ text: "OK" }]
      );
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
          Create Account
        </Text>
        <Text className="text-base text-center mb-8 text-gray-600">
          Sign up to get started
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

        <TextInput
          className="bg-white px-4 py-4 rounded-xl mb-4 text-base border border-gray-300"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity
          className={`${
            loading ? "bg-gray-400" : "bg-blue-500"
          } py-4 rounded-xl mt-2`}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text className="text-white text-center text-base font-semibold">
            {loading ? "Creating Account..." : "Create Account"}
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">Already have an account? </Text>
          <Link href="/(auth)/login" className="text-blue-500 font-semibold">
            Sign in
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
