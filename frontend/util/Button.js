import { StyleSheet, Pressable } from 'react-native';

import Text_ from '../components/Text/Text';

export default function Button({ children, style, textStyle, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [style, pressed && styles.pressed]}>
      <Text_ textStytle={[styles.text, textStyle]} children={children} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.9,
  },
  text: {
    fontWeight: 'bold',
  },
});
