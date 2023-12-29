import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Task } from '../../../types/todoSlice';
import { COLORS } from '../../../constants/theme/colors';
import { SwipeableComp } from '../../../components';

type TodoItemProps = {
  item: Task;
};
export default function RenderItem({ item }: TodoItemProps) {
  return (
    // <View style={styles.shadow}>
    <SwipeableComp>
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={styles.task}
          onPress={() => console.log('pressed')}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>
            Description: {item.description}
          </Text>
        </TouchableOpacity>
      </View>
    </SwipeableComp>
    // </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
  },
  task: { marginHorizontal: 10, flex: 1, padding: 10 },
  title: { fontSize: 20, fontWeight: '600' },
  description: { color: COLORS.greyLetter },
  shadow: {
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
});
