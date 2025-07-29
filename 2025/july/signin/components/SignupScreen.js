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

// Yup validation schema for signup
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const SignupScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: "", password: "", confirmPassword: "" },
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

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
      Alert.alert("Success", `Account created for ${data.email}!`);
    }, 1500);
  };

  const handleSignIn = () => {
    Alert.alert("Sign In", "Navigate to sign in screen.");
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
              styles.signupContainer,
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
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#a0aec0"
                        style={styles.inputIcon}
                      />
                      <TextInput
                        placeholder="Create a password"
                        placeholderTextColor="#a0aec0"
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
                          color="#a0aec0"
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

              {/* Confirm Password Input */}
              <View style={styles.inputGroup}>
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, value, onBlur } }) => (
                    <View style={styles.inputWrapper}>
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#a0aec0"
                        style={styles.inputIcon}
                      />
                      <TextInput
                        placeholder="Confirm your password"
                        placeholderTextColor="#a0aec0"
                        style={styles.input}
                        secureTextEntry={!confirmPasswordVisible}
                        autoComplete="off"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                      <TouchableOpacity
                        style={styles.visibilityToggle}
                        onPress={() =>
                          setConfirmPasswordVisible((prev) => !prev)
                        }
                      >
                        <MaterialCommunityIcons
                          name={confirmPasswordVisible ? "eye-off" : "eye"}
                          size={24}
                          color="#a0aec0"
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                />
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </View>

              {/* Sign Up Button */}
              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <TouchableOpacity
                  style={styles.signUpButton}
                  onPress={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={["#22c55e", "#16a34a"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.signUpGradient}
                  >
                    {isSubmitting ? (
                      <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color="#fff" />
                        <Text style={styles.signUpButtonText}>
                          {" "}
                          Creating Account...
                        </Text>
                      </View>
                    ) : (
                      <Text style={styles.signUpButtonText}>
                        Create Account
                      </Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>

              {/* Sign In Link */}
              <View style={styles.signInContainer}>
                <Text style={styles.signInText}>Already have an account? </Text>
                <TouchableOpacity onPress={handleSignIn}>
                  <Text style={styles.signInLink}>Sign In</Text>
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
  signupContainer: {
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
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#718096",
    fontWeight: "400",
  },
  inputGroup: { marginBottom: 24 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    height: 48,
    color: "#2d3748",
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: 48,
    color: "#2d3748",
    fontSize: 16,
  },
  visibilityToggle: {
    padding: 8,
  },
  errorText: {
    color: "#e53e3e",
    fontSize: 14,
    marginTop: 8,
    marginLeft: 4,
  },
  signUpButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 32,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  signUpButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signInText: {
    color: "#718096",
    fontSize: 14,
  },
  signInLink: {
    color: "#22c55e",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default SignupScreen;
