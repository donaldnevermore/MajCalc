import React, { FC } from "react";
import { Pressable } from "react-native";
import { Image } from "react-native-ui-lib";
import { img } from "../lib/img";
import type { TileItem } from "../lib/tile-item";

export const Tile: FC<{
  tile: TileItem;
  handleClick: () => void;
}> = ({ tile, handleClick }) => {
  if (!tile || !tile.type) {
    return null;
  }

  const src = img(tile);

  return (
    <Pressable onPress={handleClick}>
      <Image
        width={64.8}
        height={104}
        source={src}
        resizeMethod="resize"
        resizeMode="cover"
      />
    </Pressable>
  );
};
