import { StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function IconButton({ icon, size, color, onPress, onPressOut, iconButtonContainer }) {
  return (
    <Pressable onPressOut={onPressOut} onPress={onPress} style={({ pressed }) => [iconButtonContainer, pressed && styles.pressed]}>
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
