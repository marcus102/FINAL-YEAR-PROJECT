import { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

import { USER_INFO_PAGE } from '../../data/Database';
import SubProfileDataDetails from '../SubOptionsDetails/SubProfileDataDetails';
import Icons from '../../util/Icons';
import Button from '../../util/Button';
import InfoUpdateOverlay from '../Overlays/ProfileOverlay/InfoUpdateOverlay';
import { fetchUserInfo, confirmationMessage } from '../../HTTP Requests/UserRegistrationHttp';
import LoadingOverlay from '../../util/LoadingPage';
import NotificationMessageOverlay from '../../util/NotificationMessageOverlay';
import ConfirmCodeForm from '../CreateAccountOrSignUp/ConfirmCode/ConfirmCodeForm';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import Animated, { FadeIn } from 'react-native-reanimated';
import Colors from '../../constants/colors';
import Text_ from '../Text/Text';

export default function PersonnalInfo() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messageId, setMessageId] = useState();
  const [userInfo, setUserInfo] = useState({
    surname1: { value: '' },
    last_name1: { value: '' },
    username1: { value: '' },
    date_of_birth1: { value: '' },
    email_address1: { value: '' },
    phone_number1: { value: '' },
    gender1: { value: '' },
    country1: { value: '' },
  });
  const dataContext = useContext(ManagmentSystem);
  const isVerified = dataContext.isVerified;

  useEffect(() => {
    setIsLoading(true);
    async function getUserInfo() {
      try {
        const response = await fetchUserInfo();
        const responseData = response;
        setUserInfo((prevInfo) => ({
          ...prevInfo,
          surname1: { value: responseData.surname },
          last_name1: { value: responseData.last_name },
          username1: { value: responseData.username },
          date_of_birth1: { value: responseData.date_of_birth },
          email_address1: { value: responseData.email },
          phone_number1: { value: responseData.phone_number },
          gender1: { value: responseData.gender },
          country1: { value: responseData.country },
        }));
        // console.log(userInfo);
        setIsLoading(false);
      } catch (error) {
        setMessageId('LP4');
        setIsLoading(false);
      }
    }
    getUserInfo();

    // async function fetchConfirmCode() {
    //   const code = await AsyncStorage.getItem('confirmation_code');
    //   setIsConfirmed(code);
    // }

    // fetchConfirmCode();
  }, []);

  function overlayHandler() {
    setIsOverlayOpen(!isOverlayOpen);
  }

  // TRY MAX 3 TIMES WAIT 1MIN AND CONTINUE...
  async function confirmInfo() {
    setIsLoading(true);
    try {
      const number = userInfo.phone_number1.value;
      await confirmationMessage((phone_number = number));
      setIsLoading(false);
    } catch (error) {
      setMessageId('LP5');
      setIsLoading(false);
    }

    setIsVisible(true);
  }

  if (messageId && !isLoading) {
    return (
      <Animated.View entering={FadeIn}>
        <NotificationMessageOverlay
          // onPress={onPress}
          ID={messageId}
        />
      </Animated.View>
    );
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (!userInfo) {
    return <Text_ textContainer={styles.messageContainer} textStytle={styles.messageText} children={'No Content Available!!!'} />;
  }

  return (
    //title: surname value: sawadogo
    <ScrollView style={styles.scrollView}>
      {USER_INFO_PAGE.map((data) => (
        <Animated.View entering={FadeIn} key={data.id}>
          {['UIP1'].includes(data.id) && <SubProfileDataDetails title={data.textTitle} value={userInfo.surname1.value} />}
          {['UIP2'].includes(data.id) && <SubProfileDataDetails title={data.textTitle} value={userInfo.last_name1.value} />}
          {['UIP3'].includes(data.id) && <SubProfileDataDetails title={data.textTitle} value={userInfo.username1.value} />}
          {['UIP4'].includes(data.id) && <SubProfileDataDetails title={data.textTitle} value={userInfo.date_of_birth1.value} />}
          {['UIP5'].includes(data.id) && <SubProfileDataDetails title={data.textTitle} value={userInfo.email_address1.value} />}
          {['UIP6'].includes(data.id) && <SubProfileDataDetails title={data.textTitle} value={userInfo.phone_number1.value} />}
          {['UIP7'].includes(data.id) && <SubProfileDataDetails title={data.textTitle} value={userInfo.gender1.value} />}
          {['UIP8'].includes(data.id) && <SubProfileDataDetails title={data.textTitle} value={userInfo.country1.value} />}

          {['UIP9'].includes(data.id) && (
            <View style={styles.buttonRootContainer}>
              <Icons icon={'pencil'} size={20} color={Colors.orange} />
              <Button onPress={overlayHandler} style={styles.button} textStyle={styles.buttonText} children={data.buttonText} />
            </View>
          )}
          {['UIP10'].includes(data.id) && !isVerified && (
            <View style={styles.buttonRootContainer2}>
              <Icons icon={'shield-checkmark-outline'} size={20} color={Colors.red} />
              <Button onPress={confirmInfo} style={styles.button} textStyle={styles.buttonText2} children={data.buttonText} />
            </View>
          )}
        </Animated.View>
      ))}

      <InfoUpdateOverlay visible={isOverlayOpen} setIsOverlayOpenData={setIsOverlayOpen} />

      <ConfirmCodeForm visible={isVisible} resendCode={confirmInfo} setIsVisibleData={setIsVisible} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  buttonRootContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  buttonRootContainer2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    paddingLeft: 5,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.orange,
  },
  buttonText2: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.red,
  },
  messageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
