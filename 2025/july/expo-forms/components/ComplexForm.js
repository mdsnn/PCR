import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import * as yup from "yup";

// Simulated async email check
const checkEmailExists = async (email) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return email !== "test@example.com"; // Simulate email not taken
};

// Yup schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .test("email-unique", "Email already taken", checkEmailExists),
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username too short"),
  subscribe: yup.boolean(),
  preference: yup.string().when("subscribe", {
    is: true,
    then: yup.string().required("Preference is required when subscribed"),
    otherwise: yup.string().notRequired(),
  }),
});

const ComplexForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      username: "",
      subscribe: false,
      preference: "",
    },
    mode: "onChange", // Enable real-time validation for async
  });

  const onSubmit = (data) => {
    alert(`Submitted: ${JSON.stringify(data, null, 2)}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complex Form</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.username && styles.inputError]}
            placeholder="Username"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.username && (
        <Text style={styles.error}>{errors.username.message}</Text>
      )}

      <Controller
        control={control}
        name="subscribe"
        render={({ field: { onChange, value } }) => (
          <View style={styles.switchContainer}>
            <Text>Subscribe to Newsletter</Text>
            <Switch value={value} onValueChange={onChange} />
          </View>
        )}
      />

      {control._formValues.subscribe && (
        <Controller
          control={control}
          name="preference"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.preference && styles.inputError]}
              placeholder="Newsletter Preference"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      )}
      {errors.preference && (
        <Text style={styles.error}>{errors.preference.message}</Text>
      )}

      <Button
        title={isSubmitting ? "Submitting..." : "Submit"}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  inputError: { borderColor: "red" },
  error: { color: "red", fontSize: 12, marginBottom: 10 },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default ComplexForm;
