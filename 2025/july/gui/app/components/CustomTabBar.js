import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const [scaleValues] = React.useState(
    state.routes.map(() => new Animated.Value(1))
  );

  const handlePress = (route, index, isFocused) => {
    // Scale animation
    Animated.sequence([
      Animated.timing(scaleValues[index], {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValues[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  const getIconName = (iconName, isFocused) => {
    const iconMap = {
      home: isFocused ? "home" : "home-outline",
      magnify: isFocused ? "magnify" : "magnify",
      shopping: isFocused ? "shopping" : "shopping-outline",
      bell: isFocused ? "bell" : "bell-outline",
    };
    return iconMap[iconName] || iconName;
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.title !== undefined ? options.title : route.name;
          const iconName = options.tabBarIcon;
          const isFocused = state.index === index;

          return (
            <TouchableOpacity
              key={route.key}
              activeOpacity={0.7}
              onPress={() => handlePress(route, index, isFocused)}
              style={styles.tabItem}
            >
              <Animated.View
                style={[
                  styles.iconContainer,
                  { transform: [{ scale: scaleValues[index] }] },
                ]}
              >
                <MaterialCommunityIcons
                  name={getIconName(iconName, isFocused)}
                  size={24}
                  color={isFocused ? "#22c55e" : "#71717a"}
                />
              </Animated.View>
              <Text
                style={[
                  styles.label,
                  { color: isFocused ? "#22c55e" : "#71717a" },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 25,
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
    backdropFilter: "blur(20px)",
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  iconContainer: {
    marginBottom: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default CustomTabBar;
