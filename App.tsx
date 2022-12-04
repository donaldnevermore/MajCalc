import React from "react"
import { SafeAreaView, ScrollView, StatusBar } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"

import { Home } from "./src/components/Home"

const App = () => {
    const backgroundStyle = {
        backgroundColor: Colors.lighter
    }

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
                <Home />
            </ScrollView>
        </SafeAreaView>
    )
}

export default App
