import { StyleSheet, View, ScrollView } from 'react-native';

import Colors from '../constants/colors';
import Text_ from '../components/Text/Text';
import Button from './Button';

export default function PopUpMessageHandler({ onPress, children_1, children_2 }) {
  return (
    <ScrollView style={styles.messageScrollViewContainer}>
      <View style={styles.messageBodyContainer}>
        <Text_ textStytle={styles.messageBodyText} children={children_1} />
        <Text_ textStytle={styles.messageBodyText} children={children_2} />
        <Button children={'Ok'} onPress={onPress} style={styles.button} textStyle={styles.buttonText} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  messageScrollViewContainer: {
    height: '20%',
    width: '90%',
    marginVertical: 20,
    backgroundColor: Colors.transparentOrange,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  messageBodyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBodyText: {
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 30,
    textAlign: 'justify',
  },
  button: {
    width: '90%',
    height: 40,
    backgroundColor: Colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
