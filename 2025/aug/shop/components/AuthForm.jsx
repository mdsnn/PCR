import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { clearError, signIn, signUp } from "../store/authSlice";
import LoadingSpinner from "./LoadingSpinner";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function AuthForm({ mode = "login" }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onSubmit = async (data) => {
    try {
      if (mode === "login") {
        await dispatch(signIn(data)).unwrap();
      } else {
        await dispatch(signUp(data)).unwrap();
        if (mode === "register") {
          Alert.alert(
            "Success",
            "Please check your email to confirm your account"
          );
        }
      }
      reset();
    } catch (error) {
      // Error is handled by the useEffect above
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View className="flex-1 justify-center px-6 bg-gray-50">
      <View className="bg-white p-6 rounded-2xl shadow-sm">
        <Text className="text-3xl font-bold text-center text-gray-800 mb-8">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </Text>

        <View className="space-y-4">
          <View>
            <Text className="text-gray-700 mb-2 font-medium">Email</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`border rounded-lg px-4 py-3 text-gray-800 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
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
            <Text className="text-gray-700 mb-2 font-medium">Password</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`border rounded-lg px-4 py-3 text-gray-800 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  autoCapitalize="none"
                />
              )}
            />
            {errors.password && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </Text>
            )}
          </View>
        </View>

        <TouchableOpacity
          className="bg-blue-600 py-4 rounded-lg mt-6 shadow-sm"
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          <Text className="text-white text-center font-semibold text-lg">
            {mode === "login" ? "Sign In" : "Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
