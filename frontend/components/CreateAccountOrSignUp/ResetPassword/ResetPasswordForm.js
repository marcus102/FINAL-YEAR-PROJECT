import { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import Icons from '../../../util/Icons';
import Input from '../../../util/Input';
import Button from '../../../util/Button';
import { PASSWORD_RESET_FORM } from '../../../data/Database';
import ErrorTextMessage from '../../ErrorTextMessage/ErrorTextMessage';
import Colors from '../../../constants/colors';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import Text_ from '../../Text/Text';
import Animated, { FadeInRight, FadeOutUp } from 'react-native-reanimated';

export default function ResetPasswordForm() {
  const [inputs, setInputs] = useState({
    new_password: { value: '', isValid: true },
    confirm_password: { value: '', isValid: true },
  });
  const dataContext = useContext(ManagmentSystem);

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function resetPassword() {
    const formData = {
      new_password: inputs.new_password.value,
      confirm_password: inputs.confirm_password.value,
    };

    const new_passworIsValid = isNaN(formData.new_password) && formData.new_password.trim().length > 0;
    const confirm_passwordIsValid = isNaN(formData.confirm_password) && formData.confirm_password.trim().length > 0;

    if (!new_passworIsValid || !confirm_passwordIsValid) {
      setInputs((currentInputValues) => {
        return {
          new_password: {
            value: currentInputValues.new_password.value,
            isValid: new_passworIsValid,
          },
          confirm_password: {
            value: currentInputValues.confirm_password.value,
            isValid: confirm_passwordIsValid,
          },
        };
      });
      return;
    }

    //onSubmit(formData);

    setInputs({
      new_password: { value: '', isValid: true },
      confirm_password: { value: '', isValid: true },
    });

    dataContext.switchContentFormHandler('SignIn');
  }

  const formIsInvalid = !inputs.new_password.isValid || !inputs.confirm_password.isValid;

  return (
    <Animated.View entering={FadeInRight} exiting={FadeOutUp}>
      {PASSWORD_RESET_FORM.map((data) => (
        <View key={data.id} style={styles.container}>
          {['PRF1'].includes(data.id) && (
            <View style={styles.headerContainer}>
              <Text_ textStytle={styles.title1} children={data.textTitle} />

              <Icons icon={'checkmark-done'} size={70} color={Colors.lightOrange} />
            </View>
          )}
          {['PRF2'].includes(data.id) && <Text_ textStytle={styles.title2} children={data.notifications[0].notification} />}
          {['PRF3'].includes(data.id) && (
            <Input
              onChangeText={inputChangedHandler.bind(this, 'new_password')}
              value={inputs.new_password.value}
              children={data.formTitle}
              inputContainerStyle={formIsInvalid && styles.invalidInput}
              textStyle={formIsInvalid && styles.invalidInputTitle}
            />
          )}
          {['PRF4'].includes(data.id) && (
            <Input
              onChangeText={inputChangedHandler.bind(this, 'confirm_password')}
              value={inputs.confirm_password.value}
              children={data.formTitle}
              inputContainerStyle={formIsInvalid && styles.invalidInput}
              textStyle={formIsInvalid && styles.invalidInputTitle}
            />
          )}
          {['PRF5'].includes(data.id) && formIsInvalid && (
            <ErrorTextMessage children={data.notifications[0].notification} icon={'reload-sharp'} size={13} />
          )}
          <View style={styles.buttonContainer}>
            {['PRF6'].includes(data.id) && (
              <>
                {inputs.confirm_password.value && (
                  <Button textStyle={styles.buttonText} onPress={resetPassword} children={data.buttonText} style={styles.button} />
                )}
              </>
            )}
            {['PRF7'].includes(data.id) && (
              <Button
                textStyle={styles.buttonText}
                onPress={() => dataContext.switchContentFormHandler('resetCode')}
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
    maxHeight: 380,
    elevation: 5,
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
  container: {
    marginBottom: 15,
  },
  headerContainer: {
    alignItems: 'center',
  },
  title1: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title2: {
    fontSize: 13,
    color: Colors.gray,
  },
  inputContainer: {
    minHeight: 70,
  },
  buttonContainer: {
    alignItems: 'center',
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
  buttonText: {
    color: Colors.white,
    fontSize: 17,
  },
  invalidInput: {
    borderColor: Colors.red,
  },
  invalidInputTitle: {
    color: Colors.red,
  },
});
