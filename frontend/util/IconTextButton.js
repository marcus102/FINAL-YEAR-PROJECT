import { StyleSheet, Pressable, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import Text_ from '../components/Text/Text';

export default function IconTextButton({ icon, size, color, onPress, children, containerStyle, textStyle }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.container, containerStyle, pressed && styles.pressed]}>
      <Text_ children={children} textStytle={[styles.buttonText, textStyle]} />
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 45,
    backgroundColor: Colors.orange,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  pressed: {
    opacity: 0.9,
  },
});
