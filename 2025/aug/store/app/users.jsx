import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import api from "../lib/api";

export default function UsersScreen() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const fetchUsers = async () => {
    const res = await api.get("/users?skip=0&limit=20");
    setUsers(res.data);
  };

  const addUser = async () => {
    try {
      await api.post("/users", { name, email, age: parseInt(age) || null });
      setName("");
      setEmail("");
      setAge("");
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text variant="titleMedium">➕ Add User</Text>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={{ marginBottom: 5 }}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 5 }}
      />
      <TextInput
        label="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={{ marginBottom: 5 }}
      />
      <Button mode="contained" onPress={addUser} style={{ marginBottom: 20 }}>
        Save User
      </Button>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 10 }}>
            <Card.Title title={item.name} subtitle={item.email} />
            <Card.Content>
              <Text>Age: {item.age ?? "N/A"}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}
