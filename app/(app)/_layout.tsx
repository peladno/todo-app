import { useAppSelector } from 'app/hooks/redux';
import { AuthState } from 'app/types/authSlice';
import { Redirect } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert } from 'react-native';

export default function AppLayout() {
  const auth = useAppSelector<AuthState>(state => state.auth);
  const { isAuth } = auth;

  useEffect(() => {
    if (auth.isError) {
      Alert.alert('Error', `${auth?.error}`);
    }
  }, [auth]);

  if (!isAuth) {
    return <Redirect href="../(auth)/home" />;
  }
  return <Redirect href="../(tabs)/tasks" />;
}
