import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAppSelector } from '@/app/hooks/redux';
import { AuthState } from '@/app/types/authSlice';

export default function () {
  const auth = useAppSelector<AuthState>(state => state.auth);
  const { isAuth } = auth;
  if (!isAuth) {
    return <Redirect href={'/'} />;
  }
  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_left',
      }}
    />
  );
}
