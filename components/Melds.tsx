import React, { FC } from "react";
import { StyleSheet, View } from "react-native";

import type { TileItem } from "../lib/tile-item";
import type { MeldItem } from "../lib/meld-item";
import { Tile } from "./Tile";
import { ThemedView } from "./ThemedView";

type Obj = {
  concealed?: boolean;
  tiles: TileItem[];
}

export const Melds: FC<{
  melds: MeldItem[];
  handleClick: (i: number) => void;
}> = ({ melds, handleClick }) => {
  if (!melds || melds.length <= 0) {
    return null;
  }

  const arr: Obj[] = [];

  for (const item of melds) {
    if (item.type === "pon") {
      const pon: TileItem[] = [];
      const t = item.tile;
      pon.push(t);
      pon.push(t);
      pon.push(t);
      arr.push({ tiles: pon });
    }
    if (item.type === "chii") {
      const chii: TileItem[] = [];
      const t = item.tile;
      chii.push(t);
      chii.push({ type: t.type, n: t.n + 1 });
      chii.push({ type: t.type, n: t.n + 2 });
      arr.push({ tiles: chii });
    }
    if (item.type === "kan") {
      const kan: TileItem[] = [];
      const t = item.tile;
      kan.push(t);
      kan.push(t);
      kan.push(t);
      kan.push(t);

      arr.push({ concealed: item.concealed, tiles: kan });
    }
  }

  return (
    <ThemedView style={styles.wrap}>
      {arr.map((meld, i) => {
        return (
          <ThemedView style={meld.concealed ? styles.conceal : styles.open} key={i}>
            {meld.tiles.map((t, j) => (
              <Tile
                tile={t}
                key={`${i}_${j}`}
                handleClick={() => {
                  handleClick(i);
                }}
              />
            ))}
          </ThemedView>
        );
      })}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  open: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderStyle: "solid",
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 4,
  },
  conceal: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderStyle: "solid",
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 4,
  }
});
