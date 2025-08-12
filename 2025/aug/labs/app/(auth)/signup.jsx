import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../authcontext/AuthProvider";

export default function Signup() {
  const { supabase } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Email and password are required.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password.trim(),
    });

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert(
        "Check your inbox",
        "Please verify your email to complete signup."
      );
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TouchableOpacity
        style={{ backgroundColor: "blue", padding: 15 }}
        onPress={signup}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
