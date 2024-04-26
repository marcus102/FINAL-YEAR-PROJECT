import { useContext } from 'react';
import { StyleSheet, View, ScrollView, Platform } from 'react-native';

import IconButton from '../../../util/IconButton';
import Colors from '../../../constants/colors';
import SearchBar from '../../../util/SearchBar';
import MainOverlay from '../MainOverlay/mainOverlay';
import Text_ from '../../Text/Text';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';

export default function SearchBarOverlay({ visible }) {
  const dataContext = useContext(ManagmentSystem);

  return (
    <MainOverlay visible={visible} animationType="slide" rootContainer={styles.rootContainer}>
      <View style={styles.cancelButtonContainer}>
        <IconButton
          icon={'arrow-back-circle-outline'}
          size={30}
          color={Colors.red}
          onPress={() => dataContext.openSearchOverlayHandler('')}
        />

        <Text_ textStytle={styles.titleText} children={'SEARCH'} />
      </View>

      <SearchBar
        // onPress={}
        visible={true}
      />
      <ScrollView>
        <Text_ children={'Search Bar'} />
      </ScrollView>
    </MainOverlay>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: Platform.select({ ios: 70, android: 35 }),
  },
  cancelButtonContainer: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
