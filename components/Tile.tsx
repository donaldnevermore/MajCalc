import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Image } from "@rneui/themed";
import type { TileItem } from "../lib/tile-item";
import { img } from "../lib/img";

export const Tile: FC<{
  tile: TileItem;
  handleClick: () => void;
}> = ({ tile, handleClick }) => {
  if (!tile || !tile.type) {
    return null;
  }

  const src = img(tile);

  return (
    <Image
      source={src}
      containerStyle={styles.tile}
      resizeMethod="resize"
      resizeMode="cover"
      onPress={handleClick}
    />
  );
};

const styles = StyleSheet.create({
  tile: {
    backgroundColor: "gray",
    width: 81,
    height: 130,
  },
});
