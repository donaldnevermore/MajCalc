import React, { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ButtonGroup } from "@rneui/themed";

import type { TileItem } from "../lib/tile-item";
import { Melds } from "./Melds";
import { Tile } from "./Tile";

import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  addHandMeld,
  removeHandTile,
  removeMeldTile,
} from "../redux/mahjong-slice";

export const TileInput: FC = () => {
  const state = useAppSelector((state) => state.mahjong);
  const dispatch = useAppDispatch();

  const mps = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const z = [1, 2, 3, 4, 5, 6, 7];
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
    <View>
      <Text>手牌</Text>
      <View>
        <View style={styles.container}>
          {state.hand.map((t, i) => (
            <Tile tile={t} handleClick={() => removeHand(i)} key={i} />
          ))}
        </View>

        <Melds melds={state.melds} handleClick={removeMeld} />
      </View>

      <ButtonGroup
        buttons={["无", "碰", "吃", "明杠", "暗杠"]}
        selectedIndex={selectedIndex}
        onPress={(value: number) => setSelectedIndex(value)}
      />

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
