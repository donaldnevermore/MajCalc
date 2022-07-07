import React, { FC, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Avatar, Button, ButtonGroup, Image } from "@rneui/themed"

const Tile: FC<any> = (t) => {
    return (
        <Image
            source={t && t.value ? { uri: `../tile-images/${t.value}.png` } : {}}
            containerStyle={t && t.focused ? styles.focused : styles.tile}
        />
    )
}

export const TileInput: FC<{
    notify?: any
}> = ({ notify }) => {
    const h = new Array(13).fill({})
    const [hand, setHand] = useState(h)

    const mps = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const z = [1, 2, 3, 4, 5, 6, 7]

    const [selectedIndexes, setSelectedIndexes] = useState([])
    const [melds, setMelds] = useState([])

    const toggleHand = (i: number) => {
        if (hand[i].tile) {
            const newHand = hand.map((v, idx) => {
                if (idx === i) {
                    return {}
                }
            })
            setHand(newHand)
        }
    }

    const add = (s: string) => {
        addHand(s)
    }

    const addHand = (s: string) => {
        const idx = hand.findIndex((t) => !t.value)
        if (idx === -1) {
            return
        }
        const newHand = hand.map((v, i) => {
            if (i === idx) {
                v.value = s
            }
        })
        setHand(newHand)
    }

    const addMeld = (s: string, type: string) => {}

    const press = (v: boolean) => {}

    return (
        <View>
            <Text>手牌</Text>
            <View>
                {hand.map((t, i) => (
                    <Tile
                        t={t}
                        onPress={() => {
                            toggleHand(i)
                        }}
                        key={i}
                    />
                ))}
            </View>

            <ButtonGroup
                buttons={["碰", "吃", "明杠", "暗杠"]}
                selectMultiple
                selectedIndexes={selectedIndexes}
                onPress={(value) => {
                    const last = value[value.length - 1]
                    setSelectedIndexes([last as never])
                }}
            />
            <View>
                {mps.map((n: number) => (
                    <Tile t={{ value: `${n}m` }} onPress={() => add(`${n}m`)} />
                ))}

                {mps.map((n: number) => (
                    <Tile t={{ value: `${n}p` }} onPress={() => add(`${n}p`)} />
                ))}

                {mps.map((n: number) => (
                    <Tile t={{ value: `${n}s` }} onPress={() => add(`${n}s`)} />
                ))}

                {z.map((n: number) => (
                    <Tile t={{ value: `${n}z` }} onPress={() => add(`${n}z`)} />
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
    }
})
