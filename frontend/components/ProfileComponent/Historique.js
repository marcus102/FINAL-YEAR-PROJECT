import { useState, useContext, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View, FlatList, Pressable, RefreshControl, Image, ActivityIndicator } from 'react-native';

import IconButton from '../../util/IconButton';
import Icons from '../../util/Icons';
import Colors from '../../constants/colors';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import Text_ from '../Text/Text';
import { FetchPrediction, UploadPrediction, DeletePrediction } from '../../HTTP Requests/ImageRecognition';
import LoadingOverlay from '../../util/LoadingPage';
import NotificationMessageOverlay from '../../util/NotificationMessageOverlay';

export default function Historique() {
  const [refreshing, setRefreshing] = useState(false);
  const [expand, setExpand] = useState(false);
  const objectID = useRef('');
  const objectID_2 = useRef('');

  const dataContext = useContext(ManagmentSystem);
  const themeOption = dataContext.themeOption;
  const darkMode = themeOption === 'Dark Mode';

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const preditionsHandler = async () => {
      try {
        dataContext.loadingHandler(true, 'history');
        const predictions = await FetchPrediction();

        if (Array.isArray(predictions)) {
          await Promise.all(predictions.map((data) => dataContext.predictionsHandler(data, '')));
        }
        dataContext.loadingHandler(false, 'history');
      } catch (error) {
        dataContext.loadingHandler(false, 'history');
        dataContext.messageIdHandler('LP17', 'history');
        throw error.message;
      }
    };
    preditionsHandler();
  }, []);

  function expandHandler(id) {
    setExpand(!expand);
    objectID.current = id;
  }

  if (dataContext.loading.option === true && dataContext.loading.choice === 'history') {
    return <LoadingOverlay loadingSpiner={true} overlayStyle={styles.loadingOverlay} />;
  }

  if (
    (dataContext.messageId.id === 'LP17' &&
      dataContext.messageId.choice === 'history' &&
      dataContext.loading.option === false &&
      dataContext.loading.choice === 'history') ||
    (dataContext.messageId.id === 'LP18' &&
      dataContext.messageId.choice === 'historyIcon' &&
      dataContext.loading.option === false &&
      dataContext.loading.choice === 'historyIcon')
  ) {
    return (
      <Animated.View entering={FadeIn}>
        <NotificationMessageOverlay
          onPress={() => {
            dataContext.messageId('');
          }}
          ID={dataContext.messageId}
        />
      </Animated.View>
    );
  }

  if (
    dataContext.predictions.predictionsData &&
    Array.isArray(dataContext.predictions.predictionsData) &&
    dataContext.predictions.predictionsData.every((item) => item.status === 'Inactive')
  ) {
    return <Text_ textContainer={styles.messageContainer} textStytle={styles.messageText} children={'Page Is Empty !!!'} />;
  }

  function FlatListHandler({ item }) {
    return (
      <>
        {item.status === 'Active' && (
          <Pressable onPress={() => expandHandler(item.id)} style={styles.flatlistRootContainer}>
            <View style={styles.historiqueContainer}>
              {objectID_2.current === item.id && dataContext.loading.option === true && dataContext.loading.choice === 'historyIcon' ? (
                <ActivityIndicator size="small" color={darkMode ? Colors.white : Colors.black} />
              ) : (
                <IconButton
                  icon={'trash-bin-outline'}
                  size={15}
                  color={Colors.red}
                  iconButtonContainer={styles.cancelButtonContainer}
                  onPress={async () => {
                    try {
                      dataContext.loadingHandler(true, 'historyIcon');
                      objectID_2.current = item.id;
                      await UploadPrediction(item.id, 'Inactive', 'status');

                      const predictions = await FetchPrediction();

                      if (Array.isArray(predictions)) {
                        await Promise.all(predictions.map((data) => dataContext.predictionsHandler(data, '')));
                      }

                      if (item.favorites === 'No') {
                        await DeletePrediction(item.id);
                      }
                      dataContext.loadingHandler(false, 'historyIcon');
                    } catch (error) {
                      dataContext.loadingHandler(false, 'historyIcon');
                      dataContext.messageIdHandler('LP18', 'historyIcon');
                      throw error.message;
                    }
                  }}
                />
              )}
              <View style={styles.predictionsHistoryContainer}>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: item.image,
                    }}
                  />
                </View>
                <View>
                  <Text_ textContainer={styles.predictionContainer} children={['Added since ', item.date]} />

                  {expand && item.id === objectID.current ? (
                    <View>
                      <Text_ textContainer={styles.predictionContainer2} children={item.prediction} />
                      <View style={styles.predictionInfoContainer}>
                        <Text_ textStytle={styles.predictionInfoText1} children={['Share: ', item.shares]} />

                        <Text_ textStytle={styles.predictionInfoText2} children={['Link: ', item.link]} />

                        <Text_ textStytle={styles.predictionInfoText3} children={['Like: ', item.likes]} />

                        <Text_ textStytle={styles.predictionInfoText4} children={['Favorite: ', item.favorites]} />
                      </View>
                    </View>
                  ) : (
                    <Text_ textStytle={styles.predictionMore} textContainer={styles.predictionContainer} children={'more...'} />
                  )}
                </View>
              </View>
            </View>
          </Pressable>
        )}
      </>
    );
  }

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.rootContainer}>
      <View style={styles.analysiesRootContainer}>
        <View style={styles.analysiesMainContainer}>
          <View style={styles.analysiesContainer}>
            <Icons icon={'search'} color={Colors.darkPurple} size={20} />
            <Text_ textStytle={styles.analysiesText} children={'Total Search'} />
            <Text_ textStytle={styles.analysiesCount} children={'99+'} />
          </View>
          <View style={styles.analysiesContainer}>
            <Icons icon={'share'} color={Colors.darkGreen} size={20} />
            <Text_ textStytle={styles.analysiesText} children={'Total Shares'} />
            <Text_ textStytle={styles.analysiesCount} children={'99+'} />
          </View>
        </View>
        <View style={styles.analysiesMainContainer}>
          <View style={styles.analysiesContainer}>
            <Icons icon={'heart'} color={Colors.red} size={20} />
            <Text_ textStytle={styles.analysiesText} children={'Total Likes'} />
            <Text_ textStytle={styles.analysiesCount} children={'99+'} />
          </View>
          <View style={styles.analysiesContainer}>
            <Icons icon={'star'} color={Colors.orange} size={20} />
            <Text_ textStytle={styles.analysiesText} children={'Total Favorites'} />
            <Text_ textStytle={styles.analysiesCount} children={'99+'} />
          </View>
        </View>
      </View>
      <FlatList
        data={dataContext.predictions.predictionsData}
        key={(item) => item.id}
        renderItem={FlatListHandler}
        refreshControl={<RefreshControl tintColor={darkMode ? Colors.white : Colors.black} refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    paddingHorizontal: 10,
  },
  flatlistRootContainer: {
    width: '100%',
    marginTop: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: Colors.light_grayTransparent,
  },
  darkModeContainer: {
    backgroundColor: Colors.black,
    shadowColor: Colors.light_gray,
    borderColor: Colors.darkGray,
  },
  historiqueContainer: {
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  analysiesRootContainer: {},
  analysiesMainContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  analysiesContainer: {
    width: '50%',
    marginTop: 10,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.light_grayTransparent,
  },
  analysiesText: {
    color: Colors.gray,
    marginTop: 5,
  },
  analysiesCount: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 5,
  },
  imageContainer: {
    alignItems: 'center',
    maxHeight: 40,
    minWidth: 40,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 5,
  },
  predictionContainer: {
    width: '100%',
    marginHorizontal: 10,
  },
  predictionContainer2: {
    width: '85%',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  predictionsHistoryContainer: {
    flexDirection: 'row',
  },

  predictionInfoContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  predictionInfoText1: {
    fontSize: 10,
    color: Colors.green,
  },
  predictionInfoText2: {
    fontSize: 10,
    color: Colors.orange,
  },
  predictionInfoText3: {
    fontSize: 10,
    color: Colors.red,
  },
  predictionInfoText4: {
    fontSize: 10,
    color: Colors.yellow,
  },

  predictionMore: {
    color: Colors.gray,
  },

  cancelButtonContainer: {
    width: '100%',
    alignItems: 'flex-end',
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
