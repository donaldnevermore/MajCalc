import images from "@/assets/tiles/images";
import { TileItem } from "./tile-item";

export const img = (t: TileItem) => (images as any)[`${t.n}${t.type}`];
