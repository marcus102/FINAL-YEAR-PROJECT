import { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import Input from '../../../util/Input';
import Button from '../../../util/Button';
import { FORGOTTEN_PASSWORD_FORM } from '../../../data/Database';
import ErrorTextMessage from '../../ErrorTextMessage/ErrorTextMessage';
import Colors from '../../../constants/colors';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated';
import Text_ from '../../Text/Text';

export default function PasswordForgotenForm() {
  const [inputs, setInputs] = useState({
    email: { value: '', isValid: true },
  });
  const dataContext = useContext(ManagmentSystem);

  function formSubmissionHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function renderEmail() {
    const formData = {
      email: inputs.email.value,
    };

    const confirmEmailOrPassIsValid = isNaN(formData.email) && formData.email.trim().length > 0;

    if (!confirmEmailOrPassIsValid) {
      setInputs((currentInputValues) => {
        return {
          email: {
            value: currentInputValues.email.value,
            isValid: confirmEmailOrPassIsValid,
          },
        };
      });
      return;
    }
    dataContext.switchContentFormHandler('resetCode');
  }

  const formIsInvalid = !inputs.email.isValid;

  return (
    <Animated.View entering={FadeInRight} exiting={FadeOutRight}>
      {FORGOTTEN_PASSWORD_FORM.map((data) => (
        <View key={data.id} style={styles.container}>
          {['FPF1'].includes(data.id) && (
            <Text_ textContainer={styles.titleContainer} textStytle={styles.title} children={data.textTitle} />
          )}
          {['FPF2'].includes(data.id) && <Text_ textStytle={styles.text} children={data.notifications[0].notification} />}
          {['FPF4'].includes(data.id) && (
            <Input
              onChangeText={formSubmissionHandler.bind(this, 'email')}
              value={inputs.email.value}
              inputContainerStyle={formIsInvalid && styles.invalidInput}
              textStyle={formIsInvalid && styles.invalidInputTitle}
              children={data.formTitle}
              placeholder={data.placeholder}
            />
          )}

          {['FPF3'].includes(data.id) && formIsInvalid && (
            <ErrorTextMessage
              children={data.notifications[0].notification}
              icon={'reload-sharp'}
              size={12}
              style={styles.errorInputContainer}
            />
          )}

          <View style={styles.buttonContainer}>
            {['FPF5'].includes(data.id) && (
              <>
                {inputs.email.value && (
                  <Button onPress={renderEmail} textStyle={styles.buttonText} children={data.buttonText} style={styles.button} />
                )}
              </>
            )}
            {['FPF6'].includes(data.id) && (
              <Button
                onPress={() => dataContext.switchContentFormHandler('SignIn')}
                textStyle={styles.buttonText}
                children={data.buttonText}
                style={styles.button}
              />
            )}
          </View>
        </View>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    maxHeight: 300,
    elevation: 2,
    shadowColor: Colors.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light_grayTransparent,
    marginHorizontal: 5,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.orange,
    paddingVertical: 10,
    paddingHorizontal: 100,
    marginTop: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 17,
  },
  titleContainer: {
    marginVertical: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 13,
    color: Colors.gray,
  },

  container: {
    minHeight: 30,
  },
  invalidInput: {
    borderColor: Colors.red,
  },
  invalidInputTitle: {
    color: Colors.red,
  },
  darkModeText: {
    color: Colors.darkModeText,
  },
});
