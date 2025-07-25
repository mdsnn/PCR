import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function CartScreen() {
  const { colors } = useTheme();

  const cartItems = [
    { id: 1, name: "Premium Headphones", price: "$199", quantity: 1 },
    { id: 2, name: "Wireless Mouse", price: "$49", quantity: 2 },
    { id: 3, name: "USB Cable", price: "$15", quantity: 1 },
  ];

  const total = "$313";

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="shopping"
            size={32}
            color={colors.primary}
          />
          <Text style={[styles.title, { color: colors.text }]}>
            Shopping Cart
          </Text>
        </View>

        {cartItems.map((item) => (
          <View
            key={item.id}
            style={[styles.cartItem, { backgroundColor: colors.surface }]}
          >
            <View style={styles.itemInfo}>
              <Text style={[styles.itemName, { color: colors.text }]}>
                {item.name}
              </Text>
              <Text style={[styles.itemPrice, { color: colors.primary }]}>
                {item.price}
              </Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={[
                  styles.quantityButton,
                  { backgroundColor: colors.surfaceSecondary },
                ]}
              >
                <MaterialCommunityIcons
                  name="minus"
                  size={16}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
              <Text style={[styles.quantity, { color: colors.text }]}>
                {item.quantity}
              </Text>
              <TouchableOpacity
                style={[
                  styles.quantityButton,
                  { backgroundColor: colors.surfaceSecondary },
                ]}
              >
                <MaterialCommunityIcons
                  name="plus"
                  size={16}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View
          style={[styles.totalContainer, { backgroundColor: colors.surface }]}
        >
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: colors.text }]}>
              Total:
            </Text>
            <Text style={[styles.totalAmount, { color: colors.primary }]}>
              {total}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.checkoutButton, { backgroundColor: colors.primary }]}
          >
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            <MaterialCommunityIcons
              name="arrow-right"
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 120,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 8,
  },
  cartItem: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "500",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  quantity: {
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: "600",
  },
  totalContainer: {
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "bold",
  },
  checkoutButton: {
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
});
