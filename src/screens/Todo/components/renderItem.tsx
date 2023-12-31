import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Task } from '../../../types/todoSlice';
import { COLORS } from '../../../constants/theme/colors';
import { SwipeableComp } from '../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { AuthState } from '../../../types/authSlice';
import { updateTask } from '../../../store/todo/todo.slice';

type TodoItemProps = {
  item: Task;
};

export default function RenderItem({ item }: TodoItemProps) {
  const dispatch = useAppDispatch();
  const auth = useAppSelector<AuthState>(state => state.auth);

  const handleComplete = () => {
    const task = {
      userId: auth.user?.uid,
      title: item.title,
      description: item.description,
      dueDate: item.dueDate,
      creationDate: item.creationDate,
      status: 'completed',
      id: item.id,
    };
    const id = item.db_id as string;

    dispatch(updateTask({ task, id }))
      .then(response => {
        if (response.meta.requestStatus === 'fulfilled') {
          console.log('Task completed');
        }
      })
      .catch(error => {
        console.log('Error completing task:', error);
      });
  };
  const handleDelete = () => {};
  return (
    <>
      {item.status === 'completed' ? (
        <View style={[styles.itemChanged, { backgroundColor: COLORS.green }]}>
          <FontAwesomeIcon icon={faCheck} color="white" size={20} />
          <View style={styles.innerItem}>
            <Text style={styles.title2}>{item.title}</Text>
            <Text style={styles.description2}>
              Description: {item.description}
            </Text>
          </View>
        </View>
      ) : item.status === 'deleted' ? (
        <View style={[styles.itemChanged, { backgroundColor: COLORS.red }]}>
          <FontAwesomeIcon icon={faTrash} color="white" size={18} />
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
          <SwipeableComp deleteIt={handleDelete} completeIt={handleComplete}>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
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
