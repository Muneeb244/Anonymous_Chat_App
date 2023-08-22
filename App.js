import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from './src/navigations/AuthNavigation'
import HomeNavigation from './src/navigations/HomeNavigation'
import { KeyboardProvider } from './src/context/KeyboardContext'
import { Provider } from 'react-redux'
import { store } from './src/redux/store/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from './src/components/Loading'

const App = () => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('token')
      .then((token) => {
        setAuthenticated(!!token);
      })
      .catch((error) => {
        console.error('Error reading token from AsyncStorage:', error);
        setAuthenticated(false);
      });
  }, []);


  return (
    <Provider store={store}>
      <KeyboardProvider>

        {authenticated === null ?
          <Loading />
          :
          <NavigationContainer>
            {authenticated ? <HomeNavigation /> : <AuthNavigation />}
          </NavigationContainer>}
      </KeyboardProvider>

    </Provider>
  );
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
