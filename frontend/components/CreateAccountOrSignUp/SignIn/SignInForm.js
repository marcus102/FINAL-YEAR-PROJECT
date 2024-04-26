import { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import Input from '../../../util/Input';
import Button from '../../../util/Button';
import CheckBox from '../../../util/CheckBox_Text';
import { SIGN_IN_FORM } from '../../../data/Database';
import ErrorTextMessage from '../../ErrorTextMessage/ErrorTextMessage';
import { logInUser, fetchUserInfo } from '../../../HTTP Requests/UserRegistrationHttp';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import LoadingOverlay from '../../../util/LoadingPage';
import NotificationMessageOverlay from '../../../util/NotificationMessageOverlay';
import Colors from '../../../constants/colors';
import Animated, { FadeIn, SlideInLeft, SlideOutLeft } from 'react-native-reanimated';
import Text_ from '../../Text/Text';

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [messageId, setMessageId] = useState('');
  const dataContext = useContext(ManagmentSystem);
  const [isChecked, setIsChecked] = useState(true);
  const [inputs, setInputs] = useState({
    email: { value: '', isValid: true },
    password: { value: '', isValid: true },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function SignInHandler() {
    const formData = {
      email: inputs.email.value,
      password: inputs.password.value,
    };

    const emailIsValid = isNaN(formData.email) && formData.email.trim().length > 0;
    const passwordIsValid = isNaN(formData.password) && formData.password.trim().length > 0;

    if (!emailIsValid || !passwordIsValid) {
      setInputs((currentInputValues) => {
        return {
          email: {
            value: currentInputValues.email.value,
            isValid: emailIsValid,
          },
          password: {
            value: currentInputValues.password.value,
            isValid: passwordIsValid,
          },
        };
      });
      return;
    }

    dataContext.getPassword(formData.password);

    async function sign_In() {
      try {
        setIsLoading(true);
        dataContext.visibilityHandler(false);
        const response = await logInUser((email = formData.email), (password = formData.password));

        const userData = await fetchUserInfo(response.token);

        if (userData) {
          if (userData.user_status === 'Active') {
            dataContext.Authenticate(response.token);
            dataContext.visibilityHandler(true);
          } else if (userData.user_status === 'Inactive') {
            throw new Error('User is inactive.');
          }
        }
        setIsLoading(false);
      } catch (error) {
        setMessageId('LP1');
        setIsLoading(false);
        throw error.message;
      }
    }

    sign_In();

    setInputs({
      email: { value: '', isValid: true },
      password: { value: '', isValid: true },
    });
  }

  if (messageId && !isLoading) {
    return (
      <Animated.View entering={FadeIn}>
        <NotificationMessageOverlay
          onPress={() => {
            dataContext.switchContentFormHandler('SignIn');
            dataContext.visibilityHandler(true);
            setMessageId('');
          }}
          ID={messageId}
        />
      </Animated.View>
    );
  }

  if (isLoading) {
    return <LoadingOverlay loadingSpiner={true} />;
  }

  const formIsInvalid = !inputs.email.isValid || !inputs.password.isValid;

  return (
    <Animated.View entering={SlideInLeft} exiting={SlideOutLeft}>
      {SIGN_IN_FORM.map((data) => (
        <View key={data.id} style={styles.container}>
          {['SIF1'].includes(data.id) && (
            <Text_ textContainer={styles.titleContainer} textStytle={styles.title} children={data.textTitle} />
          )}
          {['SIF2'].includes(data.id) && (
            <Input
              onChangeText={inputChangedHandler.bind(this, 'email')}
              value={inputs.email.value}
              children={data.formTitle}
              textStyle={formIsInvalid && styles.invalidInputTitle}
              inputContainerStyle={formIsInvalid && styles.invalidInput}
              textInputStyle={styles.input}
            />
          )}
          {['SIF3'].includes(data.id) && (
            <Input
              onChangeText={inputChangedHandler.bind(this, 'password')}
              value={inputs.password.value}
              secureTextEntry={isChecked ? true : false}
              children={data.formTitle}
              textStyle={formIsInvalid && styles.invalidInputTitle}
              inputContainerStyle={formIsInvalid && styles.invalidInput}
              textInputStyle={styles.input}
            />
          )}

          {['SIF4'].includes(data.id) && (
            <CheckBox isActive={isChecked} children={data.textTitle} onPress={() => setIsChecked(!isChecked)} />
          )}

          {formIsInvalid && (
            <>
              {['SIF5'].includes(data.id) && <ErrorTextMessage children={data.notifications[0].notification} icon={'reload'} size={13} />}
            </>
          )}

          {['SIF6'].includes(data.id) && (
            <Button
              onPress={() => dataContext.switchContentFormHandler('forgotPass')}
              textStyle={styles.optionButtonColor}
              style={styles.forgotPassContainer}
              children={data.buttonText}
            />
          )}

          {['SIF7'].includes(data.id) && (
            <Button style={styles.button} onPress={SignInHandler} textStyle={styles.buttonColor} children={data.buttonText} />
          )}
        </View>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {},
  container: {},
  forgotPassContainer: {
    width: '40%',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.orange,
    marginVertical: 20,
    marginLeft: 10,
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  input: {
    paddingHorizontal: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.orange,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 40,
    marginVertical: 20,
  },
  signinButton: {},
  buttonToSignUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 5,
  },
  signInOptionText: {
    fontSize: 12,
  },
  signUpOptionButtonContainer: {},
  buttonColor: {
    color: Colors.white,
    fontSize: 18,
  },
  optionButtonColor: {
    color: Colors.orange,
    fontSize: 13,
  },
  invalidInput: {
    borderColor: Colors.red,
  },
  invalidInputTitle: {
    color: Colors.red,
  },
  showPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  showPasswordText: {
    marginHorizontal: 5,
    fontSize: 14,
  },
});
