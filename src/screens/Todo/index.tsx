import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Pressable,
} from 'react-native';

import { TodosProps } from '../../types/navigation';
import { COLORS } from '../../constants/theme/colors';
import { ModalComp } from '../../components';

function Todo({ navigation }: TodosProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const { width } = Dimensions.get('window');

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ModalComp modalVisible={modalVisible} closeModal={closeModal} />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  slider: {},
  container: { flex: 1 },
  floatingButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
    position: 'absolute',
    right: 30,
    height: 65,
    bottom: 60,
    backgroundColor: COLORS.primary,
    borderRadius: 100,
  },
  floatingButtonText: { color: COLORS.white, fontSize: 30, fontWeight: 'bold' },
});

export default Todo;
