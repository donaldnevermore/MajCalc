import React, { FC, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { ButtonGroup } from "@rneui/themed"

import { addItem, removeItemAtIndex, replaceItemAtIndex, sliceItem } from "../lib/array"
import { TileItem } from "./TileItem"
import { Melds } from "./Melds"
import { Tile } from "./Tile"

import { useAppSelector, useAppDispatch } from "../redux/hooks"
import { calculate } from "../redux/mahjong-slice"

export const TileInput: FC<any> = () => {
    const state = useAppSelector((state) => state.mahjong)
    const dispatch = useAppDispatch()

    const [hand, setHand] = useState<TileItem[]>([])

    const mps = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const z = [1, 2, 3, 4, 5, 6, 7]
    const [availableTiles, setAvailableTiles] = useState(14)

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [melds, setMelds] = useState<any[]>([])

    const toggleHand = (i: number) => {
        const arr = removeItemAtIndex(hand, i)
        setHand(arr)
        setAvailableTiles(availableTiles + 1)
    }

    const add = (t: TileItem) => {
        console.log(`index ${selectedIndex}`)
        if (selectedIndex === 0) {
            addHand(t)
        } else {
            addMeld(t)
        }

        dispatch(calculate({ hand, melds }))
    }

    const addHand = (t: TileItem) => {
        if (availableTiles > 0) {
            const arr = addItem(hand, t)
            setHand(arr)
            setAvailableTiles(availableTiles - 1)
        }
    }

    const addPon = (t: TileItem) => {
        if (availableTiles < 3) {
            return
        }
        setMelds(
            addItem(melds, {
                type: "pon",
                tile: t
            })
        )
        setAvailableTiles(availableTiles - 3)
    }

    const addChii = (t: TileItem) => {
        if (t.type === "z" || t.n > 7) {
            return
        }
        if (availableTiles < 3) {
            return
        }
        setMelds(
            addItem(melds, {
                type: "chii",
                tile: t
            })
        )
        setAvailableTiles(availableTiles - 3)
    }

    const addKan = (t: TileItem, concealed: boolean) => {
        if (availableTiles < 3) {
            return
        }
        setMelds(
            addItem(melds, {
                type: "kan",
                tile: t,
                concealed
            })
        )
        setAvailableTiles(availableTiles - 3)
    }

    const addMeld = (t: TileItem) => {
        switch (selectedIndex) {
        case 1:
            addPon(t)
            break
        case 2:
            addChii(t)
            break
        case 3:
            addKan(t, false)
            break
        case 4:
            addKan(t, true)
            break
        default:
            break
        }
    }

    const toggleMeld = (i: number) => {
        console.log(`meld ${i}`)
        const m = removeItemAtIndex(melds, i)
        setMelds(m)
        setAvailableTiles(availableTiles + 3)
    }

    return (
        <View>
            <Text>手牌</Text>
            <View>
                <View style={styles.container}>
                    {hand.map((t, i) => (
                        <Tile t={t} handleClick={() => toggleHand(i)} key={i} />
                    ))}
                </View>

                <Melds melds={melds} handleClick={toggleMeld} />
            </View>

            <ButtonGroup
                buttons={["无", "碰", "吃", "明杠", "暗杠"]}
                selectedIndex={selectedIndex}
                onPress={(value: number) => setSelectedIndex(value)}
            />

            <View style={styles.container}>
                {mps.map((n: number) => (
                    <Tile t={{ type: "m", n: n }} key={`${n}m`} handleClick={() => add({ type: "m", n: n })} />
                ))}

                {mps.map((n: number) => (
                    <Tile t={{ type: "p", n: n }} key={`${n}p`} handleClick={() => add({ type: "p", n: n })} />
                ))}

                {mps.map((n: number) => (
                    <Tile t={{ type: "s", n: n }} key={`${n}s`} handleClick={() => add({ type: "s", n: n })} />
                ))}

                {z.map((n: number) => (
                    <Tile t={{ type: "z", n: n }} key={`${n}z`} handleClick={() => add({ type: "z", n: n })} />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap"
    }
})
