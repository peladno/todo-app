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

import LinearGradient from 'react-native-linear-gradient';
import {
  FormState,
  onBlurProps,
  onChangeProps,
  onfocusProps,
} from '../../types/input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm } from '../../hooks/useForm';
import { Header } from '../../components/header';
import { Input } from '../../components/input';
import { COLORS } from '../../constants/theme/colors';
import { SIGNIN } from '../../navigation/routeNames';
import { signUp } from '../../store/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { AuthState } from '../../types/auth';

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
function SignUp() {
  const { formState, onChange, isFormValid, onFocus, onBlur } =
    useForm(initialState);

  const dispatch = useAppDispatch();
  const auth = useAppSelector<AuthState>(state => state.auth);

  const handleSignUp = () => {
    const formData = {
      email: formState.email.value,
      password: formState.password.value,
    };
    dispatch(signUp(formData));
  };

  useEffect(() => {
    if (auth.isError && !auth.errorAlertShown) {
      Alert.alert('Error', `${auth?.error}`);
    }
  }, [auth]);

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
          title="Already have an account?"
          buttonTitle="Sign in"
          screenName={SIGNIN}
          goBack={false}
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
              onPress={handleSignUp}
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
    backgroundColor: COLORS.primary,
    flex: 1,
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
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '80%',
    padding: 20,
  },
});

export default SignUp;
