import { useContext } from 'react';
import { StyleSheet, Pressable } from 'react-native';

import Colors from '../../constants/colors';
import Icons from '../../util/Icons';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import Text_ from '../Text/Text';

export default function SubOptionsDetails({ onPress, style, children, icon }) {
  const dataContext = useContext(ManagmentSystem);
  const themeOption = dataContext.themeOption;
  const darkMode = themeOption === 'Dark Mode';

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.rootContainer, pressed && styles.pressed, style]}>
      <Text_ style={styles.text} children={children} />
      <Icons icon={icon} size={18} color={darkMode ? Colors.darkModeText : Colors.black} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    marginBottom: 15,
  },
  text: {
    fontSize: 15,
    marginHorizontal: 10,
  },
  pressed: {
    opacity: 0.7,
  },
});
