import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components'

import Routes from './routes'
import themes from './themes'

const src: React.FC = () => {

  //Pode retornar dark, light e null
  const userTheme = useColorScheme()
  const theme = themes['dark']

  return (
    <ThemeProvider theme={theme}>
      {/* <StatusBar backgroundColor="#F5F5F" barStyle="dark-content" /> */}
      <StatusBar
        backgroundColor={themes['dark'].screenBackground}
        barStyle={userTheme == 'light' ? "dark-content" : 'light-content'}
      />
      <Routes />
    </ThemeProvider>
  )
}

export default src;