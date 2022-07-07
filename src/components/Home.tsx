import React, { FC, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { ButtonGroup, Avatar, Switch, Divider } from "@rneui/themed"

import { Counter } from "./Counter"
import { TileInput } from "./TileInput"
import { gen } from "../lib/gen"

export const Home = () => {
    const [roundWind, setRoundWind] = useState(0)
    const [seatWind, setSeatWind] = useState(0)
    const [richiiBets, setRichiiBets] = useState(0)
    const [honba, setHonba] = useState(0)
    const [richii, setRichii] = useState(0)
    const [tsumo, setTsumo] = useState(0)
    const [dora, setDora] = useState(0)
    const [ippatsu, setIppatus] = useState(false)
    const [checked, setChecked] = useState(false)

    const winds = ["東", "南", "西", "北"]

    console.log(gen())

    return (
        <View>
            <View>
                <Text>场风</Text>
                <ButtonGroup buttons={winds} selectedIndex={roundWind} onPress={(value) => setRoundWind(value)} />

                <Text>自风</Text>
                <ButtonGroup buttons={winds} selectedIndex={seatWind} onPress={(value) => setSeatWind(value)} />

                <Text>立直棒</Text>
                <Counter n={richiiBets} notify={(n) => setRichiiBets(n)} />

                <Text>场棒</Text>
                <Counter n={honba} notify={(n) => setHonba(n)} />

                <Text>宝牌</Text>
                <Counter n={dora} notify={(n) => setDora(n)} />

                <TileInput />

                <Text>立直</Text>
                <ButtonGroup
                    buttons={["无", "立直", "W立直"]}
                    selectedIndex={richii}
                    onPress={(value) => setRichii(value)}
                />

                <Text>一发</Text>
                <Switch value={ippatsu} onValueChange={(value) => setIppatus(value)} />

                <Text>自摸</Text>
                <ButtonGroup buttons={["荣和", "自摸"]} selectedIndex={tsumo} onPress={(value) => setTsumo(value)} />

                <Text>岭上开花</Text>
                <Switch value={checked} onValueChange={(value) => setChecked(value)} />

                <Text>抢杠</Text>
                <Switch value={checked} onValueChange={(value) => setChecked(value)} />

                <Text>海底 / 河底</Text>
                <Switch value={checked} onValueChange={(value) => setChecked(value)} />

                <Text>{seatWind === 0 ? "天和" : "地和"}</Text>
                <Switch value={checked} onValueChange={(value) => setChecked(value)} />
            </View>

            <Divider />

            <View>
                <Text style={styles.subHeader}>规则</Text>

                <Text>切上满贯（基本点 1920 点）</Text>
                <Switch value={checked} onValueChange={(value) => setChecked(value)} />

                <Text>连风牌雀头</Text>
                <ButtonGroup
                    buttons={["2 符", "4 符"]}
                    selectedIndex={seatWind}
                    onPress={(value) => setSeatWind(value)}
                />

                <Text>累计役满（13 番以上）</Text>
                <Switch value={checked} onValueChange={(value) => setChecked(value)} />

                <Text>复合役满</Text>
                <Switch value={checked} onValueChange={(value) => setChecked(value)} />

                <Text>双倍役满</Text>
                <Switch value={checked} onValueChange={(value) => setChecked(value)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    subHeader: {
        backgroundColor: "#2089dc",
        color: "white",
        textAlign: "center",
        paddingVertical: 5
    }
})
