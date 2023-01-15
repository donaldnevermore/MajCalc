import React, { FC } from "react"
import { StyleSheet, Text, View } from "react-native"

import { TileItem } from "./TileItem"
import { Tile } from "./Tile"

export const Melds: FC<any> = ({ melds, handleClick }) => {
    if (!melds || melds.length <= 0) {
        return null
    }

    const arr: TileItem[][] = []

    for (const item of melds) {
        if (item.type === "pon") {
            const pon: TileItem[] = []
            const t = item.tile
            pon.push(t)
            pon.push(t)
            pon.push(t)
            arr.push(pon)
        }
        if (item.type === "chii") {
            const chii: TileItem[] = []
            const t = item.tile
            chii.push(t)
            chii.push({ type: t.type, n: t.n + 1 })
            chii.push({ type: t.type, n: t.n + 2 })
            arr.push(chii)
        }
        if (item.type === "kan") {
            const kan: TileItem[] = []
            const t = item.tile
            kan.push(t)
            kan.push(t)
            kan.push(t)
            kan.push(t)
            arr.push(kan)
        }
    }

    return (
        <View style={styles.container}>
            {arr.map((meld, i) => {
                return (
                    <View style={styles.block} key={i}>
                        {meld.map((t, j) => (
                            <Tile t={t} key={`${i},${j}`} handleClick={handleClick} />
                        ))}
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    block: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginRight: 5
    }
})
