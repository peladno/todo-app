import { SIGNIN, SIGNUP } from '@/app/constants/routesNames/routeNames';
import { useAppSelector } from '@/app/hooks/redux';
import { AuthState } from '@/app/types/authSlice';
import { Redirect, Stack } from 'expo-router';
import React from 'react';

export default function () {
  const auth = useAppSelector<AuthState>(state => state.auth);
  const { isAuth } = auth;
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
