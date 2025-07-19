import { calculatePay } from "@/lib/calc-result";
import { useAppSelector } from "@/redux/hooks";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

export const Score: FC = () => {
  const state = useAppSelector((state) => state.mahjong);
  if (!state.result) {
    return null;
  }

  const { pointSet, hora, basicPoint } = state.result;
  const isRon = state.result.hora.type === "ron";
  const isDealer = state.seatWind === 0;
  const point = calculatePay(basicPoint, isRon, isDealer);

  return (
    <View style={styles.wrap}>
      <Text>
        {state.tsumo ? "自摸" : "荣和"}，{pointSet.han} 番 {pointSet.fu} 符，{point}
      </Text>
      {hora?.yaku.map((item: any, i: number) => {
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
  wrap: {
    margin: 4,
  },
});
