import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Platform } from 'react-native';

import SubMenuDataList from '../../components/SubOptionsList/SubMenuDataList';
import Colors from '../../constants/colors';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import IconButton from '../../util/IconButton';
import Text_ from '../../components/Text/Text';
import SearchBarOverlay from '../../components/Overlays/SearchBarOverlay/SearchBarOverlay';

export default function SubMenuScreen() {
  const navigation = useNavigation();

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
      <View style={styles.headerContainer}>
        <IconButton
          icon={'exit-outline'}
          color={Colors.lightOrange}
          size={30}
          onPress={() => {
            navigation.navigate('MenuScreen');
          }}
        />
        <Text_
          textContainer={styles.headerTitleContainer}
          textStytle={styles.headerTitleText}
          children={dataContext.headerTitle}
        />
        <View style={styles.buttonContainer}>
          <IconButton
            icon={'search-outline'}
            size={30}
            color={Colors.gray}
            onPress={() => dataContext.openSearchOverlayHandler('submenu')}
          />
          {dataContext.headerTitle === 'Your Notifications' && (
            <View style={styles.iconButtonContainer}>
              <IconButton
                icon={'ellipsis-horizontal-circle'}
                color={Colors.gray}
                size={30}
                onPress={() =>
                  dataContext.headerOptionOverlayHandler('notification')
                }
              />
            </View>
          )}
        </View>
      </View>
      <SubMenuDataList />

      <SearchBarOverlay
        visible={dataContext.openSearchOverlay === 'submenu' && true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootCcontainer: {
    flex: 1,
    paddingTop: Platform.select({ ios: 50, android: 20 }),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 30,
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
  buttonContainer: {
    flexDirection: 'row',
  },
  iconButtonContainer: {
    marginLeft: 15,
  },
  darkMode: {
    backgroundColor: Colors.black,
  },
});
