import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GettingStarted from '../screens/GettingStarted';
import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import OTP from '../screens/Auth/OTP'
import HomeNavigation from './HomeNavigation';
import ResetPassword from '../screens/Auth/ResetPassword';
import Loading from '../components/Loading';

const Stack = createNativeStackNavigator();

function AuthNavigation() {
  const [isFirstTime, setIsFirstTime] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('first').then((value) => {
      if (!value) value = 'false'
      setIsFirstTime(value !== 'false');
    });
  }, []);
  const initialRouteName = isFirstTime ? 'login' : 'started';

  return (
    <>
      {
        isFirstTime === null ? <Loading />
          :
          <Stack.Navigator
            screenOptions={{ animation: 'slide_from_right', headerShown: false }}
            initialRouteName={initialRouteName}
          >
            <Stack.Screen name="started" component={GettingStarted} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="forgot" component={ForgotPassword} />
            <Stack.Screen name="otp" component={OTP} />
            <Stack.Screen name="resetPassword" component={ResetPassword} />
            <Stack.Screen name="homenavigation" component={HomeNavigation} />
          </Stack.Navigator>
      }
    </>
  );
}

export default AuthNavigation;
