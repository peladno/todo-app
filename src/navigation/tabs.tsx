import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodoNavigator from './todoNavigator';
import { CALENDAR, CREATETASK, MAINSTACK, SETTINGS } from './routeNames';
import { Calendar, CreateTask, Settings } from '../screens';
import { RootStackParamList } from '../types/navigation';
import CustomTabBar from '../components/customTabBar';
import { COLORS } from '../constants/theme/colors';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';

type TabParamList = {
  MainStack: RootStackParamList;
  CreateTask: undefined;
  Calendar: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={CustomTabBar}
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
      }}>
      <Tab.Screen
        name={MAINSTACK}
        component={TodoNavigator}
        options={{
          title: 'Tasks',
        }}
      />
      <Tab.Screen
        name={CALENDAR}
        component={Calendar}
        options={{
          title: 'Calendar',
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
        name={SETTINGS}
        component={Settings}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;
