import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import { gen } from "../lib/gen"

export interface MahjongState {
    roundWind: number
    seatWind: number
    riichiBets: number
    roundBets: number
    riichi: number
    tsumo: number
    dora: number
    ippatsu: boolean
    afterKan: boolean
    robbingKan: boolean
    last: boolean
    blessing: boolean
    windFu: number
    accumulatedYakuman: boolean
    roundUpMangan: boolean
    multipleYakuman: boolean
    doubleYakuman: boolean

    result: any
    winds: string[]
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
    windFu: 0,
    accumulatedYakuman: false,
    roundUpMangan: false,
    multipleYakuman: false,
    doubleYakuman: false,

    result: null,
    winds: ["東", "南", "西", "北"]
}

export const mahjongSlice = createSlice({
    name: "mahjong",
    initialState,
    reducers: {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        setRoundWind: (state, action: PayloadAction<number>) => {
            state.roundWind = action.payload
        },
        setSeatWind: (state, action: PayloadAction<number>) => {
            state.seatWind = action.payload
        },
        setRiichiBets: (state, action: PayloadAction<number>) => {
            state.riichiBets = action.payload
        },
        setRoundBets: (state, action: PayloadAction<number>) => {
            state.roundBets = action.payload
        },
        setDora: (state, action: PayloadAction<number>) => {
            state.dora = action.payload
        },
        setRiichi: (state, action: PayloadAction<number>) => {
            state.riichi = action.payload
        },
        setTsumo: (state, action: PayloadAction<number>) => {
            state.tsumo = action.payload
        },
        setIppatsu: (state) => {
            state.ippatsu = !state.ippatsu
        },
        setAfterKan: (state) => {
            state.afterKan = !state.afterKan
        },
        setRobbingKan: (state) => {
            state.robbingKan = !state.robbingKan
        },
        setLast: (state) => {
            state.last = !state.last
        },
        setBlessing: (state) => {
            state.blessing = !state.blessing
        },
        setWindFu: (state, action: PayloadAction<number>) => {
            state.windFu = action.payload
        },
        setRoundUpMangan: (state) => {
            state.roundUpMangan = !state.roundUpMangan
        },
        setAccumulatedYakuman: (state) => {
            state.accumulatedYakuman = !state.accumulatedYakuman
        },
        setMultipleYakuman: (state) => {
            state.multipleYakuman = !state.multipleYakuman
        },
        setDoubleYakuman: (state) => {
            state.doubleYakuman = !state.doubleYakuman
        },
        calculate: (state, action: PayloadAction<any>) => {
            const { hand, melds } = action.payload
            const n = hand.length + melds.length * 3
            if (n !== 14) {
                return
            }
            state.result = gen(state, hand, melds)
            console.log(state.result)
        }
    }
})

export const { setSeatWind, setRoundWind, setRiichiBets,
    setRoundBets, setDora, setRiichi,
    setTsumo, setIppatsu, setAfterKan,
    setRobbingKan, setLast, setBlessing,
    setWindFu, setRoundUpMangan, setAccumulatedYakuman,
    setMultipleYakuman, setDoubleYakuman, calculate
} = mahjongSlice.actions

export default mahjongSlice.reducer
