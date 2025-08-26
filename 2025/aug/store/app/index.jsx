import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";

// Replace with your actual API URL
const API_BASE_URL = "http://192.168.141.233:8000"; // For development
// const API_BASE_URL = 'http://YOUR_SERVER_IP:8000'; // For testing on device

// Validation schema
const userSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  age: yup
    .number()
    .transform((value, originalValue) => {
      // Transform empty string to undefined
      return originalValue === "" ? undefined : value;
    })
    .nullable()
    .notRequired()
    .min(1, "Age must be at least 1")
    .max(150, "Age must be less than 150")
    .integer("Age must be a whole number"),
});

export default function Home() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      age: "",
    },
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/users/`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        Alert.alert("Error", "Failed to fetch users");
      }
    } catch (error) {
      Alert.alert("Error", `Network error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Create or update user - form submission handler
  const onSubmit = async (data) => {
    const userData = {
      name: data.name.trim(),
      email: data.email.trim(),
      age: data.age ? parseInt(data.age) : null,
    };

    try {
      let response;

      if (editingUser) {
        // Update existing user
        response = await fetch(`${API_BASE_URL}/users/${editingUser.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
      } else {
        // Create new user
        response = await fetch(`${API_BASE_URL}/users/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
      }

      if (response.ok) {
        Alert.alert(
          "Success",
          `User ${editingUser ? "updated" : "created"} successfully`
        );
        clearForm();
        fetchUsers();
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.detail || "Failed to save user");
      }
    } catch (error) {
      Alert.alert("Error", `Network error: ${error.message}`);
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this user?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: "DELETE",
              });

              if (response.ok) {
                Alert.alert("Success", "User deleted successfully");
                fetchUsers();
              } else {
                Alert.alert("Error", "Failed to delete user");
              }
            } catch (error) {
              Alert.alert("Error", `Network error: ${error.message}`);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  // Edit user
  const editUser = (user) => {
    setEditingUser(user);
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("age", user.age ? user.age.toString() : "");
  };

  // Clear form
  const clearForm = () => {
    reset({
      name: "",
      email: "",
      age: "",
    });
    setEditingUser(null);
  };

  // Refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUsers();
    setRefreshing(false);
  };

  // Custom input component with error handling
  const FormInput = ({
    name,
    placeholder,
    keyboardType = "default",
    autoCapitalize = "sentences",
    ...props
  }) => (
    <View style={styles.inputContainer}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors[name] && styles.inputError]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            editable={!isSubmitting && !loading}
            {...props}
          />
        )}
      />
      {errors[name] && (
        <Text style={styles.errorText}>{errors[name].message}</Text>
      )}
    </View>
  );

  // Render form header component
  const renderFormHeader = () => (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>
        {editingUser ? "Edit User" : "Add New User"}
      </Text>

      <FormInput name="name" placeholder="Name *" autoCapitalize="words" />

      <FormInput
        name="email"
        placeholder="Email *"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <FormInput
        name="age"
        placeholder="Age (optional)"
        keyboardType="numeric"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.saveButton,
            (isSubmitting || loading) && styles.disabledButton,
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting || loading}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Saving..." : editingUser ? "Update" : "Create"}
          </Text>
        </TouchableOpacity>

        {editingUser && (
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={clearForm}
            disabled={isSubmitting || loading}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* List Header */}
      <View style={styles.listHeader}>
        <Text style={styles.sectionTitle}>Users ({users.length})</Text>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={onRefresh}
          disabled={refreshing}
        >
          <Text style={styles.refreshButtonText}>
            {refreshing ? "Refreshing..." : "Refresh"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Render user item
  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        {item.age && <Text style={styles.userAge}>Age: {item.age}</Text>}
        <Text style={styles.userDate}>
          Created: {new Date(item.created_at).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.userActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => editUser(item)}
          disabled={isSubmitting || loading}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => deleteUser(item.id)}
          disabled={isSubmitting || loading}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderFormHeader}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No users found</Text>
        }
        contentContainerStyle={styles.flatListContent}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  flatListContent: {
    flexGrow: 1,
  },
  formSection: {
    backgroundColor: "white",
    padding: 20,
    margin: 10,
    marginBottom: 0,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#FF3B30",
    borderWidth: 2,
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    fontWeight: "500",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 5,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: "#007AFF",
  },
  cancelButton: {
    backgroundColor: "#FF3B30",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  refreshButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
  },
  refreshButtonText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "500",
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "white",
    marginHorizontal: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  userAge: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
  userDate: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 4,
  },
  userActions: {
    flexDirection: "row",
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginLeft: 5,
  },
  editButton: {
    backgroundColor: "#FF9500",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
  },
  actionButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 50,
    paddingHorizontal: 20,
  },
});
