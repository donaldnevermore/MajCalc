import React, { FC, useState } from "react";
import { StyleSheet } from "react-native";
import { SegmentedControl, Text, View } from "react-native-ui-lib";

import type { TileItem } from "../lib/tile-item";
import { Melds } from "./Melds";
import { Score } from "./Score";
import { Tile } from "./Tile";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  addHandMeld,
  removeHandTile,
  removeMeldTile,
} from "../redux/mahjong-slice";

export const TileInputScore: FC = () => {
  const state = useAppSelector((state) => state.mahjong);
  const dispatch = useAppDispatch();

  const mps = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const z = [1, 2, 3, 4, 5, 6, 7];
  const btns = [{ label: "无" }, { label: "碰" }, { label: "吃" }, { label: "明杠" }, { label: "暗杠" }];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const removeHand = (i: number) => {
    dispatch(removeHandTile(i));
  };

  const addTile = (t: TileItem) => {
    dispatch(addHandMeld({ i: selectedIndex, t }));
  };

  const removeMeld = (i: number) => {
    dispatch(removeMeldTile(i));
  };

  return (
    <View gap-s2>
      <SegmentedControl segments={btns} onChangeIndex={(i) => setSelectedIndex(i)} />

      <View style={styles.container}>
        {mps.map((n: number) => (
          <Tile
            tile={{ type: "m", n: n }}
            key={`${n}m`}
            handleClick={() => addTile({ type: "m", n: n })}
          />
        ))}

        {mps.map((n: number) => (
          <Tile
            tile={{ type: "p", n: n }}
            key={`${n}p`}
            handleClick={() => addTile({ type: "p", n: n })}
          />
        ))}

        {mps.map((n: number) => (
          <Tile
            tile={{ type: "s", n: n }}
            key={`${n}s`}
            handleClick={() => addTile({ type: "s", n: n })}
          />
        ))}

        {z.map((n: number) => (
          <Tile
            tile={{ type: "z", n: n }}
            key={`${n}z`}
            handleClick={() => addTile({ type: "z", n: n })}
          />
        ))}
      </View>

      <Text style={styles.center}>{state.hand.length ? "手牌" : "请输入手牌..."}</Text>
      <View>
        <View style={styles.container}>
          {state.hand.map((t, i) => (
            <Tile tile={t} handleClick={() => removeHand(i)} key={i} />
          ))}
        </View>

        <Melds melds={state.melds} handleClick={removeMeld} />
      </View>

      <Score />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  center: {
    textAlign: "center"
  }
});
