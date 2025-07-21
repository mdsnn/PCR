// app/(auth)/signup.js
import { FontAwesome } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
});

export default function Signup() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      reset();
      router.replace("/home");
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.innerContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}></Text>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <FontAwesome
                name="user"
                size={18}
                color="#888"
                style={styles.icon}
              />
              <TextInput
                placeholder="Name"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="words"
              />
            </View>
          )}
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <FontAwesome
                name="envelope"
                size={16}
                color="#888"
                style={styles.icon}
              />
              <TextInput
                placeholder="Email"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          )}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>OR</Text>
          <View style={styles.separatorLine} />
        </View>

        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome
            name="google"
            size={18}
            color="#fff"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.facebookButton}>
          <FontAwesome
            name="facebook"
            size={18}
            color="#1877f2"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.facebookText}>Continue with Facebook</Text>
        </TouchableOpacity>

        <View style={styles.footerTextContainer}>
          <Text>Already have an account? </Text>
          <Link href="/(auth)/login" style={styles.link}>
            Login
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
    color: "#128c7e",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
  },
  button: {
    backgroundColor: "#25d366",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    color: "red",
    marginBottom: 10,
    marginLeft: 4,
    fontSize: 13,
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  separatorText: {
    marginHorizontal: 10,
    color: "#888",
  },
  socialButton: {
    flexDirection: "row",
    backgroundColor: "#de5246",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  socialText: {
    color: "#fff",
    fontWeight: "600",
  },
  facebookButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1877f2",
    marginBottom: 20,
  },
  facebookText: {
    color: "#1877f2",
    fontWeight: "600",
  },
  footerTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  link: {
    color: "#128c7e",
    fontWeight: "600",
  },
});
