import React, { FC, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Button } from "@rneui/themed"

export const Counter: FC<{
    n: number
    notify: (n: number) => void
}> = ({ n, notify }) => {
    const [count, setCount] = useState(n)

    const minus = () => {
        setCount(count - 1)
        notify(count)
    }

    const add = () => {
        setCount(count + 1)
        notify(count)
    }

    return (
        <View style={styles.container}>
            <Button disabled={n <= 0} onPress={minus}>
                -
            </Button>
            <Text>{n}</Text>
            <Button onPress={add}>+</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap"
    }
})
