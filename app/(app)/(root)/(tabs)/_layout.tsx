import React from 'react';
import { Tabs } from 'expo-router';
import { COLORS } from '@/app/constants/theme/colors';
import CustomTabBar from '@/app/components/customTabBar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
      }}>
      <Tabs.Screen name="index" options={{ title: 'Tasks' }} />
      <Tabs.Screen name="calendar" options={{ title: 'Calendar' }} />
      <Tabs.Screen name="create-task" options={{ title: 'Create' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}
