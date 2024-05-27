import React from 'react';
import {StyleSheet, View} from 'react-native';
import {List, Text} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DetailsScreenRoute, MainStackParamList} from '../types/navigation';

function CryptoDetails({}: NativeStackScreenProps<MainStackParamList>) {
  const route = useRoute<DetailsScreenRoute>();
  const price_1day = parseFloat(route.params.price_1day);
  const price_7day = parseFloat(route.params.price_7day);

  return (
    <View style={styles.view}>
      <List.Item
        title={<Text style={styles.name_text}>{route.params.name} </Text>}
        description={
          <Text style={styles.text}>{`${route.params.symbol}`} </Text>
        }
        style={styles.list_item}
      />
      {/* <List.Item
        title={<Text style={styles.name_text}> 1hr </Text>}
        description={
          <Text style={styles.text}>{`${route.params.price_1hr}%`} </Text>
        }
        style={styles.list_item}
      /> */}
      <List.Item
        title={<Text style={styles.name_text}> 1D </Text>}
        description={
          <Text
            style={[
              styles.text,
              price_1day < 0 ? styles.bearish : styles.bullish,
            ]}>
            {`${price_1day}%`}{' '}
          </Text>
        }
        style={styles.list_item}
      />
      <List.Item
        title={<Text style={styles.name_text}> 7D </Text>}
        description={
          <Text
            style={[
              styles.text,
              price_7day < 0 ? styles.bearish : styles.bullish,
            ]}>
            {`${price_7day}%`}{' '}
          </Text>
        }
        style={styles.list_item}
      />
      <List.Item
        title={
          <>
            <Text style={styles.text}>$</Text>
            <Text style={styles.price_text}>{` ${route.params.price}`}</Text>
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'darkblue',
    flexDirection: 'row',
    paddingTop: 5,
    paddingRight: 250,
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bearish: {
    color: 'red',
  },
  bullish: {
    color: 'green',
  },
  list_item: {
    paddingVertical: 0,
    marginVertical: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name_text: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  price_text: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 2,
    paddingRight: 25,
  },
});

export default CryptoDetails;
