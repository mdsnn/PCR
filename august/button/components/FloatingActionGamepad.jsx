import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  SafeAreaView,
  Easing,
} from "react-native";

const positions = [
  {
    label: "📍",
    dx: 0,
    dy: -80,
    color: "#FF6B6B",
    name: "Check-in",
    description: "Check-in",
  },
  {
    label: "📅",
    dx: -80,
    dy: 0,
    color: "#4ECDC4",
    name: "Events",
    description: "Events",
  },
  {
    label: "📸",
    dx: 80,
    dy: 0,
    color: "#45B7D1",
    name: "Food Photos",
    description: "Food Photos",
  },
  {
    label: "👨‍🍳",
    dx: 0,
    dy: 80,
    color: "#96CEB4",
    name: "Cooking Sessions",
    description: "Cooking",
  },
];

export default function FloatingActionGamepad() {
  const [isExpanded, setIsExpanded] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;

  // Button press shrink effect
  const pressScales = positions.map(
    () => useRef(new Animated.Value(1)).current
  );

  // Ripple glow values
  const rippleScales = positions.map(
    () => useRef(new Animated.Value(0)).current
  );
  const rippleOpacities = positions.map(
    () => useRef(new Animated.Value(0)).current
  );

  // Label animation
  const labelAnim = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = isExpanded ? 0 : 1;

    Animated.parallel([
      Animated.timing(anim, {
        toValue,
        duration: 300,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(labelAnim, {
        toValue,
        duration: 250,
        delay: toValue === 1 ? 100 : 0, // Delay labels when opening
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => setIsExpanded(!isExpanded));
  };

  const handleButtonPress = (name, idx) => {
    // Ripple animation
    rippleScales[idx].setValue(0.8);
    rippleOpacities[idx].setValue(0.4);

    Animated.parallel([
      Animated.sequence([
        Animated.timing(pressScales[idx], {
          toValue: 0.85,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(pressScales[idx], {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(rippleScales[idx], {
        toValue: 2,
        duration: 400,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(rippleOpacities[idx], {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => {
      console.log(`${name} button pressed!`);

      // Handle different button actions
      switch (name) {
        case "Check-in":
          console.log("Opening check-in with broadcast options");
          break;
        case "Events":
          console.log("Opening event creation");
          break;
        case "Food Photos":
          console.log("Opening camera for food photos");
          break;
        case "Cooking Sessions":
          console.log("Starting cooking session with Agora SDK");
          break;
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Social Food Gamepad</Text>
        <Text style={styles.subtitle}>
          Tap the + button to access check-in, events, food photos, and cooking
          sessions
        </Text>
      </View>

      <View style={styles.fabContainer}>
        {positions.map((btn, idx) => {
          const translateX = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, btn.dx],
          });
          const translateY = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, btn.dy],
          });
          const scale = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          });

          // Calculate label position based on button position
          const labelTranslateX = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [
              0,
              btn.dx > 0 ? btn.dx + 35 : btn.dx < 0 ? btn.dx - 35 : 0,
            ],
          });
          const labelTranslateY = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [
              0,
              btn.dy > 0 ? btn.dy + 35 : btn.dy < 0 ? btn.dy - 35 : 0,
            ],
          });

          return (
            <React.Fragment key={idx}>
              {/* Button */}
              <Animated.View
                style={[
                  styles.gameButton,
                  {
                    transform: [{ translateX }, { translateY }, { scale }],
                    opacity: anim,
                  },
                ]}
              >
                {/* Ripple Glow Layer */}
                <Animated.View
                  style={[
                    styles.ripple,
                    {
                      backgroundColor: btn.color,
                      transform: [{ scale: rippleScales[idx] }],
                      opacity: rippleOpacities[idx],
                    },
                  ]}
                />
                {/* Button */}
                <Animated.View
                  style={[
                    styles.gameButtonInner,
                    {
                      backgroundColor: btn.color,
                      transform: [{ scale: pressScales[idx] }],
                    },
                  ]}
                >
                  <TouchableWithoutFeedback
                    onPressIn={() => handleButtonPress(btn.name, idx)}
                  >
                    <View style={styles.gameButtonInner}>
                      <Text style={styles.gameButtonText}>{btn.label}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </Animated.View>
              </Animated.View>

              {/* Label */}
              <Animated.View
                style={[
                  styles.labelContainer,
                  {
                    transform: [
                      { translateX: labelTranslateX },
                      { translateY: labelTranslateY },
                      { scale: labelAnim },
                    ],
                    opacity: labelAnim,
                  },
                ]}
              >
                <View style={styles.label}>
                  <Text style={styles.labelText}>{btn.description}</Text>
                </View>
              </Animated.View>
            </React.Fragment>
          );
        })}

        {/* Center FAB */}
        <Animated.View
          style={[
            styles.fab,
            {
              transform: [
                {
                  scale: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.9],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableWithoutFeedback onPress={toggleMenu}>
            <View style={styles.fabButton}>
              <Animated.Text
                style={[
                  styles.fabText,
                  {
                    transform: [
                      {
                        rotate: anim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ["0deg", "45deg"],
                        }),
                      },
                    ],
                  },
                ]}
              >
                +
              </Animated.Text>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 10 },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  fabContainer: {
    position: "absolute",
    bottom: 100,
    right: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#007AFF",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  fabButton: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  fabText: { fontSize: 24, color: "white", fontWeight: "bold" },
  gameButton: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  gameButtonInner: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  gameButtonText: { fontSize: 18, color: "white", fontWeight: "bold" },
  ripple: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  labelContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  labelText: {
    fontSize: 12,
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
});
