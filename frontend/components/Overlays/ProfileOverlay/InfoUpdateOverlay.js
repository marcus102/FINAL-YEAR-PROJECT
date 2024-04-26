import { useState, useContext, useEffect, useRef } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import Input from '../../../util/Input';
import Icons from '../../../util/Icons';
import Button from '../../../util/Button';
import { UPDATE_USER_INFO_OVERLAY } from '../../../data/Database';
import ErrorTextMessage from '../../ErrorTextMessage/ErrorTextMessage';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingOverlay from '../../../util/LoadingPage';
import { addProfileImageRequest, updateUserProfile } from '../../../HTTP Requests/ProfileImageHttp';
import { updateUser } from '../../../HTTP Requests/UserRegistrationHttp';
import NotificationMessageOverlay from '../../../util/NotificationMessageOverlay';
import IconButton from '../../../util/IconButton';
import CountryOverlayHint from '../OverlayHints/CountyHintOverlay';
import GenderOverlayHint from '../OverlayHints/GenderOverlayHint';
import Colors from '../../../constants/colors';
import MainOverlay from '../MainOverlay/mainOverlay';
import Text_ from '../../Text/Text';

export default function InfoUpdateOverlay({ visible, setIsOverlayOpenData }) {
  const dataContext = useContext(ManagmentSystem);
  const [isVisible, setIVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageId, setMessageId] = useState();
  const [hasGalleryPermission, setHasGalleryPermission] = useState();
  // const [image, setImage] = useState('');
  const [hintOverlay, setHintOverlay] = useState(false);
  const [hintOverlay_1, setHintOverlay_1] = useState(false);
  const renderGender = useRef('');
  const renderCountry = useRef('');

  const [inputs, setInputs] = useState({
    surname: { value: '', isValid: true },
    last_name: { value: '', isValid: true },
    username: { value: '', isValid: true },
    date_of_birth: { value: '', isValid: true },
    email_address: { value: '', isValid: true },
    phone_number: { value: '', isValid: true },
    gender: { value: '', isValid: true },
    country: { value: '', isValid: true },
  });

  useEffect(() => {
    setIsLoading(true);
    async function getuserInfo() {
      try {
        const surname = await AsyncStorage.getItem('surname');
        const last_name = await AsyncStorage.getItem('last_name');
        const username = await AsyncStorage.getItem('username');
        const date_of_birth = await AsyncStorage.getItem('date_of_birth');
        const email_address = await AsyncStorage.getItem('email_address');
        const phone_number = await AsyncStorage.getItem('phone_number');
        const gender = await AsyncStorage.getItem('gender');
        const country = await AsyncStorage.getItem('country');

        setInputs({
          surname: { value: surname ? surname : '', isValid: true },
          last_name: { value: last_name ? last_name : '', isValid: true },
          username: { value: username ? username : '', isValid: true },
          date_of_birth: {
            value: date_of_birth ? date_of_birth : '',
            isValid: true,
          },
          email_address: {
            value: email_address ? email_address : '',
            isValid: true,
          },
          phone_number: {
            value: phone_number ? phone_number : '',
            isValid: true,
          },
          gender: { value: gender ? gender : '', isValid: true },
          country: { value: country ? country : '', isValid: true },
        });

        setIsLoading(false);
      } catch (error) {
        setMessageId('LP7');
        setIsLoading(false);
      }
    }
    getuserInfo();
  }, []);

  async function pickImage() {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
    setIsLoading(true);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });

      if (!result.canceled) {
        if (dataContext.profileImageId) {
          await updateUserProfile(dataContext.profileImageId, result.assets[0].uri);
        } else {
          await addProfileImageRequest(result.assets[0].uri);
        }
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error.message;
    }
  }

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function updateUserInfoHandler() {
    const formData = {
      surname: inputs.surname.value,
      last_name: inputs.last_name.value,
      username: inputs.username.value,
      date_of_birth: inputs.date_of_birth.value,
      email_address: inputs.email_address.value,
      phone_number: +inputs.phone_number.value,
      gender: renderGender.current ? renderGender.current : inputs.gender.value,
      country: renderCountry.current ? renderCountry.current : inputs.country.value,
    };

    const surnameIsValid = isNaN(formData.surname) && formData.surname.trim().length > 0;
    const last_nameIsValid = isNaN(formData.last_name) && formData.last_name.trim().length > 0;
    const usernameIsValid = isNaN(formData.username) && formData.username.trim().length > 0;
    const date_of_birthIsValid = isNaN(formData.date_of_birth) && formData.date_of_birth.trim().length > 0;
    const email_addressIsValid = isNaN(formData.email_address) && formData.email_address.trim().length > 0;
    const phone_numberIsValid = !isNaN(formData.phone_number) && formData.phone_number > 0;
    const genderIsValid = isNaN(formData.gender) && formData.gender.trim().length > 0;
    const countryIsValid = isNaN(formData.country) && formData.country.trim().length > 0;

    if (
      !surnameIsValid ||
      !last_nameIsValid ||
      !usernameIsValid ||
      !date_of_birthIsValid ||
      !email_addressIsValid ||
      !phone_numberIsValid ||
      !genderIsValid ||
      !countryIsValid
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
          username: {
            value: currentInputValues.username.value,
            isValid: usernameIsValid,
          },
          date_of_birth: {
            value: currentInputValues.date_of_birth.value,
            isValid: date_of_birthIsValid,
          },
          email_address: {
            value: currentInputValues.email_address.value,
            isValid: email_addressIsValid,
          },
          phone_number: {
            value: currentInputValues.phone_number.value,
            isValid: phone_numberIsValid,
          },
          gender: {
            value: currentInputValues.gender.value,
            isValid: genderIsValid,
          },
          country: {
            value: currentInputValues.country.value,
            isValid: countryIsValid,
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

    async function updateHandler() {
      setIsLoading(true);
      try {
        await updateUser(
          (surname = formData.surname),
          (last_name = formData.last_name),
          (username = formData.username),
          (date_of_birth = formData.date_of_birth),
          (email = formData.email_address),
          (phone_number = formData.phone_number),
          (gender = formData.gender),
          (country = formData.country)
        );
      } catch (error) {
        setMessageId('LP6');
        setIsLoading(false);
      }
    }

    updateHandler();
    setIVisible(!isVisible);
  }

  if (messageId && !isLoading) {
    return (
      <View>
        <NotificationMessageOverlay
          // onPress={onPress}
          ID={messageId}
        />
      </View>
    );
  }

  if (isLoading) {
    return <LoadingOverlay loadingSpiner={false} />;
  }

  function manageHintOverlay(inputIdentifier) {
    if (inputIdentifier && inputIdentifier === 'gender') {
      setHintOverlay(true);
      setHintOverlay_1(false);
    } else if (inputIdentifier && inputIdentifier === 'country') {
      setHintOverlay_1(true);
      setHintOverlay(false);
    } else if (inputIdentifier && inputIdentifier === 'cancelOverlay') {
      setIsOverlayOpenData(false);
      setHintOverlay_1(false);
    }
  }

  function hintHandler(inputIdentifier, hintData) {
    if (inputIdentifier && inputIdentifier === 'country') {
      renderCountry.current = hintData;
      setHintOverlay_1(false);
    } else if (inputIdentifier && inputIdentifier === 'gender') {
      renderGender.current = hintData;
      setHintOverlay(false);
    } else if (inputIdentifier && inputIdentifier === 'cancel') {
      setHintOverlay_1(false);
      setHintOverlay(false);
    }
  }

  const codeIsNotValid =
    !inputs.surname.isValid ||
    !inputs.last_name.isValid ||
    !inputs.username.isValid ||
    !inputs.date_of_birth.isValid ||
    !inputs.email_address.isValid ||
    !inputs.phone_number.isValid ||
    !inputs.gender.isValid ||
    !inputs.country.isValid;

  return (
    <MainOverlay visible={visible} animationType="slide" rootContainer={styles.rootContainer}>
      <View style={styles.cancelButtonContainer}>
        <IconButton
          icon={'arrow-back-circle-outline'}
          size={30}
          color={Colors.orange}
          onPress={manageHintOverlay.bind(this, 'cancelOverlay')}
        />
      </View>
      {!hintOverlay_1 ? (
        <ScrollView style={styles.ScrollView}>
          <View style={styles.mainContainer}>
            {UPDATE_USER_INFO_OVERLAY.map((data) => (
              <View key={data.id} style={styles.container}>
                {['UUIO1'].includes(data.id) && (
                  <View style={styles.addImageContainer}>
                    <Text_ children={data.textTitle} />
                    <View style={styles.addImageButton}>
                      <Button children={data.buttonText} onPress={pickImage} />
                      <Icons style={styles.icon} color={Colors.orange} size={20} icon={'add-circle'} />
                    </View>
                  </View>
                )}

                {['UUIO2'].includes(data.id) && (
                  <Input
                    onChangeText={inputChangedHandler.bind(this, 'surname')}
                    value={inputs.surname.value}
                    children={data.formTitle}
                    placeholder={data.placeHolder}
                    onPressIn={hintHandler.bind(this, 'cancel')}
                    textStyle={codeIsNotValid && styles.invalidInputTitle}
                    textInputStyle={codeIsNotValid && styles.invalidInput}
                  />
                )}
                {['UUIO3'].includes(data.id) && (
                  <Input
                    onChangeText={inputChangedHandler.bind(this, 'last_name')}
                    value={inputs.last_name.value}
                    children={data.formTitle}
                    placeholder={data.placeHolder}
                    onPressIn={hintHandler.bind(this, 'cancel')}
                    textStyle={codeIsNotValid && styles.invalidInputTitle}
                    textInputStyle={codeIsNotValid && styles.invalidInput}
                  />
                )}
                {['UUIO4'].includes(data.id) && (
                  <Input
                    onChangeText={inputChangedHandler.bind(this, 'username')}
                    value={inputs.username.value}
                    children={data.formTitle}
                    placeholder={data.placeHolder}
                    onPressIn={hintHandler.bind(this, 'cancel')}
                    textStyle={codeIsNotValid && styles.invalidInputTitle}
                    textInputStyle={codeIsNotValid && styles.invalidInput}
                  />
                )}
                {['UUIO5'].includes(data.id) && (
                  <Input
                    onChangeText={inputChangedHandler.bind(this, 'date_of_birth')}
                    value={inputs.date_of_birth.value}
                    children={data.formTitle}
                    placeholder={data.placeHolder}
                    onPressIn={hintHandler.bind(this, 'cancel')}
                    textStyle={codeIsNotValid && styles.invalidInputTitle}
                    textInputStyle={codeIsNotValid && styles.invalidInput}
                  />
                )}
                {['UUIO6'].includes(data.id) && (
                  <Input
                    onChangeText={inputChangedHandler.bind(this, 'email_address')}
                    value={inputs.email_address.value}
                    textStyle={codeIsNotValid && styles.invalidInputTitle}
                    textInputStyle={codeIsNotValid && styles.invalidInput}
                    children={data.formTitle}
                    placeholder={data.placeHolder}
                    onPressIn={hintHandler.bind(this, 'cancel')}
                  />
                )}
                {['UUIO7'].includes(data.id) && (
                  <Input
                    onChangeText={inputChangedHandler.bind(this, 'phone_number')}
                    value={inputs.phone_number.value}
                    textStyle={codeIsNotValid && styles.invalidInputTitle}
                    textInputStyle={codeIsNotValid && styles.invalidInput}
                    children={data.formTitle}
                    placeholder={data.placeHolder}
                    onPressIn={hintHandler.bind(this, 'cancel')}
                  />
                )}
                {['UUIO8'].includes(data.id) && (
                  <Input
                    onChangeText={inputChangedHandler.bind(this, 'gender')}
                    value={renderGender.current ? renderGender.current : inputs.gender.value}
                    textStyle={codeIsNotValid && styles.invalidInputTitle}
                    textInputStyle={[styles.inputContainer, codeIsNotValid && styles.invalidInput]}
                    children={data.formTitle}
                    placeholder={data.placeHolder}
                    icon={'arrow-forward-circle-outline'}
                    size={40}
                    color={Colors.orange}
                    onPress={manageHintOverlay.bind(this, 'gender')}
                    iconVisible={true}
                  />
                )}
                {['UUIO9'].includes(data.id) && (
                  <Input
                    onChangeText={inputChangedHandler.bind(this, 'country')}
                    value={renderCountry.current ? renderCountry.current : inputs.country.value}
                    textStyle={codeIsNotValid && styles.invalidInputTitle}
                    textInputStyle={[styles.inputContainer, codeIsNotValid && styles.invalidInput]}
                    children={data.formTitle}
                    placeholder={data.placeHolder}
                    icon={'arrow-forward-circle-outline'}
                    size={40}
                    color={Colors.orange}
                    onPress={manageHintOverlay.bind(this, 'country')}
                    iconVisible={true}
                  />
                )}

                {['UUIO10'].includes(data.id) && codeIsNotValid && (
                  <>
                    {['NLP6'].includes(data.id) && (
                      <ErrorTextMessage children={data.message} icon={data.notifications[0].notification} size={13} />
                    )}
                  </>
                )}

                {['UUIO11'].includes(data.id) && (
                  <View style={styles.buttonContainer}>
                    <Button textStyle={styles.buttonText} onPress={updateUserInfoHandler} children={data.buttonText} />
                    <Icons size={20} color={Colors.white} icon={'arrow-up'} />
                  </View>
                )}
              </View>
            ))}
            {/* </View>  */}

            <View style={styles.genderHintOverlayStytle}>
              <GenderOverlayHint visible={hintOverlay} onsubmit={hintHandler.bind(this, 'gender')} />
            </View>
          </View>
        </ScrollView>
      ) : (
        <CountryOverlayHint visible={hintOverlay_1} onsubmit={hintHandler.bind(this, 'country')} />
      )}
    </MainOverlay>
  );
}

const styles = StyleSheet.create({
  genderHintOverlayStytle: {
    height: 0,
    width: 0,
    position: 'absolute',
    top: 455,
    bottom: 0,
    left: 5,
    right: 0,
  },
  rootContainer: {
    marginTop: 60,
  },
  mainContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  container: {
    minHeight: 70,
    marginVertical: 5,
  },
  buttonContainer: {
    marginTop: 15,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.orange,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: 'bold',
  },
  addImageContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addImageButton: {
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.gray,
    padding: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  ScrollView: {
    flex: 1,
  },
  invalidInput: {
    borderColor: Colors.red,
  },
  invalidInputTitle: {
    color: Colors.red,
  },
  cancelButtonContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.orange,
    justifyContent: 'center',
    padding: 5,
  },
  inputContainer: {
    width: '85%',
    marginRight: 15,
    marginBottom: 0,
  },
  darkModeText: {
    color: Colors.darkModeText,
  },
  darkMode: {
    backgroundColor: Colors.black,
  },
});
