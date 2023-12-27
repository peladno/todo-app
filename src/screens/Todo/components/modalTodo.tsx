import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';

import { Button, Input, ModalComp } from '../../../components';
import { TodoModalProps } from '../../../types/modals';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { addTask } from '../../../store/todo/todo.slice';
import { AuthState } from '../../../types/authSlice';

export default function ModalTodo({
  modalVisible,
  closeModal,
  formState,
  onChangeHandle,
  isFormValid,
  onFocusHandler,
  onBlurHandler,
  onChangeDate,
  date,
}: TodoModalProps) {
  const dispatch = useAppDispatch();
  const auth = useAppSelector<AuthState>(state => state.auth);

  const handleForm = () => {
    const taskData = {
      userId: auth.user?.uid,
      title: formState.task.value,
      description: formState.description.value,
      dueDate: date,
      creationDate: new Date(),
      status: 'pending',
      id: new Date().getTime().toString(),
    };

    dispatch(addTask(taskData))
      .then(response => {
        if (response.meta.requestStatus === 'fulfilled') {
          closeModal();
        }
      })
      .catch(error => {
        // Error occurred while adding the task
        console.log('Error adding task:', error);
      });
  };

  return (
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
          handleButton={handleForm}
          formValid={isFormValid}
          width={100}
          text="Add"
        />
      </View>
    </ModalComp>
  );
}

const styles = StyleSheet.create({
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
