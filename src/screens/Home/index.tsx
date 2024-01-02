import { View, Text, StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HOMEIMG from '../../assets/images/todoimg.svg';
import { COLORS } from '../../constants/theme/colors';
import { Button } from '../../components';
import { HomeProps } from '../../types/navigation';
import { SIGNIN, SIGNUP } from '../../navigation/routeNames';

export default function Home({ navigation }: HomeProps) {
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
          <View style={{ width: '80%' }}>
            <Text
              style={{
                color: COLORS.white,
                fontSize: 18,
                textAlign: 'center',
                fontWeight: '900',
              }}>
              There is a lot of things happening in your life
            </Text>
            <Text
              style={{
                color: COLORS.white,
                textAlign: 'center',
                marginTop: 20,
                marginBottom: 20,
                fontSize: 13,
              }}>
              Add all the events or tasks and never forget them.
            </Text>
            <Button
              handleButton={() => {
                navigation.navigate(SIGNIN);
              }}
              text="Sign In"
              color={COLORS.white}
              textColor={COLORS.primary}
              disabled={false}
            />
            <Button
              handleButton={() => {
                navigation.navigate(SIGNUP);
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
});
