import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import TodoNavigator from './todoNavigator';
import { CALENDAR, CREATETASK, MAINSTACK } from './routeNames';
import { COLORS } from '../constants/theme/colors';
import { Calendar, CreateTask } from '../screens';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';

// ... (código anterior)

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const ICON_SIZE = 25;
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 85,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: COLORS.lightGrey,
      }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!event.defaultPrevented) {
            if (route.name === CREATETASK) {
              alert('Mostrar alerta en lugar de navegar');
            } else {
              navigation.navigate(route.name);
            }
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const CustomIcon = () => {
          switch (label) {
            case 'Tasks':
              return (
                <Ionicons
                  name="list"
                  size={ICON_SIZE}
                  color={isFocused ? COLORS.primary : COLORS.grey}
                />
              );
            case 'Create':
              return (
                <Ionicons name="add-circle" size={50} color={COLORS.primary} />
              );
            case 'Calendar':
              return (
                <Ionicons
                  name="calendar-outline"
                  size={ICON_SIZE}
                  color={isFocused ? COLORS.primary : COLORS.grey}
                />
              );
            default:
              return null;
          }
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              alignSelf: 'center',
              marginBottom: 22,
            }}>
            <CustomIcon />
            <Text
              style={{
                color: isFocused ? COLORS.primary : COLORS.grey,
                fontSize: 10,
                marginTop: 3,
              }}>
              {label === 'Create' ? null : label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ... (código posterior)

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
      tabBar={props => <MyTabBar {...props} />}
      // initialRouteName={MAINSTACK}
      // screenOptions={{
      //   headerShown: false,
      //   tabBarActiveTintColor: COLORS.primary,
      //   tabBarInactiveTintColor: COLORS.grey,
      // }}
    >
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
          tabBarLabelStyle: { display: 'none' },

          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ focused }) => (
            <Ionicons name="add-circle" size={50} color={COLORS.primary} />
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
