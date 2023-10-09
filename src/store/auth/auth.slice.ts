import auth from '@react-native-firebase/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthActionTypes, AuthState } from '../../types/auth';

const initialState: AuthState = {
  user: null,
  isAuth: false,
  isLoading: false,
  isError: false,
  error: null,
};

export const signIn = createAsyncThunk(
  `auth/${AuthActionTypes.SIGN_IN}`,
  async (payload: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await auth().signInWithEmailAndPassword(
        payload.email,
        payload.password,
      );
      return response.user;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const signUp = createAsyncThunk(
  `auth/${AuthActionTypes.SIGN_UP}`,
  async (payload: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        payload.email,
        payload.password,
      );

      return response.user;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const signOut = createAsyncThunk(
  `auth/${AuthActionTypes.SIGN_OUT}`,
  async (_, thunkAPI) => {
    try {
      return thunkAPI.fulfillWithValue(null);
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signUp.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.isError = false;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload;
        state.error = null;
        state.isError = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
        state.isAuth = false;
        state.user = null;
      })
      .addCase(signIn.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.isError = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload;
        state.error = null;
        state.isError = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
        state.isAuth = false;
        state.user = null;
      })
      .addCase(signOut.pending, state => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = null;
        state.error = null;
        state.isError = false;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
