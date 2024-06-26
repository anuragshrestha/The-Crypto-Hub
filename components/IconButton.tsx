/**
 *This function returns Ionicons to use it as a image in different screens.
 */

import {Pressable, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

interface IconButtonProps {
  icon: string;
  color: string;
  size: number;
  pressed?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size,
  color,
  pressed,
}) => {
  return (
    <Pressable
      onPress={pressed}
      // eslint-disable-next-line @typescript-eslint/no-shadow
      style={({pressed}) => [pressed && styles.pressed]}>
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});

export default IconButton;
