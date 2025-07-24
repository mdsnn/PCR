import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as yup from "yup";

// Yup schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(18, "Must be 18 or older"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Invalid phone number")
    .required("Phone is required"),
});

// Custom Input Component
const CustomInput = ({
  control,
  name,
  placeholder,
  keyboardType,
  secureTextEntry,
}) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          placeholder={placeholder}
          value={value ? value.toString() : ""} // Handle number inputs
          onChangeText={onChange}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
        />
        {error && <Text style={styles.error}>{error.message}</Text>}
      </View>
    )}
  />
);

const ProfileForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: "", age: "", phone: "" },
  });

  const onSubmit = (data) => {
    alert(`Profile: ${JSON.stringify(data, null, 2)}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>

      <CustomInput
        control={control}
        name="name"
        placeholder="Full Name"
        keyboardType="default"
      />
      <CustomInput
        control={control}
        name="age"
        placeholder="Age"
        keyboardType="numeric"
      />
      <CustomInput
        control={control}
        name="phone"
        placeholder="Phone Number"
        keyboardType="phone-pad"
      />

      <Button
        title={isSubmitting ? "Saving..." : "Save Profile"}
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
  inputContainer: { marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5 },
  inputError: { borderColor: "red" },
  error: { color: "red", fontSize: 12 },
});

export default ProfileForm;
