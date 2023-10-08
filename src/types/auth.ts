export enum AuthActionTypes {
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  SIGN_OUT = 'SIGN_OUT',
  RESTORE_TOKEN = 'RESTORE_TOKEN',
}

export type AuthUser = {
  token: string;
} | null;

export type AuthUserCredentials = {
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
};

export type AuthState = {
  isAuth: boolean;
  user: AuthUserCredentials | null;
  isLoading: boolean;
  error: string | null | unknown;
  isError: boolean;
  errorAlertShown: boolean;
};
