import { useRef } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { ALL_COUNTRIES } from '../../../data/Database';
import Button from '../../../util/Button';

export default function CountryOverlayHint({ onsubmit }) {
  const buttonData = useRef('');

  function pressHandler(data) {
    buttonData.current = data;
    onsubmit(buttonData.current);
  }

  return (
    <ScrollView style={styles.rootContainer}>
      {ALL_COUNTRIES.map((data) => (
        <Button
          key={data.id}
          textStyle={styles.buttonText}
          children={data.buttonText}
          onPress={() => {
            pressHandler(data.buttonText);
          }}
          style={styles.buttonContainer}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '400',
  },
  buttonContainer: {
    marginVertical: 15,
    marginHorizontal: 15,
  },
});
