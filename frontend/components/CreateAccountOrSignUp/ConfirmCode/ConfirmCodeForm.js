import { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import { CODE_VERIFICATION_FORM } from '../../../data/Database';
import Button from '../../../util/Button';
import KeyBoardAvoidingViewHandler from '../../KeyBoardAvoidingFunctions/KeyBoardAvoidingView';
import ErrorTextMessage from '../../ErrorTextMessage/ErrorTextMessage';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import { confirmationCode } from '../../../HTTP Requests/UserRegistrationHttp';
import LoadingOverlay from '../../../util/LoadingPage';
import PlaneTextMessage from '../../../util/PlaneTextMessage';
import Colors from '../../../constants/colors';
import MainOverlay from '../../Overlays/MainOverlay/mainOverlay';
import Input from '../../../util/Input';
import Text_ from '../../Text/Text';

export default function ConfirmCodeForm({ visible, resendCode, setIsVisibleData }) {
  const [messageId, setMessageId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [codeInputForm, setCodeInputForm] = useState({
    cofirmCode: { value: '', isValid: true },
  });

  const dataContext = useContext(ManagmentSystem);
  const themeOption = dataContext.themeOption;
  const darkMode = themeOption === 'Dark Mode';

  function formSubmissionHandler(inputIdentifier, enteredValue) {
    setCodeInputForm((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitOrCancelHandler(identifier) {
    if (identifier === 'submit_code') {
      const formData = {
        confirmCode: codeInputForm.cofirmCode.value,
      };

      const confirmCodeIsValid = !isNaN(formData.confirmCode) && formData.confirmCode.trim().length > 0;

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

      async function sendConfirmCode() {
        setIsLoading(true);
        try {
          const response = await confirmationCode(formData.confirmCode);
          if (response.status === '500') {
            throw new Error("Code doesn't match");
          }
          setIsVisibleData(false);
          dataContext.cofirmCode(formData.confirmCode);
          setIsLoading(false);
        } catch (error) {
          setMessageId('LP11');
          setIsLoading(false);
        }
      }

      sendConfirmCode();
    } else {
      setIsVisibleData(false);
    }
  }

  if (isLoading) {
    return <LoadingOverlay loadingSpiner={false} overlayStyle={true} />;
  }

  const codeNotValid = !codeInputForm.cofirmCode.isValid;

  return (
    <MainOverlay visible={visible} animationType="slide" rootContainer={styles.rootContainer}>
      <KeyBoardAvoidingViewHandler>
        <View style={styles.notificationContainer}>{messageId && !isLoading && <PlaneTextMessage ID={messageId} />}</View>
        {CODE_VERIFICATION_FORM.map((data) => (
          <View key={data.id}>
            <View style={styles.container}>
              {codeNotValid ? (
                <>
                  {['CVF2'].includes(data.id) && (
                    <ErrorTextMessage
                      textStyle={[styles.text, darkMode && styles.darkModeText]}
                      children={data.notifications[0].notification}
                      icon={'reload-sharp'}
                      size={15}
                      style={styles.errorMessageIcon}
                    />
                  )}
                </>
              ) : (
                <>{['CVF1'].includes(data.id) && <Text_ textStytle={styles.text} children={data.textTitle} />}</>
              )}
              {['CVF3'].includes(data.id) && (
                <Input
                  onChangeText={formSubmissionHandler.bind(this, 'cofirmCode')}
                  value={codeInputForm.cofirmCode.value}
                  keyboardType={'decimal-pad'}
                  inputContainerStyle={[styles.input, codeNotValid && styles.invalidInput]}
                  placeholder={data.placeholder}
                />
              )}
            </View>

            <View style={styles.buttonMainContainer}>
              {['CVF4'].includes(data.id) && (
                <View style={styles.buttonContainer_1}>
                  <Text_ children={data.textTitle} />

                  <Button children={data.buttonText} textStyle={styles.buttonText_1} onPress={resendCode} />
                </View>
              )}
              <View style={styles.buttonContainer}>
                {['CVF5'].includes(data.id) && (
                  <Button onPress={submitOrCancelHandler.bind(this, 'cancel')} textStyle={styles.buttonText} children={data.buttonText} />
                )}
                {['CVF6'].includes(data.id) && (
                  <Button
                    onPress={submitOrCancelHandler.bind(this, 'submit_code')}
                    textStyle={styles.buttonText}
                    children={data.buttonText}
                  />
                )}
              </View>
            </View>
          </View>
        ))}
      </KeyBoardAvoidingViewHandler>
    </MainOverlay>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    maxHeight: 250,
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
  container: {
    marginTop: 30,
    marginBottom: 10,
    minHeight: 70,
  },
  input: {
    minHeight: 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.light_gray,
    paddingHorizontal: 10,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText_1: {
    fontSize: 13,
    color: Colors.orange,
  },
  buttonText: {
    color: Colors.orange,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorMessageIcon: {
    marginBottom: 15,
  },
  darkModeText: {
    color: Colors.darkModeText,
  },
  darkMode: {
    backgroundColor: Colors.black,
  },
});
