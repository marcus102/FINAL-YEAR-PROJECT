import * as React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Colors from '../constants/colors';

export default function CameraButton({ onPress, icon, color, size, buttonContainer }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, buttonContainer]}>
      <Entypo name={icon} size={size} color={color ? color : Colors.white} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
