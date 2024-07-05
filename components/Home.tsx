import React from "react";
import { StyleSheet } from "react-native";
import { ButtonGroup, CheckBox } from "@rneui/themed";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  setSeatWind,
  setRoundWind,
  setDora,
  setRiichi,
  setTsumo,
  setIppatsu,
  setAfterKan,
  setRobbingKan,
  setLast,
  setBlessing,
  setWindFu,
  setRoundUpMangan,
  setAccumulatedYakuman,
  setMultipleYakuman,
  setDoubleYakuman,
} from "../redux/mahjong-slice";

import { Counter } from "./Counter";
import { TileInputScore } from "./TileInputScore";

export const Home = () => {
  const state = useAppSelector((state) => state.mahjong);
  const dispatch = useAppDispatch();
  const winds = ["東", "南", "西", "北"];

  return (
    <ThemedView>
      <ThemedView>
        <ThemedText style={styles.subHeader}>场风</ThemedText>
        <ButtonGroup
          buttons={winds}
          selectedIndex={state.roundWind}
          onPress={(value) => dispatch(setRoundWind(value))}
        />

        <ThemedText style={styles.subHeader}>自风</ThemedText>
        <ButtonGroup
          buttons={winds}
          selectedIndex={state.seatWind}
          onPress={(value) => dispatch(setSeatWind(value))}
        />

        <ThemedText style={styles.subHeader}>宝牌</ThemedText>
        <Counter n={state.dora} notify={(n) => dispatch(setDora(n))} />

        <TileInputScore />

        <ButtonGroup
          buttons={["无", "立直", "W 立直"]}
          selectedIndex={state.riichi}
          onPress={(value) => dispatch(setRiichi(value))}
        />

        <ButtonGroup
          buttons={["荣和", "自摸"]}
          selectedIndex={state.tsumo}
          onPress={(value) => dispatch(setTsumo(value))}
        />

        <CheckBox
          title="一发"
          checked={state.ippatsu}
          onPress={() => dispatch(setIppatsu())}
        />

        <CheckBox
          title="岭上开花"
          checked={state.afterKan}
          onPress={() => dispatch(setAfterKan())}
        />

        <CheckBox
          title="抢杠"
          checked={state.robbingKan}
          onPress={() => dispatch(setRobbingKan())}
        />

        <CheckBox
          title="海底 / 河底"
          checked={state.last}
          onPress={() => dispatch(setLast())}
        />

        <CheckBox
          title="天和 / 地和"
          checked={state.blessing}
          onPress={() => dispatch(setBlessing())}
        />
      </ThemedView>

      <ThemedView>
        <ButtonGroup
          buttons={["连风牌雀头 2 符", "连风牌雀头 4 符"]}
          selectedIndex={state.windFu}
          onPress={(value) => dispatch(setWindFu(value))}
        />

        <CheckBox
          title="切上满贯（基本点 1920 点）"
          checked={state.roundUpMangan}
          onPress={() => dispatch(setRoundUpMangan())}
        />

        <CheckBox
          title="累计役满（13 番以上）"
          checked={state.accumulatedYakuman}
          onPress={() => dispatch(setAccumulatedYakuman())}
        />

        <CheckBox
          title="复合役满"
          checked={state.multipleYakuman}
          onPress={() => dispatch(setMultipleYakuman())}
        />

        <CheckBox
          title="双倍役满"
          checked={state.doubleYakuman}
          onPress={() => dispatch(setDoubleYakuman())}
        />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  subHeader: {
    textAlign: "center",
  },
});
