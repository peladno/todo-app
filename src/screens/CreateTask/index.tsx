import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import {
  FormState,
  onBlurProps,
  onChangeProps,
  onfocusProps,
} from '@/types/input';
import { useForm } from '@/hooks/useForm';
import { addTask, fetchTasks } from '@/store/todo/todo.slice';
import { AuthState } from '@/types/authSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { v4 as uuidv4 } from 'uuid';
import { Button, Input } from '@/components';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { COLORS } from '@/constants/theme/colors';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

import { MAINSTACK } from '@/navigation/routeNames';
import { TabParamList } from '@/types/navigation';

export default function CreateTask() {
  const [date, setDate] = useState<Date | null>(null);
  const dispatch = useAppDispatch();
  const auth = useAppSelector<AuthState>(state => state.auth);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [errorDate, setErrorDate] = useState(false);
  //TODO probablemente cambiara
  const navigation = useNavigation<NavigationProp<TabParamList>>();

  const taskid = uuidv4();

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
      const taskData = {
        userId: auth.user?.uid!,
        title: formState.task.value,
        description: formState.description.value,
        dueDate: date,
        creationDate: new Date(),
        status: 'pending',
        id: taskid,
      };

      dispatch(addTask(taskData))
        .then(response => {
          if (response.meta.requestStatus === 'fulfilled') {
            if (auth.user?.uid) {
              dispatch(fetchTasks(auth.user?.uid));
            }
            clearForm();
            setDatePickerVisibility(false);
            navigation.navigate(MAINSTACK);
          }
        })
        .catch(error => {
          console.log('Error adding task:', error);
        });
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
