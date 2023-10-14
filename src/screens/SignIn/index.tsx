import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import { COLORS } from '../../constants/theme/colors';
import LinearGradient from 'react-native-linear-gradient';
import {
  FormState,
  onBlurProps,
  onChangeProps,
  onfocusProps,
} from '../../types/input';
import { SIGNUP } from '../../navigation/routeNames';
import { useForm } from '../../hooks/useForm';
import { Header } from '../../components/header';
import { Input } from '../../components/input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthState } from '../../types/auth';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { signIn } from '../../store/auth/auth.slice';

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
  // const auth = useAppSelector<AuthState>(state => state.auth);

  const handleSignIn = () => {
    const formData = {
      email: formState.email.value,
      password: formState.password.value,
    };
    dispatch(signIn(formData));
  };

  //Error or Sign Up, when is a error on create user two alerts came, one for this componen and other
  //from sign up, I manege this error en index of the navigation for the moment

  // useEffect(() => {
  //   console.log('signIN', auth);
  //   if (auth.isError) {
  //     Alert.alert('Error Sign in', `${auth?.error}`);
  //   }
  // }, [auth]);

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
      <LinearGradient
        colors={[`${COLORS.primary}`, `${'#7a77e3'}`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 0 }}
        style={{
          ...styles.container,
          paddingTop: insets.top,
        }}>
        <Header
          title="Don't have an account?"
          buttonTitle="Get started"
          screenName={SIGNUP}
        />
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'flex-end',
          }}>
          <View style={styles.formContainer}>
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

            <TouchableOpacity
              style={{ marginTop: 10 }}
              onPress={handleSignIn}
              disabled={!isFormValid}>
              <LinearGradient
                style={styles.button}
                // colors={
                //   isFormValid
                //     ? [`${COLORS.primary}`, `${COLORS.pink}`]
                //     : [`${COLORS.greyLetter}`, `${COLORS.greyLetter}`]
                // }
                colors={[`${COLORS.primary}`, `${COLORS.pink}`]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <Text style={styles.textButton}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
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
});

export default SignIn;
