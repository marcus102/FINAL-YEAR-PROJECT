import { useContext } from 'react';
import { StyleSheet, View, Platform } from 'react-native';

import MenuList from '../components/OptionList/MenuList';
import Colors from '../constants/colors';
import { ManagmentSystem } from '../store/AppGeneralManagmentSystem';
import Text_ from '../components/Text/Text';

export default function MenuScreen() {
  const dataContext = useContext(ManagmentSystem);
  const themeOption = dataContext.themeOption;
  const darkMode = themeOption === 'Dark Mode';

  return (
    <View style={[styles.menuList, darkMode && styles.darkMode]}>
      <Text_
        textContainer={styles.menuContainer}
        textStytle={styles.menuText}
        children={'Menu'}
      />
      <MenuList />
    </View>
  );
}

const styles = StyleSheet.create({
  menuList: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.select({ ios: 50, android: 20 }),
    paddingHorizontal: 10,
  },
  menuContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  menuText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  darkMode: {
    backgroundColor: Colors.black,
  },
});
