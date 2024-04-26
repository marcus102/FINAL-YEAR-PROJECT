import { StyleSheet, View } from 'react-native';

import Button from './Button';
import Icons from './Icons';
import Colors from '../constants/colors';
import Text_ from '../components/Text/Text';

export default function DropDownButton({ textStyle, children, placeHolder, icon }) {
  return (
    <View style={styles.rootContainer}>
      <Text_ style={textStyle} children={children} />
      <View style={styles.buttonContainer}>
        <Button children={placeHolder} />
        <Icons icon={icon} color={Colors.orange} size={20} style={styles.icon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
    borderWidth: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {},
});
