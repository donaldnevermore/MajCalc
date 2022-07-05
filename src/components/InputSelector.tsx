import React, { useState, FC } from "react"
import { Text, View, StyleSheet, GestureResponderEvent } from "react-native"
import { ListItem } from "@rneui/themed"

type Props = {
    list: any[]
    handlePress: (item: any) => void
}

export const InputSelector: FC<Props> = ({ list, handlePress }) => {
    const [value, setValue] = useState("xyz")
    const [expanded, setExpanded] = useState(false)

    return (
        <ListItem.Accordion
            content={
                <>
                    <ListItem.Content>
                        <ListItem.Title>{value}</ListItem.Title>
                    </ListItem.Content>
                </>
            }
            isExpanded={expanded}
            onPress={() => {
                setExpanded(!expanded)
            }}>
            {list.map((elem, i) => (
                <ListItem
                    key={i}
                    onPress={(_) => {
                        handlePress(elem)
                    }}
                    bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{elem.name}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            ))}
        </ListItem.Accordion>
    )
}
