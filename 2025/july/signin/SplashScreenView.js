import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Text as SvgText } from "react-native-svg";

export default function SplashScreenView() {
  return (
    <View style={styles.container}>
      <Svg width="400" height="100" viewBox="0 0 400 100">
        <SvgText
          x="200"
          y="60"
          fontFamily="Arial"
          fontSize="32"
          fontWeight="bold"
          fill="#22C55E"
          textAnchor="middle"
          letterSpacing="2"
        >
          POTBELLY
        </SvgText>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
