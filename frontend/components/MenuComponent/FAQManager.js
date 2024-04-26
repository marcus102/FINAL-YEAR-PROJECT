import { useRef, useState, useContext, useCallback } from 'react';
import { StyleSheet, View, FlatList, Pressable, RefreshControl } from 'react-native';
import { useIsFocused } from '@react-navigation/core';

import { DUMMY_FAQ } from '../../data/allData';
import { MORE, TRANSLATE_TEXT, FEEDBACK, YES, NO } from '../../data/Database';
import Button from '../../util/Button';
import IconTextButton from '../../util/IconTextButton';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Colors from '../../constants/colors';
import Text_ from '../Text/Text';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import TranslateOverlay from '../Overlays/TranslateOverlay/TranslateOverlay';
import PopUpMessageHandler from '../../util/PopUpMessages';

export default function FAQHandler() {
  const [expand, setExpand] = useState(false);
  const [myId, setMyId] = useState('');
  const objectID = useRef('');
  const [userExperience, setUserExperience] = useState([]);
  // const [userFeed, setUserFeed] = useState('');
  const [userExperienceVisible, setUserExperiencevisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const dataContext = useContext(ManagmentSystem);
  const themeOption = dataContext.themeOption;
  const darkMode = themeOption === 'Dark Mode';

  const isFocused = useIsFocused();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  function userExperienceHandler(feed, id) {
    setUserExperience((prevData) => [...prevData, { id: id, feed: feed }]);
    setUserExperiencevisible(false);
    setMyId(id);
  }

  function expandHandler(id) {
    setExpand(!expand);
    objectID.current = id;
    setUserExperiencevisible(true);
  }

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

  function PressHandler({ item }) {
    return (
      <Pressable onPress={() => expandHandler(item.id)} style={styles.flatListRootContainer}>
        <View style={styles.questionRootContainer}>
          <IconTextButton
            children={item.title}
            icon={expand && item.id === objectID.current ? 'bulb' : 'bulb-outline'}
            color={expand && item.id === objectID.current ? Colors.yellow : Colors.gray}
            size={17}
            onPress={() => expandHandler(item.id)}
            containerStyle={styles.questionContainer}
            textStyle={[styles.questionText]}
          />
        </View>
        {expand && item.id === objectID.current ? (
          <Animated.View entering={FadeIn} style={styles.answerRootContainer}>
            <Text_ textContainer={styles.answerTextContainer} textStytle={styles.answerText} children={item.titleData} />

            {item.id === objectID.current && userExperienceVisible ? (
              <View style={styles.userExperienceTextContainer}>
                <Text_ textStytle={styles.userExperienceText} children={item.placeHolder} />
                <View style={styles.userExperienceButtonContainer}>
                  <>
                    {YES.map((data) => (
                      <Button
                        key={data.id}
                        children={data.buttonText}
                        onPress={() => userExperienceHandler(data.buttonText, item.id)}
                        textStyle={styles.userExperienceButtonText}
                      />
                    ))}
                  </>
                  <>
                    {NO.map((data) => (
                      <Button
                        key={data.id}
                        children={data.buttonText}
                        onPress={() => userExperienceHandler(data.buttonText, item.id)}
                        textStyle={styles.userExperienceButtonText}
                      />
                    ))}
                  </>
                </View>
              </View>
            ) : (
              <>
                {FEEDBACK.map((data) => (
                  <Text_ key={data.id} textContainer={styles.feedContainer} textStytle={styles.feedText} children={data.textTitle} />
                ))}
              </>
            )}
          </Animated.View>
        ) : (
          <>
            {MORE.map((data) => (
              <Text_ key={data.id} textStytle={styles.hintText} children={data.textTitle} />
            ))}
          </>
        )}
        <View style={styles.buttonRootContainer}>
          {TRANSLATE_TEXT.map((data) => (
            <IconTextButton
              key={data.id}
              children={data.buttonText}
              icon={'language'}
              size={17}
              color={Colors.lightOrange}
              onPress={() => {
                objectID.current = item.id;
                dataContext.translateOverlayHandler('true', 'faq');
              }}
              textStyle={styles.buttonText}
              containerStyle={styles.buttonContainer}
            />
          ))}
        </View>

        {item.id === objectID.current &&
          dataContext.translateOverlay.option === 'true' &&
          dataContext.translateOverlay.choice === 'faq' && <TranslateOverlay visible={true} translationText={item.titleData} />}
      </Pressable>
    );
  }

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.rootContainer}>
      <View style={styles.flatList}>
        <FlatList
          data={DUMMY_FAQ}
          key={(item) => item.id}
          renderItem={PressHandler}
          refreshControl={
            <RefreshControl tintColor={darkMode ? Colors.white : Colors.black} refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginHorizontal: 10,
  },
  flatList: {
    marginBottom: 100,
  },
  flatListRootContainer: {
    minHeight: 100,
    minWidth: 300,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderColor: Colors.light_grayTransparent,
  },
  flatListDarkMode: {
    backgroundColor: Colors.black,
    shadowColor: Colors.light_gray,
    borderColor: Colors.darkGray,
  },
  questionRootContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 1,
  },
  questionContainer: {
    minWidth: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: Colors.transparentColor,
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginTop: 0,
    marginHorizontal: 0,
  },
  questionText: {
    marginEnd: 10,
    fontSize: 15,
  },
  answerRootContainer: {
    paddingHorizontal: 10,
  },
  answerTextContainer: {},
  answerText: {
    marginHorizontal: 10,
    fontWeight: '400',
  },
  userExperienceTextContainer: {
    width: 115,
    alignItems: 'center',
    marginVertical: 10,
  },
  userExperienceButtonText: {
    fontWeight: '500',
    color: Colors.gray,
  },
  userExperienceText: {
    color: Colors.gray,
  },
  userExperienceButtonContainer: {
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  buttonRootContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.lightOrange,
    marginHorizontal: 5,
    fontWeight: '500',
    fontSize: 13,
  },
  buttonContainer: {
    width: 130,
    height: 'auto',
    backgroundColor: Colors.transparentColor,
  },
  hintText: {
    color: Colors.gray,
    marginHorizontal: 10,
  },
  feedContainer: {
    maxWidth: 220,
    minHeight: 50,
    backgroundColor: Colors.lightGreen,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    elevation: 2,
    shadowColor: Colors.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  feedText: {
    color: Colors.gray,
  },
});
