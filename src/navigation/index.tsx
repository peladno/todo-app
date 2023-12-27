import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './authNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppSelector } from '../hooks/redux';
import { AuthState } from '../types/authSlice';
import TodoNavigator from './todoNavigator';
import { Alert } from 'react-native';

export default function AppNavigator() {
  const auth = useAppSelector<AuthState>(state => state.auth);
  const { isAuth } = auth;

  useEffect(() => {
    if (auth.isError) {
      Alert.alert('Error', `${auth?.error}`);
    }
  }, [auth]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isAuth ? <TodoNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
