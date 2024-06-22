import { TileItem } from "./tile-item";

export type MeldItem = {
  type: string;
  tile: TileItem;
  concealed?: boolean;
};
