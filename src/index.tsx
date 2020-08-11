import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components'

import Routes from './routes'
import themes from './themes'

const src: React.FC = () => {

  //Pode retornar dark, light e null
  const userTheme = useColorScheme()
  const theme = themes[userTheme || 'light']

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        backgroundColor={theme.screenBackground}
        barStyle={userTheme == 'light' ? "dark-content" : 'light-content'}
      />
      <Routes />
    </ThemeProvider>
  )
}

export default src;