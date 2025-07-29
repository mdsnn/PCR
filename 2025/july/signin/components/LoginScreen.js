import { useRef, useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const { height } = Dimensions.get("window");

const FloatingCircle = ({ size, top, left, right, bottom, delay }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
          delay: delay,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
  }, []);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });

  return (
    <Animated.View
      style={[
        styles.floatingCircle,
        {
          width: size,
          height: size,
          top,
          left,
          right,
          bottom,
          transform: [{ translateY }, { scale }],
          opacity,
        },
      ]}
    />
  );
};

// Yup validation schema
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const containerAnimation = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(containerAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const onSubmit = (data) => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      Alert.alert("Success", `Welcome ${data.email}!`);
    }, 1500);
  };

  const handleForgotPassword = () => {
    Alert.alert("Forgot Password", "Reset functionality goes here.");
  };

  const handleSignUp = () => {
    Alert.alert("Sign Up", "Sign up flow goes here.");
  };

  const handleSocialLogin = (provider) => {
    Alert.alert("Social Login", `${provider} login would be implemented here`);
  };

  const containerTranslateY = containerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const containerOpacity = containerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={["#22c55e", "#16a34a"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      />

      <FloatingCircle size={80} top="20%" left="10%" delay={0} />
      <FloatingCircle size={120} top="60%" right="15%" delay={2000} />
      <FloatingCircle size={60} bottom="20%" left="20%" delay={4000} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View
            style={[
              styles.loginContainer,
              {
                transform: [{ translateY: containerTranslateY }],
                opacity: containerOpacity,
              },
            ]}
          >
            <BlurView intensity={20} style={styles.blurContainer}>
              <View style={styles.logoSection}>
                <Text style={styles.logoTitle}>POTBELLY ERA</Text>
              </View>

              {/* Email Input */}
              <View style={styles.inputGroup}>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color="#a0aec0"
                    style={styles.inputIcon}
                  />
                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        style={styles.textInput}
                        placeholder="Enter your email address"
                        placeholderTextColor="#a0aec0"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect={false}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                </View>
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email.message}</Text>
                )}
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value, onBlur } }) => (
                    <View style={styles.inputWrapper}>
                      <TextInput
                        placeholder="Password"
                        placeholderTextColor="#888"
                        style={styles.input}
                        secureTextEntry={!passwordVisible}
                        autoComplete="off"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                      <TouchableOpacity
                        style={styles.visibilityToggle}
                        onPress={() => setPasswordVisible((prev) => !prev)}
                      >
                        <MaterialCommunityIcons
                          name={passwordVisible ? "eye-off" : "eye"}
                          size={24}
                          color="#888"
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                />
                {errors.password && (
                  <Text style={styles.errorText}>
                    {errors.password.message}
                  </Text>
                )}
              </View>

              {/* Forgot Password */}
              <TouchableOpacity
                style={styles.forgotPassword}
                onPress={handleForgotPassword}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Sign In Button */}
              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <TouchableOpacity
                  style={styles.signInButton}
                  onPress={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={["#22c55e", "#16a34a"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.signInGradient}
                  >
                    {isSubmitting ? (
                      <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color="#fff" />
                        <Text style={styles.signInButtonText}>
                          {" "}
                          Signing In...
                        </Text>
                      </View>
                    ) : (
                      <Text style={styles.signInButtonText}>Sign In</Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or continue with</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Login */}
              <View style={styles.socialLoginContainer}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin("Google")}
                  activeOpacity={0.7}
                >
                  <Ionicons name="logo-google" size={18} color="#4285F4" />
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
              </View>

              {/* Sign Up Link */}
              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don't have an account? </Text>
                <TouchableOpacity onPress={handleSignUp}>
                  <Text style={styles.signUpLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </BlurView>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  floatingCircle: {
    position: "absolute",
    borderRadius: 1000,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  keyboardAvoid: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  loginContainer: {
    borderRadius: 24,
    overflow: "hidden",
    marginHorizontal: 20,
  },
  blurContainer: {
    padding: 40,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoTitle: {
    fontSize: 26,
    fontWeight: "500",
    color: "#2d3748",
    marginBottom: 8,
  },
  inputGroup: { marginBottom: 24 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 48,
    color: "#000",
  },
  visibilityToggle: {
    padding: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
    marginLeft: 4,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
    marginTop: -8,
  },
  forgotPasswordText: {
    color: "#22c55e",
    fontSize: 14,
    fontWeight: "500",
  },
  signInButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 32,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signInGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  signInButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e2e8f0",
  },
  dividerText: {
    color: "#718096",
    fontSize: 14,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  socialButtonText: {
    color: "#4a5568",
    fontWeight: "500",
    marginLeft: 8,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    color: "#718096",
    fontSize: 14,
  },
  signUpLink: {
    color: "#22c55e",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default LoginScreen;
