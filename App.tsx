import React from "react"
import { SafeAreaView, ScrollView, StatusBar, useColorScheme } from "react-native"

import { Colors } from "react-native/Libraries/NewAppScreen"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { Home } from "./src/components/Home"

function App(): JSX.Element {
    const isDarkMode = useColorScheme() === "dark"

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={backgroundStyle}>
                <StatusBar
                    barStyle={isDarkMode ? "light-content" : "dark-content"}
                    backgroundColor={backgroundStyle.backgroundColor}
                />
                <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
                    <Home />
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default App
