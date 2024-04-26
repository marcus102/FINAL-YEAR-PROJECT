import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { LOADING_PAGE } from '../data/allData';
import Colors from '../constants/colors';
import { ManagmentSystem } from '../store/AppGeneralManagmentSystem';
import Text_ from '../components/Text/Text';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function PlaneTextMessage({ ID, overlayStyle }) {
  const dataContext = useContext(ManagmentSystem);
  const themeOption = dataContext.themeOption;
  const darkMode = themeOption === 'Dark Mode';

  return (
    <Animated.View entering={FadeInUp}>
      {LOADING_PAGE.map((data) => (
        <View key={data.id}>
          {[ID].includes(data.id) && (
            <>
              <Text_
                textContainer={[styles.mainContainer, overlayStyle && styles.overlay]}
                children={data.message}
                textStytle={styles.text}
              />
            </>
          )}
        </View>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.orangeTransparent,
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.light_gray,
  },
  text: {
    fontWeight: '500',
    fontSize: 13,
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
});
