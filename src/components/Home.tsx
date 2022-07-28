import React, { FC, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { ButtonGroup, Switch, Divider, CheckBox } from "@rneui/themed"

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
    const [afterKan, setAfterKan] = useState(false)
    const [robbingKan, setRobbingKan] = useState(false)
    const [under, setUnder] = useState(false)
    const [blessing, setBlessing] = useState(false)

    const [windFu, setWindFu] = useState(0)
    const [accumulatedYakuman, setAccumulatedYakuman] = useState(false)
    const [roundUpMangan, setRoundUpMangan] = useState(false)
    const [stackingYakuman, setStackingYakuman] = useState(false)
    const [doubleYakuman, setDoubleYakuman] = useState(false)

    const winds = ["東", "南", "西", "北"]

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

                <Text>自摸</Text>
                <ButtonGroup buttons={["荣和", "自摸"]} selectedIndex={tsumo} onPress={(value) => setTsumo(value)} />

                <CheckBox title="一发" checked={ippatsu} onPress={() => setIppatus(!ippatsu)} />

                <CheckBox title="岭上开花" checked={afterKan} onPress={() => setAfterKan(!afterKan)} />

                <CheckBox title="抢杠" checked={robbingKan} onPress={() => setRobbingKan(!robbingKan)} />

                <CheckBox title="海底 / 河底" checked={under} onPress={() => setUnder(!under)} />

                <CheckBox title="天和 / 地和" checked={blessing} onPress={() => setBlessing(!blessing)} />
            </View>

            <Divider />

            <View>
                <Text style={styles.subHeader}>规则</Text>

                <Text>连风牌雀头</Text>
                <ButtonGroup buttons={["2 符", "4 符"]} selectedIndex={windFu} onPress={(value) => setWindFu(value)} />

                <CheckBox
                    title="切上满贯（基本点 1920 点）"
                    checked={roundUpMangan}
                    onPress={() => setRoundUpMangan(!roundUpMangan)}
                />

                <CheckBox
                    title="累计役满（13 番以上）"
                    checked={accumulatedYakuman}
                    onPress={() => setAccumulatedYakuman(!accumulatedYakuman)}
                />

                <CheckBox
                    title="复合役满"
                    checked={stackingYakuman}
                    onPress={() => setStackingYakuman(!stackingYakuman)}
                />

                <CheckBox title="双倍役满" checked={doubleYakuman} onPress={() => setDoubleYakuman(!doubleYakuman)} />
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
