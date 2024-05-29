import React, {useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {List, Text} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DetailsScreenRoute, MainStackParamList} from '../types/navigation';
import IconButton from '../components/IconButton';
import axios from 'axios';

function CryptoDetails({
  navigation,
}: NativeStackScreenProps<MainStackParamList>) {
  const route = useRoute<DetailsScreenRoute>();
  const price_1day = parseFloat(route.params.price_1day);
  const price_7day = parseFloat(route.params.price_7day);
  const price = parseFloat(route.params.price).toFixed(2);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function saveList() {
    const cryptoData = {
      name: route.params.name,
      symbol: route.params.symbol,
      price_1day,
      price_7day,
      price: route.params.price,
    };

    try {
      await axios.post(
        'https://the-crypto-hub-default-rtdb.firebaseio.com/cryptos.json',
        cryptoData,
      );
      console.log('saved to list');
    } catch (error) {
      console.error('Error saving to list:', error);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <IconButton
          icon="star-outline"
          size={22}
          color="white"
          pressed={saveList}
        />
      ),
    });
  }, [navigation, saveList]);

  return (
    <View style={styles.view}>
      <List.Item
        title={<Text style={styles.name_text}>{route.params.name} </Text>}
        description={
          <Text style={styles.text}>{`${route.params.symbol}`} </Text>
        }
        style={styles.list_item}
      />
      <List.Item
        title={<Text style={styles.name_text}> 1D </Text>}
        description={
          <Text
            style={[
              styles.text,
              price_1day < 0 ? styles.bearish : styles.bullish,
            ]}>
            {`${price_1day}%`}
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
            {`${price_7day}%`}
          </Text>
        }
        style={styles.list_item}
      />
      <List.Item
        title={
          <>
            <Text style={styles.text}>$</Text>
            <Text style={styles.price_text}>{` ${price}`}</Text>
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
