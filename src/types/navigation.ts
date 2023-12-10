import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Product } from './product';

export type RootStackParamList = {
  Todos: undefined;
  Detail: Product;
};

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type TodosProps = NativeStackScreenProps<RootStackParamList, 'Todos'>;
export type DetailProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;
export type SignInProps = NativeStackScreenProps<AuthStackParamList, 'SignIn'>;
export type SignUpProps = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;
