export enum AuthActionTypes {
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  SIGN_OUT = 'SIGN_OUT',
  RESTORE_TOKEN = 'RESTORE_TOKEN',
}

export type AuthUser = {
  token: string;
} | null;

export type AuthState = {
  isAuth: boolean;
  user:
    | {
        token: string;
      }
    | null
    | unknown;
  isLoading: boolean;
  error: string | null | unknown;
  isError: boolean;
};
