import React, { FC } from "react"
import { TileItem } from "./TileItem"
import { Tile } from "./Tile"

export const Melds: FC<any> = ({ meld: melds }) => {
    if (!melds || melds.length <= 0) {
        return null
    }

    const arr: TileItem[][] = []

    for (const item of melds) {
        if (item.type === "pong") {
            const pong: TileItem[] = []
            const t = item.tile
            pong.push(t)
            pong.push(t)
            pong.push(t)
            arr.push(pong)
        }
    }
    /*
    if (meld.type === "chow") {
        arr.push(tile)
        arr.push({ type: tile.type, n: tile.n + 1 })
        arr.push({ type: tile.type, n: tile.n + 2 })
    }
    if (meld.type === "kong") {
        arr.push(tile)
        arr.push(tile)
        arr.push(tile)
        arr.push(tile)
    }
    */

    return <>{arr.map((meld, i) => meld.map((t, j) => <Tile t={t} key={`${i},${j}`} />))}</>
}
