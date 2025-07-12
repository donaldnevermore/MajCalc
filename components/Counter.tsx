import React, { FC, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Text, View } from "react-native-ui-lib";

export const Counter: FC<{
  n: number;
  notify: (n: number) => void;
}> = ({ n, notify }) => {
  const [count, setCount] = useState(n);

  const minus = () => {
    const v = count - 1;
    setCount(v);
    notify(v);
  };

  const add = () => {
    const v = count + 1;
    setCount(v);
    notify(v);
  };

  return (
    <View style={styles.container}>
      <Button label="-" disabled={n <= 0} onPress={minus} labelStyle={styles.size} />
      <Text style={styles.num}>{n}</Text>
      <Button label="+" onPress={add} labelStyle={styles.size} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  num: {
    width: 50,
    textAlign: "center",
    fontSize: 24,
    padding: 10,
  },
  size: {
    fontSize: 32,
  },
});
