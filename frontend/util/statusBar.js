import { useContext } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';

import Colors from '../constants/colors';
import { ManagmentSystem } from '../store/AppGeneralManagmentSystem';

export default function CustomStatusBar() {
  const dataContext = useContext(ManagmentSystem);
  const themeOption = dataContext.themeOption;
  const darkMode = themeOption === 'Dark Mode';

  return (
    <View>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} backgroundColor={darkMode ? Colors.black : Colors.white} />
    </View>
  );
}

const styles = StyleSheet.create({});
