import React from 'react';
import { HOME, SIGNIN, SIGNUP } from './routeNames';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
import { Home, SignIn, SignUp } from '../screens';
const Stack = createNativeStackNavigator<AuthStackParamList>();
export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={HOME}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name={HOME} component={Home} />
      <Stack.Screen name={SIGNIN} component={SignIn} />
      <Stack.Screen name={SIGNUP} component={SignUp} />
    </Stack.Navigator>
  );
}
