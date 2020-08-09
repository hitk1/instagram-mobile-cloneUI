import 'react-native-gesture-handler'
import * as React from 'react'
import { Image, useColorScheme, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import styled from 'styled-components/native'

import logo from './assets/instagram.png'
import LogoDarken from './assets/instagram-darken.svg'
import LogoLighten from './assets/instagram-lighten.svg'

import Feed from './screens/Feed'
import themes from './themes'

const Stack = createStackNavigator()

const Routes = () => {

    const userTheme = useColorScheme()
    const theme = themes['dark']

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerTitle: () => userTheme == 'light'
                        ? <LogoDarken width={110} height={70} />
                        : <LogoLighten width={110} height={70} />
                    ,
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: theme.headerColor
                    }
                }}
            >
                <Stack.Screen name="Home" component={Feed} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes