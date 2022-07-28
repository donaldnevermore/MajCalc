import React, { FC, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { ButtonGroup, Image } from "@rneui/themed"
import images from "../images/images"

const Tile: FC<any> = ({ t }) => {
    const src = t && t.type ? img(t) : {}

    return <Image source={src} containerStyle={styles.tile} />
}

const img = (t: any): any => images[`${t.n}${t.type}`]

const Meld: FC<any> = ({ meld }) => {
    const arr: any[] = []
    const tile = meld.tile

    if ((meld.type = "pong")) {
        arr.push(tile)
        arr.push(tile)
        arr.push(tile)
    }
    if ((meld.type = "chow")) {
        arr.push(tile)
        arr.push({ type: tile.type, n: tile.n + 1 })
        arr.push({ type: tile.type, n: tile.n + 2 })
    }
    if ((meld.type = "kong")) {
        arr.push(tile)
        arr.push(tile)
        arr.push(tile)
        arr.push(tile)
    }

    return (
        <>
            {arr.map((t) => (
                <Image source={t && t.type ? img(t) : {}} containerStyle={styles.tile} />
            ))}
        </>
    )
}

export const TileInput: FC<{
    notify?: any
}> = ({ notify }) => {
    const h = new Array(14).fill({ type: "", n: 0 })
    const [hand, setHand] = useState<any[]>(h)

    const mps = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const z = [1, 2, 3, 4, 5, 6, 7]

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [meld, setMeld] = useState<any[]>([])

    const toggleHand = (i: number) => {
        hand.splice(i, 1)
        setHand(hand)
    }

    const add = (t: any) => {
        if (selectedIndex == null) {
            addHand(t)
            return
        }

        addMeld(t)
    }

    const addHand = (t: any) => {
        const idx = hand.findIndex((t) => !t.type)
        if (idx === -1) {
            return
        }
        hand[idx] = t
        setHand(hand)
    }

    const addPong = (t: any) => {
        const arr = hand.filter((t) => !t.value)
        if (13 - arr.length < 3) {
            return
        }
        setHand(hand.slice(0, hand.length - 3))
        setMeld([
            ...meld,
            {
                type: "pong",
                tile: t,
                concealed: false
            }
        ])
    }

    const addChow = (t: any) => {
        const arr = hand.filter((t) => !t.value)
        if (13 - arr.length < 3) {
            return
        }
        setHand(hand.slice(0, hand.length - 3))
        setMeld([
            ...meld,
            {
                type: "chow",
                tile: t,
                concealed: false
            }
        ])
    }

    const addKong = (t: any, concealed: boolean) => {
        const arr = hand.filter((t) => !t.value)
        if (13 - arr.length < 3) {
            return
        }
        setHand(hand.slice(0, hand.length - 3))
        setMeld([
            ...meld,
            {
                type: "kong",
                tile: t,
                concealed
            }
        ])
    }

    const addMeld = (t: any) => {
        switch (selectedIndex) {
            case 0:
                addPong(t)
                break
            case 1:
                addChow(t)
                break
            case 2:
                addKong(t, false)
                break
            case 3:
                addKong(t, true)
                break
            default:
                break
        }
    }

    const toggleMeld = (i: number) => {
        meld.splice(i, 1)
        setMeld(meld)
    }

    return (
        <View>
            <Text>手牌</Text>
            <View>
                <View style={styles.container}>
                    {hand.map((t, i) => (
                        <Tile t={t} onPress={() => toggleHand(i)} key={i} />
                    ))}
                </View>
                <View style={styles.container}>
                    {meld.map((t, i) => (
                        <Tile t={t} onPress={() => toggleMeld(i)} key={i} />
                    ))}
                </View>
            </View>

            <ButtonGroup
                buttons={["碰", "吃", "明杠", "暗杠"]}
                selectedIndex={selectedIndex}
                onPress={(value) => setSelectedIndex(value)}
            />

            <View style={styles.container}>
                {mps.map((n: number) => (
                    <Tile t={{ type: "m", n: n }} onPress={() => add({ type: "m", n: n })} />
                ))}

                {mps.map((n: number) => (
                    <Tile t={{ type: "p", n: n }} onPress={() => add({ type: "p", n: n })} />
                ))}

                {mps.map((n: number) => (
                    <Tile t={{ type: "s", n: n }} onPress={() => add({ type: "s", n: n })} />
                ))}

                {z.map((n: number) => (
                    <Tile t={{ type: "z", n: n }} onPress={() => add({ type: "z", n: n })} />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    focused: {
        borderRadius: 10,
        borderColor: "blue",
        width: 81,
        height: 130
    },
    tile: {
        backgroundColor: "gray",
        width: 81,
        height: 130
    },
    container: {
        flexDirection: "row",
        flexWrap: "wrap"
    }
})
