import { Text, StyleSheet, View } from "react-native";
import React, { Component } from "react";

export default class SplashScreenView extends Component {
  render() {
    return (
      <View>
        <svg
          width="400"
          height="100"
          viewBox="0 0 400 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="200"
            y="60"
            font-family="Arial, Helvetica, sans-serif"
            font-size="32"
            font-weight="bold"
            fill="#22C55E"
            text-anchor="middle"
            letter-spacing="2px"
          >
            POTBELLY
          </text>
        </svg>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
