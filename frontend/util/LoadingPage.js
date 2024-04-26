import { useContext } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { LOADING_PAGE } from '../data/Database';
import Colors from '../constants/colors';
import { ManagmentSystem } from '../store/AppGeneralManagmentSystem';
import Text_ from '../components/Text/Text';

export default function LoadingOverlay({ loadingSpiner, overlayStyle }) {
  const dataContext = useContext(ManagmentSystem);
  const themeOption = dataContext.themeOption;
  const darkMode = themeOption === 'Dark Mode';

  return (
    <View style={[styles.rootContainer, overlayStyle && styles.overlay, darkMode && styles.darkMode]}>
      {loadingSpiner && <ActivityIndicator size="large" color={darkMode ? Colors.white : Colors.black} />}
      {LOADING_PAGE.map((data) => (
        <View key={data.id}>
          {['LP2'].includes(data.id) && (
            <Text_ textContainer={styles.messageContainer} textStytle={styles.message} children={data.notifications[0].notification} />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontWeight: 'bold',
  },
  messageContainer: {
    marginVertical: 20,
  },
  overlay: {
    height: 0,
    width: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  darkMode: {
    backgroundColor: Colors.black,
  },
});
