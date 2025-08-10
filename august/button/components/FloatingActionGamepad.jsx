import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  SafeAreaView,
  Easing,
} from 'react-native';

const positions = [
  { label: '△', dx: 0, dy: -60, color: '#FF6B6B', name: 'Triangle' },
  { label: '□', dx: -60, dy: 0, color: '#4ECDC4', name: 'Square' },
  { label: '○', dx: 60, dy: 0, color: '#45B7D1', name: 'Circle' },
  { label: '✕', dx: 0, dy: 60, color: '#96CEB4', name: 'X' },
];

export default function FloatingActionGamepad() {
  const [isExpanded, setIsExpanded] = useState(false);
  const anim = useRef(new Animated.Value(0)).current; // 0 = collapsed, 1 = expanded

  // Separate scale animations for each button
  const pressScales = positions.map(() => useRef(new Animated.Value(1)).current);

  const toggleMenu = () => {
    Animated.timing(anim, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start(() => setIsExpanded(!isExpanded));
  };

  const handleButtonPress = (name, idx) => {
    // Press down animation
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
    ]).start(() => {
      console.log(`${name} button pressed!`);
    });
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
          const scale = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          });

          return (
            <Animated.View
              key={idx}
              style={[
                styles.gameButton,
                {
                  backgroundColor: btn.color,
                  transform: [
                    { translateX },
                    { translateY },
                    { scale },
                    { scale: pressScales[idx] }, // Ripple effect scale
                  ],
                  opacity: anim,
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
                    outputRange: [1, 0.9],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableWithoutFeedback onPress={toggleMenu}>
            <View style={styles.fabButton}>
              <Text style={styles.fabText}>{isExpanded ? '✕' : '+'}</Text>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', lineHeight: 22 },
  fabContainer: {
    position: 'absolute',
    bottom: 100,
    right: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabButton: { width: '100%', height: '100%', borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
  fabText: { fontSize: 24, color: 'white', fontWeight: 'bold' },
  gameButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  gameButtonInner: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameButtonText: { fontSize: 20, color: 'white', fontWeight: 'bold' },
});
