import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

interface Task {
  id: string;
  userId: string;
  taskId: string;
  title: string;
  description: string;
  dueDate: Date;
  creationDate: Date;
  status: string;
}

export interface TodoState {
  tasks: Task[];
  isLoading: boolean;
  isError: boolean;
  error: string | null | unknown;
}

const initialState: TodoState = {
  tasks: [],
  isLoading: false,
  isError: false,
  error: null,
};

// Async thunk for fetching tasks from Firebase
export const fetchTasks = createAsyncThunk(
  'todo/fetchTasks',
  async (_, thunkAPI) => {
    try {
      const tasks = await firestore().collection('tasks').get();
      return tasks.docs.map(doc => doc.data() as Task);
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  },
);

// Async thunk for adding a task to Firebase
export const addTask = createAsyncThunk(
  'todo/addTask',
  async (task: Task, thunkAPI) => {
    try {
      await firestore().collection('tasks').add(task);
      return task;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  },
);

// Async thunk for deleting a task from Firebase
export const deleteTask = createAsyncThunk(
  'todo/deleteTask',
  async (taskId: string, thunkAPI) => {
    try {
      await firestore().collection('tasks').doc(taskId).delete();
      return taskId;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  },
);

export const updateTask = createAsyncThunk(
  'todo/updateTask',
  async (payload: { task: Task }, thunkAPI) => {
    try {
      await firestore()
        .collection('tasks')
        .doc(payload.task.id)
        .update(payload.task);
      return payload;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  },
);

// Create the todo slice
const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(addTask.pending, state => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(deleteTask.pending, state => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const taskId = action.payload;
        state.tasks = state.tasks?.filter(task => task.id !== taskId);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

// Export the todo slice and its actions
export const todoActions = {
  ...todoSlice.actions,
  fetchTasks,
  addTask,
  deleteTask,
};

// Export the todo reducer
export default todoSlice.reducer;
