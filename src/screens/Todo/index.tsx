import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { PRODUCTS } from '../../constants/data';
import { Card } from '../../components';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { DETAIL } from '../../navigation/routeNames';
import { TodosProps } from '../../types/navigation';
import { Product } from '../../types/product';

function Todo({ navigation }: TodosProps) {
  const { width } = Dimensions.get('window');
  const translateX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { x } }) => {
      translateX.value = x;
    },
  });

  const onSelected = (product: Product) => {
    navigation.navigate(DETAIL, product);
  };
  return (
    <View style={styles.container}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast">
        <View style={styles.slider}>
          <Animated.ScrollView
            onScroll={onScroll}
            snapToInterval={width}
            decelerationRate="fast"
            horizontal
            showsHorizontalScrollIndicator={false}>
            {PRODUCTS.map((products, index) => (
              <Card
                {...products}
                key={products.id}
                index={index}
                x={translateX}
                onSelected={onSelected}
              />
            ))}
          </Animated.ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({ slider: {}, container: { flex: 1 } });

export default Todo;
