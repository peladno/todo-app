import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthActionTypes, AuthState } from '../../types/authSlice';
// import firestore from '@react-native-firebase/firestore';
import { auth, db } from '../../../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

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
    try {
      // Attempt to sign in using Firebase authentication
      const response = await signInWithEmailAndPassword(
        auth,
        payload.email,
        payload.password,
      );
      return response.user;
    } catch (error: unknown) {
      // If there's an error, reject the thunk with the error value
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// Define an async thunk for signing up
export const signUp = createAsyncThunk(
  `auth/${AuthActionTypes.SIGN_UP}`,
  async (payload: { email: string; password: string }, thunkAPI) => {
    try {
      // Attempt to create a new user using Firebase authentication
      const response = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password,
      );
      // Add the user to the Firestore collection
      if (response.user) {
        await addDoc(collection(db, 'users'), {
          uid: response.user.uid,
          email: response.user.email,
        });

        await setDoc(doc(db, 'task_list', response.user.uid), {
          shared_users: [],
          tasks: {},
          created_by: response.user.uid,
        });
      }

      return response.user;
    } catch (error: unknown) {
      // If there's an error, log it and reject the thunk with the error value
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// Define an async thunk for signing out
export const signOut = createAsyncThunk(
  `auth/${AuthActionTypes.SIGN_OUT}`,
  async (_, thunkAPI) => {
    try {
      // Fulfill the thunk with a null value to indicate successful sign out
      return thunkAPI.fulfillWithValue(null);
    } catch (error: unknown) {
      // If there's an error, reject the thunk with the error value
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// Create the authentication slice using createSlice from Redux Toolkit
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
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
        state.user = action.payload;
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
        state.user = action.payload;
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
      });
  },
});

// Export the authentication reducer from the authentication slice
export default authSlice.reducer;
