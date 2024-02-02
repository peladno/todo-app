import React from 'react';
import { Stack } from 'expo-router';
import { COLORS } from 'app/constants/theme/colors';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
      }}>
      <Stack.Screen name="tasks" />
      {/* <Stack.Screen name="tasks" options={{ headerShown: false }} />
      <Stack.Screen name="tasks" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
