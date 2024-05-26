import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {getCrypto} from '../Data/Api';
import {Crypto, CryptoData} from '../Data/CryptoData';
import CategoryGrid from '../components/CategoryGrid';
import {MainStackParamList} from '../types/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

function Cryptos({navigation}: NativeStackScreenProps<MainStackParamList>) {
  const [crypto, setCrypto] = useState<Crypto>();

  useEffect(() => {
    getCrypto().then(cryptos => setCrypto(cryptos));
  }, []);

  const renderItem = ({item}: {item: CryptoData}) => {
    function pressHandler() {
      navigation.navigate('CryptoDetails', {
        id: item.id,
      });
    }
    return (
      <CategoryGrid
        name={item.name}
        symbol={item.symbol}
        price_usd={item.price_usd}
        onPress={pressHandler}
      />
    );
  };

  return (
    <View style={styles.view}>
      <FlatList
        data={crypto?.data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export default Cryptos;
