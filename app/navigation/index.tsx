import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './authNavigator';
import { useAppSelector } from '../hooks/redux';
import { AuthState } from '../types/authSlice';
import { Alert } from 'react-native';
import TabsNavigator from './tabsNavigation';

export default function AppNavigator() {
  const auth = useAppSelector<AuthState>(state => state.auth);
  const { isAuth } = auth;

  useEffect(() => {
    if (auth.isError) {
      Alert.alert('Error', `${auth?.error}`);
    }
  }, [auth]);

  return (
    <NavigationContainer>
      {isAuth ? <TabsNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}