import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Task, TodoActionTypes, TodoState } from '../../types/todoSlice';
import {
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'firebaseConfig';

const initialState: TodoState = {
  shared_users: [],
  tasks: [],
  created_by: null,
  isLoading: false,
  isError: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  `todo/${TodoActionTypes.FETCH_TASK}`,
  async (userId: string, thunkAPI) => {
    try {
      const taskDocRef = doc(db, 'task_list', userId);
      const taskDocSnap = await getDoc(taskDocRef);

      if (taskDocSnap.exists()) {
        const taskList = taskDocSnap.data()?.tasks || [];
        return taskList;
      } else {
        return [];
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// Async thunk for adding a task to Firebase
export const addTask = createAsyncThunk(
  `todo/${TodoActionTypes.ADD_TASK}`,
  async (task: Task, thunkAPI) => {
    try {
      const taskDocRef = doc(db, 'task_list', task.userId);

      // Agregar una tarea a la matriz 'tasks' utilizando arrayUnion
      await updateDoc(taskDocRef, {
        tasks: arrayUnion({
          ...task,
        }),
      });

      return task;
    } catch (error) {
      // Utiliza `rejectWithValue` para manejar errores y devolver un valor rechazado con información sobre el error
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// Async thunk for deleting a task from Firebase
export const deleteTask = createAsyncThunk(
  `todo/${TodoActionTypes.DELETE_TASK}`,
  async (taskId: string, thunkAPI) => {
    try {
      const docRef = doc(db, 'task_list', taskId);
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
      const docRef = doc(db, 'task_list', payload.task.userId);
      const taskDocSnap = await getDoc(docRef);

      if (taskDocSnap.exists()) {
        const currentTasks = taskDocSnap.data()?.tasks || [];
        const updatedTasks = currentTasks.map((task: { id: string }) =>
          task.id === payload.task.id ? payload.task : task,
        );
        await updateDoc(docRef, {
          tasks: updatedTasks,
        });

        return payload.task;
      } else {
        return thunkAPI.rejectWithValue("Document doesn't exist");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
