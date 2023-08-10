import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from './src/navigations/AuthNavigation'
import ForgotPassword from './src/screens/Auth/ForgotPassword'
import OTP from './src/screens/Auth/OTP'
import Home from './src/screens/main/Home'
import HomeNavigation from './src/navigations/HomeNavigation'
import FloatingButton from './src/components/FloatingButton'
import BottomSheet from './src/components/BottomSheet'
import { KeyboardProvider } from './src/context/KeyboardContext';


const App = () => {
  return (
    <KeyboardProvider>
      <NavigationContainer>
        {/* <FloatingButton />
        <HomeNavigation /> */}
        <AuthNavigation />
      </NavigationContainer>
    </KeyboardProvider>
    // <View style={styles.container}>
    //   <BottomSheet />
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