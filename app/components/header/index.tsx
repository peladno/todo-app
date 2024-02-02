import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/theme/colors';
import { AuthStackParamList } from '../../types/navigation';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

type HeaderProps = {
  title: string;
  buttonTitle: string;
  screenName: keyof AuthStackParamList;
  goBack?: boolean;
};

export default function Header({
  title,
  buttonTitle,
  screenName,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            router.back();
          }}>
          <Ionicons name="arrow-back" color={COLORS.primary} size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push(screenName);
          }}>
          <Text style={styles.buttonTitle}>{buttonTitle}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { color: COLORS.white, fontSize: 12 },
  button: {
    backgroundColor: 'rgba(255,255,255, 0.15)',
    borderRadius: 8,
    width: 90,
    marginLeft: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonTitle: { color: COLORS.white, fontWeight: '600', fontSize: 12 },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginTop: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  backButton: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 9999,
  },
});
