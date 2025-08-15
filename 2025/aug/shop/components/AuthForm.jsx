// components/AuthForm.js
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { clearError, signIn, signUp } from "../lib/store/authSlice";

const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const registerSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function AuthForm({ mode }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = mode === "login";
  const schema = isLogin ? loginSchema : registerSchema;

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
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      dispatch(clearError());

      if (isLogin) {
        await dispatch(
          signIn({ email: data.email, password: data.password })
        ).unwrap();
      } else {
        await dispatch(
          signUp({ email: data.email, password: data.password })
        ).unwrap();
        Alert.alert("Success", "Check your email for verification link");
      }
      reset();
    } catch (err) {
      Alert.alert("Error", err);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-gray-50">
      <View className="bg-white rounded-lg shadow-lg p-6">
        <Text className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Welcome Back" : "Create Account"}
        </Text>

        {error && (
          <View className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            <Text className="text-red-600 text-sm">{error}</Text>
          </View>
        )}

        <View className="space-y-4">
          <View>
            <Text className="text-gray-700 text-sm font-medium mb-1">
              Email
            </Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="border border-gray-300 rounded-md px-3 py-3 text-gray-800"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
            />
            {errors.email && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="text-gray-700 text-sm font-medium mb-1">
              Password
            </Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="border border-gray-300 rounded-md px-3 py-3 text-gray-800"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                />
              )}
            />
            {errors.password && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </Text>
            )}
          </View>

          {!isLogin && (
            <View>
              <Text className="text-gray-700 text-sm font-medium mb-1">
                Confirm Password
              </Text>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="border border-gray-300 rounded-md px-3 py-3 text-gray-800"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Confirm your password"
                    secureTextEntry={!showPassword}
                  />
                )}
              />
              {errors.confirmPassword && (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>
          )}

          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="self-end"
          >
            <Text className="text-blue-600 text-sm">
              {showPassword ? "Hide" : "Show"} Password
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
          className={`mt-6 py-3 rounded-md ${
            loading ? "bg-gray-400" : "bg-blue-600"
          }`}
        >
          <Text className="text-white text-center font-semibold">
            {loading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </Text>
          <Link href={isLogin ? "/(auth)/register" : "/(auth)/login"}>
            <Text className="text-blue-600 font-semibold">
              {isLogin ? "Sign Up" : "Sign In"}
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
