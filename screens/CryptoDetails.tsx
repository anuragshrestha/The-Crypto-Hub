import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {List, Text} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DetailsScreenRoute, MainStackParamList} from '../types/navigation';
import IconButton from '../components/IconButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CryptoDetails({
  navigation,
}: NativeStackScreenProps<MainStackParamList>) {
  const route = useRoute<DetailsScreenRoute>();
  const price_1day = parseFloat(route.params.price_1day);
  const price_7day = parseFloat(route.params.price_7day);
  const price = parseFloat(route.params.price).toFixed(2);

  const [isBlack, setIsBlack] = useState(false);
  const cryptoKey = `isBlack_${route.params.symbol}`;

  useEffect(() => {
    const loadStarState = async () => {
      try {
        const savedState = await AsyncStorage.getItem(cryptoKey);
        if (savedState != null) {
          setIsBlack(JSON.parse(savedState));
        }
      } catch (error) {
        console.error('Error loading the Asyn storage:', error);
      }
    };
    loadStarState();
  }, [cryptoKey]);

  const saveCryptoData = useCallback(async () => {
    const cryptoData = {
      name: route.params.name,
      symbol: route.params.symbol,
      price_1day,
      price_7day,
      price: route.params.price,
    };

    try {
      const response = await axios.get(
        'https://the-crypto-hub-default-rtdb.firebaseio.com/crypto.json',
      );
      const data = response.data;
      if (data) {
        const isExit = Object.values(data).some(
          (entry: any) => entry.symbol === route.params.symbol,
        );
        if (isExit) {
          console.log(route.params.symbol, 'This crypto already exit');
          return;
        }
      }

      await axios.post(
        'https://the-crypto-hub-default-rtdb.firebaseio.com/crypto.json',
        cryptoData,
      );
      console.log('saved to list');
      navigation.setParams({refresh: true});
    } catch (error) {
      console.error('Error saving to list:', error);
    }
  }, [route.params, price_1day, price_7day, navigation]);

  const deleteCryptoData = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://the-crypto-hub-default-rtdb.firebaseio.com/crypto.json',
      );
      const data = response.data;

      if (!data) {
        console.log('No data found in the database');
        return;
      }
      const keyToDelete = Object.keys(data).find(
        key => data[key].symbol === route.params.symbol,
      );
      if (keyToDelete) {
        await axios.delete(
          `https://the-crypto-hub-default-rtdb.firebaseio.com/crypto/${keyToDelete}.json`,
        );
        console.log(route.params.symbol, 'data removed from the list');
        navigation.setParams({refresh: true});
      }
    } catch (error) {
      console.error('error deleting the crypto', error);
    }
  }, [navigation, route.params.symbol]);

  const changeColor = useCallback(async () => {
    try {
      const newState = !isBlack;
      setIsBlack(newState);
      await AsyncStorage.setItem(cryptoKey, JSON.stringify(newState));
      if (newState) {
        await saveCryptoData();
      } else {
        await deleteCryptoData();
      }
    } catch (error) {
      console.error('Error saving star state:', error);
    }
  }, [cryptoKey, isBlack, saveCryptoData, deleteCryptoData]);

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <IconButton
          icon={isBlack ? 'star' : 'star-outline'}
          size={22}
          color={isBlack ? 'black' : 'white'}
          pressed={changeColor}
        />
      ),
    });
  }, [navigation, saveCryptoData, isBlack, changeColor]);

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
