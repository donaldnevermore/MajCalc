import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { calcResult } from "../lib/calc-result";
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
  result: null,
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
      calculate(state);
    },
    setSeatWind: (state, action: PayloadAction<number>) => {
      state.seatWind = action.payload;
      calculate(state);
    },
    setDora: (state, action: PayloadAction<number>) => {
      state.dora = action.payload;
      calculate(state);
    },
    setRiichi: (state, action: PayloadAction<number>) => {
      state.riichi = action.payload;
      calculate(state);
    },
    setTsumo: (state, action: PayloadAction<number>) => {
      state.tsumo = action.payload;
      calculate(state);
    },
    setIppatsu: (state) => {
      state.ippatsu = !state.ippatsu;
      calculate(state);
    },
    setAfterKan: (state) => {
      state.afterKan = !state.afterKan;
      calculate(state);
    },
    setRobbingKan: (state) => {
      state.robbingKan = !state.robbingKan;
      calculate(state);
    },
    setLast: (state) => {
      state.last = !state.last;
      calculate(state);
    },
    setBlessing: (state) => {
      state.blessing = !state.blessing;
      calculate(state);
    },
    setWindFu: (state, action: PayloadAction<number>) => {
      state.windFu = action.payload;
      calculate(state);
    },
    setRoundUpMangan: (state) => {
      state.roundUpMangan = !state.roundUpMangan;
      calculate(state);
    },
    setAccumulatedYakuman: (state) => {
      state.accumulatedYakuman = !state.accumulatedYakuman;
      calculate(state);
    },
    setMultipleYakuman: (state) => {
      state.multipleYakuman = !state.multipleYakuman;
      calculate(state);
    },
    setDoubleYakuman: (state) => {
      state.doubleYakuman = !state.doubleYakuman;
      calculate(state);
    },
    removeHandTile: (state, action: PayloadAction<number>) => {
      const i = action.payload;
      state.hand.splice(i, 1);
      state.result = null;
    },
    removeMeldTile: (state, action: PayloadAction<number>) => {
      const i = action.payload;
      state.melds.splice(i, 1);
      state.result = null;
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

      calculate(state);
    },
  },
});

function calculate(state: MahjongState) {
  const total = state.hand.length + state.melds.length * 3;
  if (total !== 14) {
    return;
  }
  const r = calcResult(state, state.hand, state.melds);
  state.result = r ?? null;
}

export const {
  setSeatWind,
  setRoundWind,
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
