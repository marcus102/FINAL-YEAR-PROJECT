import { useState, useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { ASSISTANCE_PAGE } from '../../data/Database';
import Icons from '../../util/Icons';
import IconTextButton from '../../util/IconTextButton';
import Input from '../../util/Input';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import LinksHandler from '../../util/Link';
import Colors from '../../constants/colors';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Text_ from '../Text/Text';
import { sendComplain } from '../../HTTP Requests/AssistanceRequest';
import NotificationMessageOverlay from '../../util/NotificationMessageOverlay';
import LoadingOverlay from '../../util/LoadingPage';
import ErrorTextMessage from '../ErrorTextMessage/ErrorTextMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Assistance() {
  const dataContext = useContext(ManagmentSystem);

  const [isLoading, setIsLoading] = useState(false);
  const [messageId, setMessageId] = useState('');
  const [inputs, setInputs] = useState({
    email: { value: '', isValid: true },
    description: { value: '', isValid: true },
    detail: { value: '', isValid: true },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  useEffect(() => {
    async function retrieveEmail() {
      const email_address = await AsyncStorage.getItem('email_address');

      if (email_address) {
        setInputs((currentInputValue) => {
          return {
            ...currentInputValue,
            email: { value: email_address, isValid: true },
          };
        });
      }
    }

    retrieveEmail();
  }, []);

  function assistanceFormHandler() {
    const formData = {
      email: inputs.email.value,
      description: inputs.description.value,
      detail: inputs.detail.value,
    };

    const emailIsValid = isNaN(formData.email) && formData.email.trim().length > 2;

    if (!emailIsValid) {
      setInputs((currentInputValue) => {
        return {
          email: {
            value: currentInputValue.email.value,
            isValid: emailIsValid,
          },
          description: {
            value: currentInputValue.description.value,
            isValid: true,
          },
          detail: {
            value: currentInputValue.detail.value,
            isValid: true,
          },
        };
      });
      return;
    }

    async function submitForm() {
      setIsLoading(true);
      try {
        await sendComplain((email = formData.email), (description = formData.description), (detail = formData.detail));
        setIsLoading(false);
        setMessageId('LP15');
      } catch (error) {
        setIsLoading(false);
        setMessageId('LP14');
        throw error.message;
      }
    }

    submitForm();
  }

  if (messageId && !isLoading) {
    return (
      <Animated.View entering={FadeIn}>
        <NotificationMessageOverlay
          onPress={() => {
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

  const formIsInvalid = !inputs.email.isValid;

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.rootConyainer}>
      {ASSISTANCE_PAGE.map((data) => (
        <View key={data.id} style={styles.container}>
          {['AP1'].includes(data.id) && (
            <View style={styles.mainTitleContainer}>
              <Text_ textStytle={styles.mainTitle} children={data.textTitle} />
            </View>
          )}

          {['AP2'].includes(data.id) && (
            <Text_
              textContainer={styles.mainTitleContainer_1}
              textStytle={styles.mainTitle_1}
              children={[data.textTitle, '@', dataContext.info]}
            />
          )}

          {['AP3'].includes(data.id) && (
            <View style={styles.secondTitleMaimContiner}>
              <Text_
                textContainer={styles.secondTitleContiner}
                textStytle={styles.secondTitle}
                children={data.notifications[0].notification}
              />

              <View style={styles.secondSubTitleContiner}>
                <Icons icon={'bulb-outline'} color={Colors.lightYellow} size={15} />
                <Text_ textStytle={styles.secondSubTitle} children={data.notifications[1].notification} />
              </View>
            </View>
          )}

          {['AP4'].includes(data.id) && (
            <View style={styles.thirdTitleMainContainer}>
              <Text_
                textContainer={styles.thirdTitleContainer}
                textStytle={styles.thirdTitle}
                children={data.notifications[0].notification}
              />

              <View style={styles.thirdSubTitleContainer}>
                <Icons icon={'information-circle-outline'} color={Colors.pink} size={15} />
                <Text_ textStytle={styles.thirdSubTitle} children={data.notifications[1].notification} />
              </View>
            </View>
          )}

          {['AP5'].includes(data.id) && (
            <Input
              onChangeText={inputChangedHandler.bind(this, 'email')}
              value={inputs.email.value}
              children={data.formTitle}
              placeholder={data.placeHolder}
              placeholderTextColor={Colors.gray}
              textStyle={[formIsInvalid && styles.invalidInputTitle]}
            />
          )}
          {['AP6'].includes(data.id) && (
            <Input
              onChangeText={inputChangedHandler.bind(this, 'description')}
              value={inputs.description.value}
              children={data.formTitle}
              placeholder={data.placeHolder}
              placeholderTextColor={Colors.gray}
            />
          )}
          {['AP7'].includes(data.id) && (
            <Input
              onChangeText={inputChangedHandler.bind(this, 'detail')}
              value={inputs.detail.value}
              textInputStyle={styles.textInputMultiline}
              multiline={true}
              children={data.formTitle}
              placeholder={data.placeHolder}
              placeholderTextColor={Colors.gray}
            />
          )}

          {formIsInvalid && (
            <View>
              {['AP8'].includes(data.id) && <ErrorTextMessage children={data.notifications[0].notification} icon={'reload'} size={13} />}
            </View>
          )}

          {['AP9'].includes(data.id) && inputs.email.value && inputs.description.value && inputs.detail.value && (
            <IconTextButton
              icon={'md-send'}
              size={20}
              color={Colors.white}
              children={data.buttonText}
              containerStyle={styles.ButtonContainer}
              textStyle={styles.ButtonText}
              onPress={assistanceFormHandler}
            />
          )}

          {['AP10'].includes(data.id) && (
            <View style={styles.FAQInfoContainer}>
              <Text_ textStytle={styles.FAQInfoText}>
                {data.textTitle}
                <LinksHandler
                  children={data.buttonText}
                  // onPress={}
                  textStyle={styles.linkText}
                  containerStyle={styles.linkContaier}
                />
              </Text_>
            </View>
          )}
        </View>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  rootConyainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  container: {},
  mainTitleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  mainTitleContainer_1: {
    marginVertical: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  mainTitle_1: {
    fontWeight: '500',
  },
  secondTitleMaimContiner: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  secondTitleContiner: {
    marginVertical: 15,
  },
  secondTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondSubTitleContiner: {
    flexDirection: 'row',
    borderWidth: 1,
    borderLeftWidth: 10,
    borderColor: Colors.orange,
    borderRadius: 10,
    padding: 10,
  },
  secondSubTitle: {
    fontSize: 12,
    color: Colors.gray,
  },
  thirdTitleMainContainer: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  thirdTitleContainer: {
    marginVertical: 15,
  },
  thirdTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  thirdSubTitleContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    borderWidth: 1,
    borderLeftWidth: 10,
    borderColor: Colors.red,
    borderRadius: 10,
    padding: 10,
  },
  thirdSubTitle: {
    fontSize: 12,
    color: Colors.gray,
  },
  textInputMultiline: {
    minHeight: 120,
    textAlignVertical: 'top',
    justifyContent: 'flex-start',
    marginBottom: 30,
  },
  textInput: {},
  ButtonContainer: {
    paddingVertical: 10,
    marginTop: 20,
    width: '50%',
    borderRadius: 10,
    paddingHorizontal: 40,
  },
  ButtonText: {
    color: Colors.white,
  },
  FAQInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  FAQInfoText: {
    fontSize: 14,
  },
  linkContaier: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.orange,
  },
  linkText: {
    fontSize: 13,
  },
  invalidInputTitle: {
    color: Colors.red,
  },
});
