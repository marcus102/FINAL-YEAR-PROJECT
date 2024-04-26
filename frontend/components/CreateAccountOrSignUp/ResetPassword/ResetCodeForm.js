import { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import { CODE_VERIFICATION_FORM } from '../../../data/Database';
import Button from '../../../util/Button';
import Input from '../../../util/Input';
import ErrorTextMessage from '../../ErrorTextMessage/ErrorTextMessage';
import Colors from '../../../constants/colors';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import Text_ from '../../Text/Text';
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated';

export default function ResetCodeForm() {
  const [codeInputForm, setCodeInputForm] = useState({
    cofirmCode: { value: '', isValid: true },
  });
  const dataContext = useContext(ManagmentSystem);

  function formSubmissionHandler(inputIdentifier, enteredValue) {
    setCodeInputForm((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function verifyCode() {
    const formData = {
      confirmCode: +codeInputForm.cofirmCode.value,
    };

    const confirmCodeIsValid = !isNaN(formData.confirmCode) && formData.confirmCode > 0;

    if (!confirmCodeIsValid) {
      setCodeInputForm((currentInputValues) => {
        return {
          cofirmCode: {
            value: currentInputValues.cofirmCode.value,
            isValid: confirmCodeIsValid,
          },
        };
      });
      return;
    }

    //onSubmit(formData);

    dataContext.switchContentFormHandler('resetPassword');
  }

  const formIsInvalid = !codeInputForm.cofirmCode.isValid;

  return (
    <Animated.View entering={FadeInRight} exiting={FadeOutRight}>
      {CODE_VERIFICATION_FORM.map((data) => (
        <View key={data.id} style={styles.container}>
          {['CVF2'].includes(data.id) && formIsInvalid ? (
            <ErrorTextMessage
              textStyle={styles.text}
              style={styles.errorMessageIcon}
              children={data.notifications[0].notification}
              icon={'reload-sharp'}
              size={15}
            />
          ) : (
            <>
              {['CVF1'].includes(data.id) && (
                <Text_ textContainer={styles.textContainer} textStytle={styles.text} children={data.textTitle} />
              )}
            </>
          )}
          {['CVF3'].includes(data.id) && (
            <Input
              onChangeText={formSubmissionHandler.bind(this, 'cofirmCode')}
              value={codeInputForm.cofirmCode.value}
              keyboardType={'decimal-pad'}
              inputContainerStyle={formIsInvalid && styles.invalidInput}
              placeholder={data.placeholder}
            />
          )}

          <View style={styles.buttonMainContainer}>
            {['CVF4'].includes(data.id) && (
              <View style={styles.buttonContainer_1}>
                <Text_ children={data.textTitle} />

                <Button
                  children={data.buttonText}
                  textStyle={styles.buttonText_1}
                  onPress={() => {
                    console.log('sent');
                  }}
                />
              </View>
            )}
            <View style={styles.buttonContainer}>
              {codeInputForm.cofirmCode.value && ['CVF5'].includes(data.id) && (
                <Button onPress={verifyCode} textStyle={styles.buttonText} children={data.buttonText} style={styles.button} />
              )}
              {['CVF6'].includes(data.id) && (
                <Button
                  onPress={() => dataContext.switchContentFormHandler('forgotPass')}
                  textStyle={styles.buttonText}
                  children={data.buttonText}
                  style={styles.button}
                />
              )}
            </View>
          </View>
        </View>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  input: {
    minHeight: 45,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.light_grayTransparent,
    paddingHorizontal: 20,
  },
  invalidInput: {
    borderColor: Colors.red,
  },
  buttonMainContainer: {},
  buttonContainer_1: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: Colors.orange,
    paddingVertical: 10,
    paddingHorizontal: 100,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText_1: {
    fontSize: 13,
    color: Colors.orange,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 17,
  },
  errorMessageIcon: {
    marginBottom: 15,
  },
});
