import { StyleSheet, View } from 'react-native';

import Icons from '../../util/Icons';
import Colors from '../../constants/colors';
import Text_ from '../Text/Text';

export default function ErrorTextMessage({ children, icon, textStyle, size, style }) {
  return (
    <View style={styles.errorTextContainer}>
      <Text_ style={[styles.errorText, textStyle]} children={children} />
      <Icons icon={icon} size={size} color={Colors.red} style={style} />
    </View>
  );
}

const styles = StyleSheet.create({
  errorTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  errorText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.red,
    marginHorizontal: 5,
  },
});
