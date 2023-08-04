import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from './src/navigations/AuthNavigation'
import ForgotPassword from './src/screens/Auth/ForgotPassword'
import OTP from './src/screens/Auth/OTP'


const App = () => {
  return (
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
    // <View style={styles.container}>
    //   <OTP />
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