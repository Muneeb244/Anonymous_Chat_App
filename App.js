import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GettingStarted from './src/screens/GettingStarted'
import Login from './src/screens/Auth/Login'
import Signup from './src/screens/Auth/Signup'

const App = () => {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
})