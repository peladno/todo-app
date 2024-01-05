import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Task, TodoActionTypes, TodoState } from '../../types/todoSlice';
import {
  addDoc,
  collection,
  db,
  getDocs,
  orderBy,
  query,
  doc,
  setDoc,
  deleteDoc,
} from '../../../firebaseConfig';

const initialState: TodoState = {
  tasks: [],
  isLoading: false,
  isError: false,
  error: null,
};

// Async thunk for fetching tasks from Firebase
export const fetchTasks = createAsyncThunk(
  `todo/${TodoActionTypes.FETCH_TASK}`,
  async (_, thunkAPI) => {
    try {
      const tasksAll = query(
        collection(db, 'tasks'),
        orderBy('creationDate', 'asc'),
      );

      const tasks = await getDocs(tasksAll);
      return tasks.docs.map(docu => ({ db_id: docu.id, ...docu.data() }));
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  },
);

// Async thunk for adding a task to Firebase
export const addTask = createAsyncThunk(
  `todo/${TodoActionTypes.ADD_TASK}`,
  async (task: Task, thunkAPI) => {
    try {
      const res = await addDoc(collection(db, 'tasks'), task);
      console.log(res);
      return task;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  },
);

// Async thunk for deleting a task from Firebase
export const deleteTask = createAsyncThunk(
  `todo/${TodoActionTypes.DELETE_TASK}`,
  async (taskId: string, thunkAPI) => {
    try {
      //await firestore().collection('tasks').doc(taskId).delete();
      const docRef = doc(db, 'tasks', taskId);
      deleteDoc(docRef);
      return taskId;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  },
);

// Async thunk for updating a task from Firebase
export const updateTask = createAsyncThunk(
  `todo/${TodoActionTypes.EDIT_TASK}`,
  async (payload: { task: Task; id: string }, thunkAPI) => {
    try {
      const docRef = doc(db, 'tasks', payload.id);
      await setDoc(docRef, payload.task);
      return payload.task;
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
        state.tasks = action.payload as Task[];
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
        state.tasks.push(action.payload as Task);
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
      })
      .addCase(updateTask.pending, state => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedTask = action.payload as Task;
        state.tasks = state.tasks.map(task =>
          task.id === updatedTask.id ? updatedTask : task,
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

// Export the todo reducer
export default todoSlice.reducer;
