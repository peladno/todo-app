import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

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
import { TodoState, fetchTasks } from '../../store/todo/todo.slice';

function Todo({ navigation }: TodosProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  const dispatch = useAppDispatch();
  const tasksStateList = useAppSelector<TodoState>(state => state.todo.tasks);

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
  slider: {},
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
});

export default Todo;
