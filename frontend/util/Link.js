import { StyleSheet, Pressable } from 'react-native';

import Colors from '../constants/colors';
import Text_ from '../components/Text/Text';

export default function LinksHandler({ onPress, containerStyle, children, textStyle }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [containerStyle, pressed && styles.pressed]}>
      <Text_ children={children} textStytle={[styles.linkText, textStyle]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.9,
  },
  linkText: {
    color: Colors.orange,
  },
});
