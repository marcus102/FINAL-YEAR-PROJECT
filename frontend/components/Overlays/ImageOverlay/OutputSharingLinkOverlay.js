import { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import IconButton from '../../../util/IconButton';
import Button from '../../../util/Button';
import Colors from '../../../constants/colors';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import MainOverlay from '../MainOverlay/mainOverlay';
import Text_ from '../../Text/Text';

export default function OutputShaingLink({ visible, setShareData }) {
  const [textCopied, setTextCopied] = useState(false);
  const dataContext = useContext(ManagmentSystem);
  const themeOption = dataContext.themeOption;

  function shareFunctionHandler(inputType) {
    if (inputType === 'done') {
      setShareData(false);
      setTextCopied(false);
    } else {
      setTextCopied(true);
    }
  }

  return (
    <MainOverlay visible={visible} animationType="slide" rootContainer={styles.rootContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text_ textStytle={styles.title}>Your Link!</Text_>
        </View>
        <View style={styles.linkContainer}>
          <IconButton
            icon={textCopied ? 'copy' : 'copy-outline'}
            size={40}
            color={Colors.orange}
            onPress={shareFunctionHandler.bind(this, 'copy')}
          />
          <View style={styles.linkTextContainer}>
            <Text_ textStytle={styles.linkText}>Tl!'|l/?;esWO"sn_KhT-Dhd</Text_>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text_ textStytle={styles.text}>Copy the link above</Text_>
        </View>
        <View style={styles.buttonContainer}>
          <Button children={'Done'} style={styles.button} textStyle={styles.buttonText} onPress={shareFunctionHandler.bind(this, 'done')} />
        </View>
      </View>
    </MainOverlay>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    maxHeight: 210,
    elevation: 5,
    shadowColor: Colors.light_gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light_gray,
    marginHorizontal: 5,
    marginVertical: 240,
    // marginBottom: 300,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  mainContainer: {},
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light_gray,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10,
  },
  linkTextContainer: {
    marginLeft: 10,
  },
  linkText: {
    fontSize: 17,
    color: Colors.gray,
  },
  textContainer: {},
  text: {
    fontSize: 14,
    color: Colors.gray,
    marginHorizontal: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: Colors.orange,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.white,
  },
  // keyboardAvoidingContainer: {
  //   justifyContent: "flex-end",
  // },
  darkModeText: {
    color: Colors.darkModeText,
  },
  darkMode: {
    backgroundColor: Colors.black,
  },
});
