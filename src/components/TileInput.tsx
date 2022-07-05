import React, { FC } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Button } from "@rneui/themed"

export const TileInput: FC<{
    notify?: any
}> = ({ notify }) => {
    return (
        <View>
            <Text>宝牌指示牌</Text>

            <Text>手牌</Text>
        </View>
    )
}
