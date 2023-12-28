import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import { Task } from '../../../types/todoSlice';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { COLORS } from '../../../constants/theme/colors';
import AppleStyleSwipeableRow from './test';
import { SwipeableComp } from '../../../components';

type TodoItemProps = {
  item: Task;
};

const rightSwipeActions = () => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.red,
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}>
      <Text
        style={{
          color: COLORS.white,
          paddingHorizontal: 10,
          fontWeight: '600',
          paddingHorizontal: 30,
          paddingVertical: 20,
        }}>
        Delete
      </Text>
    </TouchableOpacity>
  );
};

export default function RenderItem({ item }: TodoItemProps) {
  return (
    // <Swipeable
    //   friction={2}
    //   rightThreshold={40}
    //   renderRightActions={rightSwipeActions}
    //   onSwipeableOpen={direction => {
    //     if (direction === 'right') {
    //       // Swiped from right
    //     } else if (direction === 'left') {
    //       // Swiped from left
    //     }
    //   }}>
    <SwipeableComp>
      <View style={styles.itemContainer}>
        <CheckBox boxType="square" style={styles.checkbox} />
        <TouchableOpacity
          style={styles.task}
          onPress={() => window.alert(item.from)}>
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    </SwipeableComp>

    // </Swipeable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  task: { marginHorizontal: 10, flex: 1, padding: 10 },
  title: { fontSize: 20 },
  checkbox: {},
});
