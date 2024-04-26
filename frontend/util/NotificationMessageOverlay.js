import { StyleSheet, View } from 'react-native';
import { LOADING_PAGE } from '../data/Database';
import Colors from '../constants/colors';
import Text_ from '../components/Text/Text';
import Button from './Button';

function NotificationMessageOverlay({ onPress, ID, overlayStyle }) {
  return (
    <>
      {LOADING_PAGE.map((data) => (
        <View key={data.id}>
          {[ID].includes(data.id) && (
            <View style={[styles.messageBodyContainer, overlayStyle && styles.overlay]}>
              <Text_ textStytle={styles.messageBodyText} children={data.notifications[0].notification} />

              <Button children={data.notifications[1].notification} onPress={onPress} style={styles.button} textStyle={styles.buttonText} />
            </View>
          )}
        </View>
      ))}
    </>
  );
}

export default NotificationMessageOverlay;

const styles = StyleSheet.create({
  messageBodyContainer: {
    height: 150,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 200,
    padding: 20,
    backgroundColor: Colors.transparentOrange,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  messageBodyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    width: '90%',
    height: 40,
    backgroundColor: Colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 50,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 18,
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
