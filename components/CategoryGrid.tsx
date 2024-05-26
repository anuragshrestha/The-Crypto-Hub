import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {List, Text} from 'react-native-paper';

interface CategoryGridProps {
  name: string;
  symbol: string;
  price_usd: string;
  onPress: () => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  name,
  symbol,
  price_usd,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <View style={styles.innerConatiner}>
          <View style={styles.infoContainer}>
            <List.Item
              title={<Text style={styles.name_text}>{name} </Text>}
              description={<Text style={styles.text}>{`${symbol}`} </Text>}
              style={styles.list_item}
            />
          </View>
          <View style={styles.price}>
            <Text style={styles.price_text}>{`$${price_usd}`}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkblue',
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
  },
  text: {
    color: 'white',
  },
  list_item: {
    paddingVertical: 0,
  },
  name_text: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  price_text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CategoryGrid;
