import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { gen } from "../lib/gen";
import type { MeldItem } from "../lib/meld-item";
import type { TileItem } from "../lib/tile-item";

export interface MahjongState {
  roundWind: number;
  seatWind: number;
  riichiBets: number;
  roundBets: number;
  riichi: number;
  tsumo: number;
  dora: number;
  ippatsu: boolean;
  afterKan: boolean;
  robbingKan: boolean;
  last: boolean;
  blessing: boolean;
  windFu: number;
  accumulatedYakuman: boolean;
  roundUpMangan: boolean;
  multipleYakuman: boolean;
  doubleYakuman: boolean;

  result: any;
  hand: TileItem[];
  melds: MeldItem[];
}

const initialState: MahjongState = {
  roundWind: 0,
  seatWind: 0,
  riichiBets: 0,
  roundBets: 0,
  riichi: 0,
  tsumo: 0,
  dora: 0,
  ippatsu: false,
  afterKan: false,
  robbingKan: false,
  last: false,
  blessing: false,
  windFu: 1,
  accumulatedYakuman: false,
  roundUpMangan: false,
  multipleYakuman: false,
  doubleYakuman: false,

  hand: [],
  melds: [],
  result: undefined,
};

export const mahjongSlice = createSlice({
  name: "mahjong",
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    setRoundWind: (state, action: PayloadAction<number>) => {
      state.roundWind = action.payload;
    },
    setSeatWind: (state, action: PayloadAction<number>) => {
      state.seatWind = action.payload;
    },
    setRiichiBets: (state, action: PayloadAction<number>) => {
      state.riichiBets = action.payload;
    },
    setRoundBets: (state, action: PayloadAction<number>) => {
      state.roundBets = action.payload;
    },
    setDora: (state, action: PayloadAction<number>) => {
      state.dora = action.payload;
    },
    setRiichi: (state, action: PayloadAction<number>) => {
      state.riichi = action.payload;
    },
    setTsumo: (state, action: PayloadAction<number>) => {
      state.tsumo = action.payload;
    },
    setIppatsu: (state) => {
      state.ippatsu = !state.ippatsu;
    },
    setAfterKan: (state) => {
      state.afterKan = !state.afterKan;
    },
    setRobbingKan: (state) => {
      state.robbingKan = !state.robbingKan;
    },
    setLast: (state) => {
      state.last = !state.last;
    },
    setBlessing: (state) => {
      state.blessing = !state.blessing;
    },
    setWindFu: (state, action: PayloadAction<number>) => {
      state.windFu = action.payload;
    },
    setRoundUpMangan: (state) => {
      state.roundUpMangan = !state.roundUpMangan;
    },
    setAccumulatedYakuman: (state) => {
      state.accumulatedYakuman = !state.accumulatedYakuman;
    },
    setMultipleYakuman: (state) => {
      state.multipleYakuman = !state.multipleYakuman;
    },
    setDoubleYakuman: (state) => {
      state.doubleYakuman = !state.doubleYakuman;
    },
    removeHandTile: (state, action: PayloadAction<number>) => {
      const i = action.payload;
      state.hand.splice(i, 1);
    },
    removeMeldTile: (state, action: PayloadAction<number>) => {
      const i = action.payload;
      state.melds.splice(i, 1);
    },
    addHandMeld: (state, action: PayloadAction<{ i: number; t: TileItem }>) => {
      const { i, t } = action.payload;
      const n = 14 - (state.hand.length + state.melds.length * 3);
      if (i === 0 && n >= 1) {
        state.hand.push(t);
      } else if (n >= 3) {
        switch (i) {
          case 1:
            state.melds.push({
              type: "pon",
              tile: t,
            });
            break;
          case 2:
            if (t.type === "z" || t.n > 7) {
              break;
            }
            state.melds.push({
              type: "chii",
              tile: t,
            });
            break;
          case 3:
            state.melds.push({
              type: "kan",
              tile: t,
            });
            break;
          case 4:
            state.melds.push({
              type: "kan",
              tile: t,
              concealed: true,
            });
            break;
        }
      }

      // calculate
      const total = state.hand.length + state.melds.length * 3;
      if (total !== 14) {
        return;
      }
      const r = gen(state, state.hand, state.melds);
      state.result = {
        pointSet: r.pointSet,
        yaku: r.hora.yaku,
      };
    },
  },
});

export const {
  setSeatWind,
  setRoundWind,
  setRiichiBets,
  setRoundBets,
  setDora,
  setRiichi,
  setTsumo,
  setIppatsu,
  setAfterKan,
  setRobbingKan,
  setLast,
  setBlessing,
  setWindFu,
  setRoundUpMangan,
  setAccumulatedYakuman,
  setMultipleYakuman,
  setDoubleYakuman,
  addHandMeld,
  removeHandTile,
  removeMeldTile,
} = mahjongSlice.actions;

export default mahjongSlice.reducer;
