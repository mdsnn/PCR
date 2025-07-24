import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#22C55E",
        tabBarInactiveTintColor: "#94A3B8",
        tabBarStyle: {
          position: "absolute",
          bottom: 16,
          left: 16,
          right: 16,
          elevation: 10,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 30,
          height: 70,
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 10,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          ...Platform.select({
            android: {
              elevation: 8,
            },
          }),
        },
        tabBarItemStyle: {
          marginTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="home"
              size={focused ? size + 2 : size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="search"
              size={focused ? size + 2 : size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="cart"
              size={focused ? size + 2 : size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="notifications"
              size={focused ? size + 2 : size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="person"
              size={focused ? size + 2 : size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="mapview"
        options={{
          title: "Map",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="map"
              size={focused ? size + 2 : size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
