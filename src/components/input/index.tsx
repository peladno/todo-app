import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { COLORS } from '../../constants/theme/colors';
import { InputProps } from '../../types/input';

export default function Input({
  placeholder,
  value,
  onChange,
  name,
  onFocus,
  onBlur,
  label,
  error,
  hasError,
  active,
  secureTextEntry,
}: InputProps) {
  const borderColor = active ? COLORS.primary : COLORS.grey;
  const borderWidth = active ? 2 : 1;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View>
        <View style={[styles.container, { borderColor, borderWidth }]}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={text => onChange({ text, name })}
            onFocus={() => onFocus({ name })}
            onBlur={() => onBlur({ name })}
            secureTextEntry={secureTextEntry}
          />
        </View>
        <View style={styles.errorContainer}>
          {hasError ? <Text style={styles.textError}>{error}</Text> : null}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: { paddingTop: 2 },
  container: {
    height: 50,
    // borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 10,
    padding: 8,
    marginBottom: 0,
    justifyContent: 'center',
  },
  label: {
    color: COLORS.greyLetter,
    marginBottom: 3,
    fontSize: 10,
  },
  errorContainer: {
    height: 18,
  },
  textError: {
    fontSize: 9,
    marginLeft: 10,
    marginTop: 3,
    color: COLORS.red,
    fontWeight: '700',
  },
});
