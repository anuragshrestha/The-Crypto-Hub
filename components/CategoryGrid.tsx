import React from 'react';
import {Pressable, View} from 'react-native';
import {List} from 'react-native-paper';

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
    <View>
      <Pressable onPress={onPress}>
        <View>
          <List.Item
            title={name}
            description={`${symbol}, Price: $${price_usd}`}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default CategoryGrid;
