import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAuth } from "../authcontext/AuthProvider";

export default function App() {
  const { user, supabase } = useAuth();
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  // Fetch names

  const fetchNames = async () => {
    const { data } = await supabase
      .from("names")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setNames(data || []);
  };

  // Add name
  const insertName = async () => {
    if (!name.trim()) return Alert.alert("Error", "Please enter a name");
    setLoading(true);
    const { error } = await supabase
      .from("names")
      .insert([{ name: name.trim(), user_id: user.id }]);
    if (!error) {
      setName("");
      fetchNames();
    }
    setLoading(false);
  };
  const addName = async () => {
    if (!name.trim()) return;
    await supabase
      .from("names")
      .insert([{ name: name.trim(), user_id: user.id }]);
    setName("");
    fetchNames();
  };

  // Delete name
  const deleteName = async (id) => {
    const { error } = await supabase.from("names").delete().eq("id", id);
    if (!error) fetchNames();
  };

  // Start editing
  const startEditing = (item) => {
    setEditingId(item.id);
    setEditingValue(item.name);
  };

  // Save edit
  const saveEdit = async () => {
    if (!editingValue.trim())
      return Alert.alert("Error", "Name cannot be empty");
    const { error } = await supabase
      .from("names")
      .update({ name: editingValue.trim() })
      .eq("id", editingId);
    if (!error) {
      setEditingId(null);
      setEditingValue("");
      fetchNames();
    }
  };

  useEffect(() => {
    fetchNames();
  }, []);

  const renderNameItem = ({ item }) => (
    <View style={styles.nameItem}>
      {editingId === item.id ? (
        <TextInput
          style={[styles.nameText, styles.editInput]}
          value={editingValue}
          onChangeText={setEditingValue}
          onSubmitEditing={saveEdit}
          autoFocus
        />
      ) : (
        <TouchableOpacity
          onPress={() => startEditing(item)}
          style={{ flex: 1 }}
        >
          <Text style={styles.nameText}>{item.name}</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.dateText}>
        {new Date(item.created_at).toLocaleDateString()}
      </Text>

      {editingId === item.id ? (
        <TouchableOpacity onPress={saveEdit} style={{ marginLeft: 10 }}>
          <Ionicons name="checkmark" size={22} color="green" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => deleteName(item.id)}
          style={{ marginLeft: 10 }}
        >
          <Ionicons name="trash" size={22} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
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
          ListEmptyComponent={
            <Text style={styles.emptyText}>No names added yet</Text>
          }
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { paddingTop: 60, paddingBottom: 20, backgroundColor: "#6366f1" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  formContainer: {
    padding: 20,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 12,
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
  buttonDisabled: { backgroundColor: "#9ca3af" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  listContainer: { flex: 1, padding: 20 },
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
    alignItems: "center",
    elevation: 2,
  },
  nameText: { fontSize: 16, color: "#374151", fontWeight: "500", flex: 1 },
  editInput: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 2,
  },
  dateText: { fontSize: 12, color: "#6b7280", marginLeft: 10 },
  emptyText: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: 16,
    marginTop: 20,
  },
});
