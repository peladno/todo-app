import React from 'react';
import { RootStackParamList } from '../types/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DETAIL, SETTINGS, TODOS } from './routeNames';
import { Details, Settings, Todo } from '../screens';
import { COLORS } from '../constants/theme/colors';
import { TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function TodoNavigator() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Stack.Navigator
      screenOptions={{
        title: 'Tasks',
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
        // eslint-disable-next-line react/no-unstable-nested-components
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(SETTINGS);
            }}>
            <Ionicons name="settings-outline" color={COLORS.white} size={20} />
          </TouchableOpacity>
        ),
      }}
      initialRouteName={TODOS}>
      <Stack.Screen name={TODOS} component={Todo} />
      <Stack.Screen name={DETAIL} component={Details} />
      <Stack.Screen name={SETTINGS} component={Settings} />
    </Stack.Navigator>
  );
}
