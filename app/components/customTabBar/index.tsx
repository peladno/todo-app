import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme/colors';

const ICON_SIZE = 25;

type TabLabel =
  | string
  | ((props: {
      focused: boolean;
      color: string;
      position: 'below-icon' | 'beside-icon';
      children: string;
    }) => React.ReactNode);

const CustomIcon = ({ isFocused, label }: { isFocused: boolean; label: TabLabel }) => {
  switch (label) {
    case 'Tasks':
      return <Ionicons name="list" size={ICON_SIZE} color={isFocused ? COLORS.primary : COLORS.grey} />;
    case 'Create':
      return <Ionicons name="add-circle" size={50} color={COLORS.primary} />;
    case 'Calendar':
      return (
        <Ionicons
          name="calendar-outline"
          size={ICON_SIZE}
          color={isFocused ? COLORS.primary : COLORS.grey}
        />
      );
    case 'Settings':
      return (
        <Ionicons
          name="settings-outline"
          size={ICON_SIZE}
          color={isFocused ? COLORS.primary : COLORS.grey}
        />
      );
    default:
      return null;
  }
};

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.tabBar}>
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
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={() => navigation.emit({ type: 'tabLongPress', target: route.key })}
            style={styles.tabButton}>
            <CustomIcon isFocused={isFocused} label={label as TabLabel} />

            {label === 'Create' ? null : (
              <Text
                style={[
                  styles.labelText,
                  { color: isFocused ? COLORS.primary : COLORS.grey },
                ]}>
                {typeof label === 'string' ? label : route.name}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default CustomTabBar;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 85,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 22,
  },
  labelText: {
    fontSize: 10,
  },
});
