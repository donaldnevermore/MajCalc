import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { useAppSelector } from "../redux/hooks";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

export const Score: FC = () => {
  const state = useAppSelector((state) => state.mahjong);
  if (!state.result) {
    return null;
  }

  const roundUp = (num: number) => Math.ceil(num / 100) * 100;

  const { pointSet, hora, basicPoint } = state.result;
  const roundUpPoint = roundUp(state.result.basicPoint);
  const isRon = state.result.hora.type === "ron";
  const isDealer = state.seatWind === 0;

  let point: number | string;
  if (isRon) {
    point = roundUp(basicPoint * (isDealer ? 6 : 4));
  } else {
    if (isDealer) {
      point = `${roundUpPoint * 6}（${roundUpPoint * 2}）`;
    } else {
      point = `${roundUpPoint * 4}（${roundUpPoint * 2}-${roundUpPoint}）`;
    }
  }

  return (
    <ThemedView style={styles.wrap}>
      <ThemedText>
        {state.tsumo ? "自摸" : "荣和"}，{pointSet.han} 番 {pointSet.fu} 符，{point}
      </ThemedText>
      {hora?.yaku.map((item: any, i: number) => {
        return (
          <ThemedText key={i}>
            {item.name}： {item.point} 番
          </ThemedText>
        );
      })}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  wrap: {
    margin: 4,
  },
});
