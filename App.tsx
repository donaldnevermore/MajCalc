import React from "react"
import { SafeAreaView, ScrollView, StatusBar } from "react-native"
import { Colors, Header } from "react-native/Libraries/NewAppScreen"

import { Home } from "./src/components/Home"

const App = () => {
    const backgroundStyle = {
        backgroundColor: Colors.lighter
    }

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
                <Header />
                <Home />
            </ScrollView>
        </SafeAreaView>
    )
}

export default App
