import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthState } from '../../types/auth';
import { useAppSelector } from '../../hooks/redux';

function Todo() {
  const auth = useAppSelector<AuthState>(state => state.auth);
  const insets = useSafeAreaInsets();

  console.log('[auth user]:', auth.user);
  return (
    <View style={{ paddingTop: insets.top }}>
      <Text>index</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default Todo;
