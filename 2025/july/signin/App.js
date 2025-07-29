import { Text, View } from "react-native";
import React, { Component } from "react";
import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";

export class App extends Component {
  render() {
    return <SignupScreen />;
  }
}

export default App;
