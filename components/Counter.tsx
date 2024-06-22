import React, { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@rneui/themed";

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
      <Button disabled={n <= 0} onPress={minus}>
        -
      </Button>
      <Text style={styles.num}>{n}</Text>
      <Button onPress={add}>+</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  num: {
    width: 40,
    paddingLeft: 15,
    paddingTop: 10,
  },
});
