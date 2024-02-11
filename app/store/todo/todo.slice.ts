import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Task, TodoActionTypes, TodoState } from '../../types/todoSlice';
import supabase from '@/app/utils/supabase';

const initialState: TodoState = {
  tasks: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  `todo/${TodoActionTypes.FETCH_TASK}`,
  async (userId: string, thunkAPI) => {
    const { data: sharedLists, error: sharedListsError } = await supabase
      .from('shared_list')
      .select('id')
      .eq('owner_id', userId);

    if (sharedListsError) {
      return thunkAPI.rejectWithValue(sharedListsError);
    }

    const { data: tasks, error: tasksError } = await supabase
      .from('tasks')
      .select('*')
      .in(
        'task_list_id',
        sharedLists.map(list => list.id),
      );

    if (tasksError) {
      return thunkAPI.rejectWithValue(tasksError);
    }

    return tasks;
  },
);

// Async thunk for adding a task to Firebase
export const addTask = createAsyncThunk(
  `todo/${TodoActionTypes.ADD_TASK}`,
  async (task: Task, thunkAPI) => {
    // try {
    //   const taskDocRef = doc(db, 'task_list', task.userId);
    //   await updateDoc(taskDocRef, {
    //     tasks: arrayUnion({
    //       ...task,
    //     }),
    //   });
    //   return task;
    // } catch (error) {
    //   return thunkAPI.rejectWithValue(error);
    // }
  },
);

// Async thunk for deleting a task from Firebase
export const deleteTask = createAsyncThunk(
  `todo/${TodoActionTypes.DELETE_TASK}`,
  async (taskId: string, thunkAPI) => {
    // try {
    //   const docRef = doc(db, 'task_list', taskId);
    //   deleteDoc(docRef);
    //   return taskId;
    // } catch (error) {
    //   thunkAPI.rejectWithValue(error);
    // }
  },
);

// Async thunk for updating a task from Firebase
export const updateTask = createAsyncThunk(
  `todo/${TodoActionTypes.EDIT_TASK}`,
  async (payload: { taskId: string; status: string }, thunkAPI) => {
    const { data: updatedTask, error } = await supabase
      .from('task')
      .update({ status: payload.status })
      .eq('id', payload.taskId);

    if (error) {
      return thunkAPI.rejectWithValue(error);
    }

    return updatedTask;
    // try {
    //   const docRef = doc(db, 'task_list', payload.task.userId);
    //   const taskDocSnap = await getDoc(docRef);
    //   if (taskDocSnap.exists()) {
    //     const currentTasks = taskDocSnap.data()?.tasks || [];
    //     const updatedTasks = currentTasks.map((task: { id: string }) =>
    //       task.id === payload.task.id ? payload.task : task,
    //     );
    //     await updateDoc(docRef, {
    //       tasks: updatedTasks,
    //     });
    //     return payload.task;
    //   } else {
    //     return thunkAPI.rejectWithValue("Document doesn't exist");
    //   }
    // } catch (error) {
    //   return thunkAPI.rejectWithValue(error);
    // }
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
