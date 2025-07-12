import { StyleSheet } from "react-native";

import { Home } from "@/components/Home";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function HomeScreen() {
  return (
    <Provider store={store}>
      <ParallaxScrollView>
        <Home />
      </ParallaxScrollView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
