import React from 'react';
import { Stack, Tabs } from 'expo-router';
import { COLORS } from '@/app/constants/theme/colors';

export default function () {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: COLORS.white,
        }}>
        <Tabs.Screen name="index" options={{ title: 'Tasks' }} />
        <Tabs.Screen name="calendar" />
        <Tabs.Screen name="create-task" />
        <Tabs.Screen name="settings" />
      </Tabs>
    </>
  );
}
