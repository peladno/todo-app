import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodoNavigator from './todoNavigator';
import { CALENDAR, CREATETASK, MAINSTACK } from './routeNames';
import { COLORS } from '../constants/theme/colors';
import { Calendar, CreateTask } from '../screens';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/navigation';

type TabParamList = {
  MainStack: RootStackParamList;
  CreateTask: undefined;
  Calendar: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const ICON_SIZE = 25;

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={MAINSTACK}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.grey,
      }}>
      {/* Tasks Tab */}
      <Tab.Screen
        name={MAINSTACK}
        component={TodoNavigator}
        options={{
          title: 'Tasks',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="list"
              size={ICON_SIZE}
              color={focused ? COLORS.primary : COLORS.grey}
            />
          ),
        }}
      />

      {/* Add Task Tab */}
      <Tab.Screen
        name={CREATETASK}
        component={CreateTask}
        options={{
          title: 'Create',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="add-circle"
              size={ICON_SIZE}
              color={focused ? COLORS.primary : COLORS.grey}
            />
          ),
        }}
      />

      {/* Calendar Tab */}
      <Tab.Screen
        name={CALENDAR}
        component={Calendar}
        options={{
          title: 'Calendar',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="calendar-outline"
              size={ICON_SIZE}
              color={focused ? COLORS.primary : COLORS.grey}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;
