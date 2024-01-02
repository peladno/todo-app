import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../constants/theme/colors';

type ButtonProps = {
  disabled?: boolean;
  handleButton: () => void;
  formValid?: boolean;
  width?: number;
  text: string;
  color?: string;
  textColor?: string;
  outline?: boolean;
};

export default function Button({
  handleButton,
  disabled,
  formValid,
  width,
  text,
  color,
  textColor,
  outline,
}: ButtonProps) {
  const colorbg = color ? color : COLORS.primary;
  const colortxt = textColor ? textColor : COLORS.white;
  const border = outline ? 2 : 0;
  const borderColor = outline ? colortxt : 'transparent';
  return (
    <TouchableOpacity
      style={{ marginTop: 10 }}
      onPress={handleButton}
      disabled={disabled ?? !formValid}>
      <View
        style={{
          ...styles.button,
          width: width,
          backgroundColor: colorbg,
          borderWidth: border,
          borderColor: borderColor,
        }}
        // colors={
        //   isFormValid
        //     ? [`${COLORS.primary}`, `${COLORS.pink}`]
        //     : [`${COLORS.greyLetter}`, `${COLORS.greyLetter}`]
        // }
      >
        <Text style={[styles.textButton, { color: colortxt }]}>{text}</Text>
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
  },
  textButton: { color: COLORS.white, fontWeight: 'bold' },
});
