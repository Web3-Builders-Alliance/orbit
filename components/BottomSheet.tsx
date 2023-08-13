import React, { ReactNode } from 'react';
import { Modal, View, StyleSheet } from 'react-native';

interface BottomSheetProps {
  visible: boolean;
  children: ReactNode;
  onClose: () => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ visible, children, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.bottomSheet}>{children}</View>
      </View>
    </Modal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    bottomSheet: {
      backgroundColor: 'white',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      padding: 16,
      maxHeight: 500, // Adjust this value as needed
    },
  });