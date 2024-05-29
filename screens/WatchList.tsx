import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Text, Pressable} from 'react-native';
import {CryptoData} from '../Data/CryptoData';
import axios from 'axios';
import {List} from 'react-native-paper';
import {MainStackParamList} from '../types/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

function WatchList({navigation}: NativeStackScreenProps<MainStackParamList>) {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);

  useEffect(() => {
    async function fetchCryptos() {
      try {
        const response = await axios.get(
          'https://the-crypto-hub-default-rtdb.firebaseio.com/cryptos.json',
        );
        const data = response.data;
        const loadedCryptos = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        setCryptos(loadedCryptos);
      } catch (error) {
        console.error('Error fetching cryptos:', error);
      }
    }

    fetchCryptos();
  }, []);

  function onPressed(item: CryptoData) {
    navigation.navigate('CryptoDetails', {
      id: item.id,
      name: item.name,
      price: item.price,
      market_cap: item.market_cap_usd,
      price_1hr: item.percent_change_1h,
      price_1day: item.price_1day,
      price_7day: item.price_7day,
      symbol: item.symbol,
    });
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cryptos}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.container}>
            <Pressable
              onPress={() => onPressed(item)}
              style={({pressed}) => [pressed && styles.press]}>
              <View style={styles.innerConatiner}>
                <View style={styles.infoContainer}>
                  <List.Item
                    title={<Text style={styles.name_text}>{item.name} </Text>}
                    description={
                      <Text style={styles.text}>{`${item.symbol}`} </Text>
                    }
                    style={styles.list_item}
                  />
                </View>
                <View style={styles.price}>
                  <Text style={styles.price_text}>{`$${item.price}`}</Text>
                </View>
              </View>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  press: {
    opacity: 0.7,
  },
  innerConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'royalblue',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    marginVertical: 2,
    padding: 1,
  },
  infoContainer: {
    flex: 1,
  },
  price: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'skyblue',
    padding: 4,
    marginRight: 3,
    backgroundColor: 'black',
    width: 110,
    textAlign: 'center',
  },
  text: {
    color: 'white',
  },
  list_item: {
    paddingVertical: 2,
  },
  name_text: {
    color: 'green',
    fontSize: 17,
    fontWeight: 'bold',
  },
  price_text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WatchList;
