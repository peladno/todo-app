import { SIGNIN, SIGNUP } from '@/app/constants/routesNames/routeNames';
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux';
import { resetError } from '@/app/store/auth/auth.slice';
import { AuthState } from '@/app/types/authSlice';
import { Redirect, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert } from 'react-native';

export default function () {
  const auth = useAppSelector<AuthState>(state => state.auth);
  const { isAuth, error } = auth;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert('Error', `${error}`);
      dispatch(resetError());
    }
  }, [error, dispatch]);

  if (isAuth) {
    return <Redirect href={'/(app)/(root)/(tabs)'} />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name={SIGNIN} />
      <Stack.Screen name={SIGNUP} />
    </Stack>
  );
}
