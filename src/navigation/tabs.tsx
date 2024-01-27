import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodoNavigator from './todoNavigator';
import { CALENDAR, CREATETASK, MAINSTACK } from './routeNames';
import { Calendar, CreateTask } from '../screens';
import { RootStackParamList } from '../types/navigation';
import CustomTabBar from '../components/customTabBar';

type TabParamList = {
  MainStack: RootStackParamList;
  CreateTask: undefined;
  Calendar: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabsNavigator = () => {
  return (
    <Tab.Navigator tabBar={CustomTabBar}>
      <Tab.Screen
        name={MAINSTACK}
        component={TodoNavigator}
        options={{
          title: 'Tasks',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={CREATETASK}
        component={CreateTask}
        options={{
          title: 'Create',
          tabBarLabelStyle: { display: 'none' },
        }}
      />

      <Tab.Screen
        name={CALENDAR}
        component={Calendar}
        options={{
          title: 'Calendar',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;
