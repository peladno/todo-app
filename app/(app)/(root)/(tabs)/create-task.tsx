import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import 'react-native-get-random-values';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux';
import { AuthState } from '@/app/types/authSlice';
import {
  FormState,
  onBlurProps,
  onChangeProps,
  onfocusProps,
} from '@/app/types/input';
import { useForm } from '@/app/hooks/useForm';
import { addTask, fetchTasks } from '@/app/store/todo/todo.slice';
import { Button, Input } from '@/app/components';
import { COLORS } from '@/app/constants/theme/colors';
import { router } from 'expo-router';
import { NewTask } from '@/app/types/todoSlice';

export default function () {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<Date | null>(null);
  const { user } = useAppSelector<AuthState>(state => state.auth);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [errorDate, setErrorDate] = useState(false);

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

  const handleForm = () => {
    if (date) {
      const newTask: NewTask = {
        name: formState.task.value,
        description: formState.description.value,
        dueDate: date,
        status: 'pending',
      };

      if (user) {
        dispatch(addTask({ newTask, userId: user?.id }))
          .then(response => {
            if (response.meta.requestStatus === 'fulfilled') {
              dispatch(fetchTasks(user?.id));

              clearForm();
              setDatePickerVisibility(false);
              router.push('/(app)/(root)/(tabs)');
            }
          })
          .catch(error => {
            console.log('Error adding task:', error);
          });
      }
      setErrorDate(false);
    } else {
      setErrorDate(true);
    }
  };

  const onBlurHandler = ({ name }: onBlurProps) => {
    onBlur(name);
  };

  const onFocusHandler = ({ name }: onfocusProps) => {
    onFocus(name);
  };

  const onChangeHandle = ({ name, text }: onChangeProps) => {
    onChange({ text, name });
  };

  const clearForm = () => {
    clearInput('task');
    clearInput('description');
    setDate(null);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (dateSelected: Date) => {
    setDate(dateSelected);
    hideDatePicker();
    setErrorDate(false);
  };
  return (
    <View style={styles.container}>
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
        <View>
          <Text
            style={{
              fontWeight: 'bold',
            }}>
            Task Day:
          </Text>
          {errorDate && (
            <Text style={styles.errorDate}>*Select Date to continue.</Text>
          )}
        </View>
        <TouchableOpacity onPress={showDatePicker}>
          <Text>
            {date ? new Date(date).toLocaleDateString() : 'Select date'}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <Button handleButton={handleForm} formValid={isFormValid} text="Add" />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  subTitle: { fontSize: 15, marginBottom: 20 },
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  errorDate: { color: COLORS.red, fontSize: 10, fontWeight: '600' },
});
