import React from 'react';
import { RootStackParamList } from '../types/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DETAIL, SETTINGS, TODOS } from './routeNames';
import { Details, Settings, Todo } from '../screens';
import { COLORS } from '../constants/theme/colors';
import { TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function TodoNavigator() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
        // eslint-disable-next-line react/no-unstable-nested-components
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(SETTINGS);
            }}>
            <FontAwesomeIcon icon={faGear} color={COLORS.white} size={20} />
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
