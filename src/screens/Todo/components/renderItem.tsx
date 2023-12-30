import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Task } from '../../../types/todoSlice';
import { COLORS } from '../../../constants/theme/colors';
import { SwipeableComp } from '../../../components';

type TodoItemProps = {
  item: Task;
};
export default function RenderItem({ item }: TodoItemProps) {
  return (
    <>
      {item.status === 'completed' ? (
        <View style={[styles.itemChanged, { backgroundColor: COLORS.green }]}>
          <View style={styles.innerItem}>
            <Text style={styles.title2}>{item.title}</Text>
            <Text style={styles.description2}>
              Description: {item.description}
            </Text>
          </View>
        </View>
      ) : item.status === 'deleted' ? (
        <View style={[styles.itemChanged, { backgroundColor: COLORS.red }]}>
          <View style={styles.innerItem}>
            <Text
              style={[styles.title2, { textDecorationLine: 'line-through' }]}>
              {item.title}
            </Text>
            <Text
              style={[
                styles.description2,
                { textDecorationLine: 'line-through' },
              ]}>
              Description: {item.description}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.shadow}>
          <SwipeableComp>
            <View style={styles.itemContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>
                Description: {item.description}
              </Text>
            </View>
          </SwipeableComp>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 70,
    paddingLeft: 20,
  },
  title: { fontSize: 18, fontWeight: '600' },
  description: { color: COLORS.greyLetter, fontSize: 14 },
  itemChanged: {
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 20,
  },
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
    borderRadius: 15,
  },
  innerItem: {
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 50,
  },
  title2: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  description2: { color: COLORS.white, fontSize: 10, fontWeight: '400' },
});
