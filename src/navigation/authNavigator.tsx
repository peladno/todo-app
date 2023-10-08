import React from 'react';
import { SIGNIN, SIGNUP } from './routeNames';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
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
