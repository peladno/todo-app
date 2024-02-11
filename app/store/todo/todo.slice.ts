import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NewTask, TodoActionTypes, TodoState } from '../../types/todoSlice';
import supabase from '@/app/utils/supabase';

const initialState: TodoState = {
  tasks: [],
  isLoading: false,
  isError: false,
  error: null,
};

// Async thunk for fetching all from supabase
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
      )
      .order('created_at', { ascending: true });

    if (tasksError) {
      return thunkAPI.rejectWithValue(tasksError);
    }

    return tasks;
  },
);

// Async thunk for adding a task to supabase
export const addTask = createAsyncThunk(
  `todo/${TodoActionTypes.ADD_TASK}`,
  async (
    { newTask, userId }: { newTask: NewTask; userId: string },
    thunkAPI,
  ) => {
    const { data: sharedLists, error: sharedListsError } = await supabase
      .from('shared_list')
      .select('id')
      .eq('owner_id', userId);

    if (sharedListsError) {
      return thunkAPI.rejectWithValue(sharedListsError);
    }
    // if (!sharedLists.length) {
    //   return thunkAPI.rejectWithValue('User has no shared lists');
    // }
    const task_list_id = sharedLists[0].id;

    const { data: addedTask, error } = await supabase
      .from('tasks')
      .insert({ ...newTask, task_list_id })
      .select();

    if (error) {
      return thunkAPI.rejectWithValue(error);
    }

    return addedTask[0];
  },
);

// Async thunk for deleting a task from suoabase
export const deleteTask = createAsyncThunk(
  `todo/${TodoActionTypes.DELETE_TASK}`,
  async (taskId: string, thunkAPI) => {
    const { data, error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);
    if (error) {
      return thunkAPI.rejectWithValue(error);
    }
    return data;
  },
);

// Async thunk for updating a task from supabase
export const updateTask = createAsyncThunk(
  `todo/${TodoActionTypes.EDIT_TASK}`,
  async (
    { taskId, newStatus }: { taskId: string; newStatus: string },
    thunkAPI,
  ) => {
    const { data, error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', taskId)
      .select();

    if (error) {
      return thunkAPI.rejectWithValue(error);
    }
    return data;
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
      })
      .addCase(updateTask.pending, state => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedTask = action.payload[0];
        const taskIndex = state.tasks.findIndex(
          task => task.id === updatedTask.id,
        );
        if (taskIndex !== -1) {
          state.tasks[taskIndex] = updatedTask;
        }
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
