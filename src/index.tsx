import React from 'react';
import { View, StatusBar } from 'react-native';

// import { Container } from './styles';
import Routes from './routes'

const src: React.FC = () => {
  return (
    <>
    <StatusBar backgroundColor="#F5F5F5" barStyle="dark-content"/>
    <Routes />
    </>
  )
}

export default src;