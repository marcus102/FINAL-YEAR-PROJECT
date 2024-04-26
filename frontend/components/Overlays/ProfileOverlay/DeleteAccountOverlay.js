import { useState, useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { DELETE_ACCOUNT_OVERLAY } from '../../../data/Database';
import Input from '../../../util/Input';
import CheckBox from '../../../util/CheckBox_Text';
import Button from '../../../util/Button';
import Colors from '../../../constants/colors';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import { deleteUser, deleteAccountFeed } from '../../../HTTP Requests/UserRegistrationHttp';
import PlaneTextMessage from '../../../util/PlaneTextMessage';
import LoadingOverlay from '../../../util/LoadingPage';
import Animated, { FadeInUp, FadeIn, FadeOut } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorTextMessage from '../../ErrorTextMessage/ErrorTextMessage';
import Text_ from '../../Text/Text';

export default function DeleteAccount() {
  const dataContext = useContext(ManagmentSystem);
  const [isLoading, setIsLoading] = useState(false);
  const [messageId, setMessageId] = useState('');
  const [isNoneOfTheAbove, setIsNoneOfTheAbove] = useState(false);
  const [old_Pass, setOld_Pass] = useState('');
  const [feedback, setFeedback] = useState({
    feed: { value: '', isValid: true },
  });
  const [password, setPassword] = useState({
    password: { value: '', isValid: true },
  });
  const [isChecked, setIsChecked] = useState(true);
  const [passwordRequired, setPasswordRequired] = useState(true);

  function inputChangedHandler(inputIdentifier, enteredValue) {
    let setOption = setPassword;
    if (inputIdentifier === 'feed') {
      setOption = setFeedback;
    }

    setOption((currentInputValue) => {
      return {
        ...currentInputValue,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  useEffect(() => {
    async function getPassword() {
      const existing_password = await AsyncStorage.getItem('password');
      setOld_Pass(existing_password);
    }
    getPassword();
  }, []);

  function acountDeleteHandler(inputType, data) {
    if (inputType === 'password') {
      const formData = {
        password: password.password.value,
      };

      const passwordIsValid = isNaN(formData.password) && formData.password.trim().length > 0;

      if (!passwordIsValid) {
        setPassword((currentInputValues) => {
          return {
            password: {
              value: currentInputValues.password.value,
              isValid: passwordIsValid,
            },
          };
        });
        return;
      }

      if (old_Pass !== formData.password) {
        setMessageId('LP12');
        return;
      }
      setPasswordRequired(false);
      setMessageId('');
    } else {
      let optionChoice = feedback.feed.value;
      if (!feedback.feed.value) {
        optionChoice = data;
      }

      const formData = {
        reasons: optionChoice,
      };

      async function deleteCount() {
        try {
          setIsLoading(true);
          await deleteAccountFeed(formData.reasons);
          await deleteUser();
          AsyncStorage.removeItem('confirmation_code');
          dataContext.Logout();
          setIsLoading(false);
        } catch (error) {
          setMessageId('LP9');
          setIsLoading(false);
          throw error.message;
        }
      }
      deleteCount();
    }
  }

  if (isLoading) {
    return <LoadingOverlay loadingSpiner={true} overlayStyle={true} />;
  }

  const passwordIsInvalid = !password.password.isValid;

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <View>{messageId && !isLoading && <PlaneTextMessage ID={messageId} />}</View>
      {DELETE_ACCOUNT_OVERLAY.map((data) => (
        <View key={data.id}>
          {passwordRequired ? (
            <>
              {['DAO1'].includes(data.id) && (
                <Text_ textContainer={styles.mainTitleContainer} textStytle={styles.mainTitleText} children={data.textTitle} />
              )}
              {['DAO2'].includes(data.id) && (
                <Input
                  children={data.formTitle}
                  onChangeText={inputChangedHandler.bind(this, 'password')}
                  value={password.password.value}
                  secureTextEntry={isChecked ? true : false}
                  placeholder={data.placeHolder}
                  placeholderTextColor={Colors.gray}
                  textStyle={passwordIsInvalid && styles.invalidInputTitle}
                  inputContainerStyle={passwordIsInvalid && styles.invalidInput}
                />
              )}
              {['DAO3'].includes(data.id) && (
                <CheckBox isActive={isChecked} children={data.textTitle} onPress={() => setIsChecked(!isChecked)} />
              )}

              {passwordIsInvalid && (
                <>
                  {['DAO4'].includes(data.id) && (
                    <ErrorTextMessage children={data.notifications[0].notification} icon={data.icon} size={13} />
                  )}
                </>
              )}

              {['DAO5'].includes(data.id) && (
                <Button
                  children={data.buttonText}
                  style={styles.forgotPasswordButtonContainer}
                  textStyle={styles.forgotPasswordButtonText}
                  onPress={() => dataContext.Logout()}
                />
              )}
              {['DAO6'].includes(data.id) && (
                <Text_ textContainer={styles.noticeContainer} textStytle={styles.noticeText} children={data.textTitle} />
              )}
              {['DAO7'].includes(data.id) && (
                <Button
                  children={data.buttonText}
                  onPress={acountDeleteHandler.bind(this, 'password')}
                  style={styles.deleteButtonContainer1}
                  textStyle={styles.deleteButtonText}
                />
              )}
            </>
          ) : (
            <>
              {['DAO8'].includes(data.id) && (
                <Text_ textContainer={styles.mainTitleContainer} textStytle={styles.mainTitleText} children={data.textTitle} />
              )}

              {['DAO9'].includes(data.id) && <Text_ textStytle={styles.suggestionsText} children={data.textTitle} />}
              {['DAO10'].includes(data.id) && (
                <Button
                  children={data.buttonText}
                  textStyle={styles.suggestionsOtionsText}
                  onPress={() => acountDeleteHandler('reason', data.title)}
                />
              )}
              {['DAO11'].includes(data.id) && (
                <Button
                  children={data.buttonText}
                  textStyle={styles.suggestionsOtionsText}
                  onPress={() => acountDeleteHandler('reason', data.title)}
                />
              )}
              {['DAO12'].includes(data.id) && (
                <Button
                  children={data.buttonText}
                  textStyle={styles.suggestionsOtionsText}
                  onPress={() => acountDeleteHandler('reason', data.title)}
                />
              )}
              {['DAO13'].includes(data.id) && (
                <Button
                  children={data.buttonText}
                  textStyle={styles.suggestionsOtionsText}
                  onPress={() => acountDeleteHandler('reason', data.title)}
                />
              )}
              {['DAO14'].includes(data.id) && (
                <Button
                  children={data.buttonText}
                  textStyle={styles.suggestionsOtionsText}
                  onPress={() => {
                    setIsNoneOfTheAbove(true);
                  }}
                />
              )}

              {isNoneOfTheAbove && ['DAO15'].includes(data.id) && (
                <Animated.View style={styles.feedInputContainer} entering={FadeInUp}>
                  <Input
                    children={data.formTitle}
                    onChangeText={inputChangedHandler.bind(this, 'feed')}
                    value={feedback.feed.value}
                    textInputStyle={styles.textInputMultiline}
                    textStyle={styles.inputTitle}
                    placeholder={data.placeHolder}
                    placeholderTextColor={Colors.gray}
                    multiline={true}
                  />
                </Animated.View>
              )}

              {['DAO16'].includes(data.id) && (
                <Animated.View entering={FadeIn} style={styles.buttonContainer}>
                  {isNoneOfTheAbove && feedback.feed.value && (
                    <Button
                      children={data.buttonText}
                      textStyle={styles.butonText}
                      style={styles.deleteButtonContainer}
                      onPress={acountDeleteHandler.bind(this, 'reason')}
                    />
                  )}
                </Animated.View>
              )}
            </>
          )}
        </View>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  mainTitleContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  deleteFormContaier: {},
  mainContainer: {},
  suggestionsText: {
    color: Colors.gray,
    fontSize: 15,
  },
  noticeContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  noticeText: {
    fontSize: 13,
    color: Colors.gray,
  },
  suggestionsContainer: {
    marginVertical: 5,
  },
  suggestionsOtionsText: {
    fontSize: 18,
    fontWeight: '400',
    marginStart: 10,
    marginVertical: 15,
  },
  deleteButtonContainer: {
    alignItems: 'center',
    backgroundColor: Colors.orange,
    paddingVertical: 10,
    borderRadius: 10,
  },

  deleteButtonContainer1: {
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: Colors.orange,
    paddingVertical: 10,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: Colors.white,
  },
  textInputMultiline: {
    height: 120,
    textAlignVertical: 'top',
    width: '100%',
    borderRadius: 10,
  },
  mainTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputTitle: {},
  feedInputContainer: {
    marginVertical: 20,
  },
  buttonContainer: {
    marginVertical: 20,
  },
  button: {},
  butonText: {
    color: Colors.white,
    fontSize: 17,
  },
  forgotPasswordButtonContainer: {
    width: '40%',
    alignItems: 'center',
    marginVertical: 10,
  },
  forgotPasswordButtonText: {
    color: Colors.orange,
    fontSize: 13,
  },
  invalidInput: {
    borderColor: Colors.red,
  },
  invalidInputTitle: {
    color: Colors.red,
  },
});
