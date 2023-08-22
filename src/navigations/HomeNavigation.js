import { StyleSheet } from 'react-native'
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/main/Home';
import AddPost from '../screens/main/AddPost';
import Profile from '../screens/main/Profile';
import FloatingButton from '../components/FloatingButton';
import AuthNavigation from './AuthNavigation';

const HomeNavigation = () => {

  const Stack = createNativeStackNavigator();

  return (
    <>
    <FloatingButton />
      <Stack.Navigator screenOptions={{ animation: 'flip', headerShown: false }} initialRouteName='home'>
        <Stack.Screen
          name="home"
          component={Home}
        />
        <Stack.Screen
          name="profile"
          component={Profile}
        />
        <Stack.Screen
          name="post"
          component={AddPost}
        />
        <Stack.Screen
          name="floatingButton"
          component={FloatingButton}
        />
        <Stack.Screen
          name="authNavigation"
          component={AuthNavigation}
        />
      </Stack.Navigator>
    </>
  )
}

export default HomeNavigation

const styles = StyleSheet.create({});