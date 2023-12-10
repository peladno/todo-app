import { SharedValue } from 'react-native-reanimated';
import { Product } from './product';

export interface CardProps extends Product {
  index?: number;
  x?: SharedValue<number>;
  onSelected: (product: Product) => void;
}
