import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
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

const { width, height } = Dimensions.get("window");

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
          top: top,
          left: left,
          right: right,
          bottom: bottom,
          transform: [{ translateY }, { scale }],
          opacity,
        },
      ]}
    />
  );
};

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const containerAnimation = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(containerAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);

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
      setIsLoading(false);
      Alert.alert("Success", "Login successful! (This is a demo)");
    }, 2000);
  };

  const handleSocialLogin = (provider) => {
    Alert.alert("Social Login", `${provider} login would be implemented here`);
  };

  const handleForgotPassword = () => {
    Alert.alert(
      "Forgot Password",
      "Password reset functionality would be implemented here"
    );
  };

  const handleSignUp = () => {
    Alert.alert(
      "Sign Up",
      "Sign up functionality would redirect to registration page"
    );
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
          showsVerticalScrollIndicator={false}
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

              <View style={styles.inputGroup}>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color="#a0aec0"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your email address"
                    placeholderTextColor="#a0aec0"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#a0aec0"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your password"
                    placeholderTextColor="#a0aec0"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.passwordToggle}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#718096"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.forgotPassword}
                onPress={handleForgotPassword}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <TouchableOpacity
                  style={styles.signInButton}
                  onPress={handleSignIn}
                  disabled={isLoading}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={["#22c55e", "#16a34a"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.signInGradient}
                  >
                    <Text style={styles.signInButtonText}>
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or continue with</Text>
                <View style={styles.dividerLine} />
              </View>

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
  container: {
    flex: 1,
  },
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
  keyboardAvoid: {
    flex: 1,
  },
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
    fontSize: 28,
    fontWeight: "700",
    color: "#2d3748",
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputWrapper: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  inputIcon: {
    position: "absolute",
    left: 16,
    zIndex: 1,
  },
  textInput: {
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 48,
    paddingRight: 48,
    fontSize: 16,
    color: "#2d3748",
  },
  passwordToggle: {
    position: "absolute",
    right: 16,
    padding: 4,
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

export default App;
