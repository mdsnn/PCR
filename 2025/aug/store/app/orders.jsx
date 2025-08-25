import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import api from "../lib/api";

export default function OrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const fetchOrders = async () => {
    const res = await api.get("/orders?skip=0&limit=20");
    setOrders(res.data);
  };

  const addOrder = async () => {
    try {
      await api.post("/orders", {
        user_id: parseInt(userId),
        product_id: parseInt(productId),
        quantity: parseInt(quantity) || 1,
      });
      setUserId("");
      setProductId("");
      setQuantity("");
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text variant="titleMedium">➕ Add Order</Text>
      <TextInput
        label="User ID"
        value={userId}
        onChangeText={setUserId}
        keyboardType="numeric"
        style={{ marginBottom: 5 }}
      />
      <TextInput
        label="Product ID"
        value={productId}
        onChangeText={setProductId}
        keyboardType="numeric"
        style={{ marginBottom: 5 }}
      />
      <TextInput
        label="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={{ marginBottom: 5 }}
      />
      <Button mode="contained" onPress={addOrder} style={{ marginBottom: 20 }}>
        Save Order
      </Button>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 10 }}>
            <Card.Title title={`Order #${item.id}`} />
            <Card.Content>
              <Text>User: {item.user_name}</Text>
              <Text>Product: {item.product_name}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Total: ${(item.price * item.quantity).toFixed(2)}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}
