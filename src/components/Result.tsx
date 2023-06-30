import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../redux/hooks";

export const Result: FC = () => {
  const state = useAppSelector((state) => state.mahjong);

  if (!state.result) {
    return <Text>请输入手牌...</Text>;
  }

  const pointSet = state.result.pointSet;
  const yaku = state.result.hora.yaku;

  return (
    <View style={styles.wrapper}>
      <Text>{state.tsumo ? "自摸" : "荣和"}：</Text>
      <Text>
        {pointSet.han} 番 {pointSet.fu} 符
      </Text>
      {yaku.map((item: any, i: number) => {
        return (
          <Text key={i}>
            {item.name}： {item.point} 番
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    margin: 5,
  },
});
