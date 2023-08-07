import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from './src/navigations/AuthNavigation'
import ForgotPassword from './src/screens/Auth/ForgotPassword'
import OTP from './src/screens/Auth/OTP'
import Home from './src/screens/main/Home'
import HomeNavigation from './src/navigations/HomeNavigation'
import FloatingButton from './src/components/FloatingButton'


const App = () => {
  return (
    <NavigationContainer>
      <FloatingButton />
      <HomeNavigation />
      {/* <AuthNavigation /> */}
    </NavigationContainer>
    // <View style={styles.container}>
    //   <Home />
    // </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
})