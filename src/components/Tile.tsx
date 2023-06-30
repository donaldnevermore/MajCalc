import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Image } from "@rneui/themed";
import type { TileItem } from "../lib/tile-item";
import { img } from "../lib/img";

export const Tile: FC<{
  t: TileItem;
  handleClick: () => void;
}> = ({ t, handleClick }) => {
  if (!t || !t.type) {
    return null;
  }

  const src = img(t);

  return <Image source={src} containerStyle={styles.tile} onPress={handleClick} />;
};

const styles = StyleSheet.create({
  tile: {
    backgroundColor: "gray",
    width: 81,
    height: 130,
  },
});
