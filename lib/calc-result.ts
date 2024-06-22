import { generate_result } from "./result";
import { TableConfig, RuleConfig, HandConfig } from "./config";
import { Hand } from "./hand";
import { tile_equals } from "./tile";
import type { TileItem } from "./tile-item";
import type { MeldItem } from "./meld-item";
import { MahjongState } from "../redux/mahjong-slice";

function convertTile(elem: TileItem): any {
  const alpha = elem.type;
  const number = elem.n;
  if (alpha === "m") {
    return { type: "character", number };
  } else if (alpha === "p") {
    return { type: "dots", number };
  } else if (alpha === "s") {
    return { type: "bamboo", number };
  } else if (alpha === "z") {
    switch (number) {
      case 1:
        return { type: "east" };
      case 2:
        return { type: "south" };
      case 3:
        return { type: "west" };
      case 4:
        return { type: "north" };
      case 5:
        return { type: "white" };
      case 6:
        return { type: "green" };
      case 7:
        return { type: "red" };
    }
  }
}

function convert(data: any): Hand {
  data.legal = data.legal.map(convertTile);

  data.melds = data.melds.map((elem: any) => {
    switch (elem.type) {
      case "pon":
        return { type: "pong", tile: convertTile(elem.tile) };
      case "chii":
        return { type: "chow", first: convertTile(elem.tile) };
      case "kan":
        return {
          type: "kong",
          tile: convertTile(elem.tile),
          concealed: elem.concealed,
        };
      default:
        throw new Error("Invalid data.");
    }
  });

  return data;
}

const winds = ["east", "south", "west", "north"] as const;
const riichiiString = ["none", "riichi", "double-riichi"] as const;

export function calcResult(
  state: MahjongState,
  hand: TileItem[],
  melds: MeldItem[]
) {
  const {
    roundWind,
    seatWind,
    riichiBets,
    roundBets,
    riichi,
    tsumo,
    dora,
    ippatsu,
    afterKan,
    robbingKan,
    last,
    blessing,
    windFu,
    accumulatedYakuman,
    roundUpMangan,
    multipleYakuman,
    doubleYakuman,
  } = state;
  const tc: TableConfig = {
    round: winds[roundWind],
    seat: winds[seatWind],
    continue: roundBets,
    deposit: riichiBets,
  };
  const hc: HandConfig = {
    dora,
    riichi: riichiiString[riichi],
    ippatsu,
    rinshan: afterKan,
    chankan: robbingKan,
    last,
    blessing,
  };
  const rule: RuleConfig = {
    roundUpMangan,
    doubleWindFu: windFu === 0 ? 2 : 4,
    countedYakuman: accumulatedYakuman,
    multipleYakuman,
    kokushi13DoubleYakuman: doubleYakuman,
    suankoTankiDoubleYakuman: doubleYakuman,
    daisushiDoubleYakuman: doubleYakuman,
    pureChurenDoubleYakuman: doubleYakuman,
  };
  const h = convert({
    legal: hand.slice(0, hand.length - 1),
    melds,
  });

  const result = generate_result(h, tc, hc, rule);
  if (!result.tempai) {
    return;
  }

  const t = tsumo ? "tsumo" : "ron";
  const a = result.hora.find((elem) => {
    if (
      elem.hora.type === t &&
      tile_equals(convertTile(hand[hand.length - 1]), elem.hora.tile)
    ) {
      return elem;
    }
  });
  return a;
}
