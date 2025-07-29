import { StyleSheet, Text, View } from "react-native";
import SplashScreenView from "./SplashScreenView";
import LoginScreen from "./components/LoginScreen";
import { useEffect, useState } from "react";

export default function App() {
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsShowSplashScreen(false);
    }, 3000);
  });
  return <>{isShowSplashScreen ? <SplashScreenView /> : <LoginScreen />}</>;
}

const styles = StyleSheet.create({});
