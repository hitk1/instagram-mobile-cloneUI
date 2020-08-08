import 'react-native-gesture-handler'
import * as React from 'react'
import { Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import logo from './assets/instagram.png'

import Feed from './screens/Feed'

const Stack = createStackNavigator()

const Routes = () => {
    return (
    <NavigationContainer>
        <Stack.Navigator 
            screenOptions={{ 
                headerTitle: () => <Image source={logo} />,
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: "#F5F5F5"}
            }}
        >
            <Stack.Screen name="Home" component={Feed} />
        </Stack.Navigator>
    </NavigationContainer>
    )
}

export default Routes