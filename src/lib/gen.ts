import { generate_result } from "./result"
import {TableConfig, RuleConfig, HandConfig} from "./config"
import {Hand} from "./hand"

export function gen() {
const tc: TableConfig = { round: "east", seat: "east", continue: 0, deposit: 0 }
const hc: HandConfig = {
    dora: 0,
    riichi: "riichi",
    ippatsu: false,
    rinshan: false,
    chankan: false,
    last: false,
    blessing: false
}
const rule: RuleConfig = {
    roundUpMangan: false,
    doubleWindFu: 4,
    countedYakuman: true,
    multipleYakuman: true,
    kokushi13DoubleYakuman: true,
    suankoTankiDoubleYakuman: true,
    daisushiDoubleYakuman: true,
    pureChurenDoubleYakuman: true
}
const h: Hand = {
    legal: [
        { type: "character", number: 1 },
        { type: "character", number: 2 },
        { type: "character", number: 3 },
        { type: "character", number: 4 },
        { type: "character", number: 5 },
        { type: "character", number: 6 },
        { type: "dots", number: 1 },
        { type: "dots", number: 2 },
        { type: "dots", number: 3 },
        { type: "dots", number: 4 },
        { type: "dots", number: 5},
        { type: "bamboo", number: 1 },
        { type: "bamboo", number: 1 }
    ]
}
const res = generate_result(h, tc, hc, rule)
return res
}
