import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export enum AuthActionTypes {
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  SIGN_OUT = 'SIGN_OUT',
  RESTORE_TOKEN = 'RESTORE_TOKEN',
}

export type AuthUser = FirebaseAuthTypes.User | null;

export type AuthState = {
  isAuth: boolean;
  user: FirebaseAuthTypes.User | null;
  isLoading: boolean;
  error: string | null | unknown;
  isError: boolean;
};
