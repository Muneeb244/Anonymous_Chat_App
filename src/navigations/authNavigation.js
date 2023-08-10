import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GettingStarted from '../screens/GettingStarted';
import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import OTP from '../screens/Auth/OTP'
import HomeNavigation from './HomeNavigation';

const Stack = createNativeStackNavigator();

function AuthNavigation() {
  return (
    <Stack.Navigator screenOptions={{animation: 'slide_from_right', headerShown: false}} initialRouteName='started'>
      <Stack.Screen name="started" component={GettingStarted}/>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen name="forgot" component={ForgotPassword} />
      <Stack.Screen name="otp" component={OTP} />
      <Stack.Screen name="homenavigation" component={HomeNavigation} />
    </Stack.Navigator>
  );
}


export default AuthNavigation

const styles = StyleSheet.create({})