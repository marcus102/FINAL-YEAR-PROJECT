import React, { useContext, useRef } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

import { LANGUAGES_LIST } from '../../../data/Database';
import MainOverlay from '../MainOverlay/mainOverlay';
import Button from '../../../util/Button';
import Colors from '../../../constants/colors';
import IconButton from '../../../util/IconButton';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import { TranslateText } from '../../../HTTP Requests/TranslationRequest';

export default function TranslateOverlay({ visible, translationText }) {
  const objectID = useRef('');

  const dataContext = useContext(ManagmentSystem);
  const themeOption = dataContext.themeOption;
  const darkMode = themeOption === 'Dark Mode';

  return (
    <MainOverlay visible={visible} animationType={'slide'} rootContainer={styles.rootContainer}>
      <IconButton
        icon={'close-circle-outline'}
        size={30}
        color={Colors.red}
        onPress={() => {
          dataContext.translateOverlayHandler('false', '');
        }}
        iconButtonContainer={styles.closeIconContainer}
      />
      <ScrollView>
        {LANGUAGES_LIST.map((data) => (
          <React.Fragment key={data.id}>
            {dataContext.loading.option === true && dataContext.loading.choice === 'translateOverlay' && data.id == objectID.current ? (
              <ActivityIndicator size="large" color={darkMode ? Colors.white : Colors.black} />
            ) : (
              <Button
                key={data.id}
                children={data.buttonText}
                style={styles.translateButon}
                onPress={async () => {
                  try {
                    dataContext.loadingHandler(true, 'translateOverlay');
                    objectID.current = data.id;
                    let language = 'en';
                    if (data.buttonText === 'French') {
                      language = 'fr';
                    } else if (data.buttonText === 'Spanish') {
                      language = 'es';
                    }
                    const translatedText = await TranslateText('en', language, translationText);

                    // console.log(translatedText);
                    dataContext.translatedTextHandler(translatedText.original_text, translatedText.translated_text);

                    dataContext.loadingHandler(false, 'translateOverlay');
                    dataContext.translateOverlayHandler('false', '');
                  } catch (error) {
                    dataContext.loadingHandler(false, 'translateOverlay');
                    throw error.message;
                  }
                }}
              />
            )}
          </React.Fragment>
        ))}
      </ScrollView>
    </MainOverlay>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: 650,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.gray,
  },

  translateButon: {
    marginVertical: 15,
    alignItems: 'center',
  },
  // translateButonText: {},
  closeIconContainer: {
    alignItems: 'flex-end',
  },
});
