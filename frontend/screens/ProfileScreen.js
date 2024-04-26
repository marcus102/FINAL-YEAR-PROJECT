import { useContext } from 'react';
import { StyleSheet, ScrollView, View, Platform } from 'react-native';

import ProfileObjects from '../components/CreateAccountOrSignUp/profileObjects';
import Colors from '../constants/colors';
import { ManagmentSystem } from '../store/AppGeneralManagmentSystem';
import Text_ from '../components/Text/Text';

export default function ProlileScreen() {
  const dataContext = useContext(ManagmentSystem);
  const themeOption = dataContext.themeOption;
  const darkMode = themeOption === "Dark Mode";

  return (
    <View
      style={[
        styles.rootContainer,
        darkMode && styles.darkMode,
      ]}
    >
      <Text_
        textContainer={styles.profileContainer}
        textStytle={styles.profileText}
        children={'Profile'}
      />

      <ScrollView style={styles.scrollView}>
        <ProfileObjects />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.select({ ios: 50, android: 20 }),
    paddingHorizontal: 10,
  },
  scrollView: {
    flex: 1,
  },
  profileContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  profileText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  darkMode: {
    backgroundColor: Colors.black,
  },
});
