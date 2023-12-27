import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';

import { Button, Input, ModalComp } from '../../../components';
import { TodoModalProps } from '../../../types/modals';

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
          handleButton={() => {}}
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
