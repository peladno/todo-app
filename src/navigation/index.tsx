import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './authNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useAppSelector} from '../hooks/redux';
import {AuthState} from '../types/auth';
import TodoNavigator from './todoNavigator';

export default function AppNavigator() {
  const auth = useAppSelector<AuthState>(state => state.auth);
  const {isAuth} = auth;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isAuth ? <TodoNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
