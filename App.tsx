import React from "react"
import { SafeAreaView, ScrollView, StatusBar, useColorScheme } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { store } from "./src/redux/store"
import { Provider } from "react-redux"
import { Home } from "./src/components/Home"

function App(): JSX.Element {
    const isDarkMode = useColorScheme() === "dark"

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={backgroundStyle}>
                <Provider store={store}>
                    <StatusBar
                        barStyle={isDarkMode ? "light-content" : "dark-content"}
                        backgroundColor={backgroundStyle.backgroundColor}
                    />
                    <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
                        <Home />
                    </ScrollView>
                </Provider>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default App
