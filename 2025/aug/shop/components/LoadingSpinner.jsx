import { ActivityIndicator, View } from "react-native";

export default function LoadingSpinner({ size = "large", color = "#3B82F6" }) {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}
