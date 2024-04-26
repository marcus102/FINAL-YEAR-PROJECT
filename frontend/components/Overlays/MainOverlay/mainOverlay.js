import { useContext } from 'react';
import { StyleSheet, Modal } from 'react-native';

import Colors from '../../../constants/colors';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function MainOverlay({ children, visible, animationType, rootContainer }) {
  const dataContext = useContext(ManagmentSystem);
  const themeOption = dataContext.themeOption;
  const darkMode = themeOption === 'Dark Mode';

  return (
    <Modal visible={visible} animationType={animationType} transparent={true}>
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={[styles.defaultRootContainer, darkMode && styles.darkModeView, rootContainer]}
      >
        {children}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  defaultRootContainer: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
  },
  darkModeView: {
    backgroundColor: Colors.black,
  },
});
