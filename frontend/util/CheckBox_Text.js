import { StyleSheet, View } from 'react-native';

import IconButton from './IconButton';
import Text_ from '../components/Text/Text';
import Colors from '../constants/colors';

export default function CheckBox({ onPress, isActive, children }) {
  return (
    <View style={styles.showPasswordContainer}>
      <IconButton icon={isActive ? 'checkbox-sharp' : 'square-outline'} color={Colors.orange} size={20} onPress={onPress} />
      <Text_ textStytle={styles.showPasswordText} children={children} />
    </View>
  );
}

const styles = StyleSheet.create({
  showPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  showPasswordText: {
    marginHorizontal: 5,
    fontSize: 14,
  },
});
