import { StyleSheet, View } from 'react-native';
import Text_ from '../Text/Text';

export default function SubProfileDataDetails({ title, value, style }) {
  return (
    <View style={styles.textContainer}>
      <Text_ style={styles.text} children={title} />
      <Text_ style={styles.text_1} children={value} />
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 17,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingRight: 10,
  },
  text_1: {
    fontSize: 17,
  },
});
