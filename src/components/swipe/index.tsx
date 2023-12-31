import React, { ReactNode, useRef } from 'react';
import { Animated, I18nManager, StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { COLORS } from '../../constants/theme/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

type SwipeCompProps = {
  children: ReactNode;
  completeIt: () => void;
  deleteIt: () => void;
};

export default function SwipeComp({
  children,
  deleteIt,
  completeIt,
}: SwipeCompProps) {
  const swipeableRowRef = useRef<Swipeable>(null);

  const renderRightAction = (
    icon: ReactNode,
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
      deleteIt();
      swipeableRowRef.current?.close();
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}>
          <View style={styles.actionText}>{icon}</View>
        </RectButton>
      </Animated.View>
    );
  };

  const renderLeftAction = (
    icon: ReactNode,
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
      completeIt();
      swipeableRowRef.current?.close();
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.leftAction, { backgroundColor: color }]}
          onPress={pressHandler}>
          <View style={styles.actionText}>{icon}</View>
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
      {renderRightAction(
        <FontAwesomeIcon icon={faTrash} color="white" size={25} />,
        COLORS.red,
        100,
        progress,
      )}
    </View>
  );

  const renderLeftActions = (
    progress: Animated.AnimatedInterpolation<number>,
  ) => (
    <View
      style={{
        width: 100,
      }}>
      {renderLeftAction(
        <FontAwesomeIcon icon={faCheck} color="white" size={25} />,
        COLORS.green,
        100,
        progress,
      )}
    </View>
  );

  return (
    <Swipeable
      containerStyle={{
        borderRadius: 15,
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
    justifyContent: 'center',
    alignItems: 'center',
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
