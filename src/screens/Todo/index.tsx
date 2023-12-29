import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { TodosProps } from '../../types/navigation';
import { COLORS } from '../../constants/theme/colors';
import {
  FormState,
  onBlurProps,
  onChangeProps,
  onfocusProps,
} from '../../types/input';
import { useForm } from '../../hooks/useForm';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import ModalTodo from './components/modalTodo';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchTasks } from '../../store/todo/todo.slice';
import { Task, TodoState } from '../../types/todoSlice';
import RenderItem from './components/renderItem';
import { AuthState } from '../../types/authSlice';

const Separator = () => <View style={styles.itemSeparator} />;

function Todo({ navigation }: TodosProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  const dispatch = useAppDispatch();
  const { tasks, isLoading } = useAppSelector<TodoState>(state => state.todo);
  const { user } = useAppSelector<AuthState>(state => state.auth);
  const filteredTasks = tasks.filter(task => task.userId === user?.uid);

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    setDate(currentDate);
  };

  const initialState: FormState = {
    task: {
      active: false,
      error: '',
      hasError: false,
      isFormValid: false,
      name: 'task',
      value: '',
    },
    description: {
      active: false,
      error: '',
      hasError: false,
      isFormValid: false,
      name: 'description',
      value: '',
    },
  };

  const { formState, onChange, isFormValid, onFocus, onBlur, clearInput } =
    useForm(initialState);

  const onBlurHandler = ({ name }: onBlurProps) => {
    onBlur(name);
  };

  const onFocusHandler = ({ name }: onfocusProps) => {
    onFocus(name);
  };

  const onChangeHandle = ({ name, text }: onChangeProps) => {
    onChange({ text, name });
  };

  const closeModal = () => {
    setModalVisible(false);
    clearInput('task');
    clearInput('description');
  };

  const fetchList = () => {
    dispatch(fetchTasks());
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <View style={styles.container}>
      <ModalTodo
        modalVisible={modalVisible}
        closeModal={closeModal}
        formState={formState}
        onChangeHandle={onChangeHandle}
        isFormValid={isFormValid}
        onFocusHandler={onFocusHandler}
        onBlurHandler={onBlurHandler}
        onChangeDate={onChangeDate}
        date={date}
      />

      <FlatList
        onRefresh={fetchList}
        refreshing={isLoading}
        keyExtractor={item => item.id}
        data={filteredTasks}
        renderItem={({ item }: { item: Task }) => (
          <View style={styles.shadow}>
            <RenderItem item={item} />
          </View>
        )}
        ItemSeparatorComponent={Separator}
        ListHeaderComponent={Separator}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}>
        <FontAwesomeIcon icon={faPlus} color={COLORS.white} size={25} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  floatingButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
    position: 'absolute',
    right: 30,
    height: 65,
    bottom: 60,
    backgroundColor: COLORS.secondary,
    borderRadius: 100,
  },
  floatingButtonText: { color: COLORS.white, fontSize: 30, fontWeight: 'bold' },
  itemSeparator: {
    flex: 1,
    height: 10,
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
    borderRadius: 10,
  },
});

export default Todo;
