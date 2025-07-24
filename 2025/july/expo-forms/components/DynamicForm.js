import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as yup from "yup";

// Yup schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phoneNumbers: yup
    .array()
    .of(
      yup
        .string()
        .matches(/^\d{10}$/, "Invalid phone number")
        .required("Phone is required")
    )
    .min(1, "At least one phone number is required"),
});

const DynamicForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: "", phoneNumbers: [""] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phoneNumbers",
  });

  const onSubmit = (data) => {
    alert(`Submitted: ${JSON.stringify(data, null, 2)}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dynamic Phone Form</Text>

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            placeholder="Full Name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      {fields.map((field, index) => (
        <View key={field.id} style={styles.inputContainer}>
          <Controller
            control={control}
            name={`phoneNumbers[${index}]`}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  errors.phoneNumbers?.[index] && styles.inputError,
                ]}
                placeholder="Phone Number"
                value={value}
                onChangeText={onChange}
                keyboardType="phone-pad"
              />
            )}
          />
          {errors.phoneNumbers?.[index] && (
            <Text style={styles.error}>
              {errors.phoneNumbers[index].message}
            </Text>
          )}
          <Button
            title="Remove"
            onPress={() => remove(index)}
            disabled={fields.length === 1}
          />
        </View>
      ))}

      <Button title="Add Phone" onPress={() => append("")} />
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
  inputContainer: { marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5 },
  inputError: { borderColor: "red" },
  error: { color: "red", fontSize: 12 },
});

export default DynamicForm;
