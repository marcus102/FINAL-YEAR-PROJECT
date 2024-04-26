import { useState, useRef, useContext, useCallback, useEffect } from 'react';
import { StyleSheet, View, FlatList, Pressable, Image, RefreshControl, ActivityIndicator } from 'react-native';
import Animated, { FadeIn, FadeOut, set } from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/core';

import IconButton from '../../util/IconButton';
import Button from '../../util/Button';
import IconTextButton from '../../util/IconTextButton';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import Colors from '../../constants/colors';
import Text_ from '../Text/Text';
import TranslateOverlay from '../Overlays/TranslateOverlay/TranslateOverlay';
import { FetchPrediction, UploadPrediction, DeletePrediction } from '../../HTTP Requests/ImageRecognition';
import LoadingOverlay from '../../util/LoadingPage';
import NotificationMessageOverlay from '../../util/NotificationMessageOverlay';
import PopUpMessageHandler from '../../util/PopUpMessages';

export default function Favorites() {
  const [expand, setExpand] = useState(false);
  const objectID = useRef('');
  const objectID_2 = useRef('');
  const [refreshing, setRefreshing] = useState(false);

  const dataContext = useContext(ManagmentSystem);
  const themeOption = dataContext.themeOption;
  const darkMode = themeOption === 'Dark Mode';

  const isFocused = useIsFocused();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      preditionsHandler();
      setRefreshing(false);
    }, 1000);
  }, []);

  function expandHandler(id) {
    setExpand(!expand);
    objectID.current = id;
  }

  const preditionsHandler = async () => {
    try {
      dataContext.loadingHandler(true, 'favorite');
      const predictions = await FetchPrediction();

      if (Array.isArray(predictions)) {
        await Promise.all(predictions.map((data) => dataContext.predictionsHandler(data, '')));
      }
      dataContext.loadingHandler(false, 'favorite');
    } catch (error) {
      dataContext.loadingHandler(false, 'favorite');
      dataContext.messageIdHandler('LP17', 'favorite');
      throw error.message;
    }
  };

  useEffect(() => {
    preditionsHandler();
  }, []);

  const UserExperienceHandler = async (id, parameter, option) => {
    try {
      dataContext.loadingHandler(true, 'user_experience');
      await UploadPrediction(id, parameter, option);
      dataContext.loadingHandler(false, 'user_experience');
      dataContext.messageIdHandler('LP19', 'user_experience');
    } catch (error) {
      dataContext.loadingHandler(false, 'user_experience');
      dataContext.messageIdHandler('LP18', 'user_experience');
      throw error.message;
    }
  };

  if (dataContext.loading.option === true && dataContext.loading.choice === 'favorite') {
    return <LoadingOverlay loadingSpiner={true} overlayStyle={styles.loadingOverlay} />;
  }

  const conditions = [
    { id: 'LP17', choice: 'favorite' },
    { id: 'LP18', choice: 'favoriteIcon' },
    { id: 'LP19', choice: 'user_experience' },
  ];

  const isConditionMet = conditions.some(
    (condition) =>
      dataContext.messageId.id === condition.id &&
      dataContext.messageId.choice === condition.choice &&
      dataContext.loading.option === false &&
      dataContext.loading.choice === condition.choice
  );

  if (isConditionMet) {
    return (
      <Animated.View entering={FadeIn}>
        <NotificationMessageOverlay
          onPress={() => {
            dataContext.messageIdHandler('', '');
            preditionsHandler();
          }}
          ID={dataContext.messageId.id}
        />
      </Animated.View>
    );
  }

  if (
    dataContext.predictions.predictionsData &&
    Array.isArray(dataContext.predictions.predictionsData) &&
    dataContext.predictions.predictionsData.every((item) => item.favorites === 'No')
  ) {
    return <Text_ textContainer={styles.messageContainer} textStytle={styles.messageText} children={'Page Is Empty !!!'} />;
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

  function FavoritesList({ item }) {
    return (
      <>
        {objectID_2.current === item.id && dataContext.loading.option === true && dataContext.loading.choice === 'favoriteIcon_2' ? (
          <ActivityIndicator size="large" color={darkMode ? Colors.white : Colors.black} />
        ) : (
          <>
            {item.favorites === 'Yes' && (
              <Pressable onPress={() => expandHandler(item.id)} style={styles.FlatListRootContainer}>
                <View style={styles.mainContainer}>
                  <View style={styles.iconButtonContainer}>
                    <Text_ textStytle={styles.dateText} children={['Added since ', item.date]} />
                    {objectID_2.current === item.id &&
                    dataContext.loading.option === true &&
                    dataContext.loading.choice === 'favoriteIcon' ? (
                      <ActivityIndicator size="small" color={darkMode ? Colors.white : Colors.black} />
                    ) : (
                      <IconButton
                        icon={item.likes === 'Yes' ? 'heart' : 'heart-outline'}
                        size={25}
                        color={item.likes === 'Yes' ? Colors.red : Colors.orange}
                        onPress={async () => {
                          try {
                            dataContext.loadingHandler(true, 'favoriteIcon');
                            let choice = '';
                            objectID_2.current = item.id;
                            if (objectID_2.current) {
                              item.likes === 'Yes' ? (choice = 'No') : (choice = 'Yes');
                              await UploadPrediction(item.id, choice, 'like');
                            }

                            const predictions = await FetchPrediction();
                            if (Array.isArray(predictions)) {
                              await Promise.all(predictions.map((data) => dataContext.predictionsHandler(data)));
                            }
                            dataContext.loadingHandler(false, 'favoriteIcon');
                          } catch (error) {
                            dataContext.loadingHandler(false, 'favoriteIcon');
                            dataContext.messageIdHandler('LP18', 'favoriteIcon');
                            throw error.message;
                          }
                        }}
                      />
                    )}
                    <IconButton
                      icon={'star'}
                      size={25}
                      color={Colors.orange}
                      onPress={async () => {
                        try {
                          dataContext.loadingHandler(true, 'favoriteIcon_2');
                          let choice = '';
                          objectID_2.current = item.id;

                          item.favorites === 'Yes' ? (choice = 'No') : (choice = 'Yes');

                          await UploadPrediction(item.id, choice, 'favorite');

                          const predictions = await FetchPrediction();
                          if (Array.isArray(predictions)) {
                            await Promise.all(predictions.map((data) => dataContext.predictionsHandler(data, '')));
                          }

                          if (item.status === 'Inactive') {
                            await DeletePrediction(item.id);
                          }

                          dataContext.loadingHandler(false, 'favoriteIcon_2');
                        } catch (error) {
                          dataContext.loadingHandler(false, 'favoriteIcon_2');
                          dataContext.messageIdHandler('LP18', 'favoriteIcon_2');
                          throw error.message;
                        }
                      }}
                    />
                  </View>
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.imageStytle}
                      source={{
                        uri: item.image,
                      }}
                    />
                  </View>

                  <Text_ textContainer={styles.titleContainer} textStytle={styles.titleText} children={item.prediction} />

                  {expand && item.id === objectID.current ? (
                    <Animated.View entering={FadeIn} style={styles.titleContentContainer}>
                      <Text_ textStytle={styles.titleContentText} children={item.image_details} />
                      {item.user_experience === 'None' && (
                        <>
                          {item.id === objectID.current &&
                          dataContext.loading.option === true &&
                          dataContext.loading.choice === 'user_experience' ? (
                            <ActivityIndicator size="small" color={darkMode ? Colors.white : Colors.black} />
                          ) : (
                            <View style={styles.userExperienceContainer}>
                              <Text_ textStytle={styles.userExperienceText} children={' Was the result satisfying?'} />
                              <View style={styles.userExperienceButtonMainContainer}>
                                <Button
                                  children={'Yes'}
                                  style={styles.userExperienceButtonContainer}
                                  textStyle={styles.userExperienceButtonText}
                                  onPress={() => {
                                    objectID.current = item.id;
                                    UserExperienceHandler(item.id, 'Good', 'user_experience');
                                  }}
                                />
                                <Button
                                  children={'No'}
                                  style={styles.userExperienceButtonContainer}
                                  textStyle={styles.userExperienceButtonText}
                                  onPress={() => {
                                    objectID.current = item.id;
                                    UserExperienceHandler(item.id, 'Bad', 'user_experience');
                                  }}
                                />
                              </View>
                            </View>
                          )}
                        </>
                      )}
                    </Animated.View>
                  ) : (
                    <Text_ textContainer={styles.hintContainer} textStytle={styles.hintText} children={'more...'} />
                  )}

                  <View style={styles.translateTextRootContainer}>
                    <IconTextButton
                      children={'Translate text'}
                      icon={'language'}
                      size={17}
                      color={Colors.lightOrange}
                      containerStyle={styles.translateTextContainer}
                      textStyle={styles.translateText}
                      onPress={() => {
                        objectID.current = item.id;
                        dataContext.translateOverlayHandler('true', 'favorite');
                      }}
                    />
                  </View>
                </View>

                {item.id === objectID.current &&
                  dataContext.translateOverlay.option === 'true' &&
                  dataContext.translateOverlay.choice === 'favorite' && (
                    <TranslateOverlay visible={true} translationText={item.prediction} />
                  )}
              </Pressable>
            )}
          </>
        )}
      </>
    );
  }

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.rootContainer}>
      <View style={styles.flatList}>
        <FlatList
          data={dataContext.predictions.predictionsData}
          key={(item) => item.id}
          renderItem={FavoritesList}
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
    flex: 1,
  },
  flatList: {
    paddingBottom: 60,
    alignItems: 'center',
    flex: 1,
  },
  FlatListRootContainer: {
    minHeight: 100,
    minWidth: 300,
    marginHorizontal: 20,
    marginVertical: 5,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  flatListDarkMode: {
    backgroundColor: Colors.black,
    shadowColor: Colors.light_gray,
    borderColor: Colors.darkGray,
  },
  mainContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  iconButtonContainer: {
    minWidth: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  dateText: {
    color: Colors.gray,
    fontSize: 13,
  },
  imageContainer: {
    alignItems: 'center',
    maxHeight: 100,
    minWidth: 50,
    borderRadius: 10,
  },
  imageStytle: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  titleContainer: {
    width: '100%',
    marginVertical: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
  },
  titleContentContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  titleContentText: {
    fontSize: 15,
  },
  userExperienceContainer: {
    width: '100%',
    marginVertical: 10,
  },
  userExperienceText: {
    color: Colors.gray,
  },
  userExperienceButtonMainContainer: {
    maxWidth: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 5,
    marginVertical: 10,
  },
  userExperienceButtonContainer: {
    borderWidth: 0.5,
    borderColor: Colors.orange,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
  },
  userExperienceButtonText: {},
  translateTextRootContainer: {
    alignItems: 'flex-end',
  },
  translateTextContainer: {
    width: 130,
    height: 'auto',
    backgroundColor: Colors.transparentColor,
  },
  translateText: {
    color: Colors.lightOrange,
    marginHorizontal: 5,
    fontWeight: '500',
    fontSize: 13,
  },
  hintContainer: {},
  hintText: {
    color: Colors.gray,
  },
  messageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.gray,
  },
});
