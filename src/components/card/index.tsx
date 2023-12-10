import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { CardProps } from '../../types/card';

const { width } = Dimensions.get('window');
const CARD_HEIGHT = width * 0.95;
const IMG_SIZE = 160;

export default function Card({
  title,
  description,
  img,
  index,
  x,
  onSelected,
  price,
  id,
}: CardProps) {
  const style = useAnimatedStyle(() => {
    const animatedStyles: any = {};
    if (x && index !== undefined) {
      const inputRange = [
        width * (index - 1),
        width * index,
        width * (index + 1),
      ];
      const translateX = interpolate(x.value, inputRange, [
        width / 2,
        0,
        width / 2,
      ]);
      const scale = interpolate(x.value, inputRange, [0.5, 1, 0.5]);
      animatedStyles.transform = [{ translateX: translateX }, { scale }];
    }
    return animatedStyles;
  });

  const product = {
    title,
    description,
    img,
    price,
    id,
  };

  return (
    <Animated.View style={[styles.container, style]}>
      <TouchableOpacity onPress={() => onSelected(product)}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Image
              style={styles.img}
              source={{ uri: img }}
              resizeMode="contain"
            />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 320,
    flex: 1,
    margin: 25,
    padding: 15,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  container: {
    width: width,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: { textAlign: 'center', fontSize: 15 },
  img: {
    width: IMG_SIZE,
    height: IMG_SIZE,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
