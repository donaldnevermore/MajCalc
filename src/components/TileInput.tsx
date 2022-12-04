import React, { FC, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { ButtonGroup } from "@rneui/themed"

import { addItem, removeItemAtIndex, replaceItemAtIndex, sliceItem } from "../lib/array"
import { TileItem } from "./TileItem"
import { Melds } from "./Melds"
import { Tile } from "./Tile"

export const TileInput: FC<{}> = () => {
    const [hand, setHand] = useState<any[]>([])

    const mps = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const z = [1, 2, 3, 4, 5, 6, 7]
    let availableTile = 14

    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [melds, setMelds] = useState<any[]>([])

    const toggleHand = (i: number) => {
        const arr = removeItemAtIndex(hand, i)
        setHand(arr)
    }

    const add = (t: TileItem) => {
        if (selectedIndex === 0) {
            addHand(t)
        } else {
            addMeld(t)
        }
    }

    const addHand = (t: TileItem) => {
        if (hand.length < availableTile) {
            const arr = addItem(hand, t)
            setHand(arr)
        }
    }

    const addPong = (t: TileItem) => {
        if (availableTile < 3) {
            return
        }
        setMelds(
            addItem(melds, {
                type: "pong",
                tile: t,
                concealed: false
            })
        )
        availableTile -= 3
    }

    const addChow = (t: TileItem) => {
        const arr = hand.filter((tile) => !tile.type)
        if (13 - arr.length < 3) {
            return
        }
        setHand(hand.slice(0, hand.length - 3))
        setMelds(
            addItem(melds, {
                type: "chow",
                tile: t,
                concealed: false
            })
        )
    }

    const addKong = (t: TileItem, concealed: boolean) => {
        const arr = hand.filter((tile) => !tile.type)
        if (13 - arr.length < 3) {
            return
        }
        setHand(hand.slice(0, hand.length - 3))
        setMelds(
            addItem(melds, {
                type: "kong",
                tile: t,
                concealed
            })
        )
    }

    const addMeld = (t: TileItem) => {
        switch (selectedIndex) {
            case 0:
                break
            case 1:
                addPong(t)
                break
            case 2:
                addChow(t)
                break
            case 3:
                addKong(t, false)
                break
            case 4:
                addKong(t, true)
                break
            default:
                break
        }
    }

    const toggleMeld = (i: number) => {
        const m = removeItemAtIndex(melds, i)
        setMelds(m)
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

                <View style={styles.container}>
                    <Melds melds={melds} />
                </View>
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
