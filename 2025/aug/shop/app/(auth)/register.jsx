import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearError, signUp } from "../../store/authSlice";
import { registerSchema } from "../../validation/schema";

export default function Register() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    dispatch(clearError());
    const result = await dispatch(
      signUp({
        email: data.email,
        password: data.password,
      })
    );

    if (signUp.fulfilled.match(result)) {
      Alert.alert(
        "Success",
        "Please check your email to confirm your account!"
      );
    } else if (signUp.rejected.match(result)) {
      Alert.alert("Registration Failed", result.payload);
    }
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <View className="mb-8">
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Create Account
        </Text>
        <Text className="text-gray-600">Sign up to get started</Text>
      </View>

      <View className="space-y-4">
        <View>
          <Text className="text-gray-700 mb-2">Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                placeholder="Enter your email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
          {errors.email && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </Text>
          )}
        </View>

        <View>
          <Text className="text-gray-700 mb-2">Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                placeholder="Enter your password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
          />
          {errors.password && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </Text>
          )}
        </View>

        <View>
          <Text className="text-gray-700 mb-2">Confirm Password</Text>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                placeholder="Confirm your password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
          />
          {errors.confirmPassword && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>

        {error && (
          <Text className="text-red-500 text-sm text-center">{error}</Text>
        )}

        <TouchableOpacity
          className={`bg-blue-500 rounded-lg py-4 ${loading ? "opacity-50" : ""}`}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          <Text className="text-white text-center font-semibold text-lg">
            {loading ? "Creating Account..." : "Create Account"}
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600">Already have an account? </Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text className="text-blue-500 font-semibold">Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}
