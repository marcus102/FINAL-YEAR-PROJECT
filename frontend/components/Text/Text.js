import { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import Colors from '../../constants/colors';

export default function Text_({ children, textStytle, textContainer }) {
  const dataContext = useContext(ManagmentSystem);
  const themeOption = dataContext.themeOption;
  const darkMode = themeOption === 'Dark Mode';

  return (
    <View style={[styles.defaultTextContainer, textContainer]}>
      <Text style={[styles.defaultText, darkMode && styles.darkModeText, textStytle]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  defaultTextContainer: {},
  defaultText: {
    fontSize: 15,
    fontWeight: 'normal',
    color: Colors.black,
  },
  darkModeText: {
    color: Colors.darkModeText,
  },
});
