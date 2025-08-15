import { Slot } from "expo-router";
import { Provider } from "react-redux";
import "../global.css";
import { store } from "../lib/store/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}
