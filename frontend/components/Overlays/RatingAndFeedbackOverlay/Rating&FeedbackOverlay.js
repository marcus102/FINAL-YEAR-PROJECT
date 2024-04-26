import { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import IconButton from '../../../util/IconButton';
import IconTextButton from '../../../util/IconTextButton';
import { RATING_FEEDBACK_OVERLAY, RATING_FEEDBACK_OVERLAY_BUTTON, ALL_DATA } from '../../../data/allData';
import ErrorTextMessage from '../../ErrorTextMessage/ErrorTextMessage';
import Colors from '../../../constants/colors';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import MainOverlay from '../MainOverlay/mainOverlay';
import Text_ from '../../Text/Text';
import Input from '../../../util/Input';

export default function RatingFeedbackOverlay({ visible, setIsOverlayOpen }) {
  const [starIsActive, setStarIsActive] = useState(null);
  const [inputs, setInputs] = useState({
    feedback: { value: '', isValid: true },
  });
  const dataContext = useContext(ManagmentSystem);
  const themeOption = dataContext.themeOption;

  function formSubmissionHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitFeedbackHandler() {
    const formData = {
      feedback: inputs.feedback.value,
    };

    const confirmFeedbackIsValid = starIsActive >= 1 || formData.feedback.trim().length > 0;

    if (!confirmFeedbackIsValid) {
      setInputs((currentInputValues) => {
        return {
          feedback: {
            value: currentInputValues.feedback.value,
            isValid: confirmFeedbackIsValid,
          },
        };
      });
      return;
    }

    setIsOverlayOpen(false);
  }

  function closeOverlay() {
    setIsOverlayOpen(false);
  }

  const codeNotValid = !inputs.feedback.isValid;

  return (
    <MainOverlay visible={visible} animationType="fade">
      <IconButton
        iconButtonContainer={styles.cancelButtonContainer_1}
        icon={'arrow-back-circle-outline'}
        size={35}
        color={Colors.orange}
        onPress={closeOverlay}
      />

      <View style={styles.rootContainer}>
        {RATING_FEEDBACK_OVERLAY.map((rateFeedData) => (
          <View key={rateFeedData.id} style={styles.container}>
            {rateFeedData.id === 'FRM1' && (
              <View style={styles.titleIconContainer}>
                <Text_ children={rateFeedData.title} textStytle={styles.titleText} textContainer={styles.titleContainer} />
                <View style={styles.iconsContainer}>
                  <IconButton
                    onPress={() => {
                      if (starIsActive === 1) {
                        setStarIsActive(null);
                      } else {
                        setStarIsActive(1);
                      }
                    }}
                    size={30}
                    color={Colors.orange}
                    icon={starIsActive >= 1 ? 'star' : rateFeedData.icon}
                  />
                  <IconButton
                    onPress={() => setStarIsActive(2)}
                    size={40}
                    color={Colors.orange}
                    icon={starIsActive >= 2 ? 'star' : rateFeedData.icon}
                  />
                  <IconButton
                    onPress={() => setStarIsActive(3)}
                    size={50}
                    color={Colors.orange}
                    icon={starIsActive >= 3 ? 'star' : rateFeedData.icon}
                  />
                  <IconButton
                    onPress={() => setStarIsActive(4)}
                    size={40}
                    color={Colors.orange}
                    icon={starIsActive >= 4 ? 'star' : rateFeedData.icon}
                  />
                  <IconButton
                    onPress={() => setStarIsActive(5)}
                    size={30}
                    color={Colors.orange}
                    icon={starIsActive >= 5 ? 'star' : rateFeedData.icon}
                  />
                </View>
              </View>
            )}

            {rateFeedData.id === 'FRM2' && (
              <Input
                extraStyle={styles.inputContainer}
                onChangeText={formSubmissionHandler.bind(this, 'feedback')}
                value={inputs.feedback.value}
                children={rateFeedData.title}
                textStyle={styles.inputText}
                textInputStyle={[styles.inputField, codeNotValid && styles.invalidInput]}
                placeholder={rateFeedData.placeHolder}
                multiline={true}
              />
            )}
          </View>
        ))}

        {codeNotValid && (
          <>
            {ALL_DATA.map((data) => (
              <View key={data.id}>{['NLP7'].includes(data.id) && <ErrorTextMessage children={data.message} />}</View>
            ))}
          </>
        )}

        {RATING_FEEDBACK_OVERLAY_BUTTON.map((data) => (
          <View key={data.id}>
            {data.id === 'FRBM2' && (
              <IconTextButton
                size={15}
                color={Colors.white}
                icon={data.icon}
                onPress={submitFeedbackHandler}
                children={data.title}
                textStyle={styles.buttonText}
                containerStyle={styles.sendButton}
              />
            )}
          </View>
        ))}
      </View>
    </MainOverlay>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
    padding: 10,
    marginTop: 10,
  },
  container: {
    height: 200,
  },
  titleIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    backgroundColor: Colors.transparentOrange,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 20,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
    marginVertical: 25,
  },
  inputContainer: {},
  inputField: {
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: Colors.light_gray,
    width: '100%',
    height: 50,
    borderRadius: 10,
    padding: 10,
  },
  sendButtonRootContainer: {},
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    paddingHorizontal: 5,
  },
  inputText: {
    fontSize: 16,
    marginBottom: 10,
  },
  invalidInput: {
    borderColor: Colors.red,
  },
  invalidInputTitle: {
    color: Colors.red,
  },
  keyboardAvoidingContainer: {
    justifyContent: 'center',
  },
  cancelButtonContainer_1: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.orange,
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginBottom: 15,
    marginTop: 70,
  },
  sendButton: {
    minWidth: 160,
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 40,
  },
  darkModeText: {
    color: Colors.darkModeText,
  },
  darkMode: {
    backgroundColor: Colors.black,
  },
});
