import { FontAwesome } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from "react-native";
import * as Yup from "yup";

const { height: screenHeight } = Dimensions.get("window");

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange", // Real-time validation
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const passwordRef = useRef(null);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // const response = await authService.login(data.email, data.password);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Login Failed", "Invalid credentials. Please try again.", [
        { text: "OK" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  const handleSignUp = () => {
    router.push("/(auth)/signup");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.flex}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.title}>POTBELLY ERA</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            {/* Email Input */}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value, onBlur } }) => (
                <View
                  style={[
                    styles.inputWrapper,
                    errors.email && styles.inputError,
                    value && !errors.email && styles.inputValid,
                  ]}
                >
                  <FontAwesome
                    name="envelope"
                    size={20}
                    color={
                      errors.email ? "#e74c3c" : value ? "#27ae60" : "#999"
                    }
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="next"
                    accessibilityLabel="Email input"
                    textContentType="emailAddress"
                    autoComplete="email"
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    blurOnSubmit={false}
                  />
                </View>
              )}
            />
            {errors.email && (
              <View style={styles.errorContainer}>
                <FontAwesome
                  name="exclamation-circle"
                  size={12}
                  color="#e74c3c"
                />
                <Text style={styles.errorText}>{errors.email.message}</Text>
              </View>
            )}

            {/* Password Input */}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value, onBlur } }) => (
                <View
                  style={[
                    styles.inputWrapper,
                    errors.password && styles.inputError,
                    value && !errors.password && styles.inputValid,
                  ]}
                >
                  <FontAwesome
                    name="lock"
                    size={20}
                    color={
                      errors.password ? "#e74c3c" : value ? "#27ae60" : "#999"
                    }
                    style={styles.icon}
                  />
                  <TextInput
                    ref={passwordRef}
                    style={styles.input}
                    placeholder="Enter your password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    returnKeyType="done"
                    accessibilityLabel="Password input"
                    textContentType="password"
                    autoComplete="password"
                    onSubmitEditing={handleSubmit(onSubmit)}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                    accessibilityLabel={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <FontAwesome
                      name={showPassword ? "eye-slash" : "eye"}
                      size={18}
                      color="#999"
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.password && (
              <View style={styles.errorContainer}>
                <FontAwesome
                  name="exclamation-circle"
                  size={12}
                  color="#e74c3c"
                />
                <Text style={styles.errorText}>{errors.password.message}</Text>
              </View>
            )}

            {/* Forgot Password Link */}
            <TouchableOpacity
              onPress={handleForgotPassword}
              style={styles.linkRight}
              accessibilityLabel="Forgot password"
            >
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={loading || !isValid}
              style={[
                styles.buttonContainer,
                (!isValid || loading) && styles.buttonDisabled,
              ]}
              accessibilityLabel="Login button"
            >
              <LinearGradient
                colors={
                  !isValid || loading
                    ? ["#bdc3c7", "#95a5a6"]
                    : ["#25d366", "#128c7e"]
                }
                style={styles.button}
              >
                {loading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator color="#fff" size="small" />
                    <Text style={[styles.buttonText, { marginLeft: 8 }]}>
                      Signing in...
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.buttonText}>Sign In</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Footer Section */}
          <View style={styles.footerSection}>
            <TouchableOpacity
              onPress={handleSignUp}
              accessibilityLabel="Go to sign up"
            >
              <Text style={styles.footerText}>
                Don't have an account?{" "}
                <Text style={styles.linkTextBold}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: screenHeight * 0.1,
    paddingBottom: 24,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#128c7e",
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    lineHeight: 24,
  },
  formSection: {
    flex: 1,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e9ecef",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 4,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    transition: "all 0.2s ease",
  },
  inputError: {
    borderColor: "#e74c3c",
    backgroundColor: "#fdf2f2",
  },
  inputValid: {
    borderColor: "#27ae60",
    backgroundColor: "#f8fff8",
  },
  icon: {
    marginRight: 12,
    width: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#2c3e50",
    paddingVertical: 0, // Remove default padding
  },
  eyeIcon: {
    padding: 4,
    marginLeft: 8,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginLeft: 4,
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 13,
    marginLeft: 6,
    flex: 1,
  },
  linkRight: {
    alignSelf: "flex-end",
    marginBottom: 32,
    padding: 8,
  },
  linkText: {
    color: "#128c7e",
    fontSize: 14,
    fontWeight: "500",
  },
  buttonContainer: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
    shadowOpacity: 0.05,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerSection: {
    alignItems: "center",
    paddingTop: 24,
  },
  footerText: {
    color: "#6c757d",
    fontSize: 15,
    textAlign: "center",
  },
  linkTextBold: {
    color: "#128c7e",
    fontWeight: "600",
  },
});
