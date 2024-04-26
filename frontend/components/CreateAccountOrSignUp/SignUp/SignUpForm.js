import { useState, useContext, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import Input from '../../../util/Input';
import Button from '../../../util/Button';
import IconButton from '../../../util/IconButton';
import CheckBox from '../../../util/CheckBox_Text';
import LinksHandler from '../../../util/Link';
import { SIGN_UP_FORM } from '../../../data/Database';
import GenderOverlayHint from '../../Overlays/OverlayHints/GenderOverlayHint';
import CountryOverlayHint from '../../Overlays/OverlayHints/CountyHintOverlay';
import ErrorTextMessage from '../../ErrorTextMessage/ErrorTextMessage';
import Colors from '../../../constants/colors';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import { createUser } from '../../../HTTP Requests/UserRegistrationHttp';
import Animated, { FadeIn, SlideInRight, SlideOutRight } from 'react-native-reanimated';
import Text_ from '../../Text/Text';
import NotificationMessageOverlay from '../../../util/NotificationMessageOverlay';

export default function SignUpForm() {
  const [switchFormContent, setSwitchFormContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageId, setMessageId] = useState('');
  const [genderHint, setGenderHint] = useState(false);
  const [hasAgree, setHasAgree] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [inputs, setInputs] = useState({
    surname: { value: '', isValid: true },
    last_name: { value: '', isValid: true },
    email_address: { value: '', isValid: true },
    phone_number: { value: '', isValid: true },
    username: { value: '', isValid: true },
    date_of_birth: { value: '', isValid: true },
    gender: { value: '', isValid: true },
    country: { value: '', isValid: true },
    password: { value: '', isValid: true },
    confirm_password: { value: '', isValid: true },
  });
  const dataContext = useContext(ManagmentSystem);
  const renderGender = useRef('');
  const renderCountry = useRef('');

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function createAccount() {
    const formData = {
      surname: inputs.surname.value,
      last_name: inputs.last_name.value,
      email_address: inputs.email_address.value,
      phone_number: inputs.phone_number.value,
      username: inputs.username.value,
      date_of_birth: inputs.date_of_birth.value,
      gender: renderGender.current ? renderGender.current : inputs.gender.value,
      country: renderCountry.current ? renderCountry.current : inputs.country.value,
      password: inputs.password.value,
      confirm_password: inputs.confirm_password.value,
    };

    const surnameIsValid = isNaN(formData.surname) && formData.surname.trim().length > 0;
    const last_nameIsValid = isNaN(formData.last_name) && formData.last_name.trim().length > 0;
    const email_addressIsValid = isNaN(formData.email_address) && formData.email_address.trim().length > 0;
    const phone_numberIsValid = !isNaN(formData.phone_number) && formData.phone_number.trim().length > 0;
    const usernameIsValid = isNaN(formData.username) && formData.username.trim().length > 0;
    const date_of_birthIsValid = isNaN(formData.date_of_birth) && formData.date_of_birth.trim().length > 0;
    const genderIsValid = isNaN(formData.gender) && formData.gender.trim().length > 0;
    const countryIsValid = isNaN(formData.country) && formData.country.trim().length > 0;
    const passwordIsValid = isNaN(formData.password) && formData.password.trim().length > 0;
    const confirm_passwordIsValid = isNaN(formData.confirm_password) && formData.confirm_password.trim().length > 0;

    if (
      !surnameIsValid ||
      !last_nameIsValid ||
      !email_addressIsValid ||
      !phone_numberIsValid ||
      !usernameIsValid ||
      !date_of_birthIsValid ||
      !genderIsValid ||
      !countryIsValid ||
      !passwordIsValid ||
      !confirm_passwordIsValid
    ) {
      setInputs((currentInputValues) => {
        return {
          surname: {
            value: currentInputValues.surname.value,
            isValid: surnameIsValid,
          },
          last_name: {
            value: currentInputValues.last_name.value,
            isValid: last_nameIsValid,
          },
          email_address: {
            value: currentInputValues.email_address.value,
            isValid: email_addressIsValid,
          },
          phone_number: {
            value: currentInputValues.phone_number.value,
            isValid: phone_numberIsValid,
          },
          username: {
            value: currentInputValues.username.value,
            isValid: usernameIsValid,
          },
          date_of_birth: {
            value: currentInputValues.date_of_birth.value,
            isValid: date_of_birthIsValid,
          },
          gender: {
            value: currentInputValues.gender.value,
            isValid: genderIsValid,
          },
          country: {
            value: currentInputValues.country.value,
            isValid: countryIsValid,
          },
          password: {
            value: currentInputValues.password.value,
            isValid: passwordIsValid,
          },
          confirm_password: {
            value: currentInputValues.confirm_password.value,
            isValid: confirm_passwordIsValid,
          },
        };
      });
      return;
    }

    const userArray = {
      surname: formData.surname,
      last_name: formData.last_name,
      username: formData.username,
      date_of_birth: formData.date_of_birth,
      email_address: formData.email_address,
      phone_number: formData.phone_number,
      gender: formData.gender,
      country: formData.country,
    };

    Object.entries(userArray).forEach(([key, value]) => {
      dataContext.userSignUp(key, value);
    });

    dataContext.getPassword(formData.password);

    async function sign_Up() {
      setIsLoading(true);
      dataContext.visibilityHandler(false);
      try {
        await createUser(
          (surname = formData.surname),
          (last_name = formData.last_name),
          (username = formData.username),
          (date_of_birth = formData.date_of_birth),
          (email = formData.email_address),
          (phone_number = formData.phone_number),
          (gender = formData.gender),
          (country = formData.country),
          (password = formData.password)
        );
        dataContext.visibilityHandler(true);
      } catch (error) {
        setMessageId('LP3');
        setIsLoading(false);
      }
    }

    sign_Up();
    dataContext.switchContentFormHandler('SignIn');
  }

  if (messageId && !isLoading) {
    return (
      <Animated.View entering={FadeIn}>
        <NotificationMessageOverlay onPress={() => dataContext.switchContentFormHandler('SignUp')} ID={messageId} />
      </Animated.View>
    );
  }

  if (isLoading) {
    return <LoadingOverlay loadingSpiner={true} />;
  }

  function hintHandler(inputType) {
    if (inputType === 'close') {
      setGenderHint(false);
    } else if (inputType === 'gender') {
      setGenderHint(true);
    } else if (inputType === 'country') {
      setSwitchFormContent(true);
    }
  }

  function renderGenderHint(hintData) {
    renderGender.current = hintData;
    setGenderHint(false);
  }

  function renderCountryHint(hintData) {
    renderCountry.current = hintData;
    setSwitchFormContent(false);
  }

  const formIsInvalid =
    !inputs.surname.isValid ||
    !inputs.last_name.isValid ||
    !inputs.email_address.isValid ||
    !inputs.phone_number.isValid ||
    !inputs.username.isValid ||
    !inputs.date_of_birth.isValid ||
    !inputs.gender.isValid ||
    !inputs.country.isValid ||
    !inputs.password.isValid ||
    !inputs.confirm_password.isValid;

  return (
    <Animated.View entering={SlideInRight} exiting={SlideOutRight}>
      {!switchFormContent ? (
        <>
          {SIGN_UP_FORM.map((data) => (
            <View key={data.id} style={styles.Container}>
              {data.id === 'SUF1' && (
                <Text_ textContainer={styles.titleContainer} textStytle={styles.titleText} children={data.textTitle} />
              )}
              {['SUF2'].includes(data.id) && (
                <Input
                  onChangeText={inputChangedHandler.bind(this, 'surname')}
                  value={inputs.surname.value}
                  children={data.formTitle}
                  inputContainerStyle={formIsInvalid && styles.invalidInput}
                  textStyle={formIsInvalid && styles.invalidInputTitle}
                  onPressIn={hintHandler.bind(this, 'close')}
                  // keyboardType={}
                />
              )}
              {['SUF3'].includes(data.id) && (
                <Input
                  onChangeText={inputChangedHandler.bind(this, 'last_name')}
                  value={inputs.last_name.value}
                  children={data.formTitle}
                  inputContainerStyle={formIsInvalid && styles.invalidInput}
                  textStyle={formIsInvalid && styles.invalidInputTitle}
                  onPressIn={hintHandler.bind(this, 'close')}
                />
              )}
              {['SUF4'].includes(data.id) && (
                <Input
                  onChangeText={inputChangedHandler.bind(this, 'email_address')}
                  value={inputs.email_address.value}
                  children={data.formTitle}
                  inputContainerStyle={formIsInvalid && styles.invalidInput}
                  textStyle={formIsInvalid && styles.invalidInputTitle}
                  onPressIn={hintHandler.bind(this, 'close')}
                />
              )}
              {['SUF5'].includes(data.id) && (
                <Input
                  onChangeText={inputChangedHandler.bind(this, 'phone_number')}
                  value={inputs.phone_number.value}
                  keyboardType={'decimal-pad'}
                  children={data.formTitle}
                  inputContainerStyle={formIsInvalid && styles.invalidInput}
                  textStyle={formIsInvalid && styles.invalidInputTitle}
                  onPressIn={hintHandler.bind(this, 'close')}
                />
              )}
              {['SUF6'].includes(data.id) && (
                <Input
                  onChangeText={inputChangedHandler.bind(this, 'username')}
                  value={inputs.username.value}
                  children={data.formTitle}
                  inputContainerStyle={formIsInvalid && styles.invalidInput}
                  textStyle={formIsInvalid && styles.invalidInputTitle}
                  onPressIn={hintHandler.bind(this, 'close')}
                />
              )}
              {['SUF7'].includes(data.id) && (
                <Input
                  onChangeText={inputChangedHandler.bind(this, 'date_of_birth')}
                  value={inputs.date_of_birth.value}
                  children={data.formTitle}
                  inputContainerStyle={formIsInvalid && styles.invalidInput}
                  textStyle={formIsInvalid && styles.invalidInputTitle}
                  onPressIn={hintHandler.bind(this, 'close')}
                />
              )}
              {['SUF8'].includes(data.id) && (
                <Input
                  onChangeText={inputChangedHandler.bind(this, 'gender')}
                  value={renderGender.current ? renderGender.current : inputs.gender.value}
                  children={data.formTitle}
                  inputContainerStyle={formIsInvalid && styles.invalidInput}
                  textStyle={formIsInvalid && styles.invalidInputTitle}
                  textInputStyle={styles.inputContainer}
                  icon={'arrow-forward-circle-outline'}
                  size={35}
                  color={Colors.orange}
                  onPress={hintHandler.bind(this, 'gender')}
                  iconVisible={true}
                />
              )}
              {['SUF9'].includes(data.id) && (
                <Input
                  onChangeText={inputChangedHandler.bind(this, 'country')}
                  value={renderCountry.current ? renderCountry.current : inputs.country.value}
                  children={data.formTitle}
                  inputContainerStyle={formIsInvalid && styles.invalidInput}
                  textStyle={formIsInvalid && styles.invalidInputTitle}
                  textInputStyle={styles.inputContainer}
                  icon={'arrow-forward-circle-outline'}
                  size={35}
                  color={Colors.orange}
                  onPress={hintHandler.bind(this, 'country')}
                  iconVisible={true}
                />
              )}
              {['SUF10'].includes(data.id) && (
                <Input
                  onChangeText={inputChangedHandler.bind(this, 'password')}
                  value={inputs.password.value}
                  secureTextEntry={isChecked ? true : false}
                  children={data.formTitle}
                  inputContainerStyle={formIsInvalid && styles.invalidInput}
                  textStyle={formIsInvalid && styles.invalidInputTitle}
                  onPressIn={hintHandler.bind(this, 'close')}
                />
              )}
              {['SUF11'].includes(data.id) && (
                <Input
                  onChangeText={inputChangedHandler.bind(this, 'confirm_password')}
                  value={inputs.confirm_password.value}
                  secureTextEntry={isChecked ? true : false}
                  children={data.formTitle}
                  inputContainerStyle={formIsInvalid && styles.invalidInput}
                  textStyle={formIsInvalid && styles.invalidInputTitle}
                  onPressIn={hintHandler.bind(this, 'close')}
                />
              )}

              {['SUF12'].includes(data.id) && (
                <CheckBox children={data.textTitle} isActive={isChecked} onPress={() => setIsChecked(!isChecked)} />
              )}

              {formIsInvalid && (
                <View style={styles.errorMessageContainer}>
                  {['SUF13'].includes(data.id) && (
                    <ErrorTextMessage children={data.notifications[0].notification} icon={'reload'} size={13} />
                  )}
                </View>
              )}

              {['SUF14'].includes(data.id) && (
                <View style={styles.termsConditionsContainer}>
                  <IconButton
                    icon={hasAgree ? 'checkbox-sharp' : 'square-outline'}
                    color={Colors.orange}
                    size={20}
                    onPress={() => setHasAgree(!hasAgree)}
                  />
                  <Text_ textStytle={styles.termsConditionsText} children={data.textTitle} />

                  <LinksHandler
                    children={data.buttonText}
                    textStyle={styles.termsConditionsText}
                    // onPress={}
                  />
                </View>
              )}

              {['SUF15'].includes(data.id) && (
                <Button
                  onPress={createAccount}
                  children={data.buttonText}
                  style={styles.createButtonContainer}
                  textStyle={styles.createButtonText}
                />
              )}
            </View>
          ))}
        </>
      ) : (
        <CountryOverlayHint onsubmit={renderCountryHint} />
      )}
      <View style={styles.genderOverlay}>
        <GenderOverlayHint visible={genderHint} onsubmit={renderGenderHint} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  Container: {},
  titleContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  termsConditionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  termsConditionsText: {
    marginHorizontal: 5,
    fontSize: 14,
  },
  genderOverlay: {
    position: 'absolute',
    height: 0,
    width: 0,
    top: 380,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  inputContainer: {
    width: '85%',
    marginRight: 15,
    marginBottom: 0,
  },
  invalidInput: {
    borderColor: Colors.red,
  },
  invalidInputTitle: {
    color: Colors.red,
  },
  createButtonContainer: {
    backgroundColor: Colors.orange,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 40,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 12,
    color: Colors.orange,
  },
  createButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  signInOptionContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInOptionText: {
    fontSize: 12,
  },
  errorMessageContainer: {},
  darkModeText: {
    color: Colors.darkModeText,
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
