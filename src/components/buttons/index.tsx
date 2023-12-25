import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../constants/theme/colors';

type ButtonProps = {
  disabled?: boolean;
  handleButton: () => void;
  formValid?: boolean;
  width?: number;
  text: string;
};

export default function Button({
  handleButton,
  disabled,
  formValid,
  width,
  text,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={{ marginTop: 10 }}
      onPress={handleButton}
      disabled={disabled ?? !formValid}>
      <View
        style={{ ...styles.button, width: width }}
        // colors={
        //   isFormValid
        //     ? [`${COLORS.primary}`, `${COLORS.pink}`]
        //     : [`${COLORS.greyLetter}`, `${COLORS.greyLetter}`]
        // }
      >
        <Text style={styles.textButton}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    width: '100%',
    backgroundColor: COLORS.primary,
  },
  textButton: { color: COLORS.white, fontWeight: 'bold' },
});
