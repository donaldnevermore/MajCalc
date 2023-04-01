import React, { FC } from "react"
import { StyleSheet, Text, View } from "react-native"
import { useAppSelector } from "../redux/hooks"

export const Result: FC<any> = () => {
    const state = useAppSelector((state) => state.mahjong)

    if (!state.result) {
        return <Text>请输入手牌！</Text>
    }

    return (
        <View>
            <Text>{state.tsumo ? "自摸" : "荣和"}：</Text>
            <Text>1233</Text>
        </View>
    )
}
