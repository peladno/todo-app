import { AuthUser } from '@supabase/supabase-js';

export type User = {
  email: string | undefined;
  id: string | undefined;
  token: string | undefined;
  expires_at: number | undefined;
  expires_in: number | undefined;
};

export enum AuthActionTypes {
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  SIGN_OUT = 'SIGN_OUT',
  RESTORE_TOKEN = 'RESTORE_TOKEN',
  INITIALIZE = 'INITIALIZE',
}

export type AuthState = {
  user: AuthUser | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null | unknown;
  isError: boolean;
};
