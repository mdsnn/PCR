import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import AuthForm from "../../components/AuthForm";

export default function RegisterScreen() {
  return (
    <View className="flex-1 bg-gray-50">
      <AuthForm mode="register" />

      <View className="px-6 pb-6">
        <Text className="text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text className="text-blue-600 font-semibold">Sign in</Text>
            </TouchableOpacity>
          </Link>
        </Text>
      </View>
    </View>
  );
}
