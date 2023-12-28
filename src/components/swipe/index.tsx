import React, { ReactNode, useRef } from 'react';
import { Animated, I18nManager, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

type SwipeCompProps = {
  children: ReactNode;
};

export default function SwipeComp({ children }: SwipeCompProps) {
  const swipeableRowRef = useRef<Swipeable>(null);

  const renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation<number>,
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
      extrapolateRight: 'clamp',
    });

    const pressHandler = () => {
      swipeableRowRef.current?.close();
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderLeftAction = (
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation<number>,
  ) => {
    const trans = Animated.multiply(
      progress.interpolate({
        inputRange: [0, 1],
        outputRange: [-x, 0],
        extrapolate: 'clamp',
      }),
      I18nManager.isRTL ? -1 : 1,
    );

    const pressHandler = () => {
      swipeableRowRef.current?.close();
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.leftAction, { backgroundColor: color }]}
          onPress={pressHandler}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
  ) => (
    <View
      style={{
        width: 100,
      }}>
      {renderRightAction('Delete', '#dd2c00', 100, progress)}
    </View>
  );

  const renderLeftActions = (
    progress: Animated.AnimatedInterpolation<number>,
  ) => (
    <View
      style={{
        width: 100,
      }}>
      {renderLeftAction('complete', '#497AFC', 100, progress)}
    </View>
  );

  return (
    <Swipeable
      containerStyle={{
        borderRadius: 10,
      }}
      ref={swipeableRowRef}
      friction={2}
      rightThreshold={40}
      leftThreshold={40}
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      onSwipeableOpen={direction => {
        console.log(`Opening swipeable from the ${direction}`);
      }}
      onSwipeableClose={direction => {
        console.log(`Closing swipeable to the ${direction}`);
      }}>
      {children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
