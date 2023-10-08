import React from 'react';
import { SIGNIN, SIGNUP } from './routeNames';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
import { SignIn, SignUp } from '../screens';
const Stack = createNativeStackNavigator<AuthStackParamList>();
export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={SIGNIN}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SIGNIN} component={SignIn} />
      <Stack.Screen name={SIGNUP} component={SignUp} />
    </Stack.Navigator>
  );
}
