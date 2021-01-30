import React from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function DefaultModal({ children, isModalVisible, setIsModalVisible, image }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <ScrollView>
            {image && <Image source={image} style={styles.image} resizeMode='stretch' />}

            <View style={styles.contentView}>
              {children}
            </View>
          </ScrollView>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsModalVisible(false)}>
            <Icon name='close' color='grey' size={18} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: "white",
    margin: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentView: {
    padding: 20,
    paddingTop: 0,
  },
  image: {
    width: '100%',
    height: 200,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    flexDirection: 'row',
  },
});

export default DefaultModal;