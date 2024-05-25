import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {List} from 'react-native-paper';
import {getCrypto} from '../Data/Api';
import {Crypto, CryptoData} from '../Data/CryptoData';
import {Image} from 'react-native';

function Cryptos() {
  const [crypto, setCrypto] = useState<Crypto>();

  useEffect(() => {
    getCrypto().then(cryptos => setCrypto(cryptos));
  }, []);

  const renderItem = ({item}: {item: CryptoData}) => (
    <List.Item
      title={item.name}
      description={`${item.symbol}, Price: ${item.price_usd}`}
      // eslint-disable-next-line react/no-unstable-nested-components
      left={() => (
        <Image
          source={{uri: `https://cryptologos.cc/logos/${item.id}.png`}}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: 40, height: 40, marginRight: 10}}
        />
      )}
    />
  );

  return (
    <View style={styles.view}>
      <FlatList
        data={crypto?.data}
        keyExtractor={item => item.symbol}
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
