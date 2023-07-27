import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GettingStarted from './src/screens/GettingStarted'

const App = () => {
  return (
    <View style={styles.container}>
      <GettingStarted />
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