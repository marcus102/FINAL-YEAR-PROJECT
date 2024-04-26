import { useContext } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SubProfileDataList from '../../components/SubOptionsList/SubProfileDataList';
import Colors from '../../constants/colors';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import IconButton from '../../util/IconButton';
import Text_ from '../../components/Text/Text';
import SearchBarOverlay from '../../components/Overlays/SearchBarOverlay/SearchBarOverlay';

export default function SubProfileScreen() {
  const navigation = useNavigation();

  function navigationHandler() {
    navigation.navigate('ProfileScreen');
    dataContext.headerTitleHandler('');

    dataContext.predictionsHandler(null, 'clear');
  }

  const dataContext = useContext(ManagmentSystem);
  const themeOption = dataContext.themeOption;
  const darkMode = themeOption === "Dark Mode";

  return (
    <View
      style={[
        styles.rootCcontainer,
        darkMode && styles.darkMode,
      ]}
    >
      <View style={styles.buttonContainer}>
        <IconButton
          icon={'exit-outline'}
          color={Colors.lightOrange}
          size={30}
          onPress={navigationHandler}
        />
        <Text_
          textContainer={styles.headerTitleContainer}
          textStytle={styles.headerTitleText}
          children={dataContext.headerTitle}
        />
        <IconButton
          icon={'search-outline'}
          size={30}
          color={Colors.gray}
          onPress={() => dataContext.openSearchOverlayHandler('subprofile')}
        />
      </View>
      <SubProfileDataList />

      <SearchBarOverlay
        visible={dataContext.openSearchOverlay === 'subprofile' && true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootCcontainer: {
    flex: 1,
    paddingTop: Platform.select({ ios: 50, android: 20 }),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 20,
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  darkMode: {
    backgroundColor: Colors.black,
  },
});
