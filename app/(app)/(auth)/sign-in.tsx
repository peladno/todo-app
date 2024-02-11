import { Button, Header, Input } from '@/app/components';
import { SIGNUP } from '@/app/constants/routesNames/routeNames';
import { COLORS } from '@/app/constants/theme/colors';
import { useAppDispatch } from '@/app/hooks/redux';
import { useForm } from '@/app/hooks/useForm';
import { signIn } from '@/app/store/auth/auth.slice';
import {
  FormState,
  onBlurProps,
  onChangeProps,
  onfocusProps,
} from '@/app/types/input';
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const initialState: FormState = {
  email: {
    active: false,
    error: '',
    hasError: false,
    isFormValid: false,
    name: 'email',
    value: '',
  },
  password: {
    active: false,
    error: '',
    hasError: false,
    isFormValid: false,
    name: 'password',
    value: '',
  },
};
function SignIn() {
  const { formState, onChange, isFormValid, onFocus, onBlur } =
    useForm(initialState);
  const dispatch = useAppDispatch();

  const handleSignIn = () => {
    const formData = {
      email: formState.email.value,
      password: formState.password.value,
    };
    dispatch(signIn(formData));
  };

  const onBlurHandler = ({ name }: onBlurProps) => {
    onBlur(name);
  };

  const onFocusHandler = ({ name }: onfocusProps) => {
    onFocus(name);
  };

  const onChangeHandle = ({ name, text }: onChangeProps) => {
    onChange({ text, name });
  };
  const insets = useSafeAreaInsets();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          ...styles.container,
          paddingTop: insets.top,
        }}>
        <Header
          title="Don't have an account?"
          buttonTitle="Register"
          screenName={SIGNUP}
        />
        <View style={styles.innerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.signinTitle}>Sign In</Text>
            <Input
              active={formState.email.active}
              error={formState.email.error}
              hasError={formState.email.hasError}
              label="Email address"
              name={formState.email.name}
              onBlur={() => onBlurHandler({ name: formState.email.name })}
              onChange={onChangeHandle}
              onFocus={() => onFocusHandler({ name: formState.email.name })}
              placeholder="example@email.com"
              value={formState.email.value}
            />
            <Input
              active={formState.password.active}
              error={formState.password.error}
              hasError={formState.password.hasError}
              label="Password"
              name={formState.password.name}
              onBlur={() => onBlurHandler({ name: formState.password.name })}
              onChange={onChangeHandle}
              onFocus={() => onFocusHandler({ name: formState.password.name })}
              placeholder="***************"
              value={formState.password.value}
              secureTextEntry
            />
            <Button
              handleButton={handleSignIn}
              formValid={isFormValid}
              text="Sign In"
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: COLORS.primary,
    flex: 1,
    // justifyContent: 'flex-end',
  },
  button: {
    alignItems: 'center',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    width: '100%',
    backgroundColor: COLORS.primary,
  },
  textButton: { color: COLORS.white, fontWeight: 'bold' },
  formContainer: {
    // flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '80%',
    padding: 20,
  },
  title: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 5,
  },
  subtitle: { color: COLORS.white },
  innerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  titleContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  signinTitle: {
    color: COLORS.primary,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SignIn;
