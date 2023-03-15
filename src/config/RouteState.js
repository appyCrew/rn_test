import React from 'react';
import {
  CardStyleInterpolators,
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';

import Splash from './../screens/Splash'
import Login from './../screens/Login'
import OTP from './../screens/OTP'
import List from './../screens/List'


const Stack = createStackNavigator();
export default RouteStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="List" component={List} />
    </Stack.Navigator>
  );
};
