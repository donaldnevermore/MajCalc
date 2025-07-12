import React from "react";
import { StyleSheet } from "react-native";
import { Checkbox, SegmentedControl, Text, View } from "react-native-ui-lib";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setAccumulatedYakuman,
  setAfterKan,
  setBlessing,
  setDora,
  setDoubleYakuman,
  setIppatsu,
  setLast,
  setMultipleYakuman,
  setRiichi,
  setRobbingKan,
  setRoundUpMangan,
  setRoundWind,
  setSeatWind,
  setTsumo,
  setWindFu,
} from "../redux/mahjong-slice";

import { Counter } from "./Counter";
import { TileInputScore } from "./TileInputScore";

export const Home = () => {
  const state = useAppSelector((state) => state.mahjong);
  const dispatch = useAppDispatch();
  const winds = [{ label: "東" }, { label: "南" }, { label: "西" }, { label: "北" }];

  return (
    <View>
      <Text style={styles.subHeader}>场风</Text>
      <SegmentedControl
        segments={winds}
        initialIndex={state.roundWind}
        onChangeIndex={(value) => dispatch(setRoundWind(value))}
      />

      <Text style={styles.subHeader}>自风</Text>
      <SegmentedControl
        segments={winds}
        initialIndex={state.seatWind}
        onChangeIndex={(value) => dispatch(setSeatWind(value))}
      />

      <Text style={styles.subHeader}>宝牌</Text>
      <Counter n={state.dora} notify={(n) => dispatch(setDora(n))} />

      <TileInputScore />

      <View gap-s2>
        <SegmentedControl
          segments={[{ label: "无" }, { label: "立直" }, { label: "W 立直" }]}
          initialIndex={state.riichi}
          onChangeIndex={(value) => dispatch(setRiichi(value))}
        />

        <SegmentedControl
          segments={[{ label: "荣和" }, { label: "自摸" }]}
          initialIndex={state.tsumo}
          onChangeIndex={(value) => dispatch(setTsumo(value))}
        />

        <Checkbox
          label="一发"
          value={state.ippatsu}
          onValueChange={() => dispatch(setIppatsu())}
        />

        <Checkbox
          label="岭上开花"
          value={state.afterKan}
          onValueChange={() => dispatch(setAfterKan())}
        />

        <Checkbox
          label="抢杠"
          value={state.robbingKan}
          onValueChange={() => dispatch(setRobbingKan())}
        />

        <Checkbox
          label="海底/河底"
          value={state.last}
          onValueChange={() => dispatch(setLast())}
        />

        <Checkbox
          label="天和/地和"
          value={state.blessing}
          onValueChange={() => dispatch(setBlessing())}
        />

        <SegmentedControl
          segments={[{ label: "连风牌雀头 2 符" }, { label: "连风牌雀头 4 符" }]}
          initialIndex={state.windFu}
          onChangeIndex={(value) => dispatch(setWindFu(value))}
        />

        <Checkbox
          label="切上满贯（基本点 1920 点）"
          value={state.roundUpMangan}
          onValueChange={() => dispatch(setRoundUpMangan())}
        />

        <Checkbox
          label="累计役满（13 番以上）"
          value={state.accumulatedYakuman}
          onValueChange={() => dispatch(setAccumulatedYakuman())}
        />

        <Checkbox
          label="复合役满"
          value={state.multipleYakuman}
          onValueChange={() => dispatch(setMultipleYakuman())}
        />

        <Checkbox
          label="双倍役满"
          value={state.doubleYakuman}
          onValueChange={() => dispatch(setDoubleYakuman())}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subHeader: {
    textAlign: "center",
  },
});
