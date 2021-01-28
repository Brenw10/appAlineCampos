import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import DefaultModal from './DefaultModal';
import { Buffer } from 'buffer';

function Treatments({ treatments, onToggleTreatment, isFirstTime }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSeeMore, setSelectedSeeMore] = useState();

  function onClickSeeMore(value) {
    setSelectedSeeMore(value);
    setIsModalVisible(!isModalVisible);
  }

  function renderTreatments() {
    return treatments
      .filter(value => isFirstTime ? value.isFirstType : !value.isFirstType)
      .map((value, i) =>
        <View style={styles.container} key={i}>
          <CheckBox
            containerStyle={styles.checkbox}
            title={value.name}
            checked={value.checked}
            disabled={isFirstTime}
            onPress={() => onToggleTreatment(value)}
          />
          <TouchableOpacity style={styles.more} onPress={() => onClickSeeMore(value)}>
            <Text style={styles.moreText}>
              Saiba mais
            </Text>
          </TouchableOpacity>
        </View>
      );
  };

  function renderModal() {
    const { image } = selectedSeeMore;
    const base64Image = image && Buffer(selectedSeeMore.image, 'binary').toString('base64');
    const imageProps = base64Image && { uri: `data:image/png;base64,${base64Image}` };
    return (
      <DefaultModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        image={imageProps}
      >
        <Text>{selectedSeeMore.description}</Text>
      </DefaultModal>
    );
  }

  return (
    <>
      {renderTreatments()}
      {selectedSeeMore && renderModal()}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  checkbox: {
    flex: 1,
  },
  more: {
    position: 'absolute',
    right: 20,
    bottom: 10,
  },
  moreText: {
    color: '#01877c',
  },
});

export default Treatments;