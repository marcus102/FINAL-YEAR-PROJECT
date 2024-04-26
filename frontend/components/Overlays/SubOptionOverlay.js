import { useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import IconButton from '../../util/IconButton';
import Colors from '../../constants/colors';
import MainOverlay from './MainOverlay/mainOverlay';
import DeleteAccount from './ProfileOverlay/DeleteAccountOverlay';
import UpdatePassword from './ProfileOverlay/UpdatePasswordOverlay';

export default function SubOptionOverlay({ overlayId, visible, setOpenOverlayData }) {
  return (
    <MainOverlay visible={visible} animationType="slide" rootContainer={styles.rootContainer}>
      <View style={styles.cancelButtonContainer}>
        <IconButton
          icon={'arrow-back-circle-outline'}
          size={30}
          color={Colors.orange}
          onPress={() => {
            setOpenOverlayData(false);
          }}
        />
      </View>
      <ScrollView style={styles.scrollViewContainer}>
        {['PSO4'].includes(overlayId) && <UpdatePassword />}
        {['PSO8'].includes(overlayId) && <DeleteAccount />}
      </ScrollView>
    </MainOverlay>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: 70,
  },
  cancelButtonContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.orange,
    justifyContent: 'center',
    padding: 5,
  },
  darkModeText: {
    color: Colors.darkModeText,
  },
  darkMode: {
    backgroundColor: Colors.black,
  },
  scrollViewContainer: {
    flex: 1,
    paddingTop: 15,
  },
});
