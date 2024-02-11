import RenderItem from '@/app/components/renderItem/renderItem';
import { COLORS } from '@/app/constants/theme/colors';
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux';
import { fetchTasks } from '@/app/store/todo/todo.slice';
import { AuthState } from '@/app/types/authSlice';
import { Task, TodoState } from '@/app/types/todoSlice';
import supabase from '@/app/utils/supabase';
import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

const Separator = () => <View style={styles.itemSeparator} />;

export default function () {
  const dispatch = useAppDispatch();
  const { tasks, isLoading } = useAppSelector<TodoState>(state => state.todo);
  const { user } = useAppSelector<AuthState>(state => state.auth);

  const getsessions = async () => {
    const { data, error } = await supabase.auth.getSession();

    console.log(data);
    console.log(error);
  };
  console.log('USER', user);

  const fetchList = () => {
    if (user?.id) {
      dispatch(fetchTasks(user.id));
    }
  };

  useEffect(() => {
    fetchList();
    getsessions();
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
