import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import Text_ from '../Text/Text';
import Button from '../../util/Button';
import { MAIN_PAGE } from '../../data/Database';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import Colors from '../../constants/colors';

export default function MainPage() {
  const dataContext = useContext(ManagmentSystem);

  return (
    <>
      {MAIN_PAGE.map((data) => (
        <View style={styles.rootContainer} key={data.id}>
          {['MP1'].includes(data.id) && <Text_ textStytle={styles.titleText} children={data.textTitle} />}
          {['MP2'].includes(data.id) && <Text_ textStytle={styles.welcome} children={data.textTitle} />}
          {['MP3'].includes(data.id) && <Text_ textStytle={styles.more} children={data.textTitle} />}
          {['MP4'].includes(data.id) && (
            <Button
              onPress={() => dataContext.switchContentFormHandler('SignIn')}
              children={data.buttonText}
              textStyle={styles.buttonText}
            />
          )}
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 40,
  },
  welcome: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 40,
  },
  more: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 40,
  },
  buttonText: {
    fontWeight: 'bold',
    color: Colors.orange,
    borderWidth: 2,
    borderColor: Colors.orange,
    padding: 13,
    marginVertical: 10,
    borderRadius: 10,
  },
  darkModeText: {
    color: Colors.darkModeText,
  },
});
