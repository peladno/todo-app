import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../constants/theme/colors';

type ButtonProps = {
  disabled: boolean;
  handleButton: () => void;
};

export default function Button({ handleButton, disabled }: ButtonProps) {
  return (
    <TouchableOpacity
      style={{ marginTop: 10 }}
      onPress={handleButton}
      disabled={!disabled}>
      <View
        style={styles.button}
        // colors={
        //   isFormValid
        //     ? [`${COLORS.primary}`, `${COLORS.pink}`]
        //     : [`${COLORS.greyLetter}`, `${COLORS.greyLetter}`]
        // }
      >
        <Text style={styles.textButton}>Sign In</Text>
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
