import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ButtonGroup, Divider, CheckBox } from "@rneui/themed";

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
import { TileInput } from "./TileInput";
import { Result } from "./Result";

export const Home = () => {
  const state = useAppSelector((state) => state.mahjong);
  const dispatch = useAppDispatch();
  const winds = ["東", "南", "西", "北"];

  return (
    <View>
      <View>
        <Text>场风</Text>
        <ButtonGroup
          buttons={winds}
          selectedIndex={state.roundWind}
          onPress={(value) => dispatch(setRoundWind(value))}
        />

        <Text>自风</Text>
        <ButtonGroup
          buttons={winds}
          selectedIndex={state.seatWind}
          onPress={(value) => dispatch(setSeatWind(value))}
        />

        <Text>宝牌</Text>
        <Counter n={state.dora} notify={(n) => dispatch(setDora(n))} />

        <Result />
        <TileInput />

        <Text>立直</Text>
        <ButtonGroup
          buttons={["无", "立直", "W 立直"]}
          selectedIndex={state.riichi}
          onPress={(value) => dispatch(setRiichi(value))}
        />

        <Text>自摸</Text>
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
      </View>

      <Divider />

      <View>
        <Text style={styles.subHeader}>规则</Text>

        <Text>连风牌雀头</Text>
        <ButtonGroup
          buttons={["2 符", "4 符"]}
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subHeader: {
    backgroundColor: "#2089dc",
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
  },
});
