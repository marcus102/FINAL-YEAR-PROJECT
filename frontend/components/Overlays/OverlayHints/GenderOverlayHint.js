import { useRef, useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../../../util/Button';
import Colors from '../../../constants/colors';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import { GENDER } from '../../../data/Database';

export default function GenderOverlayHint({ visible, onsubmit }) {
  const buttonData = useRef('');
  const dataContext = useContext(ManagmentSystem);
  const themeOption = dataContext.themeOption;
  const darkMode = themeOption === 'Dark Mode';

  function pressHandler(data) {
    buttonData.current = data;
    onsubmit(buttonData.current);
  }

  return (
    <>
      {visible && (
        <View style={[styles.rootContainer, darkMode && styles.darkMode]}>
          {GENDER.map(
            (data) =>
              ['GD1', 'GD2', 'GD3'].includes(data.id) && (
                <View key={data.id}>
                  <Button
                    children={data.buttonText}
                    style={styles.button}
                    textStyle={styles.buttonText}
                    onPress={() => {
                      const idToGender = {
                        GD1: 'Male',
                        GD2: 'Female',
                        GD3: 'Private',
                      };
                      pressHandler(idToGender[data.id]);
                    }}
                  />
                </View>
              )
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    minHeight: 150,
    minWidth: 100,
    backgroundColor: Colors.white,
    elevation: 1,
    shadowColor: Colors.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.light_gray,
    marginRight: 260,
    marginLeft: 10,
    marginTop: 196,
    padding: 15,
  },
  button: {
    marginVertical: 10,
  },
  buttonText: {
    fontWeight: '400',
  },
  darkModeText: {
    color: Colors.darkModeText,
  },
  darkMode: {
    backgroundColor: Colors.black,
  },
});
