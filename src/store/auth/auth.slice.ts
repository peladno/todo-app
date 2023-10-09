import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthActionTypes, AuthState } from '../../types/auth';
import {
  FIREBASE_API_AUTH_SIGNIN_URL,
  FIREBASE_API_AUTH_SIGNUP_URL,
  FIREBASE_AUTH_BASE_URL,
} from '../../constants/firebase';

const initialState: AuthState = {
  user: null,
  isAuth: false,
  isLoading: false,
  isError: false,
  error: null,
  errorAlertShown: false, // Nuevo campo para controlar las alertas de error
};

export const signIn = createAsyncThunk(
  `auth/${AuthActionTypes.SIGN_IN}`,
  async (payload: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await fetch(
        `${FIREBASE_AUTH_BASE_URL}${FIREBASE_API_AUTH_SIGNIN_URL}`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();
      if (data.error) {
        return thunkAPI.rejectWithValue(data?.error?.message);
      }
      return data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const signUp = createAsyncThunk(
  `auth/${AuthActionTypes.SIGN_UP}`,
  async (payload: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await fetch(
        `${FIREBASE_AUTH_BASE_URL}${FIREBASE_API_AUTH_SIGNUP_URL}`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json();
      if (data.error) {
        return thunkAPI.rejectWithValue(data?.error?.message);
      }
      return data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const signOut = createAsyncThunk(
  `auth/${AuthActionTypes.SIGN_OUT}`,
  async (_, thunkAPI) => {
    try {
      // const res = await fetch('hhtp', {
      //   method: 'POST',
      //   headers: {
      //     'Content-type': 'application/json',
      //   },
      //   body: JSON.stringify(payload),
      // });

      // const data = await res.json();
      // console.log(data);

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
        state.errorAlertShown = false;
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
        state.errorAlertShown = true; // Establecer errorAlertShown en true
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
        state.errorAlertShown = true; // Establecer errorAlertShown en true
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
