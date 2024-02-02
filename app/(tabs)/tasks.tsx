import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { COLORS } from 'app/constants/theme/colors';
import { useAppDispatch, useAppSelector } from 'app/hooks/redux';
import RenderItem from 'app/screens/Todo/components/renderItem';
import { fetchTasks } from 'app/store/todo/todo.slice';
import { AuthState } from 'app/types/authSlice';
import { Task, TodoState } from 'app/types/todoSlice';

const Separator = () => <View style={styles.itemSeparator} />;

function Todo() {
  const dispatch = useAppDispatch();
  const { tasks, isLoading } = useAppSelector<TodoState>(state => state.todo);
  const { user } = useAppSelector<AuthState>(state => state.auth);

  const fetchList = () => {
    if (user?.uid) {
      dispatch(fetchTasks(user.uid));
    }
  };

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={fetchList}
        refreshing={isLoading}
        keyExtractor={item => item.id}
        data={tasks}
        renderItem={({ item }: { item: Task }) => <RenderItem item={item} />}
        ItemSeparatorComponent={Separator}
        ListHeaderComponent={Separator}
        ListFooterComponent={Separator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  floatingButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
    position: 'absolute',
    right: 30,
    height: 65,
    bottom: 60,
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  floatingButtonText: { color: COLORS.white, fontSize: 30, fontWeight: 'bold' },
  itemSeparator: {
    flex: 1,
    height: 10,
  },
});

export default Todo;
