import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = ({ style }) => {
  const { isDark, toggleTheme, colors } = useTheme();
  const [scaleValue] = React.useState(new Animated.Value(1));

  const handlePress = () => {
    // Scale animation
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    toggleTheme();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.container, { backgroundColor: colors.surface }, style]}
      activeOpacity={0.7}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <MaterialCommunityIcons
          name={isDark ? "weather-sunny" : "weather-night"}
          size={24}
          color={colors.primary}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default ThemeToggle;
