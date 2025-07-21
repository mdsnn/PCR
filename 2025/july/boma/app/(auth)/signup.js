// app/(auth)/signup.js
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
  ScrollView,
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
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and number"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default function Signup() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState({
    google: false,
    facebook: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  // Refs for input navigation
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  // Watch password for confirmation validation
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // TODO: Replace with actual registration logic
      // const response = await authService.register(data);

      Alert.alert(
        "Account Created!",
        "Welcome to Potbelly Era! Your account has been created successfully.",
        [
          {
            text: "Continue",
            onPress: () => router.replace("/home"),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Registration Failed",
        "Something went wrong. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      setSocialLoading((prev) => ({ ...prev, [provider]: true }));

      // Simulate social login
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // TODO: Implement actual social login
      Alert.alert(
        `${provider === "google" ? "Google" : "Facebook"} Login`,
        "Social login would be implemented here",
        [{ text: "OK" }]
      );
    } catch (error) {
      Alert.alert("Error", `Failed to login with ${provider}`);
    } finally {
      setSocialLoading((prev) => ({ ...prev, [provider]: false }));
    }
  };

  const handleLogin = () => {
    router.push("/(auth)/login");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.flex}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.headerSection}>
              <Text style={styles.title}>POTBELLY ERA</Text>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              {/* Name Row */}

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
                      ref={emailRef}
                      style={styles.input}
                      placeholder="Enter your email"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      returnKeyType="next"
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
                      placeholder="Create a password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      returnKeyType="next"
                      textContentType="newPassword"
                      autoComplete="password-new"
                      onSubmitEditing={() =>
                        confirmPasswordRef.current?.focus()
                      }
                      blurOnSubmit={false}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeIcon}
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
                  <Text style={styles.errorText}>
                    {errors.password.message}
                  </Text>
                </View>
              )}

              {/* Register Button */}
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                disabled={loading}
                style={styles.buttonContainer}
              >
                <LinearGradient
                  colors={["#25d366", "#128c7e"]}
                  style={styles.button}
                >
                  {loading ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator color="#fff" size="small" />
                      <Text style={[styles.buttonText, { marginLeft: 8 }]}>
                        Creating Account...
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.buttonText}>Create Account</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Login Link */}
              <TouchableOpacity
                onPress={handleLogin}
                style={styles.loginLinkContainer}
              >
                <Text style={styles.footerText}>
                  Already have an account?{" "}
                  <Text style={styles.linkTextBold}>Sign In</Text>
                </Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Login Buttons */}
              <TouchableOpacity
                onPress={() => handleSocialLogin("google")}
                style={[styles.socialBtn, styles.googleBtn]}
                disabled={socialLoading.google}
              >
                {socialLoading.google ? (
                  <ActivityIndicator color="#db4437" size="small" />
                ) : (
                  <FontAwesome
                    name="google"
                    size={20}
                    color="#db4437"
                    style={styles.socialIcon}
                  />
                )}
                <Text
                  style={[
                    styles.socialText,
                    socialLoading.google && { marginLeft: 8 },
                  ]}
                >
                  {socialLoading.google
                    ? "Connecting..."
                    : "Continue with Google"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleSocialLogin("facebook")}
                style={[styles.socialBtn, styles.facebookBtn]}
                disabled={socialLoading.facebook}
              >
                {socialLoading.facebook ? (
                  <ActivityIndicator color="#3b5998" size="small" />
                ) : (
                  <FontAwesome
                    name="facebook"
                    size={20}
                    color="#3b5998"
                    style={styles.socialIcon}
                  />
                )}
                <Text
                  style={[
                    styles.socialText,
                    socialLoading.facebook && { marginLeft: 8 },
                  ]}
                >
                  {socialLoading.facebook
                    ? "Connecting..."
                    : "Continue with Facebook"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: screenHeight * 0.08,
    minHeight: screenHeight,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#128c7e",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
  formSection: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  nameInput: {
    width: "48%",
  },
  nameErrorsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    minHeight: 20,
  },
  nameErrorContainer: {
    width: "48%",
    marginBottom: 0,
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
    color: "#333",
    paddingVertical: 0,
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
  errorTextSmall: {
    color: "#e74c3c",
    fontSize: 11,
    marginLeft: 4,
    flex: 1,
  },
  buttonContainer: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
    marginTop: 8,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loginLinkContainer: {
    alignItems: "center",
    marginTop: 24,
    padding: 8,
  },
  footerText: {
    color: "#666",
    fontSize: 15,
    textAlign: "center",
  },
  linkTextBold: {
    color: "#128c7e",
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 28,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e9ecef",
  },
  dividerText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "normal",
    marginHorizontal: 16,
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 6,
    borderWidth: 2,
    borderColor: "#e9ecef",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  googleBtn: {
    borderColor: "#db4437",
    backgroundColor: "#fff",
  },
  facebookBtn: {
    borderColor: "#3b5998",
    backgroundColor: "#fff",
  },
  socialIcon: {
    marginRight: 12,
    width: 20,
  },
  socialText: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#333",
  },
});
