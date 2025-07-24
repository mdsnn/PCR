import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationsScreen() {
  const [notifications] = useState([
    {
      id: "1",
      title: "Welcome to the app!",
      message: "Thanks for downloading our app. Explore all features.",
      time: "2 hours ago",
      read: false,
      type: "info",
    },
    {
      id: "2",
      title: "New features available",
      message: "Check out the latest updates in the app store.",
      time: "1 day ago",
      read: true,
      type: "update",
    },
    {
      id: "3",
      title: "Cart reminder",
      message: "You have items waiting in your cart.",
      time: "2 days ago",
      read: false,
      type: "reminder",
    },
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "info":
        return "information-circle";
      case "update":
        return "download";
      case "reminder":
        return "time";
      default:
        return "notifications";
    }
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationItem, !item.read && styles.unread]}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={getNotificationIcon(item.type)}
          size={24}
          color="#22C55E"
        />
      </View>
      <View style={styles.notificationContent}>
        <Text
          style={[styles.notificationTitle, !item.read && styles.unreadText]}
        >
          {item.title}
        </Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.markAllRead}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        style={styles.notificationsList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#BBF7D0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1C1C1E",
  },
  markAllRead: {
    fontSize: 16,
    color: "#22C55E",
  },
  notificationsList: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  unread: {
    backgroundColor: "#F0FDF4",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 4,
  },
  unreadText: {
    fontWeight: "bold",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: "#C7C7CC",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22C55E",
    marginLeft: 8,
  },
});
