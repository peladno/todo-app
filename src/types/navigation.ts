import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Todos: undefined;
  Detail: undefined;
};

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
};

export type TodosProps = NativeStackScreenProps<RootStackParamList, 'Todos'>;
export type DetailProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export type SignInProps = NativeStackScreenProps<AuthStackParamList, 'SignIn'>;
export type SignUpProps = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;
export type HomeProps = NativeStackScreenProps<AuthStackParamList, 'Home'>;
