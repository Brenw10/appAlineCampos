import React from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function DefaultModal({ children, isModalVisible, setIsModalVisible, image, align, margin }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
    >
      <View style={{ ...styles.container, justifyContent: align ? align : 'center' }}>
        <View style={{ ...styles.modalView, margin: margin >= 0 ? margin : 30 }}>
          <ScrollView>
            {image && <Image source={image} style={styles.image} resizeMode='cover' />}

            <View style={styles.contentView}>
              {children}
            </View>
          </ScrollView>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsModalVisible(false)}>
            <Icon name='close' color='grey' size={22} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalView: {
    backgroundColor: "white",
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
    padding: 25,
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