import React from 'react';
import { RootStackParamList } from '../types/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DETAIL, TODOS } from './routeNames';
import { Details, Todo } from '../screens';
import { COLORS } from '../constants/theme/colors';

export const Stack = createNativeStackNavigator<RootStackParamList>();

export default function TodoNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
      }}
      initialRouteName={TODOS}>
      <Stack.Screen name={TODOS} component={Todo} />
      <Stack.Screen name={DETAIL} component={Details} />
    </Stack.Navigator>
  );
}
