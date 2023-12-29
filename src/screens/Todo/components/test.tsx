import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, View, I18nManager } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const AppleStyleSwipeableRow = ({ children }) => {
  const swipeableRowRef = useRef(null);
  const renderRightAction = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
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

  const renderRightActions = progress => (
    <View
      style={{
        width: 100,
      }}>
      {renderRightAction('More', '#dd2c00', 100, progress)}
    </View>
  );

  return (
    <Swipeable
      ref={swipeableRowRef}
      friction={2}
      rightThreshold={40}
      renderRightActions={renderRightActions}
      onSwipeableOpen={direction => {
        console.log(`Opening swipeable from the ${direction}`);
      }}
      onSwipeableClose={direction => {
        console.log(`Closing swipeable to the ${direction}`);
      }}>
      {children}
    </Swipeable>
  );
};

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

export default AppleStyleSwipeableRow;