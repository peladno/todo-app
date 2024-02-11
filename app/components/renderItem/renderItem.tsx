import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux';
import { AuthState } from '@/app/types/authSlice';
import { updateTask } from '@/app/store/todo/todo.slice';
import { COLORS } from '@/app/constants/theme/colors';
import { Task } from '@/app/types/todoSlice';
import { SwipeableComp } from '..';

type TodoItemProps = {
  item: Task;
};

export default function RenderItem({ item }: TodoItemProps) {
  const dispatch = useAppDispatch();
  const auth = useAppSelector<AuthState>(state => state.auth);

  const handleAction = (status: string) => {
    const taskId = item.id;

    dispatch(updateTask({ taskId, status }))
      .then(response => {
        if (response.meta.requestStatus === 'fulfilled') {
          console.log(`Task ${status}`);
        }
      })
      .catch(error => {
        console.log(`Error ${status}ing task:`, error);
      });
  };

  return (
    <View
      style={[
        styles.shadow,
        {
          backgroundColor:
            item.status === 'completed'
              ? COLORS.green
              : item.status === 'deleted'
              ? COLORS.red
              : COLORS.white,
        },
      ]}>
      {item.status === 'completed' || item.status === 'deleted' ? (
        <View style={styles.itemChanged}>
          <Ionicons
            name={item.status === 'completed' ? 'checkmark-sharp' : 'trash'}
            color="white"
            size={item.status === 'completed' ? 20 : 18}
          />
          <View style={styles.innerItem}>
            <Text
              style={[
                styles.title2,
                {
                  textDecorationLine:
                    item.status === 'completed' ? 'none' : 'line-through',
                },
              ]}>
              {item.title}
            </Text>
            <Text
              style={[
                styles.description2,
                {
                  textDecorationLine:
                    item.status === 'completed' ? 'none' : 'line-through',
                },
              ]}>
              Description: {item.description}
            </Text>
          </View>
        </View>
      ) : (
        <SwipeableComp
          deleteIt={() => handleAction('deleted')}
          completeIt={() => handleAction('completed')}>
          <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>
              Description: {item.description}
            </Text>
          </View>
        </SwipeableComp>
      )}
    </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    marginHorizontal: 10,
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

    elevation: 8,
    backgroundColor: COLORS.white,
    borderRadius: 20,
  },
  innerItem: {
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 45,
  },
  title2: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  description2: { color: COLORS.white, fontSize: 10, fontWeight: '400' },
});
