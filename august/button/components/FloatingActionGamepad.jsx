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
    label: "△",
    dx: 0,
    dy: -70,
    color: "#FF6B6B",
    name: "Check-In",
    key: "checkin",
  },
  {
    label: "□",
    dx: -70,
    dy: 0,
    color: "#4ECDC4",
    name: "Events",
    key: "events",
  },
  {
    label: "○",
    dx: 70,
    dy: 0,
    color: "#45B7D1",
    name: "Food Pic",
    key: "foodpic",
  },
  {
    label: "✕",
    dx: 0,
    dy: 70,
    color: "#96CEB4",
    name: "Cook Live",
    key: "cooking",
  },
];

export default function FloatingActionGamepad() {
  const [isExpanded, setIsExpanded] = useState(false);
  const anim = useRef(new Animated.Value(0)).current; // 0 = collapsed, 1 = expanded

  // Press scale for each button (tactile shrink)
  const pressScales = positions.map(
    () => useRef(new Animated.Value(1)).current
  );

  // Ripple glow values for each button
  const rippleScales = positions.map(
    () => useRef(new Animated.Value(0)).current
  );
  const rippleOpacities = positions.map(
    () => useRef(new Animated.Value(0)).current
  );

  const toggleMenu = () => {
    Animated.timing(anim, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start(() => setIsExpanded(!isExpanded));
  };

  // Visuals only: press-in ripple + shrink (trigger onPressIn)
  const startPressVisuals = (idx) => {
    // reset ripple start values
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
        duration: 420,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(rippleOpacities[idx], {
        toValue: 0,
        duration: 420,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Action handlers (replace with real navigation/modals/integration)
  const onCheckIn = () => {
    // open check-in modal with broadcast options (now / after 6 hours / custom)
    console.log("Open check-in modal (broadcast now / after 6h / custom)");
  };

  const onCreateEvent = () => {
    // open event creation flow (invite friends)
    console.log("Open create event flow");
  };

  const onTakeFoodPic = () => {
    // open camera/upload flow, then broadcast
    console.log("Open camera / image picker for food pic");
  };

  const onStartCookingSession = () => {
    // start an Agora live session or recipe post flow
    console.log("Start Agora cooking session or open recipe composer");
  };

  const handleAction = (key) => {
    switch (key) {
      case "checkin":
        onCheckIn();
        break;
      case "events":
        onCreateEvent();
        break;
      case "foodpic":
        onTakeFoodPic();
        break;
      case "cooking":
        onStartCookingSession();
        break;
      default:
        console.log("Unknown action", key);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Floating Action Gamepad</Text>
        <Text style={styles.subtitle}>
          Tap the button to see the game controller layout
        </Text>
      </View>

      {/* FAB / Gamepad Hub */}
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
          const appearScale = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          });

          // label animations: fade & slight upward slide when expanding
          const labelOpacity = anim;
          const labelTranslateY = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [8, 0],
          });

          return (
            <Animated.View
              key={btn.key}
              style={[
                styles.buttonWrapper,
                {
                  transform: [{ translateX }, { translateY }],
                  opacity: anim,
                },
              ]}
              pointerEvents={isExpanded ? "auto" : "none"}
            >
              {/* Container to center the button and label */}
              <View style={styles.buttonAndLabel}>
                {/* Animated button + ripple */}
                <Animated.View
                  style={[
                    styles.gameButton,
                    {
                      transform: [{ scale: appearScale }],
                    },
                  ]}
                >
                  {/* Ripple Layer (behind button) */}
                  <Animated.View
                    pointerEvents="none"
                    style={[
                      styles.ripple,
                      {
                        backgroundColor: btn.color,
                        transform: [{ scale: rippleScales[idx] }],
                        opacity: rippleOpacities[idx],
                      },
                    ]}
                  />

                  {/* Touchable button */}
                  <TouchableWithoutFeedback
                    onPressIn={() => startPressVisuals(idx)}
                    onPress={() => handleAction(btn.key)}
                  >
                    <Animated.View
                      style={[
                        styles.gameButtonInner,
                        {
                          backgroundColor: btn.color,
                          transform: [{ scale: pressScales[idx] }],
                        },
                      ]}
                    >
                      <Text style={styles.gameButtonText}>{btn.label}</Text>
                    </Animated.View>
                  </TouchableWithoutFeedback>
                </Animated.View>

                {/* Label below button */}
                <Animated.Text
                  style={[
                    styles.buttonLabel,
                    {
                      opacity: labelOpacity,
                      transform: [{ translateY: labelTranslateY }],
                    },
                  ]}
                >
                  {btn.name}
                </Animated.Text>
              </View>
            </Animated.View>
          );
        })}

        {/* FAB that becomes the center close button */}
        <Animated.View
          style={[
            styles.fab,
            {
              transform: [
                {
                  scale: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.92],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableWithoutFeedback onPress={toggleMenu}>
            <View style={styles.fabButton}>
              <Text style={styles.fabText}>{isExpanded ? "✕" : "+"}</Text>
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

  /* Button wrapper positions the popup button relative to the FAB */
  buttonWrapper: {
    position: "absolute",
    width: 90, // enough room for label under the button
    height: 110,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  buttonAndLabel: {
    alignItems: "center",
    justifyContent: "flex-start",
  },

  gameButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    overflow: "visible", // so ripple can expand
  },

  // Ripple sits behind the button and expands outward
  ripple: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  gameButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  gameButtonText: { fontSize: 20, color: "white", fontWeight: "bold" },

  buttonLabel: {
    marginTop: 8,
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
});
