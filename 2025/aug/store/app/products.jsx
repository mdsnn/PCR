import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import api from "../lib/api";

export default function ProductsScreen() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const fetchProducts = async () => {
    const res = await api.get("/products?skip=0&limit=20");
    setProducts(res.data);
  };

  const addProduct = async () => {
    try {
      await api.post("/products", { name, price: parseFloat(price) || 0 });
      setName("");
      setPrice("");
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text variant="titleMedium">➕ Add Product</Text>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={{ marginBottom: 5 }}
      />
      <TextInput
        label="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="decimal-pad"
        style={{ marginBottom: 5 }}
      />
      <Button
        mode="contained"
        onPress={addProduct}
        style={{ marginBottom: 20 }}
      >
        Save Product
      </Button>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 10 }}>
            <Card.Title title={item.name} />
            <Card.Content>
              <Text>Price: ${item.price}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}
