import React from 'react';
import { Linking, StyleSheet } from 'react-native';
import DefaultButton from '../components/DefaultButton';
import Section from '../components/Section';
import { Icon } from 'react-native-elements'
import { Button } from 'react-native-elements';

function Location({ setRoute }) {
  return (
    <>
      <DefaultButton style={styles.back}
        icon='angle-left' text='Voltar' isLeft={true}
        onClick={() => setRoute('Actions')} />

      <Section
        title="Localização da Clínica"
        description="Rua Princesa Isabel de Bragança, 346 - Edifício Grimberg - Sala 204 - 2 Andar"
      />

      <Button
        type="clear"
        titleStyle={{ color: '#1c4799' }}
        icon={
          <Icon name='map-marked-alt' type='font-awesome-5' color="#1c4799" style={{ marginRight: 10 }} />
        }
        title="Abrir no Google Maps"
        onPress={() => Linking.openURL('https://goo.gl/maps/ks5Ms34DpxEGJid37')}
      />
    </>
  )
}

const styles = StyleSheet.create({
  back: {
    marginTop: -20,
  },
});

export default Location;