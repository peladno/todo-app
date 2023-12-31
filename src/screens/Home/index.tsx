import { View, Text, StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HOMEIMG from '../../assets/images/todoimg.svg';
import { COLORS } from '../../constants/theme/colors';

export default function Home() {
  const insets = useSafeAreaInsets();
  return (
    <>
      <StatusBar backgroundColor={'#fff'} />
      <View style={[styles.homeContainer, { paddingTop: insets.top }]}>
        <View style={styles.imgContainer}>
          <View
            style={{
              backgroundColor: COLORS.white,
              flex: 1,
              borderBottomLeftRadius: 70,
              justifyContent: 'center',
              width: '100%',
              alignItems: 'center',
            }}>
            <HOMEIMG width={300} height={300} />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <Text style={{ color: COLORS.white }}>
            There is a lot of things happening in your life
          </Text>
          <Text style={{ color: COLORS.white }}>
            Add all the events or task do you have daily and never forget
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: COLORS.white,
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    width: '100%',
    borderTopRightRadius: 70,
  },
  imgContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
