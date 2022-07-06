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
    const d = new Array(4).fill({})
    const [dora, setDora] = useState(d)

    const h = new Array(13).fill({})
    const [hand, setHand] = useState(h)

    const [isHand, setFlag] = useState(false)
    const l = [1, 2, 3, 4, 5, 0, 6, 7, 8, 9]
    const r = [1, 2, 3, 4, 5, 6, 7]

    const [selectedIndexes, setSelectedIndexes] = useState([])
    const [melds, setMelds] = useState([])

    const toggleDora = (i: number) => {
        if (dora[i].tile) {
            const newDora = dora.map((v, idx) => {
                if (idx === i) {
                    return {}
                }
            })
            setDora(newDora)
        }
    }

    const toggleHand = (i: number) => {
        if (hand[i].tile) {
            const newHand = dora.map((v, idx) => {
                if (idx === i) {
                    return {}
                }
            })
            setDora(newHand)
        }
    }

    const add = (s: string) => {
        if (isHand) {
            addHand(s)
            return
        }

        addDora(s)
    }

    const addDora = (s: string) => {
        const idx = dora.findIndex((t) => !t.value)
        if (idx === -1) {
            return
        }
        const newDora = dora.map((v, i) => {
            if (i === idx) {
                v.value = s
            }
        })
        setDora(newDora)
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

    const press = (v: boolean) => {
        setFlag(v)
    }

    return (
        <View>
            <Button title="宝牌指示牌" color={isHand ? "primary" : "gray"} onPress={() => press(true)} />
            <View>
                {dora.map((t, i) => (
                    <Tile
                        t={t}
                        onPress={() => {
                            toggleDora(i)
                        }}
                        key={i}
                    />
                ))}
            </View>

            <Button title="手牌" color={isHand ? "gray" : "primary"} onPress={() => press(false)} />
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
                {l.map((n: number) => (
                    <Tile t={{ value: `${n}m` }} onPress={() => add(`${n}m`)} />
                ))}

                {l.map((n: number) => (
                    <Tile t={{ value: `${n}p` }} onPress={() => add(`${n}p`)} />
                ))}

                {l.map((n: number) => (
                    <Tile t={{ value: `${n}s` }} onPress={() => add(`${n}s`)} />
                ))}

                {r.map((n: number) => (
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
