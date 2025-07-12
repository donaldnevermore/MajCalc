import { img } from "@/lib/img";
import type { TileItem } from "@/lib/tile-item";
import React, { FC } from "react";
import { Pressable } from "react-native";
import { Image } from "react-native-ui-lib";

export const Tile: FC<{
  tile: TileItem;
  handleClick: () => void;
}> = ({ tile, handleClick }) => {
  if (!tile || !tile.type) {
    return null;
  }

  return (
    <Pressable onPress={handleClick}>
      <Image
        width={64.8}
        height={104}
        source={img(tile)}
        resizeMethod="resize"
        resizeMode="cover"
      />
    </Pressable>
  );
};
