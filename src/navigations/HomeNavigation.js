import { StyleSheet, Text, View, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/main/Home';
import AddPost from '../screens/main/AddPost';
import Profile from '../screens/main/Profile';
import FloatingButton from '../components/FloatingButton';

const HomeNavigation = () => {

  const Stack = createNativeStackNavigator();

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <>
      <Stack.Navigator screenOptions={{ animation: 'flip', headerShown: false }} initialRouteName='profile'>
      <Stack.Screen
          name="profile"
          component={Profile}
          initialParams={{ keyboardVisible }}
        />
        <Stack.Screen
          name="home"
          component={Home}
          initialParams={{ keyboardVisible }}
        />
        <Stack.Screen
          name="post"
          component={AddPost}
          initialParams={{ keyboardVisible }}
        />
        <Stack.Screen
          name="floatingButton"
          component={FloatingButton}
          initialParams={{ keyboardVisible }}
        />
      </Stack.Navigator>
    </>
  )
}

export default HomeNavigation

const styles = StyleSheet.create({});