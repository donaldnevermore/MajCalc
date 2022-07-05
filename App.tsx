import React, { type PropsWithChildren, FC } from "react"
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from "react-native"

import { Colors, Header } from "react-native/Libraries/NewAppScreen"

const App = () => {
    const isDarkMode = useColorScheme() === "dark"

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
    }

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
                <Header />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})

export default App
