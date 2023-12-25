import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DetailProps } from '../../types/navigation';

function Details({ route }: DetailProps) {
  const insets = useSafeAreaInsets();
  // const { description, id, img, price, title } = route.params;

  return (
    <View style={{ paddingTop: insets.top }}>
      <Text>index</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default Details;
