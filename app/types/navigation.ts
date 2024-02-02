import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Todos: undefined;
  Detail: undefined;
};

export type AuthStackParamList = {
  'sign-in': undefined;
  'sign-up': undefined;
  home: undefined;
};

export type TabParamList = {
  MainStack: undefined;
  CreateTask: undefined;
  Calendar: undefined;
  Settings: undefined;
};

export type TodosProps = NativeStackScreenProps<RootStackParamList, 'Todos'>;
export type DetailProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export type SignInProps = NativeStackScreenProps<AuthStackParamList, 'sign-in'>;
export type SignUpProps = NativeStackScreenProps<AuthStackParamList, 'sign-up'>;
export type HomeProps = NativeStackScreenProps<AuthStackParamList, 'home'>;

export type CreateTaskProps = NativeStackScreenProps<
  TabParamList,
  'CreateTask'
>;
