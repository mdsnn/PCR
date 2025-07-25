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

export default function NotificationsScreen() {
  const { colors } = useTheme();

  const notifications = [
    {
      id: 1,
      title: "Order Shipped",
      message: "Your order #12345 has been shipped and is on its way!",
      time: "2 hours ago",
      read: false,
      icon: "truck-delivery",
    },
    {
      id: 2,
      title: "New Message",
      message: "You have received a new message from support.",
      time: "4 hours ago",
      read: true,
      icon: "message-text",
    },
    {
      id: 3,
      title: "Sale Alert",
      message: "Flash sale! 50% off on selected items. Limited time offer.",
      time: "1 day ago",
      read: false,
      icon: "sale",
    },
    {
      id: 4,
      title: "Account Update",
      message: "Your profile has been successfully updated.",
      time: "2 days ago",
      read: true,
      icon: "account-check",
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <MaterialCommunityIcons />
          <Text style={[styles.title, { color: colors.text }]}></Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: `${colors.primary}20` },
            ]}
          >
            <Text style={[styles.actionText, { color: colors.primary }]}>
              Mark all as read
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: `${colors.primary}20` },
            ]}
          >
            <Text style={[styles.actionText, { color: colors.primary }]}>
              Clear all
            </Text>
          </TouchableOpacity>
        </View>

        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[
              styles.notificationItem,
              { backgroundColor: colors.surface },
            ]}
          >
            <View
              style={[
                styles.notificationIcon,
                { backgroundColor: `${colors.primary}20` },
              ]}
            >
              <MaterialCommunityIcons
                name={notification.icon}
                size={24}
                color={colors.primary}
              />
            </View>

            <View style={styles.notificationContent}>
              <View style={styles.notificationHeader}>
                <Text
                  style={[styles.notificationTitle, { color: colors.text }]}
                >
                  {notification.title}
                </Text>
                {!notification.read && (
                  <View
                    style={[
                      styles.unreadDot,
                      { backgroundColor: colors.primary },
                    ]}
                  />
                )}
              </View>

              <Text
                style={[
                  styles.notificationMessage,
                  { color: colors.textSecondary },
                ]}
              >
                {notification.message}
              </Text>

              <Text
                style={[
                  styles.notificationTime,
                  { color: colors.textTertiary },
                ]}
              >
                {notification.time}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
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
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "500",
  },
  notificationItem: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
  },
});
