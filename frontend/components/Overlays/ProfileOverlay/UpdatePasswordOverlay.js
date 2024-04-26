import { useState, useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { UPDATE_PASSWORD_OVERLAY } from '../../../data/Database';
import Colors from '../../../constants/colors';
import Button from '../../../util/Button';
import Input from '../../../util/Input';
import CheckBox from '../../../util/CheckBox_Text';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import PlaneTextMessage from '../../../util/PlaneTextMessage';
import LoadingOverlay from '../../../util/LoadingPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updatePassword } from '../../../HTTP Requests/UserRegistrationHttp';
import ErrorTextMessage from '../../ErrorTextMessage/ErrorTextMessage';
import Text_ from '../../Text/Text';

export default function UpdatePassword() {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [messageId, setMessageId] = useState('');
  const [old_Pass, setOld_Pass] = useState('');
  const [isChecked, setIsChecked] = useState(true);
  const [inputs, setInputs] = useState({
    old_password: { value: '', isValid: true },
    new_password: { value: '', isValid: true },
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

  useEffect(() => {
    async function getPassword() {
      const existing_password = await AsyncStorage.getItem('password');
      setOld_Pass(existing_password);
    }

    getPassword();

    if (messageId && inputs && !isFocused) {
      setMessageId();

      setInputs((currentInputValues) => {
        return {
          ...currentInputValues,
          old_password: { value: '', isValid: true },
          new_password: { value: '', isValid: true },
        };
      });
    }
  }, []);

  function passwordUpdateHandler() {
    const formData = {
      old_password: inputs.old_password.value,
      new_password: inputs.new_password.value,
    };

    const old_passwordIsValid = isNaN(formData.old_password) && formData.old_password.trim().length > 0;
    const new_passwordIsValid = isNaN(formData.new_password) && formData.new_password.trim().length > 0;

    if (!old_passwordIsValid || !new_passwordIsValid) {
      setInputs((currentInputValues) => {
        return {
          old_password: {
            value: currentInputValues.old_password.value,
            isValid: old_passwordIsValid,
          },
          new_password: {
            value: currentInputValues.new_password.value,
            isValid: new_passwordIsValid,
          },
        };
      });
      return;
    }

    async function update_Password() {
      setIsLoading(true);
      try {
        if (old_Pass !== formData.old_password) {
          throw new Error('Incorect password!');
        }
        const response = await updatePassword((password = formData.new_password));
        await AsyncStorage.setItem('password', formData.new_password);
        dataContext.Logout();
        setIsLoading(false);
      } catch (error) {
        setMessageId('LP10');
        setIsLoading(false);
      }
    }
    update_Password();
  }

  if (isLoading) {
    return <LoadingOverlay loadingSpiner={true} overlayStyle={true} />;
  }

  const updateIsInvalid = !inputs.old_password.isValid || !inputs.new_password.isValid;

  return (
    <>
      <View>{messageId && !isLoading && <PlaneTextMessage ID={messageId} />}</View>
      {UPDATE_PASSWORD_OVERLAY.map((data) => (
        <View key={data.id}>
          {['UPO1'].includes(data.id) && (
            <Text_ textContainer={styles.mainTitleContainer} textStytle={styles.mainTitleText} children={data.textTitle} />
          )}

          <View>
            {['UPO2'].includes(data.id) && (
              <Input
                onChangeText={inputChangedHandler.bind(this, 'old_password')}
                secureTextEntry={isChecked ? true : false}
                value={inputs.old_password.value}
                inputContainerStyle={updateIsInvalid && styles.invalidInput}
                children={data.formTitle}
                placeholder={data.placeholder}
                placeholderTextColor={Colors.gray}
                textStyle={updateIsInvalid && styles.invalidInputTitle}
                extraStyle={styles.inputContainer}
              />
            )}

            {['UPO3'].includes(data.id) && (
              <Input
                onChangeText={inputChangedHandler.bind(this, 'new_password')}
                secureTextEntry={isChecked ? true : false}
                value={inputs.new_password.value}
                inputContainerStyle={updateIsInvalid && styles.invalidInput}
                children={data.formTitle}
                placeholder={data.placeholder}
                placeholderTextColor={Colors.gray}
                textStyle={updateIsInvalid && styles.invalidInputTitle}
                extraStyle={styles.inputContainer}
              />
            )}

            {['UPO4'].includes(data.id) && (
              <CheckBox isActive={isChecked} children={data.textTitle} onPress={() => setIsChecked(!isChecked)} />
            )}
          </View>

          {updateIsInvalid && (
            <>
              {['UPO5'].includes(data.id) && (
                <ErrorTextMessage children={data.notifications[0].notification} icon={'reload-sharp'} size={13} />
              )}
            </>
          )}

          <View>
            {['UPO6'].includes(data.id) && (
              <Button
                children={data.buttonText}
                textStyle={styles.forgotPasswordButtonText}
                style={styles.forgotPasswordButtonContainer}
                onPress={() => dataContext.Logout()}
              />
            )}

            {['UPO7'].includes(data.id) && (
              <Text_ textContainer={styles.noticeContainer} textStytle={styles.noticeText} children={data.textTitle} />
            )}

            {['UPO8'].includes(data.id) && (
              <Button
                children={data.buttonText}
                textStyle={styles.butonText}
                style={styles.passordButtonContainer}
                onPress={passwordUpdateHandler}
              />
            )}
          </View>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  button: {},
  butonText: {
    color: Colors.white,
    fontSize: 17,
  },
  mainTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainTitleContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  noticeContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  noticeText: {
    fontSize: 13,
    color: Colors.gray,
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
  passordButtonContainer: {
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: Colors.orange,
    paddingVertical: 10,
    borderRadius: 10,
  },
  inputContainer: {
    marginVertical: 5,
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
  darkMode: {
    backgroundColor: Colors.black,
  },
});
