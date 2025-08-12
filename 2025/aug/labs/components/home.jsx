import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Replace with your Supabase URL and anon key
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function App() {
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch names from Supabase
  const fetchNames = async () => {
    try {
      const { data, error } = await supabase
        .from("names")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching names:", error);
        Alert.alert("Error", "Failed to fetch names");
      } else {
        setNames(data || []);
      }
    } catch (err) {
      console.error("Error:", err);
      Alert.alert("Error", "Something went wrong");
    }
  };

  // Insert name to Supabase
  const insertName = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter a name");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("names")
        .insert([{ name: name.trim() }])
        .select();

      if (error) {
        console.error("Error inserting name:", error);
        Alert.alert("Error", "Failed to add name");
      } else {
        setName("");
        fetchNames(); // Refresh the list
        Alert.alert("Success", "Name added successfully!");
      }
    } catch (err) {
      console.error("Error:", err);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Load names when component mounts
  useEffect(() => {
    fetchNames();
  }, []);

  const renderNameItem = ({ item }) => (
    <View style={styles.nameItem}>
      <Text style={styles.nameText}>{item.name}</Text>
      <Text style={styles.dateText}>
        {new Date(item.created_at).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Name Manager</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a name"
          value={name}
          onChangeText={setName}
          onSubmitEditing={insertName}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={insertName}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Adding..." : "Add Name"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Names ({names.length})</Text>
        <FlatList
          data={names}
          renderItem={renderNameItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No names added yet</Text>
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#6366f1",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  formContainer: {
    padding: 20,
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: -10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#6366f1",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#9ca3af",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
    padding: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#374151",
  },
  nameItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  nameText: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "500",
  },
  dateText: {
    fontSize: 12,
    color: "#6b7280",
  },
  emptyText: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: 16,
    marginTop: 20,
  },
});
