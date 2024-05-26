import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DetailsScreenRoute, MainStackParamList} from '../types/navigation';

function CryptoDetails({}: NativeStackScreenProps<MainStackParamList>) {
  const route = useRoute<DetailsScreenRoute>();
  const cryptoId = route.params.id;
  return (
    <View style={styles.view}>
      <Text>This is the Crypto details screen for id {cryptoId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export default CryptoDetails;
