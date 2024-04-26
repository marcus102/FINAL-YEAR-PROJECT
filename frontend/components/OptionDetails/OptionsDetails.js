import { useContext } from 'react';
import { StyleSheet, Pressable, Animated, View } from 'react-native';

import Icons from '../../util/Icons';
import Colors from '../../constants/colors';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import Text_ from '../Text/Text';

export default function OptionsDetails({ children, isVisible, children1, onPress, style, animatedView, icon, icon1 }) {
  const dataContext = useContext(ManagmentSystem);
  const themeOption = dataContext.themeOption;
  const darkMode = themeOption === 'Dark Mode';

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.rootContainer, pressed && styles.pressed, style]}>
      <View style={styles.secondContainer}>
        <Icons icon={icon1} size={25} color={darkMode ? Colors.darkModeText : Colors.black} />
        <View style={styles.thirdContainer}>
          <Text_ children={children} textStytle={styles.text} />
          {isVisible && <Text_ textContainer={styles.fourthContainer} children={children1} textStytle={styles.text1} />}
        </View>
      </View>
      <Animated.View style={animatedView}>
        <Icons icon={icon} size={20} color={darkMode ? Colors.darkModeText : Colors.black} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  secondContainer: {
    flexDirection: 'row',
  },
  thirdContainer: {
    flexDirection: 'row',
  },
  fourthContainer: {
    backgroundColor: Colors.red,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    maxHeight: 14,
    marginTop: 10,
  },
  text: {
    fontSize: 19,
    marginHorizontal: 5,
  },
  text1: {
    fontSize: 10,
    fontWeight: 'bold',
    marginHorizontal: 5,
    color: Colors.white,
  },
  pressed: {
    opacity: 0.7,
  },
  darkModeText: {
    color: Colors.darkModeText,
  },
  darkMode: {
    backgroundColor: Colors.black,
  },
});
