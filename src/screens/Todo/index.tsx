import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { TodosProps } from '../../types/navigation';
import { COLORS } from '../../constants/theme/colors';
import { Button, Input, ModalComp } from '../../components';
import {
  FormState,
  onBlurProps,
  onChangeProps,
  onfocusProps,
} from '../../types/input';
import { useForm } from '../../hooks/useForm';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

function Todo({ navigation }: TodosProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());

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

  return (
    <View style={styles.container}>
      <ModalComp modalVisible={modalVisible} closeModal={closeModal}>
        <View style={styles.modal}>
          <Text style={styles.title}>Add New Task</Text>
          <Text style={styles.subTitle}>
            Fill out the form below to add a new task to your todo list.
          </Text>
          <Input
            placeholder="Enter task name"
            label="Task Name"
            active={formState.task.active}
            error={formState.task.error}
            hasError={formState.task.hasError}
            name={formState.task.name}
            value={formState.task.value}
            onBlur={() => onBlurHandler({ name: formState.task.name })}
            onChange={onChangeHandle}
            onFocus={() => onFocusHandler({ name: formState.task.name })}
          />
          <Input
            placeholder="Enter task description"
            label="Task Description"
            active={formState.description.active}
            error={formState.description.error}
            hasError={formState.description.hasError}
            name={formState.description.name}
            value={formState.description.value}
            onBlur={() => onBlurHandler({ name: formState.description.name })}
            onChange={onChangeHandle}
            onFocus={() => onFocusHandler({ name: formState.description.name })}
          />
          <View style={styles.dateContainer}>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              Task Deadline:
            </Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              is24Hour={true}
              onChange={onChangeDate}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            handleButton={closeModal}
            disabled={false}
            width={100}
            text="Close"
          />
          <Button
            handleButton={() => {}}
            disabled={false}
            width={100}
            text="Add"
          />
        </View>
      </ModalComp>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}>
        <Text style={styles.floatingButtonText}>+</Text>
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
    backgroundColor: COLORS.primary,
    borderRadius: 100,
  },
  floatingButtonText: { color: COLORS.white, fontSize: 30, fontWeight: 'bold' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  subTitle: { fontSize: 15, marginBottom: 20 },
  modal: { width: 250 },
  buttonContainer: {
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default Todo;
