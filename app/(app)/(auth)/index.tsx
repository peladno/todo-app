import { View, Text, StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HOMEIMG from '../../../assets/images/todoimg.svg';
import { router } from 'expo-router';
import { Button } from '@/app/components';
import { COLORS } from '@/app/constants/theme/colors';
import { SIGNIN, SIGNUP } from '@/app/constants/routesNames/routeNames';

export default function () {
  const insets = useSafeAreaInsets();
  return (
    <>
      <StatusBar backgroundColor={'#fff'} />
      <View style={[styles.homeContainer, { paddingTop: insets.top }]}>
        <View style={styles.imgContainer}>
          <View style={styles.innerImgContainer}>
            <HOMEIMG width={300} height={300} />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.innerButtonContainer}>
            <Text style={styles.title}>
              There is a lot of things happening in your life
            </Text>
            <Text style={styles.subTitle}>
              Add all the events or tasks and never forget them.
            </Text>
            <Button
              handleButton={() => {
                router.push(`/${SIGNIN}`);
              }}
              text="Sign In"
              color={COLORS.white}
              textColor={COLORS.primary}
              disabled={false}
            />
            <Button
              handleButton={() => {
                router.push(`/${SIGNUP}`);
              }}
              text="Register"
              color={'transparent'}
              textColor={COLORS.white}
              disabled={false}
              outline
            />
          </View>
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
    alignItems: 'center',
  },
  innerButtonContainer: {
    width: '80%',
  },
  imgContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerImgContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    borderBottomLeftRadius: 70,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '900',
  },
  subTitle: {
    color: COLORS.white,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 13,
  },
});
