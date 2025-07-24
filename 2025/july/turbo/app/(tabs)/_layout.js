import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
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
          borderRadius: 30,
          height: 70,
          borderTopWidth: 0,
          backgroundColor: "transparent", // important for blur to show
          overflow: "hidden", // clips corners for blur
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          ...Platform.select({
            android: {
              elevation: 10,
            },
          }),
        },
        tabBarBackground: () => (
          <BlurView intensity={70} tint="light" style={{ flex: 1 }} />
        ),
        tabBarItemStyle: { marginTop: 10 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "cart" : "cart-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="mapview"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "map" : "map-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
