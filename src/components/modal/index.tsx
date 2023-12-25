import { View, Modal, StyleSheet } from 'react-native';
import React, { ReactNode } from 'react';
import { COLORS } from '../../constants/theme/colors';

type ModalProps = {
  modalVisible: boolean;
  closeModal: () => void;
  children: ReactNode;
};

function ModalComp({ modalVisible, closeModal, children }: ModalProps) {
  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.transparentBackground,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
});

export default ModalComp;
