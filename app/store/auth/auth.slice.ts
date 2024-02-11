import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthActionTypes, AuthState } from '../../types/authSlice';
import supabase from '@/app/utils/supabase';

// Define the initial state for the authentication slice
const initialState: AuthState = {
  user: null,
  isAuth: false,
  isLoading: false,
  isError: false,
  error: null,
};

// Define an async thunk for signing in
export const signIn = createAsyncThunk(
  `auth/${AuthActionTypes.SIGN_IN}`,
  async (payload: { email: string; password: string }, thunkAPI) => {
    const { data, error } = await supabase.auth.signInWithPassword(payload);

    if (error) {
      return thunkAPI.rejectWithValue(error);
    }
    return data;
  },
);
// Define an async thunk for signing up
export const signUp = createAsyncThunk(
  `auth/${AuthActionTypes.SIGN_UP}`,
  async (payload: { email: string; password: string }, thunkAPI) => {
    const { data, error } = await supabase.auth.signUp(payload);
    if (error) {
      return thunkAPI.rejectWithValue(error);
    }
    return data;
  },
);
// Define an async thunk for signing out
export const signOut = createAsyncThunk(
  `auth/${AuthActionTypes.SIGN_OUT}`,
  async (_, thunkAPI) => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// Create the authentication slice using createSlice from Redux Toolkit
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError: state => {
      state.error = null;
      state.isError = false;
    },
  },
  extraReducers: builder => {
    builder
      // Handle the pending state for the signUp async thunk
      .addCase(signUp.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.isError = false;
      })
      // Handle the fulfilled state for the signUp async thunk
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload.user;
        state.error = null;
        state.isError = false;
      })
      // Handle the rejected state for the signUp async thunk
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
        state.isAuth = false;
        state.user = null;
      })
      // Handle the pending state for the signIn async thunk
      .addCase(signIn.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.isError = false;
      })
      // Handle the fulfilled state for the signIn async thunk
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload.user;
        state.error = null;
        state.isError = false;
      })
      // Handle the rejected state for the signIn async thunk
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
        state.isAuth = false;
        state.user = null;
      })
      // Handle the pending state for the signOut async thunk
      .addCase(signOut.pending, state => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = null;
        state.error = null;
        state.isError = false;
      })
      // Handle the rejected state for the signOut async thunk
      .addCase(signOut.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
        state.isAuth = false;
        state.user = null;
      });
  },
});

export const { resetError } = authSlice.actions;

// Export the authentication reducer from the authentication slice
export default authSlice.reducer;
