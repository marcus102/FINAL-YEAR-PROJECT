import { useState, useRef, useCallback, useContext } from 'react';
import { StyleSheet, View, FlatList, Pressable, RefreshControl } from 'react-native';
import { useIsFocused } from '@react-navigation/core';

import { DUMMY_TERM, DUMMY_CONDITIONS } from '../../data/allData';
import { TRANSLATE_TEXT, MORE, TERMS, CONDITIONS, SUMMARY, SUB_SUNNARY, TITLE, UPDATE_DATE } from '../../data/Database';
import IconTextButton from '../../util/IconTextButton';
import Button from '../../util/Button';
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';
import Colors from '../../constants/colors';
import Text_ from '../Text/Text';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import TranslateOverlay from '../Overlays/TranslateOverlay/TranslateOverlay';
import PopUpMessageHandler from '../../util/PopUpMessages';

export default function TermsConditionsHandler() {
  const [subSummaryVisible, setSubSummariesVisible] = useState(false);
  const [expandContent, setExpandContent] = useState(false);
  const objectID = useRef('');
  const [selectedOption, setSelectedOption] = useState('terms');
  const [refreshing, setRefreshing] = useState(false);

  const dataContext = useContext(ManagmentSystem);
  const themeOption = dataContext.themeOption;
  const darkMode = themeOption === 'Dark Mode';

  const isFocused = useIsFocused();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  if (isFocused && dataContext.translatedText.original_text && dataContext.translatedText.translated_text) {
    return (
      <PopUpMessageHandler
        onPress={() => {
          dataContext.translatedTextHandler(null, null);
        }}
        children_1={dataContext.translatedText.original_text}
        children_2={dataContext.translatedText.translated_text}
      />
    );
  }

  function FlatListHandler({ item }) {
    return (
      <Pressable
        onPress={() => {
          setExpandContent(!expandContent);
          objectID.current = item.id;
        }}
        style={styles.flatListRootContainer}
      >
        <View style={styles.titleMainContainer}>
          <Text_ textContainer={styles.titleContainer} textStyle={styles.titleText} children={item.title} />

          {expandContent && item.id === objectID.current ? (
            <Animated.View entering={FadeIn}>
              <Text_ textContainer={styles.contentContainer} children={item.titleData} />
            </Animated.View>
          ) : (
            <>
              {MORE.map((data) => (
                <Text_
                  key={data.id}
                  textContainer={styles.textContentHintContainer}
                  textStytle={styles.textContentHint}
                  children={data.textTitle}
                />
              ))}
            </>
          )}
          <View style={styles.translateRootContainer}>
            {TRANSLATE_TEXT.map((data) => (
              <IconTextButton
                key={data.id}
                children={data.buttonText}
                icon={'language'}
                size={17}
                color={Colors.lightOrange}
                onPress={() => {
                  objectID.current = item.id;
                  dataContext.translateOverlayHandler('true', 'terms_condition');
                }}
                textStyle={styles.translateText}
                containerStyle={styles.translateContainer}
              />
            ))}
          </View>
        </View>

        {item.id === objectID.current &&
          dataContext.translateOverlay.option === 'true' &&
          dataContext.translateOverlay.choice === 'terms_condition' && <TranslateOverlay visible={true} translationText={item.titleData} />}
      </Pressable>
    );
  }

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.rootContainer}>
      <View style={styles.optionsContainer}>
        {TERMS.map((data) => (
          <Button
            key={data.id}
            children={data.buttonText}
            textStyle={styles.option1Text}
            style={[styles.buttonStyle, selectedOption === 'terms' && styles.buttonStyleActive]}
            onPress={() => {
              setSelectedOption('terms');
            }}
          />
        ))}

        {CONDITIONS.map((data) => (
          <Button
            key={data.id}
            children={data.buttonText}
            textStyle={styles.option2Text}
            style={[styles.buttonStyle, selectedOption === 'conditions' && styles.buttonStyleActive]}
            onPress={() => {
              setSelectedOption('conditions');
            }}
          />
        ))}
      </View>

      <View style={styles.summaryRootContainer}>
        {SUMMARY.map((data) => (
          <IconTextButton
            key={data.id}
            children={data.buttonText}
            icon={subSummaryVisible ? 'remove' : 'add'}
            size={20}
            color={Colors.gray}
            containerStyle={styles.summaryContainer}
            textStyle={styles.summaryText}
            onPress={() => {
              setSubSummariesVisible(!subSummaryVisible);
            }}
          />
        ))}
        {subSummaryVisible && (
          <Animated.View entering={FadeInDown} exiting={FadeOut} style={styles.subSummaryContainer}>
            {SUB_SUNNARY.map((data) => (
              <Button
                key={data.id}
                children={data.buttonText}
                textStyle={styles.subSummaryText}
                // onPress={}
              />
            ))}
          </Animated.View>
        )}
      </View>

      <View style={styles.headerMainContainer}>
        {TITLE.map((data) => (
          <Text_ key={data.id} textStytle={styles.headerText} children={selectedOption === 'terms' ? data.textTitle : data.textTitle_1} />
        ))}

        {UPDATE_DATE.map((data) => (
          <Text_ key={data.id} textContainer={styles.dateContainer} textStytle={styles.dateText} children={data.textTitle} />
        ))}
      </View>
      <FlatList
        data={selectedOption === 'terms' ? DUMMY_TERM : DUMMY_CONDITIONS}
        key={(item) => item.id}
        renderItem={FlatListHandler}
        refreshControl={<RefreshControl tintColor={darkMode ? Colors.white : Colors.black} refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  flatListRootContainer: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: Colors.light_grayTransparent,
  },
  flatListDarkMode: {
    // backgroundColor: Colors.black,
    // shadowColor: Colors.light_gray,
    // borderColor: Colors.darkGray,
  },
  headerMainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateContainer: {
    minWidth: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  dateText: {
    color: Colors.gray,
    fontSize: 12,
    marginTop: 5,
    marginStart: 25,
  },
  titleMainContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  titleContainer: {
    marginVertical: 5,
  },
  titleText: {
    fontWeight: '500',
  },
  contentContainer: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  translateRootContainer: {
    minWidth: '100%',
    alignItems: 'flex-end',
  },
  translateContainer: {
    width: 130,
    height: 'auto',
    backgroundColor: Colors.transparentColor,
  },
  translateText: {
    color: Colors.lightOrange,
    fontWeight: '500',
    fontSize: 13,
    marginHorizontal: 5,
  },
  optionsContainer: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  option1Text: {
    fontWeight: '500',
  },
  option2Text: {
    fontWeight: '500',
  },
  buttonStyle: {
    alignItems: 'center',
    width: '50%',
    height: 40,
  },
  buttonStyleActive: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.orange,
  },
  summaryRootContainer: {
    minWidth: 100,
    marginVertical: 15,
  },
  summaryContainer: {
    minWidth: '100%',
    backgroundColor: Colors.transparentColor,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginTop: 0,
    marginHorizontal: 0,
  },
  summaryText: {
    // color: Colors.black,
    fontWeight: '500',
  },
  subSummaryContainer: {
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  subSummaryText: {
    fontWeight: '400',
  },
  textContentHintContainer: {
    marginHorizontal: 5,
  },
  textContentHint: {
    color: Colors.gray,
    fontSize: 13,
  },
  searchContainer: {
    height: 50,
    marginEnd: 5,
    marginVertical: 10,
  },
});
