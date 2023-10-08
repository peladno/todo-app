import { API_KEY_FIREBASE } from '@env';

export const FIREBASE_AUTH_BASE_URL =
  'https://identitytoolkit.googleapis.com/v1/accounts';

export const FIREBASE_API_AUTH_SIGNUP_URL = `:signUp?key=${API_KEY_FIREBASE}`;
export const FIREBASE_API_AUTH_SIGNIN_URL = `:signInWithPassword?key=${API_KEY_FIREBASE}`;
