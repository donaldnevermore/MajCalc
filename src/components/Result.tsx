import React, { FC } from "react"
import { StyleSheet, Text, View } from "react-native"

export const Result: FC<any> = ({ res, tsumo }) => {
    if (!res) {
        return <Text>请输入手牌！</Text>
    }

    return (
        <View>
            <Text>{tsumo ? "自摸" : "荣和"}：</Text>
            <Text>1233</Text>
        </View>
    )
}
